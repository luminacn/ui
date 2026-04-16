# Popover

---

## Installation

Run the following command in your terminal:

| Manager  | Command                                |
| :------- | :------------------------------------- |
| **npm**  | `npx luminacn@latest add popover`      |
| **pnpm** | `pnpx luminacn@latest add popover`     |
| **yarn** | `yarn dlx luminacn@latest add popover` |
| **bun**  | `bunx luminacn@latest add popover`     |

---

## Usage

```tsx
import { Component } from "@angular/core";
import { LuminaPopoverCloseDirective, LuminaPopoverContentComponent, LuminaPopoverDirective } from "../components/ui/popover"

@Component({
  standalone: true,
  imports: [LuminaPopoverCloseDirective, LuminaPopoverContentComponent, LuminaPopoverDirective],
  template: \`
    <div lmPopoverClose>
        <div lmPopoverContent>...</div>
        <div lmPopover>...</div>
    </div>
  \`
})
export class DemoPopoverComponent {}
```
