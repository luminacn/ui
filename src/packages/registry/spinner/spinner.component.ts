import { Component, input, computed } from '@angular/core';
import { cn } from '../../../lib/cn';
import { luminaSpinnerVariants } from './spinner.variants';
import { LuminaSpinnerVariant, LuminaSpinnerSize } from './spinner.types';

@Component({
  selector: 'lm-spinner',
  standalone: true,
  template: `
    <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" [class]="computedClass()">
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  `,
})
export class LuminaSpinnerComponent {
  variant = input<LuminaSpinnerVariant>('current');
  size = input<LuminaSpinnerSize>('md');
  userClass = input('', { alias: 'class' });

  computedClass = computed(() =>
    cn(luminaSpinnerVariants({ variant: this.variant(), size: this.size() }), this.userClass()),
  );
}
