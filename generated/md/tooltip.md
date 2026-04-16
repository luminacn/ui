# Tooltip

---

## Installation

Run the following command in your terminal:

| Manager  | Command                                |
| :------- | :------------------------------------- |
| **npm**  | `npx luminacn@latest add tooltip`      |
| **pnpm** | `pnpx luminacn@latest add tooltip`     |
| **yarn** | `yarn dlx luminacn@latest add tooltip` |
| **bun**  | `bunx luminacn@latest add tooltip`     |

---

## Usage

```tsx
import { Component } from "@angular/core";
import { LuminaTooltipComponent, LuminaTooltipDirective } from "../components/ui/tooltip"

@Component({
  standalone: true,
  imports: [LuminaTooltipComponent, LuminaTooltipDirective],
  template: \`
    <lm-tooltip>
        <div lmTooltip>...</div>
    </lm-tooltip>
  \`
})
export class DemoTooltipComponent {}
```
