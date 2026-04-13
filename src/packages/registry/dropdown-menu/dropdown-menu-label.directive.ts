import { Directive, input, computed } from '@angular/core';
import { cn } from '../../../lib/cn';

@Directive({
  selector: '[lmDropdownMenuLabel]',
  standalone: true,
  host: {
    '[class]': 'computedClass()',
  },
})
export class LuminaDropdownMenuLabelDirective {
  inset = input<boolean>(false);
  userClass = input('', { alias: 'class' });

  computedClass = computed(() =>
    cn('px-2 py-1.5 text-sm font-semibold', this.inset() ? 'pl-8' : '', this.userClass()),
  );
}
