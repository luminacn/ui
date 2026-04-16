# Scrollarea

---

## Installation

Run the following command in your terminal:

| Manager  | Command                                   |
| :------- | :---------------------------------------- |
| **npm**  | `npx luminacn@latest add scrollarea`      |
| **pnpm** | `pnpx luminacn@latest add scrollarea`     |
| **yarn** | `yarn dlx luminacn@latest add scrollarea` |
| **bun**  | `bunx luminacn@latest add scrollarea`     |

---

## Usage

```tsx
import { Component } from "@angular/core";
import { LuminaScrollAreaDirective } from "../components/ui/scrollarea"

@Component({
  standalone: true,
  imports: [LuminaScrollAreaDirective],
  template: \`
    <di