import fs from "fs";
import path from "path";

/* =========================
   PATHS
========================= */
function getPackageRoot() {
  const distPath = path.resolve(process.cwd(), "..", "..");
  const devPath = path.resolve(process.cwd(), "..", "..", "..");

  if (fs.existsSync(path.join(distPath, "packages"))) return distPath;
  if (fs.existsSync(path.join(devPath, "packages"))) return devPath;

  return process.cwd();
}

/* =========================
   LOAD STATE (INSTALLED)
========================= */
function loadState(projectPath: string) {
  const file = path.join(projectPath, "lumina.json");

  if (!fs.existsSync(file)) {
    return { components: {} };
  }

  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

/* =========================
   LOAD REGISTRY
========================= */
function loadRegistry(registryPath: string) {
  const files = fs.readdirSync(registryPath);

  const registry: Record<string, any> = {};

  for (const file of files) {
    const fullPath = path.join(registryPath, file);
    const meta = JSON.parse(fs.readFileSync(fullPath, "utf-8"));
    registry[meta.name] = meta;
  }

  return registry;
}

/* =========================
   MAIN DIFF
========================= */
export function diff(packageRoot?: string, projectPath?: string) {
  const root = packageRoot ?? getPackageRoot();
  const project = projectPath ?? process.cwd();

  const registryPath = path.join(root, "src/packages/dictionary");

  if (!fs.existsSync(registryPath)) {
    console.error("❌ Registry not found:", registryPath);
    process.exit(1);
  }

  const state = loadState(project);
  const registry = loadRegistry(registryPath);

  console.log("\n📦 Lumina Diff Report\n");

  const installed = state.components ?? {};

  const allNames = new Set([
    ...Object.keys(registry),
    ...Object.keys(installed),
  ]);

  let hasUpdates = false;

  for (const name of allNames) {
    const local = installed[name];
    const remote = registry[name];

    // ❌ not installed
    if (!local && remote) {
      console.log(`❌ ${name}  not installed`);
      continue;
    }

    // ❌ installed but missing in registry (rare edge case)
    if (local && !remote) {
      console.log(`⚠ ${name} installed but not found in registry`);
      continue;
    }

    // ✔ compare versions
    if (local && remote) {
      if (local.version !== remote.version) {
        hasUpdates = true;

        console.log(
          `⬆ ${name}  ${local.version} → ${remote.version} (update available)`,
        );
      } else {
        console.log(`✔ ${name}  up to date`);
      }
    }
  }

  console.log("\n");

  if (hasUpdates) {
    console.log("Run:");
    console.log("  npx luminacn upgrade <component>");
  } else {
    console.log("🎉 All components are up to date");
  }
}
