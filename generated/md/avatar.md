# Avatar

---

## Installation

Run the following command in your terminal:

| Manager  | Command                               |
| :------- | :------------------------------------ |
| **npm**  | `npx luminacn@latest add avatar`      |
| **pnpm** | `pnpx luminacn@latest add avatar`     |
| **yarn** | `yarn dlx luminacn@latest add avatar` |
| **bun**  | `bunx luminacn@latest add avatar`     |

---

## Usage

```tsx
import { Component } from "@angular/core";
import { LuminaAvatarComponent, LuminaAvatarImageDirective } from "../components/ui/avatar"

@Component({
  standalone: true,
  imports: [LuminaAvatarComponent, LuminaAvatarImageDirective],
  template: \`
    <lm-avatar>
        <img lmAvatarImage>...</img>
    </lm-avatar>
  \`
})
export class DemoAvatarComponent {}
```
