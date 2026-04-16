# Togglegroup

---

## Installation

Run the following command in your terminal:

| Manager  | Command                                    |
| :------- | :----------------------------------------- |
| **npm**  | `npx luminacn@latest add togglegroup`      |
| **pnpm** | `pnpx luminacn@latest add togglegroup`     |
| **yarn** | `yarn dlx luminacn@latest add togglegroup` |
| **bun**  | `bunx luminacn@latest add togglegroup`     |

---

## Usage

```tsx
import { Component } from "@angular/core";
import { LuminaToggleGroupDirective, LuminaToggleItemDirective } from "../components/ui/togglegroup"

@Component({
  standalone: true,
  imports: [LuminaToggleGroupDirective, LuminaToggleItemDirective],
  template: \`
    <div lmToggleGroup>
        <button lmToggleItem>...</button>
    </div>
  \`
})
export class DemoTogglegroupComponent {}
```
