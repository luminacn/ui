# Switch

---

## Installation

Run the following command in your terminal:

| Manager  | Command                               |
| :------- | :------------------------------------ |
| **npm**  | `npx luminacn@latest add switch`      |
| **pnpm** | `pnpx luminacn@latest add switch`     |
| **yarn** | `yarn dlx luminacn@latest add switch` |
| **bun**  | `bunx luminacn@latest add switch`     |

---

## Usage

```tsx
import { Component } from "@angular/core";
import { LuminaSwitchComponent } from "../components/ui/switch"

@Component({
  standalone: true,
  imports: [LuminaSwitchComponent],
  template: \`
    <lm-switch>
    </lm-switch>
  \`
})
export class DemoSwitchComponent {}
```
