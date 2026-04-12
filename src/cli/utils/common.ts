import fs from "fs";
import path from "path";
import readline from "readline";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

/* =========================
   PATH RESOLUTION
========================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getPackageRoot() {
  const distPath = path.resolve(__dirname, "..", "..");
  if (fs.existsSync(path.join(distPath, "packages"))) return distPath;

  const devPath = path.resolve(__dirname, "..", "..", "..");
  if (fs.existsSync(path.join(devPath, "packages"))) return devPath;

  return path.resolve(__dirname, "..", "..", "..", "..");
}

/* =========================
   PROJECT CONFIG
========================= */
export function getProjectConfig(targetPath: string) {
  const configPath = path.join(targetPath, "lumina.json");

  if (fs.existsSync(configPath)) {
    const parsed = JSON.parse(fs.readFileSync(configPath, "utf-8"));

    return {
      components: parsed.aliases?.components ?? "src/app/components/ui",
      utils: parsed.aliases?.utils ?? "src/app/lib",
      styles: parsed.aliases?.styles ?? "src/styles.css",
    };
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
export function loadState(targetPath: string) {
  const file = path.join(targetPath, "lumina.json");

  if (!fs.existsSync(file)) {
    return { components: {} };
  }

  const parsed = JSON.parse(fs.readFileSync(file, "utf-8"));

  if (!parsed.components) {
    parsed.components = {};
  }

  return parsed;
}

export function saveState(targetPath: string, state: any) {
  const file = path.join(targetPath, "lumina.json");
  fs.writeFileSync(file, JSON.stringify(state, null, 2));
}

/* =========================
   REGISTRY
========================= */
export function loadRegistry(packageRoot: string) {
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
   PEER DEPS
========================= */
export function checkPeerDeps(root: string) {
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
   DEP GRAPH
========================= */
export function buildGraph(registry: Record<string, any>) {
  const graph: Record<string, string[]> = {};

  for (const name in registry) {
    graph[name] = registry[name].requires ?? [];
  }

  return graph;
}

export function resolveDependencies(
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
   PROMPT
========================= */
export function ask(question: string): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(`${question} (y/n): `, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === "y");
    });
  });
}

export function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function upsertCss(styleFile: string, name: string, css: string) {
  const start = `/* lumina:start:${name} */`;
  const end = `/* lumina:end:${name} */`;

  let content = fs.existsSync(styleFile)
    ? fs.readFileSync(styleFile, "utf-8")
    : "";

  const blockRegex = new RegExp(
    `/\\* lumina:start:${name} \\*/[\\s\\S]*?/\\* lumina:end:${name} \\*/`,
    "g",
  );

  const newBlock = `${start}\n${css}\n${end}`;

  // replace if exists
  if (content.includes(start)) {
    content = content.replace(blockRegex, newBlock);
  } else {
    content += `\n\n${newBlock}\n`;
  }

  fs.writeFileSync(styleFile, content.trim());
}
