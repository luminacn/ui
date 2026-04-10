import { Component, input, computed, contentChildren } from '@angular/core';
import { LuminaInputIconDirective } from './input-icon.directive'; // Import your icon directive
import { cn } from '../../../lib/cn';

@Component({
  selector: 'lm-input-group',
  standalone: true,
  host: { '[class]': 'groupClass()' },
  template: `<ng-content />`,
})
export class LuminaInputGroupComponent {
  userClass = input('', { alias: 'class' });

  protected icons = contentChildren(LuminaInputIconDirective);

  public hasStart = computed(() => this.icons().some((i) => i.side() === 'start'));
  public hasEnd = computed(() => this.icons().some((i) => i.side() === 'end'));

  protected groupClass = computed(() => cn('relative flex items-center w-full', this.userClass()));
}
