import fs from "fs";
import path from "path";
import { getPackageRoot } from "../utils/common.ts";

export function listComponents() {
  const root = getPackageRoot();
  const dictionaryPath = path.join(root, "packages", "dictionary");

  if (!fs.existsSync(dictionaryPath)) {
    console.error("❌ Dictionary not found.");
    return;
  }

  const files = fs.readdirSync(dictionaryPath);

  console.log("\n📦 Available components:\n");

  for (const file of files) {
    const full = path.join(dictionaryPath, file);
    const json = JSON.parse(fs.readFileSync(full, "utf-8"));
    console.log(`  - ${json.name}`);
  }

  console.log("");
}
