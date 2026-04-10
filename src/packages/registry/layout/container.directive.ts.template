import { Directive, input, computed } from '@angular/core';
import { cn } from '../../../lib/cn';

@Directive({
  selector: '[lmContainer]',
  standalone: true,
  host: {
    '[class]': 'computedClass()',
  },
})
export class LuminaContainerDirective {
  userClass = input('', { alias: 'class' });

  computedClass = computed(() => cn('container mx-auto px-4 md:px-6 lg:px-8', this.userClass()));
}
