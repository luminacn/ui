# Sheet

A side or bottom panel that slides into view for secondary content.

---

## Installation

Run the following command in your terminal:

| Manager | Command |
| :--- | :--- |
| **npm** | `npx luminacn@latest add sheet` |
| **pnpm** | `pnpx luminacn@latest add sheet` |
| **yarn** | `yarn dlx luminacn@latest add sheet` |
| **bun** | `bunx luminacn@latest add sheet` |

---

## Usage

```tsx
import { Component } from "@angular/core";
import {
  LuminaSheetContentComponent,
  LuminaSheetDescriptionDirective,
  LuminaSheetFooterDirective,
  LuminaSheetHeaderDirective,
  LuminaSheetTitleDirective,
  LuminaSheetTriggerDirective,
  LuminaSheetService,
} from "../components/ui/sheet";

@Component({
  standalone: true,
  imports: [
    LuminaSheetContentComponent,
    LuminaSheetDescriptionDirective,
    LuminaSheetFooterDirective,
    LuminaSheetHeaderDirective,
    LuminaSheetTitleDirective,
    LuminaSheetTriggerDirective,
    LuminaSheetService,
  ],
  template: \`
    <div lmSheetDescription>
      <lm-sheet-content>...</lm-sheet-content>
      <div lmSheetFooter>...</div>
      <div lmSheetHeader>...</div>
      <div lmSheetTitle>...</div>
      <div lmSheetTrigger>...</div>
    </div>
  \`,
})
export class DemoSheetComponent {}
```

---

## Composition

This component follows a **composition pattern**, where you combine smaller primitives:

```text
Sheet
├── index
├── sheet-content.ts
├── sheet-description.ts
├── sheet-footer.ts
├── sheet-header.ts
├── sheet-title.ts
├── sheet-trigger.ts
├── sheet.service
└── sheet.variants
```

---

---

## Required Context

- **LuminaSheetContentComponent**: Must be used within a `lm-sheet-content` that provides `LuminaSheetService`.
- **LuminaSheetTriggerDirective**: Must be used within a `[lmSheetTrigger]` that provides `LuminaSheetService` and `ViewContainerRef`.
- **LuminaSheetService**: Must be used within a `parent container` that provides `Overlay`.

---

---

## Variants

- `side`
- `top`
- `bottom`
- `left`
- `sm`
- `right`

---

---

## API Reference

Refer to the individual source files in your registry for full API details.
