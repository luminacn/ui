import { Directive, computed, input } from '@angular/core';
import { cn } from '../../../lib/cn';

@Directive({
  selector: '[lmDialogTitle]',
  standalone: true,
  host: {
    '[class]': 'computedClass()',
  },
})
export class LuminaDialogTitleDirective {
  userClass = input('', { alias: 'class' });

  computedClass = computed(() =>
    cn('text-lg font-semibold leading-none tracking-tight', this.userClass()),
  );
}
