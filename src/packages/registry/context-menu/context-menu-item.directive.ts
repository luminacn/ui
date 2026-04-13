import { Directive, input, computed } from '@angular/core';
import { CdkMenuItem } from '@angular/cdk/menu';
import { cn } from '../../../lib/cn';
import { contextMenuItemVariants } from './context-menu-item.variants';

@Directive({
  selector: '[lmContextMenuItem]',
  standalone: true,
  hostDirectives: [
    {
      directive: CdkMenuItem,
      inputs: ['cdkMenuItemDisabled: disabled'],
    },
  ],
  host: {
    '[class]': 'computedClass()',
  },
})
export class LuminaContextMenuItemDirective {
  userClass = input('', { alias: 'class' });
  variant = input<'default' | 'destructive'>('default');

  computedClass = computed(() =>
    cn(contextMenuItemVariants({ variant: this.variant() }), this.userClass()),
  );
}
