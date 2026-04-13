import fs from "fs";
import path from "path";
import {
  loadState,
  saveState,
  loadRegistry,
  ask,
  getPackageRoot,
  getProjectConfig,
} from "../utils/common.ts";
import { addComponent } from "./add.ts";
import { rebuildCss } from "../utils/css.ts";

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

  const source = path.join(targetPath, comp.path);

  if (fs.existsSync(source)) {
    fs.cpSync(source, backupDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(backupDir, "lumina.snapshot.json"),
    JSON.stringify(comp, null, 2),
  );
}

function removeCssInjection(targetPath: string, name: string) {
  const styleFile = path.join(targetPath, "src/styles.css");

  if (!fs.existsSync(styleFile)) return;

  let content = fs.readFileSync(styleFile, "utf-8");

  const regex = new RegExp(
    `/\\* lumina:start:${name} \\*/[\\s\\S]*?/\\* lumina:end:${name} \\*/`,
    "g",
  );

  content = content.replace(regex, "");

  fs.writeFileSync(styleFile, content.trim());
}

function removeComponent(name: string, targetPath: string, state: any) {
  const comp = state.components[name];
  if (!comp) return;

  const full = path.join(targetPath, comp.path);

  if (fs.existsSync(full)) {
    fs.rmSync(full, { recursive: true, force: true });
  }

  delete state.components[name];
}

export async function upgradeComponent(
  componentName: string,
  targetPath: string,
) {
  const packageRoot = getPackageRoot();
  const registryDir = path.join(packageRoot, "packages", "registry");
  const config = getProjectConfig(targetPath);

  const state = loadState(targetPath);
  const registry = loadRegistry(packageRoot);

  const local = state.components[componentName];
  const remote = registry[componentName];

  if (!remote) {
    console.error(`❌ Component not found: ${componentName}`);
    return;
  }

  if (!local) {
    console.log(`ℹ Not installed. Use add.`);
    return;
  }

  if (local.version === remote.version) {
    console.log(`✔ ${componentName} already up to date`);
    return;
  }

  console.log(`\n⬆ ${componentName} ${local.version} → ${remote.version}\n`);

  const confirm = await ask("⚠ Overwrite local changes?");
  if (!confirm) return;

  console.log("💾 Creating backup...");
  createBackup(targetPath, componentName, local);

  console.log("🧹 Removing old files...");
  removeComponent(componentName, targetPath, state);
  saveState(targetPath, state);

  console.log("📦 Installing new...");
  await addComponent(componentName, targetPath);

  const newState = loadState(targetPath);

  rebuildCss(
    newState,
    registry,
    registryDir,
    path.join(targetPath, config.styles),
  );

  console.log(`\n✅ ${componentName} upgraded\n`);
}
