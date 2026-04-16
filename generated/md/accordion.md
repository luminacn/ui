# Accordion

---

## Installation

Run the following command in your terminal:

| Manager  | Command                                  |
| :------- | :--------------------------------------- |
| **npm**  | `npx luminacn@latest add accordion`      |
| **pnpm** | `pnpx luminacn@latest add accordion`     |
| **yarn** | `yarn dlx luminacn@latest add accordion` |
| **bun**  | `bunx luminacn@latest add accordion`     |

---

## Usage

```tsx
import { Component } from "@angular/core";
import { LuminaAccordionContentDirective, LuminaAccordionItemDirective, LuminaAccordionTriggerComponent, LuminaAccordionDirective } from "../components/ui/accordion"

@Component({
  standalone: true,
  imports: [LuminaAccordionContentDirective, LuminaAccordionItemDirective, LuminaAccordionTriggerComponent, LuminaAccordionDirective],
  template: \`
    <div lmAccordion>
        <div lmAccordionContent>...</div>
        <div lmAccordionItem>...</div>
        <button lmAccordionTrigger>...</button>
    </div>
  \`
})
export class DemoAccordionComponent {}
```
