# Toast

---

## Installation

Run the following command in your terminal:

| Manager  | Command                              |
| :------- | :----------------------------------- |
| **npm**  | `npx luminacn@latest add toast`      |
| **pnpm** | `pnpx luminacn@latest add toast`     |
| **yarn** | `yarn dlx luminacn@latest add toast` |
| **bun**  | `bunx luminacn@latest add toast`     |

---

## Usage

```tsx
import { Component } from "@angular/core";
import { LuminaToasterComponent, LuminaToastComponent, LuminaToastService } from "../components/ui/toast"

@Component({
  standalone: true,
  imports: [LuminaToasterComponent, LuminaToastComponent, LuminaToastService],
  template: \`
    <lm-toaster>
        <lm-toast>...</lm-toast>
    </lm-toaster>
  \`
})
export class DemoToastComponent {}
```
