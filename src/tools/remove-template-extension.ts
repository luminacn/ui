import fs from "fs";
import path from "path";

const registryRoot = path.resolve("src/packages/registry");

function walk(dir: string) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (entry.isFile() && fullPath.endsWith(".template")) {
      const newPath = fullPath.replace(".template", "");

      console.log(`🔄 Renaming: ${fullPath} → ${newPath}`);

      fs.renameSync(fullPath, newPath);
    }
  }
}

function run() {
  if (!fs.existsSync(registryRoot)) {
    console.error("❌ Registry folder not found");
    process.exit(1);
  }

  walk(registryRoot);

  console.log("\n✅ Done removing .template extensions");
}

run();
