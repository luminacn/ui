import { Component } from '@angular/core';
import { LuminaLabelDirective } from '../components/ui/label';

@Component({
  standalone: true,
  imports: [LuminaLabelDirective],
  template: `<label lmLabel> </label>`
})
export class LabelComponent {}