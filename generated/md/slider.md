# Slider

An interactive control for selecting values from a range.

---

## Installation

Run the following command in your terminal:

| Manager | Command |
| :--- | :--- |
| **npm** | `npx luminacn@latest add slider` |
| **pnpm** | `pnpx luminacn@latest add slider` |
| **yarn** | `yarn dlx luminacn@latest add slider` |
| **bun** | `bunx luminacn@latest add slider` |

---

## Usage

```tsx
import { Component } from "@angular/core";
import { LuminaSliderDirective } from "../components/ui/slider";

@Component({
  standalone: true,
  imports: [LuminaSliderDirective],
  template: \`
    <input lmSlider>
    </input>
  \`,
})
export class DemoSliderComponent {}
```

---

## Composition

This component follows a **composition pattern**, where you combine smaller primitives:

```text
Slider
└── slider.ts
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
