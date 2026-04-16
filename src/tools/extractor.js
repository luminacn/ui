import fs from "fs";
import path from "path";

// ===== CONFIG =====
const DOCS_DIR = path.join(process.cwd(), "docs");
const OUT_MD = path.join(process.cwd(), "generated/md");
const OUT_COMPONENTS = path.join(process.cwd(), "generated/components");

fs.mkdirSync(OUT_MD, { recursive: true });
fs.mkdirSync(OUT_COMPONENTS, { recursive: true });

// ===== HELPERS =====
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function escapeBackticks(str = "") {
  return str.replace(/`/g, "\\`");
}

// ===== EXTRACT USAGE =====
function extractUsage(md) {
  const match = md.match(/```tsx\s*([\s\S]*?)```/);
  if (!match) return null;

  const rawUsage = match[1];

  const importsMatch = rawUsage.match(/imports:\s*\[([\s\S]*?)\]/);
  const templateMatch = rawUsage.match(/template:\s*`([\s\S]*?)`/);

  const imports = importsMatch
    ? importsMatch[1]
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean)
    : [];

  const template = templateMatch ? templateMatch[1].trim() : "";

  return {
    imports,
    template,
    rawUsage: rawUsage.trim(),
  };
}

function stripTitle(md) {
  return md.replace(/^#\s.+\n/, "").trim();
}

// ===== EXTRACT META =====
function extractMeta(md) {
  const titleMatch = md.match(/^#\s(.+)/m);

  const title = titleMatch ? titleMatch[1].trim() : "Component";

  const clean = stripTitle(md);

  const descriptionBlock = clean.split("\n##")[0]?.trim() || "";

  const description = descriptionBlock.replace(/^---\s*/gm, "").trim();

  return {
    title,
    description,
  };
}

// ===== EXTRACT SECTIONS (NEW) =====
function extractSection(md, heading) {
  const regex = new RegExp(`##\\s${heading}\\s*([\\s\\S]*?)(?=\\n##\\s|$)`);

  const match = md.match(regex);
  return match ? match[1].trim() : "";
}

function extractSections(md) {
  const clean = stripTitle(md);

  return {
    composition: extractSection(clean, "Composition"),
    requiredContext: extractSection(clean, "Required Context"),
    variants: extractSection(clean, "Variants"),
    api: extractSection(clean, "API Reference"),
  };
}

// ===== COMPONENT GENERATOR =====
function generateComponent(name, data) {
  const className = `${capitalize(name)}Component`;

  return `
import { Component } from '@angular/core';
import { ${data.imports.join(", ")} } from '../components/ui/${name}';

@Component({
  standalone: true,
  imports: [${data.imports.join(", ")}],
  template: \`${data.template}\`
})
export class ${className} {}
`.trim();
}

// ===== MARKDOWN GENERATOR (UPDATED) =====
function generateMarkdown(name, meta, data, sections) {
  return `${meta.description}

---

## Installation

Run the following command in your terminal:

| Manager | Command |
| :--- | :--- |
| **npm** | \`npx luminacn@latest add ${name}\` |
| **pnpm** | \`pnpx luminacn@latest add ${name}\` |
| **yarn** | \`yarn dlx luminacn@latest add ${name}\` |
| **bun** | \`bunx luminacn@latest add ${name}\` |

---

## Usage

\`\`\`tsx
${escapeBackticks(data.rawUsage)}
\`\`\`

---

## Composition

${sections.composition || "_No composition defined_"}

---

## Required Context

${sections.requiredContext || "_No required context defined_"}

---

## Variants

${sections.variants || "_No variants defined_"}

---

## API Reference

${sections.api || "Refer to the individual source files in your registry for full API details."}
`;
}

// ===== MAIN =====
function run() {
  const files = fs.readdirSync(DOCS_DIR);

  console.log(`🚀 Processing ${files.length} files...\n`);

  for (const file of files) {
    if (!file.endsWith(".mdx")) continue;

    const filePath = path.join(DOCS_DIR, file);
    const content = fs.readFileSync(filePath, "utf-8");

    const name = path.basename(file, ".mdx");

    console.log(`📄 ${file}`);

    const usage = extractUsage(content);
    if (!usage) {
      console.log("⚠️ No usage found\n");
      continue;
    }

    const meta = extractMeta(content);
    const sections = extractSections(content);

    // ===== OUTPUT 1: COMPONENT =====
    const componentCode = generateComponent(name, usage);

    const componentPath = path.join(OUT_COMPONENTS, `${name}.component.ts`);

    fs.writeFileSync(componentPath, componentCode);

    // ===== OUTPUT 2: MARKDOWN =====
    const md = generateMarkdown(name, meta, usage, sections);

    const mdPath = path.join(OUT_MD, `${name}.md`);

    fs.writeFileSync(mdPath, md);

    console.log(`✅ Generated:
   - ${componentPath}
   - ${mdPath}`);
  }

  console.log("\n🎉 Done");
}

run();
