import { Component, input, computed } from '@angular/core';
import { cn } from '../../../lib/cn';
import { popoverContentVariants } from './popover.variants';

@Component({
  selector: 'div[lmPopoverContent]',
  standalone: true,
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    tabindex: '-1',
  },
})
export class LuminaPopoverContentComponent {
  size = input<'default' | 'lg' | 'full'>('default');
  userClass = input('', { alias: 'class' });

  computedClass = computed(() =>
    cn(popoverContentVariants({ size: this.size() }), this.userClass()),
  );
}
