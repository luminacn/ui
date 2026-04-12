import path from "path";
import { getPackageRoot, loadState, loadRegistry } from "../utils/common.ts";

export function diff(packageRoot?: string, projectPath?: string) {
  const root = packageRoot ?? getPackageRoot();
  const project = projectPath ?? process.cwd();

  const state = loadState(project);
  const registry = loadRegistry(root);

  console.log("\n📦 Lumina Diff Report\n");

  const installed = state?.components ?? {};
  const allNames = Array.from(
    new Set([...Object.keys(registry), ...Object.keys(installed)]),
  ).sort();

  let hasUpdates = false;

  for (const name of allNames) {
    const local = installed[name];
    const remote = registry[name];

    if (!local && remote) {
      console.log(`❌ ${name} not installed`);
      continue;
    }

    if (local && !remote) {
      console.log(`⚠ ${name} installed but not in registry`);
      continue;
    }

    if (local && remote) {
      if (local.version !== remote.version) {
        hasUpdates = true;
        console.log(`⬆ ${name} ${local.version} → ${remote.version}`);
      } else {
        console.log(`✔ ${name} up to date`);
      }
    }
  }

  console.log("");

  if (hasUpdates) {
    console.log("Run:");
    console.log("  npx luminacn upgrade <component>");
  } else {
    console.log("🎉 All components are up to date");
  }
}
