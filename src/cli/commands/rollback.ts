import fs from "fs";
import path from "path";
import {
  loadState,
  saveState,
  ask,
  loadRegistry,
  getPackageRoot,
} from "../utils/common.ts";
import { rebuildCss } from "../utils/css.ts";

function getLatestBackup(targetPath: string, name: string) {
  const root = path.join(targetPath, ".lumina", "backups", name);

  if (!fs.existsSync(root)) return null;

  const folders = fs.readdirSync(root).sort();

  return folders.length ? path.join(root, folders[folders.length - 1]) : null;
}

export async function rollback(name: string, targetPath: string) {
  const root = getPackageRoot();
  const registry = loadRegistry(root);
  const registryDir = path.join(root, "packages", "registry");
  const state = loadState(targetPath);

  const comp = state.components[name];
  if (!comp) {
    console.log(`ℹ ${name} not installed`);
    return;
  }

  const backup = getLatestBackup(targetPath, name);

  if (!backup) {
    console.error("❌ No backup found");
    return;
  }

  console.log(`\n⏪ Rollback ${name}\n`);

  const confirm = await ask("⚠ Restore backup?");

  if (!confirm) return;

  const dest = path.join(targetPath, comp.path);

  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
  }

  fs.cpSync(backup, dest, { recursive: true });

  const snapshot = JSON.parse(
    fs.readFileSync(path.join(backup, "lumina.snapshot.json"), "utf-8"),
  );

  state.components[name] = snapshot;

  rebuildCss(
    state,
    registry,
    registryDir,
    path.join(targetPath, "src/styles.css"),
  );

  saveState(targetPath, state);

  console.log(`\n✅ Rolled back ${name}\n`);
}
