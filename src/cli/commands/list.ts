import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to find your dictionary path
const getDictionaryPath = () => {
  const distPath = path.resolve(
    __dirname,
    "..",
    "..",
    "packages",
    "dictionary",
  );
  return fs.existsSync(distPath)
    ? distPath
    : path.resolve(__dirname, "..", "..", "..", "packages", "dictionary");
};

export async function listComponents() {
  const dictionaryPath = getDictionaryPath();

  if (!fs.existsSync(dictionaryPath)) {
    console.error("❌ Dictionary folder not found.");
    return;
  }

  const files = fs
    .readdirSync(dictionaryPath)
    .filter((file: string) => file.endsWith(".json"));

  if (files.length === 0) {
    console.log("📂 No components found in dictionary.");
    return;
  }

  console.log("\n📦 Available components:");
  files.forEach((file: string) => {
    try {
      const filePath = path.join(dictionaryPath, file);
      const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      // Use the 'name' field inside the JSON, fallback to filename if missing
      const componentName = content.name || file.replace(".json", "");
      console.log(`  - ${componentName}`);
    } catch (e) {
      // Fallback if the JSON is malformed
      console.log(`  - ${file.replace(".json", "")}`);
    }
  });
  console.log("");
}
