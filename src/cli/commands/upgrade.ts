import fs from "fs";
import path from "path";
import readline from "readline";
import { addComponent, getPackageRoot } from "./add.ts";

/* =========================
   STATE
========================= */
function loadState(targetPath: string) {
  const file = path.join(targetPath, "lumina.json");

  if (!fs.existsSync(file)) {
    return { components: {} };
  }

  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

function saveState(targetPath: string, state: any) {
  const file = path.join(targetPath, "lumina.json");
  fs.writeFileSync(file, JSON.stringify(state, null, 2));
}

/* =========================
   REGISTRY
========================= */
function loadRegistry(packageRoot: string) {
  const registryPath = path.join(packageRoot, "packages", "dictionary");
  const files = fs.readdirSync(registryPath);

  const registry: Record<string, any> = {};

  for (const file of files) {
    const meta = JSON.parse(
      fs.readFileSync(path.join(registryPath, file), "utf-8"),
    );

    registry[meta.name] = meta;
  }

  return registry;
}

/* =========================
   CONFIRM PROMPT
========================= */
function ask(question: string): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(`${question} (y/n): `, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === "y");
    });
  });
}

/* =========================
   CREATE BACKUP
========================= */

function createBackup(targetPath: string, name: string, comp: any) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

  const backupDir = path.join(
    targetPath,
    ".lumina",
    "backups",
    name,
    timestamp,
  );

  fs.mkdirSync(backupDir, { recursive: true });

  const sourcePath = path.join(targetPath, comp.path);

  if (fs.existsSync(sourcePath)) {
    fs.cpSync(sourcePath, backupDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(backupDir, "lumina.snapshot.json"),
    JSON.stringify(
      {
        name,
        version: comp.version,
        path: comp.path,
        timestamp: new Date().toISOString(),
      },
      null,
      2,
    ),
  );

  return backupDir;
}

/* =========================
   REMOVE COMPONENT
========================= */
function removeComponent(name: string, targetPath: string, state: any) {
  const comp = state.components[name];
  if (!comp) return;

  const fullPath = path.join(targetPath, comp.path);

  if (fs.existsSync(fullPath)) {
    fs.rmSync(fullPath, { recursive: true, force: true });
  }

  // remove from state immediately
  delete state.components[name];
}

/* =========================
   MAIN UPGRADE
========================= */
export async function upgradeComponent(
  componentName: string,
  targetPath: string,
) {
  const packageRoot = getPackageRoot();

  const state = loadState(targetPath);
  const registry = loadRegistry(packageRoot);

  const local = state.components[componentName];
  const remote = registry[componentName];

  /* =========================
     VALIDATION
  ========================= */
  if (!remote) {
    console.error(`❌ Component "${componentName}" not found in registry.`);
    process.exit(1);
  }

  if (!local) {
    console.log(`ℹ ${componentName} is not installed. Use add instead.`);
    return;
  }

  const installedVersion = local.version;
  const latestVersion = remote.version;

  if (!installedVersion || !latestVersion) {
    console.warn(`⚠ Missing version info for ${componentName}`);
  }

  if (installedVersion === latestVersion) {
    console.log(`✔ ${componentName} is already up to date.`);
    return;
  }

  /* =========================
     INFO
  ========================= */
  console.log(`\n⬆ Upgrade available for "${componentName}"`);
  console.log(`   Installed: ${installedVersion}`);
  console.log(`   Latest:    ${latestVersion}\n`);

  /* =========================
     CONFIRM
  ========================= */
  const confirm = await ask(
    `⚠ This will overwrite "${componentName}". Continue?`,
  );

  if (!confirm) {
    console.log("❌ Upgrade cancelled.");
    return;
  }

  /* =========================
     REMOVE OLD
  ========================= */
  console.log(`💾 Creating backup for rollback...`);

  createBackup(targetPath, componentName, local);

  console.log(`🧹 Removing old version of ${componentName}...`);
  removeComponent(componentName, targetPath, state);

  saveState(targetPath, state);

  /* =========================
     INSTALL NEW
  ========================= */
  console.log(`📦 Installing latest version of ${componentName}...`);

  await addComponent(componentName, targetPath);

  console.log(`\n✅ ${componentName} upgraded successfully!\n`);
}
