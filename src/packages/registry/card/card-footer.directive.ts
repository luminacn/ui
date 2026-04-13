import { Directive, computed, input } from '@angular/core';
import { cn } from '../../../lib/cn';

@Directive({
  selector: '[lmCardFooter]',
  standalone: true,
  host: {
    '[class]': 'computedClass()',
  },
})
export class LuminaCardFooterDirective {
  userClass = input<string>('', { alias: 'class' });

  computedClass = computed(() => cn('flex items-center p-6 pt-0', this.userClass()));
}
