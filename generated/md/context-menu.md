# Context-menu

---

## Installation

Run the following command in your terminal:

| Manager  | Command                                     |
| :------- | :------------------------------------------ |
| **npm**  | `npx luminacn@latest add context-menu`      |
| **pnpm** | `pnpx luminacn@latest add context-menu`     |
| **yarn** | `yarn dlx luminacn@latest add context-menu` |
| **bun**  | `bunx luminacn@latest add context-menu`     |

---

## Usage

```tsx
import { Component } from "@angular/core";
import { LuminaContextMenuContentComponent, LuminaContextMenuItemDirective, LuminaContextMenuSeparatorDirective, LuminaContextMenuTriggerDirective } from "../components/ui/context-menu"

@Component({
  standalone: true,
  imports: [LuminaContextMenuContentComponent, LuminaContextMenuItemDirective, LuminaContextMenuSeparatorDirective, LuminaContextMenuTriggerDirective],
  template: \`
    <div lmContextMenuItem>
        <div lmContextMenuContent>...</div>
        <div lmContextMenuSeparator>...</div>
        <div lmContextMenuTrigger>...</div>
    </div>
  \`
})
export class DemoContext-menuComponent {}
```
