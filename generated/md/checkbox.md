# Checkbox

---

## Installation

Run the following command in your terminal:

| Manager  | Command                                 |
| :------- | :-------------------------------------- |
| **npm**  | `npx luminacn@latest add checkbox`      |
| **pnpm** | `pnpx luminacn@latest add checkbox`     |
| **yarn** | `yarn dlx luminacn@latest add checkbox` |
| **bun**  | `bunx luminacn@latest add checkbox`     |

---

## Usage

```tsx
import { Component } from "@angular/core";
import { LuminaCheckboxComponent } from "../components/ui/checkbox"

@Component({
  standalone: true,
  imports: [LuminaCheckboxComponent],
  template: \`
    <lm-checkbox>
    </lm-checkbox>
  \`
})
export class DemoCheckboxComponent {}
```
