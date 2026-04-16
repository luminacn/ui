# Skeleton

---

## Installation

Run the following command in your terminal:

| Manager  | Command                                 |
| :------- | :-------------------------------------- |
| **npm**  | `npx luminacn@latest add skeleton`      |
| **pnpm** | `pnpx luminacn@latest add skeleton`     |
| **yarn** | `yarn dlx luminacn@latest add skeleton` |
| **bun**  | `bunx luminacn@latest add skeleton`     |

---

## Usage

```tsx
import { Component } from "@angular/core";
import { LuminaSkeletonDirective } from "../components/ui/skeleton"

@Component({
  standalone: true,
  imports: [LuminaSkeletonDirective],
  template: \`
    <div lmSkeleton>
    </div>
  \`
})
export class DemoSkeletonComponent {}
```
