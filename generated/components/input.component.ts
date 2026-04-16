import { Component } from '@angular/core';
import { LuminaInputGroupComponent, LuminaInputIconDirective, LuminaInputDirective } from '../components/ui/input';

@Component({
  standalone: true,
  imports: [LuminaInputGroupComponent, LuminaInputIconDirective, LuminaInputDirective],
  template: `<lm-input-group>
        <div lmInputIcon>...</div>
        <input lmInput>...</input>
    </lm-input-group>`
})
export class InputComponent {}