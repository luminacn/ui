import { Directive, computed, input } from '@angular/core';
import { badgeVariants } from './badge.variants';
import { cn } from '../../../lib/cn';
import { LuminaBadgeVariant } from './badge.types';

@Directive({
  selector: '[lmBadge]',
  standalone: true,
  host: {
    '[class]': 'computedClass()',
  },
})
export class LuminaBadgeDirective {
  // Supports shorthand: <span lmBadge> or <span lmBadge="outline">
  variant = input<LuminaBadgeVariant, LuminaBadgeVariant | ''>('default', {
    alias: 'lmBadge',
    transform: (v) => (v === '' ? 'default' : v),
  });

  // Supports shape change: <span lmBadge shape="square">
  shape = input<'pill' | 'square'>('pill');

  userClass = input<string>('', { alias: 'class' });

  computedClass = computed(() =>
    cn(
      badgeVariants({
        variant: this.variant() as LuminaBadgeVariant,
        shape: this.shape(),
      }),
      this.userClass(),
    ),
  );
}
