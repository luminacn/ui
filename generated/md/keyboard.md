# Keyboard

---

## Installation

Run the following command in your terminal:

| Manager  | Command                                 |
| :------- | :-------------------------------------- |
| **npm**  | `npx luminacn@latest add keyboard`      |
| **pnpm** | `pnpx luminacn@latest add keyboard`     |
| **yarn** | `yarn dlx luminacn@latest add keyboard` |
| **bun**  | `bunx luminacn@latest add keyboard`     |

---

## Usage

```tsx
import { Component } from "@angular/core";
import { LuminaKbdDirective } from "../components/ui/keyboard"

@Component({
  standalone: true,
  imports: [LuminaKbdDirective],
  template: \`
    <kbd lmKbd>
    </kbd>
  \`
})
export class DemoKeyboardComponent {}
```
