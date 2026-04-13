import { Directive, input, model, computed } from '@angular/core';
import { cn } from '../../../lib/cn';

@Directive({
  selector: '[lmStepper]',
  standalone: true,
  exportAs: 'lmStepper', // Important for the #stepper template ref
  host: { '[class]': 'computedClass()' },
})
export class LuminaStepperDirective {
  activeStep = model<number>(0);
  orientation = input<'horizontal' | 'vertical'>('horizontal');
  linear = input<boolean>(true);
  userClass = input('', { alias: 'class' });

  computedClass = computed(() =>
    cn(
      'flex w-full',
      this.orientation() === 'vertical' ? 'flex-col' : 'flex-row items-center justify-between',
      this.userClass(),
    ),
  );

  next() {
    this.activeStep.update((s) => s + 1);
  }
  previous() {
    this.activeStep.update((s) => Math.max(0, s - 1));
  }

  reset() {
    this.activeStep.set(0);
  }
}
