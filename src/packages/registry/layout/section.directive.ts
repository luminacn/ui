import { Directive, input, computed } from '@angular/core';
import { cn } from '../../../lib/cn';

@Directive({
  selector: 'section[lmSection]',
  standalone: true,
  host: {
    '[class]': 'computedClass()',
  },
})
export class LuminaSectionDirective {
  userClass = input('', { alias: 'class' });

  computedClass = computed(() => cn('py-12 md:py-16 lg:py-24', this.userClass()));
}
