# Spinner

---

## Installation

Run the following command in your terminal:

| Manager  | Command                                |
| :------- | :------------------------------------- |
| **npm**  | `npx luminacn@latest add spinner`      |
| **pnpm** | `pnpx luminacn@latest add spinner`     |
| **yarn** | `yarn dlx luminacn@latest add spinner` |
| **bun**  | `bunx luminacn@latest add spinner`     |

---

## Usage

```tsx
import { Component } from "@angular/core";
import { LuminaSpinnerComponent } from "../components/ui/spinner"

@Component({
  standalone: true,
  imports: [LuminaSpinnerComponent],
  template: \`
    <lm-spinner>
    </lm-spinner>
  \`
})
export class DemoSpinnerComponent {}
```
