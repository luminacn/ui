import { Directive, computed, input } from '@angular/core';
import { cn } from '../../../lib/cn';

@Directive({
  selector: '[lmCard]',
  standalone: true,
  host: {
    '[class]': 'computedClass()',
  },
})
export class LuminaCardDirective {
  userClass = input<string>('', { alias: 'class' });

  computedClass = computed(() =>
    cn('rounded-xl border bg-card text-card-foreground shadow', this.userClass()),
  );
}
