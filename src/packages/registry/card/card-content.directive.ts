import { Directive, computed, input } from '@angular/core';
import { cn } from '../../../lib/cn';

@Directive({
  selector: '[lmCardContent]',
  standalone: true,
  host: {
    '[class]': 'computedClass()',
  },
})
export class LuminaCardContentDirective {
  userClass = input<string>('', { alias: 'class' });

  computedClass = computed(() => cn('p-6 pt-0', this.userClass()));
}
