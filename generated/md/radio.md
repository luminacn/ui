# Radio

A set of options where only one can be selected at a time.

---

## Installation

Run the following command in your terminal:

| Manager | Command |
| :--- | :--- |
| **npm** | `npx luminacn@latest add radio` |
| **pnpm** | `pnpx luminacn@latest add radio` |
| **yarn** | `yarn dlx luminacn@latest add radio` |
| **bun** | `bunx luminacn@latest add radio` |

---

## Usage

```tsx
import { Component } from "@angular/core";
import {
  LuminaRadioItemDirective,
  LuminaRadioGroupComponent,
} from "../components/ui/radio";

@Component({
  standalone: true,
  imports: [LuminaRadioItemDirective, LuminaRadioGroupComponent],
  template: \`
    <lm-radio-group>
      <div lmRadioItem>...</div>
    </lm-radio-group>
  \`,
})
export class DemoRadioComponent {}
```

---

## Composition

This component follows a **composition pattern**, where you combine smaller primitives:

```text
Radio
├── radio-item.ts
└── radio.ts
```

---

---

## Required Context

- **LuminaRadioItemDirective**: Must be used within a `[lmRadioItem]` that provides `LuminaRadioGroupComponent`.

---

---

## Variants

_No variants defined_

---

## API Reference

Refer to the individual source files in your registry for full API details.
