# Input-otp

A specialized input for entering one-time passwords or verification codes.

---

## Installation

Run the following command in your terminal:

| Manager | Command |
| :--- | :--- |
| **npm** | `npx luminacn@latest add input-otp` |
| **pnpm** | `pnpx luminacn@latest add input-otp` |
| **yarn** | `yarn dlx luminacn@latest add input-otp` |
| **bun** | `bunx luminacn@latest add input-otp` |

---

## Usage

```tsx
import { Component } from "@angular/core";
import { LuminaInputOtpComponent } from "../components/ui/input-otp"

@Component({
  standalone: true,
  imports: [LuminaInputOtpComponent],
  template: \`
    <lm-input-otp>
    </lm-input-otp>
  \`
})
export class DemoInput-otpComponent {}
```

---

## Composition

This component follows a **composition pattern**, where you combine smaller primitives:

```text
Input-otp
├── input-otp.ts
└── input-otp.variants
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
- `focus`
- `filled`
- `error`

---

---

## API Reference

Refer to the individual source files in your registry for full API details.
