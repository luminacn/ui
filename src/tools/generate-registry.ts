import fs from "fs";
import path from "path";

const registryRoot = path.resolve("src/packages/registry");
const dictionaryRoot = path.resolve("src/packages/dictionary");

/* =========================
   UTIL: READ FILES RECURSIVELY
========================= */
function getAllFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...getAllFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

function normalizeNpmImport(imp: string): string {
  // scoped packages like @angular/cdk/overlay → @angular/cdk
  if (imp.startsWith("@")) {
    const parts = imp.split("/");

    // @scope/package/subpath → @scope/package
    return parts.length > 2 ? `${parts[0]}/${parts[1]}` : imp;
  }

  return imp;
}

/* =========================
   EXTRACT IMPORTS
========================= */
function extractImports(fileContent: string): string[] {
  const imports: string[] = [];
  const importRegex = /import\s+(?:[^'"]+from\s+)?["']([^"']+)["']/g;

  let match;

  while ((match = importRegex.exec(fileContent)) !== null) {
    imports.push(match[1]);
  }

  return imports;
}

/* =========================
   CLASSIFY IMPORTS
========================= */
function classifyImports(
  imports: string[],
  currentComponent: string,
  knownComponents: Set<string>,
) {
  const npmDependencies = new Set<string>();
  const requires = new Set<string>();

  for (const imp of imports) {
    // ignore internal helpers
    if (imp === "cn" || imp === "cva") continue;

    // ignore css imports (just in case)
    if (imp.endsWith(".css")) continue;

    // ignore local file imports
    if (imp.endsWith(".ts") || imp.endsWith(".tsx")) continue;

    // external npm dependency
    if (!imp.startsWith(".") && !imp.startsWith("/")) {
      const normalized = normalizeNpmImport(imp);
      npmDependencies.add(normalized);
      continue;
    }

    // internal component dependency
    const parts = imp.split("/");
    const maybeComponent = parts[parts.length - 1];

    if (
      maybeComponent &&
      maybeComponent !== currentComponent &&
      knownComponents.has(maybeComponent)
    ) {
      requires.add(maybeComponent);
    }
  }

  return {
    npmDependencies: [...npmDependencies],
    requires: [...requires],
  };
}

/* =========================
   CSS DETECTION
========================= */
function detectCss(componentPath: string, componentName: string) {
  const cssPath = path.join(componentPath, `${componentName}.css`);

  if (fs.existsSync(cssPath)) {
    return `${componentName}.css`;
  }

  return undefined;
}

/* =========================
   BUILD COMPONENT METADATA
========================= */
function buildComponent(componentName: string) {
  const componentPath = path.join(registryRoot, componentName);

  const files = getAllFiles(componentPath);

  const fileEntries: any[] = [];
  const allImports: string[] = [];

  for (const file of files) {
    const ext = path.extname(file);

    // ❌ SKIP CSS FILES (handled separately)
    if (ext === ".css") continue;

    const content = fs.readFileSync(file, "utf-8");

    const imports = extractImports(content);
    allImports.push(...imports);

    fileEntries.push({
      name: path.basename(file),
      path: path.relative(registryRoot, file).replace(/\\/g, "/"),
      type: "registry:ui",
    });
  }

  const componentNames = new Set(fs.readdirSync(registryRoot));

  const { npmDependencies, requires } = classifyImports(
    allImports,
    componentName,
    componentNames,
  );

  const cssFile = detectCss(componentPath, componentName);

  return {
    name: componentName,
    version: "2.0.0",
    requires,
    npmDependencies,
    cssFile, // ✅ NEW FIELD
    files: fileEntries,
  };
}

/* =========================
   MAIN GENERATOR
========================= */
function generateRegistry() {
  const components = fs.readdirSync(registryRoot);

  if (!fs.existsSync(dictionaryRoot)) {
    fs.mkdirSync(dictionaryRoot, { recursive: true });
  }

  for (const component of components) {
    const fullPath = path.join(registryRoot, component);

    if (!fs.statSync(fullPath).isDirectory()) continue;

    const manifest = buildComponent(component);

    const outputPath = path.join(dictionaryRoot, `${component}.json`);

    fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));

    console.log(`✔ Generated ${component}.json`);
  }

  console.log("\n🚀 Registry generation complete");
}

generateRegistry();
