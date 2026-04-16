# Combobox

---

## Installation

Run the following command in your terminal:

| Manager  | Command                                 |
| :------- | :-------------------------------------- |
| **npm**  | `npx luminacn@latest add combobox`      |
| **pnpm** | `pnpx luminacn@latest add combobox`     |
| **yarn** | `yarn dlx luminacn@latest add combobox` |
| **bun**  | `bunx luminacn@latest add combobox`     |

---

## Usage

```tsx
import { Component } from "@angular/core";
import { LuminaComboboxContentComponent, LuminaComboboxInputDirective, LuminaComboboxItemDirective, LuminaComboboxTagComponent, LuminaComboboxDirective } from "../components/ui/combobox"

@Component({
  standalone: true,
  imports: [LuminaComboboxContentComponent, LuminaComboboxInputDirective, LuminaComboboxItemDirective, LuminaComboboxTagComponent, LuminaComboboxDirective],
  template: \`
    <div lmComboboxContent>
        <input lmComboboxInput>...</input>
        <div lmComboboxItem>...</div>
        <span lmComboboxTag>...</span>
        <div lmCombobox>...</div>
    </div>
  \`
})
export class DemoComboboxComponent {}
```
