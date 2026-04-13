import { Directive, input, computed } from '@angular/core';
import { cn } from '../../../lib/cn';

@Directive({ selector: 'hr[lmHr]', standalone: true, host: { '[class]': 'computedClass()' } })
export class LuminaHrDirective {
  userClass = input('', { alias: 'class' });
  computedClass = computed(() => cn('my-4 border-t border-muted', this.userClass()));
}
