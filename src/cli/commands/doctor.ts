import { loadState, loadRegistry } from "../utils/common.ts";

export function doctor(packageRoot: string, targetPath: string) {
  const state = loadState(targetPath);
  const registry = loadRegistry(packageRoot);

  const installed = state.components || {};

  console.log("\n🩺 Lumina Doctor Report\n");

  const upToDate: string[] = [];
  const outdated: any[] = [];
  const missing: string[] = [];
  const unknown: string[] = [];

  for (const name of Object.keys(installed)) {
    const local = installed[name];
    const remote = registry[name];

    if (!remote) {
      unknown.push(name);
      continue;
    }

    if (local.version === remote.version) {
      upToDate.push(name);
    } else {
      outdated.push({
        name,
        installed: local.version,
        latest: remote.version,
      });
    }
  }

  for (const name of Object.keys(registry)) {
    if (!installed[name]) {
      missing.push(name);
    }
  }

  if (upToDate.length) {
    console.log("✔ Up to date:");
    upToDate.forEach((n) => console.log(`   - ${n}`));
  }

  if (outdated.length) {
    console.log("\n⬆ Outdated:");
    outdated.forEach((c) => {
      console.log(`   - ${c.name} (${c.installed} → ${c.latest})`);
      console.log(`     npx luminacn upgrade ${c.name}`);
    });
  }

  if (missing.length) {
    console.log("\n➕ Available:");
    missing.forEach((n) => {
      console.log(`   - ${n}`);
    });
  }

  if (unknown.length) {
    console.log("\n⚠ Unknown:");
    unknown.forEach((n) => console.log(`   - ${n}`));
  }

  console.log("\n🩺 Done.\n");
}
