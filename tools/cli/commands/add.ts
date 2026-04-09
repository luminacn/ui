import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { confirm } from "@inquirer/prompts";
import { execSync } from "child_process";

// Recreating __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function checkPeerDeps(root: string) {
  const pkgPath = path.join(root, "package.json");
  if (!fs.existsSync(pkgPath)) return;

  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };

  const required = ["clsx", "tailwind-merge"];
  const missing = required.filter((d) => !deps[d]);

  if (missing.length > 0) {
    console.log(`📦 Installing missing dependencies: ${missing.join(", ")}...`);
    // Use --save to ensure they go into dependencies
    execSync(`npm install ${missing.join(" ")}`, {
      cwd: root,
      stdio: "inherit",
    });
  }
}

export async function addComponent(componentName: string, targetPath: string) {
  checkPeerDeps(targetPath);
  // Resolve registry path from the dist/ folder
  const registryPath = path.join(
    __dirname,
    "..", // up to cli
    "..", // up to tools
    "..", // up to dist (project root inside build)
    "..", // up to ACTUAL project root (where packages/ is)
    "packages",
    "registry",
  );

  const jsonPath = path.join(
    registryPath,
    componentName,
    `${componentName}.json`,
  );

  if (!fs.existsSync(jsonPath)) {
    console.error(
      `❌ Component ${componentName} does not exist in the registry.`,
    );
    return;
  }

  const componentMeta = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

  // 1. Create component destination folder
  const destPath = path.join(
    targetPath,
    "src",
    "app",
    "components",
    "ui",
    componentName,
  );

  if (fs.existsSync(destPath)) {
    const shouldOverwrite = await confirm({
      message: `Component "${componentName}" already exists. Overwrite?`,
      default: false,
    });

    if (!shouldOverwrite) {
      console.log("❌ Aborted.");
      return;
    }
  } else {
    // Make sure to create the folder if it's the first time
    fs.mkdirSync(destPath, { recursive: true });
  }

  // 2. Copy component files
  componentMeta.files.forEach((file: string) => {
    const src = path.join(registryPath, componentName, file);
    const dest = path.join(destPath, file.replace(".template", ""));

    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
    } else {
      console.error(`❌ Source file not found: ${src}`);
    }
  });

  const mainFile = componentMeta.files
    .find(
      (f: string) =>
        f.includes(".directive") ||
        f.includes(".component") ||
        f.includes(".ts"),
    )
    .replace(".template", "");

  const displayPath = `./src/app/components/${componentMeta.destination}/${mainFile.replace(".ts", "")}`;

  console.log(`\n✅ ${componentName} added successfully!`);
  console.log(`👉 Import this in your component or module:`);
  if (Array.isArray(componentMeta.primaryExport)) {
    console.log(
      `   import { ${componentMeta.primaryExport.join(", ")} } from '${displayPath}';`,
    );
  } else {
    console.log(
      `   import { ${componentMeta.primaryExport} } from '${displayPath}';`,
    );
  }
}
