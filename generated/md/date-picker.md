# Date-picker

---

## Installation

Run the following command in your terminal:

| Manager  | Command                                    |
| :------- | :----------------------------------------- |
| **npm**  | `npx luminacn@latest add date-picker`      |
| **pnpm** | `pnpx luminacn@latest add date-picker`     |
| **yarn** | `yarn dlx luminacn@latest add date-picker` |
| **bun**  | `bunx luminacn@latest add date-picker`     |

---

## Usage

```tsx
import { Component } from "@angular/core";
import { LuminaCalendarComponent, LuminaDatePickerComponent } from "../components/ui/date-picker"

@Component({
  standalone: true,
  imports: [LuminaCalendarComponent, LuminaDatePickerComponent],
  template: \`
    <lm-calendar>
        <lm-date-picker>...</lm-date-picker>
    </lm-calendar>
  \`
})
export class DemoDate-pickerComponent {}
```
