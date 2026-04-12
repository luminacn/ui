import { Directive, computed, input } from '@angular/core';
import { cn } from '../../../lib/cn';

@Directive({
  selector: '[lmCardTitle]',
  standalone: true,
  host: {
    '[class]': 'computedClass()',
  },
})
export class LuminaCardTitleDirective {
  userClass = input<string>('', { alias: 'class' });

  computedClass = computed(() => cn('font-semibold leading-none tracking-tight', this.userClass()));
}
