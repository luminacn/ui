import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getPackageRoot() {
  const distPath = path.resolve(__dirname, "..", "..");
  if (fs.existsSync(path.join(distPath, "packages"))) return distPath;

  const devPath = path.resolve(__dirname, "..", "..", "..");
  if (fs.existsSync(path.join(devPath, "packages"))) return devPath;

  return path.resolve(__dirname, "..", "..", "..", "..");
}

const packageRoot = getPackageRoot();

/* =========================
   PEER DEPS
========================= */
function checkPeerDeps(root: string) {
  const pkgPath = path.join(root, "package.json");
  if (!fs.existsSync(pkgPath)) return;

  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };

  const required = ["clsx", "tailwind-merge"];
  const missing = required.filter((d) => !deps[d]);

  if (missing.length > 0) {
    console.log(`📦 Installing peer deps: ${missing.join(", ")}`);
    execSync(`npm install ${missing.join(" ")}`, {
      cwd: root,
      stdio: "inherit",
    });
  }
}

/* =========================
   PROJECT CONFIG
========================= */
function getProjectConfig(targetPath: string) {
  const configPath = path.join(targetPath, "lumina.json");

  if (fs.existsSync(configPath)) {
    return JSON.parse(fs.readFileSync(configPath, "utf-8"));
  }

  return {
    components: "src/app/components/ui",
    utils: "src/app/lib",
    styles: "src/styles.css",
  };
}

/* =========================
   STATE
========================= */
function loadState(targetPath: string) {
  const file = path.join(targetPath, "lumina.json");

  if (!fs.existsSync(file)) {
    return { components: {} };
  }

  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

function saveState(targetPath: string, state: any) {
  const file = path.join(targetPath, "lumina.json");
  fs.writeFileSync(file, JSON.stringify(state, null, 2));
}

/* =========================
   GRAPH BUILD
========================= */
function buildGraph(registry: Record<string, any>) {
  const graph: Record<string, string[]> = {};

  for (const name in registry) {
    graph[name] = registry[name].requires ?? [];
  }

  return graph;
}

/* =========================
   TOPO SORT
========================= */
function resolveDependencies(
  graph: Record<string, string[]>,
  root: string,
): string[] {
  const visited = new Set<string>();
  const visiting = new Set<string>();
  const order: string[] = [];

  function dfs(node: string) {
    if (visited.has(node)) return;

    if (visiting.has(node)) {
      throw new Error(`Circular dependency detected: ${node}`);
    }

    visiting.add(node);

    for (const dep of graph[node] ?? []) {
      dfs(dep);
    }

    visiting.delete(node);
    visited.add(node);
    order.push(node);
  }

  dfs(root);

  return order;
}

/* =========================
   MAIN ADD FUNCTION
========================= */
export async function addComponent(componentName: string, targetPath: string) {
  const registryPath = path.join(packageRoot, "packages", "dictionary");
  const registryDir = path.join(packageRoot, "packages", "registry");

  const state = loadState(targetPath);
  const config = getProjectConfig(targetPath);

  checkPeerDeps(targetPath);

  /* =========================
     LOAD REGISTRY
  ========================= */
  const registryFiles = fs.readdirSync(registryPath);

  const registry: Record<string, any> = {};

  for (const file of registryFiles) {
    const meta = JSON.parse(
      fs.readFileSync(path.join(registryPath, file), "utf-8"),
    );

    registry[meta.name] = meta;
  }

  if (!registry[componentName]) {
    throw new Error(`Component not found: ${componentName}`);
  }

  /* =========================
     RESOLVE ORDER
  ========================= */
  const graph = buildGraph(registry);
  const order = resolveDependencies(graph, componentName);

  console.log(`📦 Install order: ${order.join(" → ")}`);

  const pkgPath = path.join(targetPath, "package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  const installedDeps = { ...pkg.dependencies, ...pkg.devDependencies };

  /* =========================
     INSTALL LOOP
  ========================= */
  for (const name of order) {
    const meta = registry[name];

    const installed = state.components[name];

    /* =========================
       VERSION CHECK
    ========================= */
    if (installed) {
      const installedVersion = installed.version ?? "0.0.0";
      const latestVersion = meta.version ?? "1.0.0";

      if (installedVersion === latestVersion) {
        console.log(`✔ ${name} already up to date`);
        continue;
      }

      console.log(
        `⬆ ${name} upgrade detected (${installedVersion} → ${latestVersion})`,
      );
    } else {
      console.log(`📦 Installing ${name}...`);
    }

    /* =========================
       NPM DEPS
    ========================= */
    const missingNpm =
      meta.npmDependencies?.filter((d: string) => !installedDeps[d]) ?? [];

    if (missingNpm.length > 0) {
      console.log(`📦 npm install: ${missingNpm.join(", ")}`);

      execSync(`npm install ${missingNpm.join(" ")}`, {
        cwd: targetPath,
        stdio: "inherit",
      });
    }

    /* =========================
       COPY FILES
    ========================= */
    for (const file of meta.files) {
      const src = path.join(registryDir, file.path);

      const base =
        file.type === "registry:ui" ? config.components : config.utils;

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

      if (fs.existsSync(cssSrc) && fs.existsSync(styleFile)) {
        const css = fs.readFileSync(cssSrc, "utf-8");
        const marker = `/* ${name} */`;

        const current = fs.readFileSync(styleFile, "utf-8");

        if (!current.includes(marker)) {
          fs.appendFileSync(styleFile, `\n${marker}\n${css}`);
        }
      }
    }

    /* =========================
       UPDATE STATE
    ========================= */
    state.components[name] = {
      path: `src/components/ui/${name}`,
      installedAt: new Date().toISOString(),
      version: meta.version ?? "1.0.0",
    };
  }

  /* =========================
     SAVE STATE
  ========================= */
  saveState(targetPath, state);

  console.log(`\n✅ ${componentName} processed successfully`);
}
