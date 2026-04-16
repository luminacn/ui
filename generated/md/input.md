# Input

---

## Installation

Run the following command in your terminal:

| Manager  | Command                              |
| :------- | :----------------------------------- |
| **npm**  | `npx luminacn@latest add input`      |
| **pnpm** | `pnpx luminacn@latest add input`     |
| **yarn** | `yarn dlx luminacn@latest add input` |
| **bun**  | `bunx luminacn@latest add input`     |

---

## Usage

```tsx
import { Component } from "@angular/core";
import { LuminaInputGroupComponent, LuminaInputIconDirective, LuminaInputDirective } from "../components/ui/input"

@Component({
  standalone: true,
  imports: [LuminaInputGroupComponent, LuminaInputIconDirective, LuminaInputDirective],
  template: \`
    <lm-input-group>
        <div lmInputIcon>...</div>
        <input lmInput>...</input>
    </lm-input-group>
  \`
})
export class DemoInputComponent {}
```
