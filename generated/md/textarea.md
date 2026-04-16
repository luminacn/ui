# Textarea

---

## Installation

Run the following command in your terminal:

| Manager  | Command                                 |
| :------- | :-------------------------------------- |
| **npm**  | `npx luminacn@latest add textarea`      |
| **pnpm** | `pnpx luminacn@latest add textarea`     |
| **yarn** | `yarn dlx luminacn@latest add textarea` |
| **bun**  | `bunx luminacn@latest add textarea`     |

---

## Usage

```tsx
import { Component } from "@angular/core";
import { LuminaTextareaDirective } from "../components/ui/textarea"

@Component({
  standalone: true,
  imports: [LuminaTextareaDirective],
  template: \`
    <textarea lmTextarea>
    </textarea>
  \`
})
export class DemoTextareaComponent {}
```
