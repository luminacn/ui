# Breadcrumb

---

## Installation

Run the following command in your terminal:

| Manager  | Command                                   |
| :------- | :---------------------------------------- |
| **npm**  | `npx luminacn@latest add breadcrumb`      |
| **pnpm** | `pnpx luminacn@latest add breadcrumb`     |
| **yarn** | `yarn dlx luminacn@latest add breadcrumb` |
| **bun**  | `bunx luminacn@latest add breadcrumb`     |

---

## Usage

```tsx
import { Component } from "@angular/core";
import { LuminaBreadcrumbItemDirective, LuminaBreadcrumbSeparatorDirective, LuminaBreadcrumbDirective } from "../components/ui/breadcrumb"

@Component({
  standalone: true,
  imports: [LuminaBreadcrumbItemDirective, LuminaBreadcrumbSeparatorDirective, LuminaBreadcrumbDirective],
  template: \`
    <li lmBreadcrumbItem>
        <li lmBreadcrumbSeparator>...</li>
        <nav lmBreadcrumb>...</nav>
    </li>
  \`
})
export class DemoBreadcrumbComponent {}
```
