# Separator

A visual divider used to separate content sections.

---

## Installation

Run the following command in your terminal:

| Manager | Command |
| :--- | :--- |
| **npm** | `npx luminacn@latest add separator` |
| **pnpm** | `pnpx luminacn@latest add separator` |
| **yarn** | `yarn dlx luminacn@latest add separator` |
| **bun** | `bunx luminacn@latest add separator` |

---

## Usage

```tsx
import { Component } from "@angular/core";
import { LuminaSeparatorDirective } from "../components/ui/separator";

@Component({
  standalone: true,
  imports: [LuminaSeparatorDirective],
  template: \` <div lmSeparator></div> \`,
})
export class DemoSeparatorComponent {}
```

---

## Composition

This component follows a **composition pattern**, where you combine smaller primitives:

```text
Separator
├── separator.ts
└── separator.types
```

---

---

## Required Context

_This component is standalone and requires no specific parent providers._

---

---

## Variants

_No variants defined_

---

## API Reference

Refer to the individual source files in your registry for full API details.
