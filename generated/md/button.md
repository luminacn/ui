# Button

---

## Installation

Run the following command in your terminal:

| Manager  | Command                               |
| :------- | :------------------------------------ |
| **npm**  | `npx luminacn@latest add button`      |
| **pnpm** | `pnpx luminacn@latest add button`     |
| **yarn** | `yarn dlx luminacn@latest add button` |
| **bun**  | `bunx luminacn@latest add button`     |

---

## Usage

```tsx
import { Component } from "@angular/core";
import { LuminaButtonDirective } from "../components/ui/button"

@Component({
  standalone: true,
  imports: [LuminaButtonDirective],
  template: \`
    <button lmButton>
    </button>
  \`
})
export class DemoButtonComponent {}
```
