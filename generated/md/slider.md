# Slider

---

## Installation

Run the following command in your terminal:

| Manager  | Command                               |
| :------- | :------------------------------------ |
| **npm**  | `npx luminacn@latest add slider`      |
| **pnpm** | `pnpx luminacn@latest add slider`     |
| **yarn** | `yarn dlx luminacn@latest add slider` |
| **bun**  | `bunx luminacn@latest add slider`     |

---

## Usage

```tsx
import { Component } from "@angular/core";
import { LuminaSliderDirective } from "../components/ui/slider"

@Component({
  standalone: true,
  imports: [LuminaSliderDirective],
  template: \`
    <input lmSlider>
    </input>
  \`
})
export class DemoSliderComponent {}
```
