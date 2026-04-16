# Radio

---

## Installation

Run the following command in your terminal:

| Manager  | Command                              |
| :------- | :----------------------------------- |
| **npm**  | `npx luminacn@latest add radio`      |
| **pnpm** | `pnpx luminacn@latest add radio`     |
| **yarn** | `yarn dlx luminacn@latest add radio` |
| **bun**  | `bunx luminacn@latest add radio`     |

---

## Usage

```tsx
import { Component } from "@angular/core";
import { LuminaRadioItemDirective, LuminaRadioGroupComponent } from "../components/ui/radio"

@Component({
  standalone: true,
  imports: [LuminaRadioItemDirective, LuminaRadioGroupComponent],
  template: \`
    <lm-radio-group>
        <div lmRadioItem>...</div>
    </lm-radio-group>
  \`
})
export class DemoRadioComponent {}
```
