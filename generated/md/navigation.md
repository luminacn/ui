# Navigation

---

## Installation

Run the following command in your terminal:

| Manager  | Command                                   |
| :------- | :---------------------------------------- |
| **npm**  | `npx luminacn@latest add navigation`      |
| **pnpm** | `pnpx luminacn@latest add navigation`     |
| **yarn** | `yarn dlx luminacn@latest add navigation` |
| **bun**  | `bunx luminacn@latest add navigation`     |

---

## Usage

```tsx
import { Component } from "@angular/core";
import { LuminaNavigationMenuTriggerDirective, LuminaNavigationMenuViewportComponent, LuminaNavigationMenuDirective } from "../components/ui/navigation"

@Component({
  standalone: true,
  imports: [LuminaNavigationMenuTriggerDirective, LuminaNavigationMenuViewportComponent, LuminaNavigationMenuDirective],
  template: \`
    <div lmNavigationMenu>
        <div lmNavigationMenuTrigger>...</div>
        <lm-navigation-menu-viewport>...</lm-navigation-menu-viewport>
    </div>
  \`
})
export class DemoNavigationComponent {}
```
