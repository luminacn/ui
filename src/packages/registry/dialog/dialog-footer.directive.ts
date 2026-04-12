import { Directive, computed, input } from '@angular/core';
import { cn } from '../../../lib/cn';

@Directive({
  selector: '[lmDialogFooter]',
  standalone: true,
  host: {
    '[class]': 'computedClass()',
  },
})
export class LuminaDialogFooterDirective {
  userClass = input('', { alias: 'class' });

  computedClass = computed(() =>
    cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', this.userClass()),
  );
}
