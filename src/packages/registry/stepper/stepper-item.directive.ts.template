import { Directive, input, computed, inject } from '@angular/core';
import { LuminaStepperDirective } from './stepper.directive';
import { cn } from '../../../lib/cn';

@Directive({
  selector: '[lmStepperItem]',
  standalone: true,
  host: {
    '[class]': 'computedClass()',
    '[attr.data-disabled]': 'disabled()',
  },
})
export class LuminaStepperItemDirective {
  protected stepper = inject(LuminaStepperDirective);

  index = input.required<number>();
  isLast = input<boolean>(false);
  disabled = input<boolean>(false); // NEW: Allow individual steps to be disabled
  userClass = input('', { alias: 'class' });

  state = computed(() => {
    if (this.disabled()) return 'inactive'; // Force inactive look if disabled
    const active = this.stepper.activeStep();
    const idx = this.index();
    if (active > idx) return 'completed';
    if (active === idx) return 'active';
    return 'inactive';
  });

  computedClass = computed(() =>
    cn(
      'relative flex items-center group',
      this.stepper.orientation() === 'horizontal'
        ? 'flex-1 last:flex-none'
        : 'flex-col items-start',
      this.disabled() ? 'pointer-events-none opacity-50' : '',
      this.userClass(),
    ),
  );
}
