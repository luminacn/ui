import { Directive, computed, input } from '@angular/core';
import { cn } from '../../../lib/cn';

@Directive({
  selector: '[lmDialogDescription]',
  standalone: true,
  host: {
    '[class]': 'computedClass()',
  },
})
export class LuminaDialogDescriptionDirective {
  userClass = input('', { alias: 'class' });

  computedClass = computed(() => cn('text-sm text-muted-foreground', this.userClass()));
}
