# Layout

---

## Installation

Run the following command in your terminal:

| Manager  | Command                               |
| :------- | :------------------------------------ |
| **npm**  | `npx luminacn@latest add layout`      |
| **pnpm** | `pnpx luminacn@latest add layout`     |
| **yarn** | `yarn dlx luminacn@latest add layout` |
| **bun**  | `bunx luminacn@latest add layout`     |

---

## Usage

```tsx
import { Component } from "@angular/core";
import { LuminaAspectRatioDirective, LuminaContainerDirective, LuminaSectionDirective } from "../components/ui/layout"

@Component({
  standalone: true,
  imports: [LuminaAspectRatioDirective, LuminaContainerDirective, LuminaSectionDirective],
  template: \`
    <div lmAspectRatio>
        <div lmContainer>...</div>
        <section lmSection>...</section>
    </div>
  \`
})
export class DemoLayoutComponent {}
```
