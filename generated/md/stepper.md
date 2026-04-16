# Stepper

---

## Installation

Run the following command in your terminal:

| Manager  | Command                                |
| :------- | :------------------------------------- |
| **npm**  | `npx luminacn@latest add stepper`      |
| **pnpm** | `pnpx luminacn@latest add stepper`     |
| **yarn** | `yarn dlx luminacn@latest add stepper` |
| **bun**  | `bunx luminacn@latest add stepper`     |

---

## Usage

```tsx
import { Component } from "@angular/core";
import { LuminaStepperItemDirective, LuminaStepperTriggerComponent, LuminaStepperDirective } from "../components/ui/stepper"

@Component({
  standalone: true,
  imports: [LuminaStepperItemDirective, LuminaStepperTriggerComponent, LuminaStepperDirective],
  template: \`
    <div lmStepper>
        <div lmStepperItem>...</div>
        <button lmStepperTrigger>...</button>
    </div>
  \`
})
export class DemoStepperComponent {}
```
