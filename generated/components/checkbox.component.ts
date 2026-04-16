import { Component } from '@angular/core';
import { LuminaCheckboxComponent } from '../components/ui/checkbox';

@Component({
  standalone: true,
  imports: [LuminaCheckboxComponent],
  template: `<lm-checkbox> </lm-checkbox>`
})
export class CheckboxComponent {}