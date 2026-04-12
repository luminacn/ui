import { Component, input, computed, ViewEncapsulation } from '@angular/core';
import { CdkMenu } from '@angular/cdk/menu';
import { dropdownMenuContentVariants } from './dropdown-menu.variants';
import { cn } from '../../../lib/cn';

@Component({
  selector: 'div[lmDropdownMenuContent]',
  standalone: true,
  hostDirectives: [CdkMenu],
  template: `<ng-content />`,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'computedClass()',
    role: 'menu',
  },
})
export class LuminaDropdownMenuContentComponent {
  userClass = input('', { alias: 'class' });

  computedClass = computed(() => cn(dropdownMenuContentVariants(), this.userClass()));
}
