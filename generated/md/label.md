# Label

---

## Installation

Run the following command in your terminal:

| Manager  | Command                              |
| :------- | :----------------------------------- |
| **npm**  | `npx luminacn@latest add label`      |
| **pnpm** | `pnpx luminacn@latest add label`     |
| **yarn** | `yarn dlx luminacn@latest add label` |
| **bun**  | `bunx luminacn@latest add label`     |

---

## Usage

```tsx
import { Component } from "@angular/core";
import { LuminaLabelDirective } from "../components/ui/label"

@Component({
  standalone: true,
  imports: [LuminaLabelDirective],
  template: \`
    <label lmLabel>
    </label>
  \`
})
export class DemoLabelComponent {}
```
