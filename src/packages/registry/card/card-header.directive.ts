import { Directive, computed, input } from '@angular/core';
import { cn } from '../../../lib/cn';

@Directive({
  selector: '[lmCardHeader]',
  standalone: true,
  host: {
    '[class]': 'computedClass()',
  },
})
export class LuminaCardHeaderDirective {
  userClass = input<string>('', { alias: 'class' });

  computedClass = computed(() => cn('flex flex-col space-y-1.5 p-6', this.userClass()));
}
