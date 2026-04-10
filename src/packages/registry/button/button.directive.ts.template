import { Directive, computed, input } from '@angular/core';
import { luminaButtonVariants } from './button.variants';
import { cn } from '../../../lib/cn';
import { LuminaButtonVariant, LuminaButtonSize } from './button.types';

@Directive({
  selector: 'button[lmButton], a[lmButton]',
  standalone: true,
  host: {
    '[class]': 'computedClass()',
    '[attr.disabled]': 'isDisabled() || null',
    '[attr.aria-disabled]': 'isDisabled()',
    '[attr.aria-busy]': 'loading()',
    '[style.pointer-events]': 'loading() ? "none" : null',
  },
})
export class LuminaButtonDirective {
  variant = input<LuminaButtonVariant>('default');
  size = input<LuminaButtonSize>('default');

  disabled = input(false, { transform: (v: boolean | string) => (v === '' ? true : !!v) });
  loading = input(false, { transform: (v: boolean | string) => (v === '' ? true : !!v) });

  userClass = input<string>('', { alias: 'class' });

  // Combined state for disabled attribute
  protected isDisabled = computed(() => this.disabled() || this.loading());

  computedClass = computed(() =>
    cn(
      luminaButtonVariants({
        variant: this.variant(),
        size: this.size(),
      }),
      this.loading() && [
        // 1. Make text transparent
        'relative !text-transparent transition-none hover:text-transparent select-none',
        // 2. Ensure children with 'text-current' (like our spinner) remain visible
        '[&>lm-spinner]:text-white', // Or use '[&>lm-spinner]:text-primary-foreground'
        '[&>lm-spinner]:opacity-100',
        'pointer-events-none',
      ],
      this.userClass(),
    ),
  );
}
