# Button

Triggers actions or events with multiple variants and states.

---

## Installation

Run the following command in your terminal:

| Manager | Command |
| :--- | :--- |
| **npm** | `npx luminacn@latest add button` |
| **pnpm** | `pnpx luminacn@latest add button` |
| **yarn** | `yarn dlx luminacn@latest add button` |
| **bun** | `bunx luminacn@latest add button` |

---

## Usage

```tsx
import { Component } from "@angular/core";
import { LuminaButtonDirective } from "../components/ui/button";

@Component({
  standalone: true,
  imports: [LuminaButtonDirective],
  template: \` <button lmButton></button> \`,
})
export class DemoButtonComponent {}
```

---

## Composition

This component follows a **composition pattern**, where you combine smaller primitives:

```text
Button
├── button.ts
├── button.types
└── button.variants
```

---

---

## Required Context

_This component is standalone and requires no specific parent providers._

---

---

## Variants

- `variant`
- `default`
- `hover`
- `destructive`
- `outline`
- `secondary`
- `ghost`
- `link`
- `plain`
- `active`

---

---

## API Reference

Refer to the individual source files in your registry for full API details.
