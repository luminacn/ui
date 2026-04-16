# Separator

---

## Installation

Run the following command in your terminal:

| Manager  | Command                                  |
| :------- | :--------------------------------------- |
| **npm**  | `npx luminacn@latest add separator`      |
| **pnpm** | `pnpx luminacn@latest add separator`     |
| **yarn** | `yarn dlx luminacn@latest add separator` |
| **bun**  | `bunx luminacn@latest add separator`     |

---

## Usage

```tsx
import { Component } from "@angular/core";
import { LuminaSeparatorDirective } from "../components/ui/separator"

@Component({
  standalone: true,
  imports: [LuminaSeparatorDirective],
  template: \`
    <div lmSeparator>
    </div>
  \`
})
export class DemoSeparatorComponent {}
```
