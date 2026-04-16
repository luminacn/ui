# Collapsible

---

## Installation

Run the following command in your terminal:

| Manager  | Command                                    |
| :------- | :----------------------------------------- |
| **npm**  | `npx luminacn@latest add collapsible`      |
| **pnpm** | `pnpx luminacn@latest add collapsible`     |
| **yarn** | `yarn dlx luminacn@latest add collapsible` |
| **bun**  | `bunx luminacn@latest add collapsible`     |

---

## Usage

```tsx
import { Component } from "@angular/core";
import { LuminaCollapsibleDirective } from "../components/ui/collapsible"

@Component({
  standalone: true,
  imports: [LuminaCollapsibleDirective],
  template: \`
    <div lmCollapsible>
    </div>
  \`
})
export class DemoCollapsibleComponent {}
```
