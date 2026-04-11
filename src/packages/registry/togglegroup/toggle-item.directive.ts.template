import { Directive, inject, input, computed } from '@angular/core';
import { LuminaToggleGroupDirective } from './toggle-group.directive';
import { toggleVariants } from './toggle.variants';
import { cn } from '../../../lib/cn';

@Directive({
  selector: 'button[lmToggleItem]',
  standalone: true,
  host: {
    type: 'button',
    '[class]': 'computedClass()',
    '[attr.data-state]': 'selected() ? "on" : "off"',
    '[attr.aria-pressed]': 'selected()',
    '(click)': 'toggle()',
  },
})
export class LuminaToggleItemDirective {
  private group = inject(LuminaToggleGroupDirective);

  // Inputs for Variants
  variant = input<string>('default');
  size = input<string>('default');

  value = input.required<string>();
  userClass = input('', { alias: 'class' });

  selected = computed(() => this.group.isSelected(this.value()));

  protected computedClass = computed(() =>
    cn(
      toggleVariants({
        variant: this.variant(),
        size: this.size(),
      }),
      this.userClass(),
    ),
  );

  toggle() {
    this.group.toggleValue(this.value());
  }
}
