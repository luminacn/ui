import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { confirm } from "@inquirer/prompts";
import { execSync } from "child_process";

// --- Path Resolution Logic ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Finds the directory containing 'packages'.
 * - In 'dist', it is 2 levels up from 'dist/cli/commands'
 * - In 'src' development, it is likely the same or 3+ levels depending on monorepo setup
 */
function getPackageRoot() {
  // 1. Check for standard 'dist' structure (2 levels up)
  const distPath = path.resolve(__dirname, "..", "..");
  if (fs.existsSync(path.join(distPath, "packages"))) {
    return distPath;
  }

  // 2. Check for local 'src' development structure (usually 2 or 3 levels up)
  const devPath = path.resolve(__dirname, "..", "..", "..");
  if (fs.existsSync(path.join(devPath, "packages"))) {
    return devPath;
  }

  // 3. Last resort fallback (The original 4-level deep structure)
  return path.resolve(__dirname, "..", "..", "..", "..");
}

const packageRoot = getPackageRoot();
const getRegistryPath = () => path.join(packageRoot, "packages", "registry");

// --- Helper Functions ---

function checkPeerDeps(root: string) {
  const pkgPath = path.join(root, "package.json");
  if (!fs.existsSync(pkgPath)) return;

  try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };

    const required = ["clsx", "tailwind-merge"];
    const missing = required.filter((d) => !deps[d]);

    if (missing.length > 0) {
      console.log(
        `📦 Installing missing dependencies: ${missing.join(", ")}...`,
      );
      execSync(`npm install ${missing.join(" ")}`, {
        cwd: root,
        stdio: "inherit",
      });
    }
  } catch (e) {
    console.warn("⚠️  Could not parse package.json to check dependencies.");
  }
}

// --- Main Command Function ---

export async function addComponent(componentName: string, targetPath: string) {
  // Ensure user has necessary base utilities
  checkPeerDeps(targetPath);

  const registryPath = getRegistryPath();
  const componentDir = path.join(registryPath, componentName);
  const jsonPath = path.join(componentDir, `${componentName}.json`);

  if (!fs.existsSync(jsonPath)) {
    console.error(`❌ Component "${componentName}" not found in registry.`);
    console.error(`   Searched in: ${jsonPath}`);
    return;
  }

  const componentMeta = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

  // 1. Prepare Destination (e.g., src/app/components/ui/button)
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
      console.log("👋 Aborted.");
      return;
    }
  } else {
    fs.mkdirSync(destPath, { recursive: true });
  }

  // 2. Copy Registry Files to Project
  componentMeta.files.forEach((file: string) => {
    const src = path.join(componentDir, file);
    const dest = path.join(destPath, file.replace(".template", ""));

    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
    } else {
      console.error(`❌ Source file missing: ${src}`);
    }
  });

  console.log(`\n✅ ${componentName} added successfully!`);
}
