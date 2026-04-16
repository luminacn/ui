# Infinite-scroll

---

## Installation

Run the following command in your terminal:

| Manager  | Command                                        |
| :------- | :--------------------------------------------- |
| **npm**  | `npx luminacn@latest add infinite-scroll`      |
| **pnpm** | `pnpx luminacn@latest add infinite-scroll`     |
| **yarn** | `yarn dlx luminacn@latest add infinite-scroll` |
| **bun**  | `bunx luminacn@latest add infinite-scroll`     |

---

## Usage

```tsx
import { Component } from "@angular/core";
import { LuminaInfiniteScrollDirective } from "../components/ui/infinite-scroll"

@Component({
  standalone: true,
  imports: [LuminaInfiniteScrollDirective],
  template: \`
    <div lmInfiniteScroll>
    </div>
  \`
})
export class DemoInfinite-scrollComponent {}
```
