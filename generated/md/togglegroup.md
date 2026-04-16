# Togglegroup

A group of toggle buttons with single or multiple selection.

---

## Installation

Run the following command in your terminal:

| Manager | Command |
| :--- | :--- |
| **npm** | `npx luminacn@latest add togglegroup` |
| **pnpm** | `pnpx luminacn@latest add togglegroup` |
| **yarn** | `yarn dlx luminacn@latest add togglegroup` |
| **bun** | `bunx luminacn@latest add togglegroup` |

---

## Usage

```tsx
import { Component } from "@angular/core";
import {
  LuminaToggleGroupDirective,
  LuminaToggleItemDirective,
} from "../components/ui/togglegroup";

@Component({
  standalone: true,
  imports: [LuminaToggleGroupDirective, LuminaToggleItemDirective],
  template: \`
    <div lmToggleGroup>
      <button lmToggleItem>...</button>
    </div>
  \`,
})
export class DemoTogglegroupComponent {}
```

---

## Composition

This component follows a **composition pattern**, where you combine smaller primitives:

```text
Togglegroup
├── toggle-group.ts
├── toggle-item.ts
└── toggle.variants
```

---

---

## Required Context

- **LuminaToggleItemDirective**: Must be used within a `button[lmToggleItem]` that provides `LuminaToggleGroupDirective`.

---

---

## Variants

- `variant`
- `default`
- `outline`
- `hover`

---

---

## API Reference

Refer to the individual source files in your registry for full API details.
