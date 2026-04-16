# Context-menu

A menu that appears on right-click or interaction with contextual actions.

---

## Installation

Run the following command in your terminal:

| Manager | Command |
| :--- | :--- |
| **npm** | `npx luminacn@latest add context-menu` |
| **pnpm** | `pnpx luminacn@latest add context-menu` |
| **yarn** | `yarn dlx luminacn@latest add context-menu` |
| **bun** | `bunx luminacn@latest add context-menu` |

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

---

## Composition

This component follows a **composition pattern**, where you combine smaller primitives:

```text
Context-menu
├── context-menu-content.ts
├── context-menu-item.ts
├── context-menu-item.variants
├── context-menu-separator.ts
├── context-menu-trigger.ts
└── context-menu.variants
```

---

---

## Required Context

- **LuminaContextMenuContentComponent**: Must be used within a `div[lmContextMenuContent]` that provides `ElementRef<HTMLElement>`.
- **LuminaContextMenuTriggerDirective**: Must be used within a `[lmContextMenuTrigger]` that provides `CdkContextMenuTrigger`.

---

---

## Variants

- `variant`
- `default`
- `hover`
- `focus`
- `active`
- `destructive`

---

---

## API Reference

Refer to the individual source files in your registry for full API details.
