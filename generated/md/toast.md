# Toast

A transient notification that appears temporarily on the screen.

---

## Installation

Run the following command in your terminal:

| Manager | Command |
| :--- | :--- |
| **npm** | `npx luminacn@latest add toast` |
| **pnpm** | `pnpx luminacn@latest add toast` |
| **yarn** | `yarn dlx luminacn@latest add toast` |
| **bun** | `bunx luminacn@latest add toast` |

---

## Usage

```tsx
import { Component } from "@angular/core";
import {
  LuminaToasterComponent,
  LuminaToastComponent,
  LuminaToastService,
} from "../components/ui/toast";

@Component({
  standalone: true,
  imports: [LuminaToasterComponent, LuminaToastComponent, LuminaToastService],
  template: \`
    <lm-toaster>
      <lm-toast>...</lm-toast>
    </lm-toaster>
  \`,
})
export class DemoToastComponent {}
```

---

## Composition

This component follows a **composition pattern**, where you combine smaller primitives:

```text
Toast
├── toast-toaster.ts
├── toast.ts
├── toast.service
└── toast.variants
```

---

---

## Required Context

- **LuminaToasterComponent**: Must be used within a `lm-toaster` that provides `LuminaToastService`.
- **LuminaToastComponent**: Must be used within a `lm-toast` that provides `LuminaToastService`.

---

---

## Variants

- `variant`
- `default`
- `destructive`
- `success`
- `dark`

---

---

## API Reference

Refer to the individual source files in your registry for full API details.
