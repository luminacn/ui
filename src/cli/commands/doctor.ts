import fs from "fs";
import path from "path";

function loadState(targetPath: string) {
  const file = path.join(targetPath, "lumina.json");

  if (!fs.existsSync(file)) {
    return { components: {} };
  }

  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

function loadRegistry(packageRoot: string) {
  const registryPath = path.join(packageRoot, "packages", "dictionary");
  const files = fs.readdirSync(registryPath);

  const registry: Record<string, any> = {};

  for (const file of files) {
    const meta = JSON.parse(
      fs.readFileSync(path.join(registryPath, file), "utf-8"),
    );

    registry[meta.name] = meta;
  }

  return registry;
}

/* =========================
   DOCTOR CORE
========================= */
export function doctor(packageRoot: string, targetPath: string) {
  const state = loadState(targetPath);
  const registry = loadRegistry(packageRoot);

  const installed = state.components || {};

  const report = {
    upToDate: [] as string[],
    outdated: [] as {
      name: string;
      installed: string;
      latest: string;
    }[],
    missing: [] as string[],
    unknown: [] as string[],
  };

  /* =========================
     CHECK INSTALLED COMPONENTS
  ========================= */
  for (const name of Object.keys(installed)) {
    const local = installed[name];
    const remote = registry[name];

    if (!remote) {
      report.unknown.push(name);
      continue;
    }

    const installedVersion = local.version ?? "0.0.0";
    const latestVersion = remote.version ?? "1.0.0";

    if (installedVersion === latestVersion) {
      report.upToDate.push(name);
    } else {
      report.outdated.push({
        name,
        installed: installedVersion,
        latest: latestVersion,
      });
    }
  }

  /* =========================
     CHECK MISSING COMPONENTS
  ========================= */
  for (const name of Object.keys(registry)) {
    if (!installed[name]) {
      report.missing.push(name);
    }
  }

  /* =========================
     OUTPUT
  ========================= */
  console.log("\n🩺 Lumina Doctor Report\n");

  /* Up to date */
  if (report.upToDate.length) {
    console.log("✔ Up to date:");
    for (const name of report.upToDate) {
      console.log(`   - ${name}`);
    }
  }

  /* Outdated */
  if (report.outdated.length) {
    console.log("\n⬆ Outdated:");
    for (const item of report.outdated) {
      console.log(`   - ${item.name} (${item.installed} → ${item.latest})`);
      console.log(`     run: npx luminacn upgrade ${item.name}`);
    }
  }

  /* Missing */
  if (report.missing.length) {
    console.log("\n➕ Available but not installed:");
    for (const name of report.missing) {
      console.log(`   - ${name}`);
      console.log(`     run: npx luminacn add ${name}`);
    }
  }

  /* Unknown */
  if (report.unknown.length) {
    console.log("\n⚠ Unknown (not in registry):");
    for (const name of report.unknown) {
      console.log(`   - ${name}`);
    }
  }

  console.log("\n🩺 Done.\n");

  return report;
}
