# Badge

---

## Installation

Run the following command in your terminal:

| Manager  | Command                              |
| :------- | :----------------------------------- |
| **npm**  | `npx luminacn@latest add badge`      |
| **pnpm** | `pnpx luminacn@latest add badge`     |
| **yarn** | `yarn dlx luminacn@latest add badge` |
| **bun**  | `bunx luminacn@latest add badge`     |

---

## Usage

```tsx
import { Component } from "@angular/core";
import { LuminaBadgeDirective } from "../components/ui/badge"

@Component({
  standalone: true,
  imports: [LuminaBadgeDirective],
  template: \`
    <div lmBadge>
    </div>
  \`
})
export class DemoBadgeComponent {}
```
