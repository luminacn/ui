import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
// Recreating __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export function addComponent(componentName, targetPath) {
    // Resolve registry path from the dist/ folder
    const registryPath = path.join(__dirname, "..", // up to cli
    "..", // up to tools
    "..", // up to dist (project root inside build)
    "..", // up to ACTUAL project root (where packages/ is)
    "packages", "registry");
    const jsonPath = path.join(registryPath, componentName, `${componentName}.json`);
    if (!fs.existsSync(jsonPath)) {
        console.error(`❌ Component ${componentName} does not exist in the registry.`);
        return;
    }
    const componentMeta = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
    // 1. Create component destination folder
    const destPath = path.join(targetPath, "src", "app", "components", "ui", componentName);
    if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
    }
    // 2. Copy component files
    componentMeta.files.forEach((file) => {
        const src = path.join(registryPath, componentName, file);
        const dest = path.join(destPath, file.replace(".template", ""));
        if (fs.existsSync(src)) {
            fs.copyFileSync(src, dest);
        }
        else {
            console.error(`❌ Source file not found: ${src}`);
        }
    });
    console.log(`✔ ${componentName} added to src/app/components/ui/${componentName}`);
}
