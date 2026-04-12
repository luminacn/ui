import fs from "fs";
import path from "path";
import {
  loadState,
  saveState,
  getPackageRoot,
  loadRegistry,
} from "../utils/common.ts";

export async function uninstall(name: string, targetPath: string) {
  const state = loadState(targetPath);
  const registry = loadRegistry(getPackageRoot());

  const comp = state.components[name];

  if (!comp) {
    console.log(`ℹ ${name} not installed`);
    return;
  }

  console.log(`🧹 Removing ${name}...`);

  // 1. remove files
  const fullPath = path.join(targetPath, comp.path);
  if (fs.existsSync(fullPath)) {
    fs.rmSync(fullPath, { recursive: true, force: true });
  }

  // 2. remove css
  const styleFile = path.join(targetPath, "src/styles.css");

  let content = fs.existsSync(styleFile)
    ? fs.readFileSync(styleFile, "utf-8")
    : "";

  const regex = new RegExp(
    `/\\* lumina:start:${name} \\*/[\\s\\S]*?/\\* lumina:end:${name} \\*/`,
    "g",
  );

  content = content.replace(regex, "").trim();

  fs.writeFileSync(styleFile, content);

  // 3. update state
  delete state.components[name];
  saveState(targetPath, state);

  console.log(`✅ ${name} removed successfully`);
}
