import { Directive, input, computed } from '@angular/core';
import { cn } from '../../../lib/cn';

export type LmSeparatorOrientation = 'horizontal' | 'vertical';

@Directive({
  selector: '[lmSeparator]',
  standalone: true,
  host: {
    role: 'separator',
    '[attr.aria-orientation]': 'orientation()',
    '[class]': 'computedClass()',
  },
})
export class LuminaSeparatorDirective {
  // 1. Keep it simple: no alias.
  // 2. Default value is 'horizontal'.
  orientation = input<LmSeparatorOrientation>('horizontal');

  userClass = input('', { alias: 'class' });

  computedClass = computed(() =>
    cn(
      'shrink-0 bg-border block',
      this.orientation() === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
      this.userClass(),
    ),
  );
}
