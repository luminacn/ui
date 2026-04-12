import { Directive, input, computed } from '@angular/core';
import { cn } from '../../../lib/cn';

@Directive({
  selector: '[lmDropdownMenuShortcut]',
  standalone: true,
  host: { '[class]': 'computedClass()' },
})
export class LuminaDropdownMenuShortcutDirective {
  userClass = input('', { alias: 'class' });
  computedClass = computed(() =>
    cn('ml-auto text-xs tracking-widest opacity-60', this.userClass()),
  );
}
