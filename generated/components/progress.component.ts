import { Component } from '@angular/core';
import { LuminaProgressComponent } from '../components/ui/progress';

@Component({
  standalone: true,
  imports: [LuminaProgressComponent],
  template: `<lm-progress> </lm-progress>`
})
export class ProgressComponent {}