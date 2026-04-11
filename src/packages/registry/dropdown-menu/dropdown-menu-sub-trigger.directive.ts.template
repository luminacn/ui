import { Directive, input, computed } from '@angular/core';
import { cn } from '../../../lib/cn';
import { dropdownMenuItemVariants } from './dropdown-menu.variants';

@Directive({
  selector: '[lmDropdownMenuSubTrigger]',
  standalone: true,
  host: { '[class]': 'computedClass()' },
})
export class LuminaDropdownMenuSubTriggerDirective {
  inset = input<boolean>(false);
  userClass = input('', { alias: 'class' });
  computedClass = computed(() =>
    cn(dropdownMenuItemVariants({ inset: this.inset() }), 'justify-between', this.userClass()),
  );
}
