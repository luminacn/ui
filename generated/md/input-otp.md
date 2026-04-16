# Input-otp

---

## Installation

Run the following command in your terminal:

| Manager  | Command                                  |
| :------- | :--------------------------------------- |
| **npm**  | `npx luminacn@latest add input-otp`      |
| **pnpm** | `pnpx luminacn@latest add input-otp`     |
| **yarn** | `yarn dlx luminacn@latest add input-otp` |
| **bun**  | `bunx luminacn@latest add input-otp`     |

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
