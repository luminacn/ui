import { Component } from '@angular/core';
import { LuminaStepperItemDirective, LuminaStepperTriggerComponent, LuminaStepperDirective } from '../components/ui/stepper';

@Component({
  standalone: true,
  imports: [LuminaStepperItemDirective, LuminaStepperTriggerComponent, LuminaStepperDirective],
  template: `<div lmStepper>
      <div lmStepperItem>...</div>
      <button lmStepperTrigger>...</button>
    </div>`
})
export class StepperComponent {}