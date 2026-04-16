# Alert

---

## Installation

Run the following command in your terminal:

| Manager  | Command                              |
| :------- | :----------------------------------- |
| **npm**  | `npx luminacn@latest add alert`      |
| **pnpm** | `pnpx luminacn@latest add alert`     |
| **yarn** | `yarn dlx luminacn@latest add alert` |
| **bun**  | `bunx luminacn@latest add alert`     |

---

## Usage

```tsx
import { Component } from "@angular/core";
import { LuminaAlertDirective } from "../components/ui/alert"

@Component({
  standalone: true,
  imports: [LuminaAlertDirective],
  template: \`
    <div lmAlert>
    </div>
  \`
})
export class DemoAlertComponent {}
```
