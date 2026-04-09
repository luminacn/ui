import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { select } from "@inquirer/prompts";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Helpers to find package templates from dist
const getCoreSourcePath = () => path.join(__dirname, "..", "..", "..", "..", "packages", "core");
const getThemeSourcePath = () => path.join(__dirname, "..", "..", "..", "..", "packages", "themes");
function ensureAngular(root) {
    if (!fs.existsSync(path.join(root, "angular.json"))) {
        console.error("❌ Not an Angular project.");
        process.exit(1);
    }
    console.log("✔ Angular project detected");
}
function createCore(root) {
    const coreDestPath = path.join(root, "src", "app", "lib", "core");
    const coreSrcPath = getCoreSourcePath();
    fs.mkdirSync(coreDestPath, { recursive: true });
    const coreFiles = ["cva.ts.template", "cn.ts.template"];
    coreFiles.forEach((file) => {
        const src = path.join(coreSrcPath, file);
        const dest = path.join(coreDestPath, file.replace(".template", ""));
        if (fs.existsSync(src)) {
            fs.copyFileSync(src, dest);
        }
    });
    console.log("✔ Core utilities created in src/app/lib/core");
}
async function setupTailwind(root) {
    // 1. Argument Parsing
    const args = process.argv.slice(2);
    const themeFlagIndex = args.indexOf("--theme");
    let theme = themeFlagIndex !== -1 ? args[themeFlagIndex + 1] : null;
    const validThemes = ["zinc", "slate", "stone", "gray", "neutral"];
    // 2. Interactive Selection (if no flag)
    if (!theme || !validThemes.includes(theme.toLowerCase())) {
        theme = await select({
            message: "Which base color would you like to use?",
            default: "zinc",
            choices: validThemes.map((t) => ({
                name: t.charAt(0).toUpperCase() + t.slice(1),
                value: t,
            })),
        });
    }
    theme = theme.toLowerCase();
    // 3. Installation (After confirmation)
    console.log(`📦 Configuring [${theme}] theme and installing dependencies...`);
    execSync("npm install tailwindcss @tailwindcss/postcss postcss clsx tailwind-merge tw-animate-css --force", { stdio: "inherit" });
    // 4. Create PostCSS Config
    fs.writeFileSync(path.join(root, ".postcssrc.json"), JSON.stringify({ plugins: { "@tailwindcss/postcss": {} } }, null, 2));
    // 5. File Resolution
    const stylesPath = fs.existsSync(path.join(root, "src/styles.scss"))
        ? path.join(root, "src/styles.scss")
        : path.join(root, "src/styles.css");
    if (!fs.existsSync(stylesPath))
        fs.writeFileSync(stylesPath, "");
    // 6. Load Templates & Assemble
    const themeSrcPath = getThemeSourcePath();
    const wiring = fs.readFileSync(path.join(themeSrcPath, "base-wiring.css.template"), "utf-8");
    const colors = fs.readFileSync(path.join(themeSrcPath, `${theme}.css.template`), "utf-8");
    const finalCss = `${wiring}\n${colors}\n\n@layer base {\n  * { @apply border-border outline-ring/50; }\n  body { @apply bg-background text-foreground; }\n}\n`;
    fs.writeFileSync(stylesPath, finalCss);
    console.log(`✔ Tailwind and [${theme}] theme injected into ${path.basename(stylesPath)}`);
}
export async function init() {
    const root = process.cwd();
    console.log("🚀 Initializing Lumina UI...\n");
    ensureAngular(root);
    await setupTailwind(root); // Now async
    createCore(root);
    console.log("\n✅ Lumina initialized successfully!");
    console.log("👉 Run: npx lumina add <component>");
}
