import fs from "fs";
import path from "path";

export function setupTsConfigPaths(root: string) {
  const tsconfigPath = path.join(root, "tsconfig.json");
  if (!fs.existsSync(tsconfigPath)) return;

  try {
    const config = JSON.parse(fs.readFileSync(tsconfigPath, "utf-8"));
    config.compilerOptions = config.compilerOptions || {};
    config.compilerOptions.paths = config.compilerOptions.paths || {};

    // Add the alias if it doesn't exist
    if (!config.compilerOptions.paths["@/*"]) {
      config.compilerOptions.paths["@/*"] = ["./src/app/*"];
      config.compilerOptions.baseUrl = config.compilerOptions.baseUrl || ".";

      fs.writeFileSync(tsconfigPath, JSON.stringify(config, null, 2));
      console.log("✔ Added @/* path alias to tsconfig.json");
    }
  } catch (e) {
    console.warn("⚠️ Could not update tsconfig.json automatically.");
  }
}
