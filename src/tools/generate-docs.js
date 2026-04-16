import fs from "fs";
import path from "path";

const REGISTRY_DIR = path.resolve("src/packages/registry");
const DICT_DIR = path.resolve("src/packages/dictionary");
const OUTPUT_DIR = path.resolve("docs");

const DESCRIPTIONS = {
  accordion:
    "A vertically stacked set of interactive headings that reveal or hide content.",
  alert:
    "Displays important messages with contextual styling for feedback and status.",
  avatar:
    "An image element with fallback support for representing users or entities.",
  badge:
    "A small status descriptor for labeling, categorizing, or highlighting metadata.",
  breadcrumb:
    "Displays the current page’s location within a navigational hierarchy.",
  button: "Triggers actions or events with multiple variants and states.",
  card: "A flexible container for grouping related content and actions.",
  checkbox:
    "A control that allows users to toggle between checked and unchecked states.",
  collapsible: "Expands and collapses content with smooth transitions.",
  combobox: "An input with a dropdown list for selecting or filtering options.",
  "context-menu":
    "A menu that appears on right-click or interaction with contextual actions.",
  "date-picker": "A component for selecting single dates or date ranges.",
  dialog: "A modal overlay that captures user attention for critical tasks.",
  "dropdown-menu":
    "Displays a list of actions or options triggered by a button.",
  "infinite-scroll":
    "Loads more content as the user scrolls, enabling seamless data fetching.",
  "input-otp":
    "A specialized input for entering one-time passwords or verification codes.",
  input: "A basic text field for user input with flexible styling.",
  keyboard:
    "Displays keyboard shortcuts and key combinations in a readable format.",
  label: "Associates descriptive text with form controls for accessibility.",
  layout: "Utility components for structuring and organizing page layouts.",
  navigation:
    "Components for building menus, navbars, and structured navigation flows.",
  popover: "Displays floating content anchored to a trigger element.",
  progress: "Visual indicator of task completion or loading progress.",
  radio: "A set of options where only one can be selected at a time.",
  scrollarea: "A customizable scrollable container with enhanced styling.",
  separator: "A visual divider used to separate content sections.",
  sheet: "A side or bottom panel that slides into view for secondary content.",
  skeleton: "Placeholder UI that mimics content while loading.",
  slider: "An interactive control for selecting values from a range.",
  spinner: "A loading indicator used to represent ongoing processes.",
  stepper: "Displays progress through a sequence of steps.",
  switch: "A toggle control for switching between two states.",
  tabs: "Organizes content into multiple panels with selectable triggers.",
  textarea: "A multi-line text input field.",
  toast: "A transient notification that appears temporarily on the screen.",
  togglegroup: "A group of toggle buttons with single or multiple selection.",
  tooltip: "Displays contextual information on hover or focus.",
  typography: "Predefined styles for consistent text rendering across the UI.",
};

function getExportedClassName(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const match = content.match(/export\s+(?:class|component|directive)\s+(\w+)/);
  return match ? match[1] : null;
}

function getDecoratorType(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  if (content.includes("@Component")) return "Component";
  if (content.includes("@Directive")) return "Directive";
  return null;
}

function getVariants(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const match = content.match(/variants:\s*{[\s\S]*?}/);
  if (!match) return [];
  const keys = [...match[0].matchAll(/(\w+):/g)];
  return [...new Set(keys.map((m) => m[1]).filter((k) => k !== "variants"))];
}

function getInjectedServices(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const matches = [...content.matchAll(/inject\(([^)]+)\)/g)];
  return [...new Set(matches.map((m) => m[1]))];
}

function getSelector(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const match = content.match(/selector\s*:\s*['"`]([^'"`]+)['"`]/);
  return match ? match[1] : null;
}

function buildTemplate(fileData) {
  const components = fileData.filter((f) => f.selector !== null);
  const root = components.find((f) => f.injected.length === 0) || components[0];
  if (!root) return "";

  const children = components.filter((f) => f !== root);
  const indent = "    ";

  // Robust selector parser
  const resolveSelector = (sel) => {
    const firstOption = sel.split(",")[0].trim();
    // Capture tags with hyphens or standard elements
    const tagMatch = firstOption.match(/^([a-zA-Z0-9-]+)/);
    // Capture attributes inside brackets [attr]
    const attrMatch = firstOption.match(/\[(.*?)\]/);

    return {
      tag: tagMatch ? tagMatch[1] : "div",
      attr: attrMatch ? attrMatch[1] : "",
    };
  };

  const rootParsed = resolveSelector(root.selector);
  let template = `<${rootParsed.tag}${rootParsed.attr ? " " + rootParsed.attr : ""}>\n`;

  children.forEach((child) => {
    const parsed = resolveSelector(child.selector);
    const attrStr = parsed.attr ? " " + parsed.attr : "";
    // If it's a component tag (like lm-input), use it.
    // If it's just an attribute, use a standard tag (div/button)
    const tagName = parsed.tag === "div" && parsed.attr ? "div" : parsed.tag;
    template += `${indent}<${tagName}${attrStr}>...</${tagName}>\n`;
  });

  template += `</${rootParsed.tag}>`;
  return template;
}

function generateMDX(name) {
  const dictPath = path.join(DICT_DIR, `${name}.json`);
  if (!fs.existsSync(dictPath)) return null;

  const dict = JSON.parse(fs.readFileSync(dictPath, "utf-8"));
  const title = dict.name.charAt(0).toUpperCase() + dict.name.slice(1);
  const description = DESCRIPTIONS[name] || "A Lumina component.";

  const fileData = dict.files.map((f) => {
    const fullPath = path.join(REGISTRY_DIR, f.path);
    return {
      name: f.name,
      className: getExportedClassName(fullPath),
      injected: getInjectedServices(fullPath),
      selector: getSelector(fullPath),
      decorator: getDecoratorType(fullPath),
      variants: f.name.includes(".variants") ? getVariants(fullPath) : [],
    };
  });

  const imports = fileData.map((f) => f.className).filter(Boolean);
  const allVariants = [...new Set(fileData.flatMap((f) => f.variants))];

  // Build the template string cleanly
  let mdx = `# ${title}\n\n${description}\n\n---\n\n`;

  mdx += `## Installation\n\nRun the following command in your terminal:\n\n| Manager | Command |\n| :--- | :--- |\n| **npm** | \`npx luminacn@latest add ${name}\` |\n| **pnpm** | \`pnpx luminacn@latest add ${name}\` |\n| **yarn** | \`yarn dlx luminacn@latest add ${name}\` |\n| **bun** | \`bunx luminacn@latest add ${name}\` |\n\n---\n\n`;

  mdx += `## Usage\n\n\`\`\`tsx\nimport { Component } from "@angular/core";\nimport { ${imports.join(", ")} } from "../components/ui/${name}"\n\n@Component({\n  standalone: true,\n  imports: [${imports.join(", ")}],\n  template: \`\n${buildTemplate(
    fileData,
  )
    .split("\n")
    .map((line) => "    " + line)
    .join(
      "\n",
    )}\n  \`\n})\nexport class Demo${name.charAt(0).toUpperCase() + name.slice(1)}Component {}\n\`\`\`\n\n---\n\n`;

  mdx += `## Composition\n\nThis component follows a **composition pattern**, where you combine smaller primitives:\n\n\`\`\`text\n${title}\n${dict.files.map((f, i) => (i === dict.files.length - 1 ? "└── " : "├── ") + f.name.replace(/\.(directive|component|ts)/, "")).join("\n")}\n\`\`\`\n\n---\n\n`;

  mdx += `## Required Context\n\n${
    fileData.filter((f) => f.injected.length > 0).length > 0
      ? fileData
          .filter((f) => f.injected.length > 0)
          .map(
            (f) =>
              `* **${f.className}**: Must be used within a \`${f.selector || "parent container"}\` that provides ${f.injected.map((s) => `\`${s}\``).join(" and ")}.`,
          )
          .join("\n")
      : "*This component is standalone and requires no specific parent providers.*"
  }\n\n`;

  if (allVariants.length > 0)
    mdx += `\n---\n\n## Variants\n\n${allVariants.map((v) => `- \`${v}\``).join("\n")}\n\n`;

  mdx += `---\n\n## API Reference\nRefer to the individual source files in your registry for full API details.`;

  return mdx;
}

function run() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.readdirSync(DICT_DIR).forEach((file) => {
    if (file.endsWith(".json")) {
      const mdx = generateMDX(file.replace(".json", ""));
      if (mdx)
        fs.writeFileSync(
          path.join(OUTPUT_DIR, `${file.replace(".json", ".mdx")}`),
          mdx,
        );
    }
  });
}

run();
