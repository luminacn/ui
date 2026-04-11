import { Component, input, computed } from '@angular/core';
import { CdkMenuItemCheckbox } from '@angular/cdk/menu';
import { cn } from '../../../lib/cn';
import { dropdownMenuItemVariants } from './dropdown-menu.variants';

@Component({
  selector: 'button[lmDropdownMenuCheckboxItem]',
  standalone: true,
  hostDirectives: [
    {
      directive: CdkMenuItemCheckbox,
      // Use the signal directly in the template and let CDK handle the state
      inputs: ['cdkMenuItemChecked: checked', 'cdkMenuItemDisabled: disabled'],
    },
  ],
  template: `
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      @if (checked()) {
        <!-- Changed to match input name -->
        <svg
          xmlns="http://w3.org"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M20 6 9 17l-5-5" ) />
          >
        </svg>
      }
    </span>
    <ng-content />
  `,
  host: { '[class]': 'computedClass()' },
})
export class LuminaDropdownMenuCheckboxItemComponent {
  userClass = input('', { alias: 'class' });
  // Ensure the alias matches what you use in the template
  checked = input<boolean>(false);

  computedClass = computed(() => cn(dropdownMenuItemVariants({ inset: true }), this.userClass()));
}
