import { Directive, computed, input } from '@angular/core';
import { cn } from '../../../lib/cn';

@Directive({
  selector: '[lmCardDescription]',
  standalone: true,
  host: {
    '[class]': 'computedClass()',
  },
})
export class LuminaCardDescriptionDirective {
  userClass = input<string>('', { alias: 'class' });

  computedClass = computed(() => cn('text-sm text-muted-foreground', this.userClass()));
}
