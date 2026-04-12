import fs from "fs";
import path from "path";
import readline from "readline";
import { getPackageRoot } from "./add.ts";

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
   ASK CONFIRMATION
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
   FIND LATEST BACKUP
========================= */
function getLatestBackup(targetPath: string, name: string) {
  const backupRoot = path.join(targetPath, ".lumina", "backups", name);

  if (!fs.existsSync(backupRoot)) return null;

  const folders = fs.readdirSync(backupRoot);

  if (folders.length === 0) return null;

  // newest folder (timestamp sorted)
  const latest = folders.sort()[folders.length - 1];

  return path.join(backupRoot, latest);
}

/* =========================
   RESTORE BACKUP
========================= */
function restoreBackup(
  backupDir: string,
  targetPath: string,
  state: any,
  name: string,
) {
  const snapshotPath = path.join(backupDir, "lumina.snapshot.json");

  if (!fs.existsSync(snapshotPath)) {
    throw new Error("Invalid backup: missing snapshot file");
  }

  const snapshot = JSON.parse(fs.readFileSync(snapshotPath, "utf-8"));

  const restorePath = path.join(targetPath, snapshot.path);

  console.log(`♻ Restoring ${name} from backup...`);

  // remove current version first
  if (fs.existsSync(restorePath)) {
    fs.rmSync(restorePath, { recursive: true, force: true });
  }

  // restore backup files
  fs.cpSync(backupDir, restorePath, { recursive: true });

  // update state
  state.components[name] = {
    path: snapshot.path,
    installedAt: new Date().toISOString(),
    version: snapshot.version,
  };
}

/* =========================
   MAIN ROLLBACK
========================= */
export async function rollback(componentName: string, targetPath: string) {
  const packageRoot = getPackageRoot();
  const state = loadState(targetPath);

  const local = state.components[componentName];

  if (!local) {
    console.log(`ℹ ${componentName} is not installed.`);
    return;
  }

  const backupDir = getLatestBackup(targetPath, componentName);

  if (!backupDir) {
    console.error(`❌ No backup found for "${componentName}"`);
    return;
  }

  console.log(`\n⏪ Rollback available for "${componentName}"`);
  console.log(`📦 Restoring from: ${backupDir}\n`);

  const confirm = await ask(
    `⚠ This will overwrite current "${componentName}". Continue?`,
  );

  if (!confirm) {
    console.log("❌ Rollback cancelled.");
    return;
  }

  restoreBackup(backupDir, targetPath, state, componentName);

  saveState(targetPath, state);

  console.log(`\n✅ ${componentName} rolled back successfully!\n`);
}
