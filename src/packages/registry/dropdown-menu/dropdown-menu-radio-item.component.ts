import { Component, input, computed } from '@angular/core';
import { CdkMenuItemRadio } from '@angular/cdk/menu';
import { cn } from '../../../lib/cn';
import { dropdownMenuItemVariants } from './dropdown-menu.variants';

@Component({
  selector: 'button[lmDropdownMenuRadioItem]',
  standalone: true,
  hostDirectives: [
    {
      directive: CdkMenuItemRadio,
      inputs: ['cdkMenuItemChecked: checked', 'cdkMenuItemDisabled: disabled'],
    },
  ],
  template: `
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      @if (isChecked()) {
        <div class="h-2 w-2 rounded-full bg-current"></div>
      }
    </span>
    <ng-content />
  `,
  host: { '[class]': 'computedClass()' },
})
export class LuminaDropdownMenuRadioItemComponent {
  userClass = input('', { alias: 'class' });
  isChecked = input<boolean>(false, { alias: 'checked' });
  computedClass = computed(() => cn(dropdownMenuItemVariants({ inset: true }), this.userClass()));
}
