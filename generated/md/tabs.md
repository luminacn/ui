# Tabs

---

## Installation

Run the following command in your terminal:

| Manager  | Command                             |
| :------- | :---------------------------------- |
| **npm**  | `npx luminacn@latest add tabs`      |
| **pnpm** | `pnpx luminacn@latest add tabs`     |
| **yarn** | `yarn dlx luminacn@latest add tabs` |
| **bun**  | `bunx luminacn@latest add tabs`     |

---

## Usage

```tsx
import { Component } from "@angular/core";
import { LuminaTabsContentDirective, LuminaTabsListDirective, LuminaTabsTriggerDirective, LuminaTabsDirective } from "../components/ui/tabs"

@Component({
  standalone: true,
  imports: [LuminaTabsContentDirective, LuminaTabsListDirective, LuminaTabsTriggerDirective, LuminaTabsDirective],
  template: \`
    <div lmTabs>
        <div lmTabsContent>...</div>
        <div lmTabsList>...</div>
        <div lmTabsTrigger>...</div>
    </div>
  \`
})
export class DemoTabsComponent {}
```
