import { Directive, input, computed } from '@angular/core';
import { CdkMenuItem } from '@angular/cdk/menu';
import { cn } from '../../../lib/cn';
import { dropdownMenuItemVariants } from './dropdown-menu.variants';

@Directive({
  selector: '[lmDropdownMenuItem]',
  standalone: true,
  hostDirectives: [{ directive: CdkMenuItem, inputs: ['cdkMenuItemDisabled: disabled'] }],
  host: { '[class]': 'computedClass()' },
})
export class LuminaDropdownMenuItemDirective {
  variant = input<'default' | 'destructive'>('default');
  inset = input<boolean>(false);
  userClass = input('', { alias: 'class' });

  computedClass = computed(() =>
    cn(
      dropdownMenuItemVariants({ variant: this.variant(), inset: this.inset() }),
      this.userClass(),
    ),
  );
}
