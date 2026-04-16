# Progress

---

## Installation

Run the following command in your terminal:

| Manager  | Command                                 |
| :------- | :-------------------------------------- |
| **npm**  | `npx luminacn@latest add progress`      |
| **pnpm** | `pnpx luminacn@latest add progress`     |
| **yarn** | `yarn dlx luminacn@latest add progress` |
| **bun**  | `bunx luminacn@latest add progress`     |

---

## Usage

```tsx
import { Component } from "@angular/core";
import { LuminaProgressComponent } from "../components/ui/progress"

@Component({
  standalone: true,
  imports: [LuminaProgressComponent],
  template: \`
    <lm-progress>
    </lm-progress>
  \`
})
export class DemoProgressComponent {}
```
