# Sheet

---

## Installation

Run the following command in your terminal:

| Manager  | Command                              |
| :------- | :----------------------------------- |
| **npm**  | `npx luminacn@latest add sheet`      |
| **pnpm** | `pnpx luminacn@latest add sheet`     |
| **yarn** | `yarn dlx luminacn@latest add sheet` |
| **bun**  | `bunx luminacn@latest add sheet`     |

---

## Usage

```tsx
import { Component } from "@angular/core";
import { LuminaSheetContentComponent, LuminaSheetDescriptionDirective, LuminaSheetFooterDirective, LuminaSheetHeaderDirective, LuminaSheetTitleDirective, LuminaSheetTriggerDirective, LuminaSheetService } from "../components/ui/sheet"

@Component({
  standalone: true,
  imports: [LuminaSheetContentComponent, LuminaSheetDescriptionDirective, LuminaSheetFooterDirective, LuminaSheetHeaderDirective, LuminaSheetTitleDirective, LuminaSheetTriggerDirective, LuminaSheetService],
  template: \`
    <div lmSheetDescription>
        <lm-sheet-content>...</lm-sheet-content>
        <div lmSheetFooter>...</div>
        <div lmSheetHeader>...</div>
        <div lmSheetTitle>...</div>
        <div lmSheetTrigger>...</div>
    </div>
  \`
})
export class DemoSheetComponent {}
```
