import fs from "fs";
import path from "path";
import { execSync } from "child_process";

import {
  getPackageRoot,
  loadState,
  saveState,
  loadRegistry,
  getProjectConfig,
  checkPeerDeps,
  buildGraph,
  resolveDependencies,
  upsertCss,
} from "../utils/common.ts";

export async function addComponent(componentName: string, targetPath: string) {
  const packageRoot = getPackageRoot();

  const registryDir = path.join(packageRoot, "packages", "registry");

  const state = loadState(targetPath);
  const config = getProjectConfig(targetPath);

  checkPeerDeps(targetPath);

  const registry = loadRegistry(packageRoot);

  if (!registry[componentName]) {
    throw new Error(`Component not found: ${componentName}`);
  }

  const graph = buildGraph(registry);
  const order = resolveDependencies(graph, componentName);

  console.log(`📦 Install order: ${order.join(" → ")}`);

  const pkgPath = path.join(targetPath, "package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  const installedDeps = { ...pkg.dependencies, ...pkg.devDependencies };

  for (const name of order) {
    const meta = registry[name];
    const installed = state.components[name];

    if (installed?.version === meta.version) {
      console.log(`✔ ${name} already up to date`);
      continue;
    }

    console.log(`📦 Installing ${name}...`);

    const missing =
      meta.npmDependencies?.filter((d: string) => !installedDeps[d]) ?? [];

    if (missing.length > 0) {
      execSync(`npm install ${missing.join(" ")}`, {
        cwd: targetPath,
        stdio: "inherit",
      });
    }

    for (const file of meta.files) {
      if (!file.path) {
        throw new Error(`Invalid file.path in ${name}`);
      }

      const src = path.join(registryDir, file.path);

      const base =
        file.type === "registry:ui" ? config.components : config.utils;

      if (!base) {
        console.error("❌ Missing base path in config");
        console.log(config);
        process.exit(1);
      }

      const destDir = path.join(targetPath, base, name);
      fs.mkdirSync(destDir, { recursive: true });

      const dest = path.join(destDir, file.name);

      if (!fs.existsSync(dest)) {
        fs.copyFileSync(src, dest);
      }
    }

    /* =========================
       CSS INJECTION
    ========================= */
    if (meta.cssFile) {
      const cssSrc = path.join(registryDir, meta.cssFile);
      const styleFile = path.join(targetPath, config.styles);

      if (!fs.existsSync(cssSrc)) {
        console.warn(`⚠ CSS file not found: ${meta.cssFile}`);
      } else {
        const css = fs.readFileSync(cssSrc, "utf-8");
        upsertCss(styleFile, name, css);
      }
    }

    state.components[name] = {
      path: `src/components/ui/${name}`,
      installedAt: new Date().toISOString(),
      version: meta.version ?? "1.0.0",
      css: {
        file: meta.cssFile,
        start: `/* lumina:start:${name} */`,
        end: `/* lumina:end:${name} */`,
      },
    };
  }

  saveState(targetPath, state);

  console.log(`\n✅ ${componentName} processed successfully`);
}
