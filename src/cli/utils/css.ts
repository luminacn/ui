import fs from "fs";
import path from "path";

export function rebuildCss(
  state: any,
  registry: any,
  registryDir: string,
  styleFile: string,
) {
  let output = "";

  for (const name of Object.keys(state.components)) {
    const meta = registry[name];

    if (!meta?.cssFile) continue;

    const cssPath = path.join(registryDir, meta.cssFile);

    if (!fs.existsSync(cssPath)) continue;

    const css = fs.readFileSync(cssPath, "utf-8");

    output += `
/* lumina:start:${name} */
${css}
/* lumina:end:${name} */
`;
  }

  fs.writeFileSync(styleFile, output.trim());
}
