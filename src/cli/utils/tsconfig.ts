import fs from "fs";
import path from "path";

export function setupTsConfigPaths(root: string) {
  // Target both files; app-specific is often more important for IDE errors
  const files = ["tsconfig.json", "tsconfig.app.json"];

  files.forEach((fileName) => {
    const filePath = path.join(root, fileName);
    if (!fs.existsSync(filePath)) return;

    try {
      // Use a regex to strip comments if you aren't using a proper parser
      const rawContent = fs.readFileSync(filePath, "utf-8");
      const cleanContent = rawContent.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, "");
      const config = JSON.parse(cleanContent);

      config.compilerOptions = config.compilerOptions || {};
      config.compilerOptions.paths = config.compilerOptions.paths || {};

      if (!config.compilerOptions.paths["@/*"]) {
        config.compilerOptions.paths["@/*"] = ["./src/app/*"];
        // baseUrl is REQUIRED for paths to work
        config.compilerOptions.baseUrl = ".";

        fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
        console.log(`✔ Added @/* path alias to ${fileName}`);
      }
    } catch (e) {
      console.warn(`⚠️ Could not update ${fileName} automatically.`);
    }
  });
}
