import { Component } from "@angular/core";
import {
  LuminaRadioItemDirective,
  LuminaRadioGroupComponent,
} from "../components/ui/radio";

@Component({
  standalone: true,
  imports: [LuminaRadioItemDirective, LuminaRadioGroupComponent],
  template: `<lm-radio-group>
    <div lmRadioItem>...</div>
  </lm-radio-group>`,
})
export class RadioComponent {}
