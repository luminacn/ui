import { Component } from "@angular/core";
import {
  LuminaComboboxContentComponent,
  LuminaComboboxInputDirective,
  LuminaComboboxItemDirective,
  LuminaComboboxTagComponent,
  LuminaComboboxDirective,
} from "../components/ui/combobox";

@Component({
  standalone: true,
  imports: [
    LuminaComboboxContentComponent,
    LuminaComboboxInputDirective,
    LuminaComboboxItemDirective,
    LuminaComboboxTagComponent,
    LuminaComboboxDirective,
  ],
  template: `<div lmComboboxContent>
        <input lmComboboxInput>...</input>
        <div lmComboboxItem>...</div>
        <span lmComboboxTag>...</span>
        <div lmCombobox>...</div>
    </div>`,
})
export class ComboboxComponent {}
