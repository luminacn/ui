import { Directive, input, inject, computed } from '@angular/core';
import { LuminaRadioGroupComponent } from './radio.component';
import { cn } from '../../../lib/cn';

@Directive({
  selector: '[lmRadioItem]',
  standalone: true,
  host: {
    type: 'button',
    role: 'radio',
    '[attr.aria-checked]': 'selected()',
    '[attr.disabled]': 'isDisabled() ? true : null',
    '[class]': 'computedClass()',
    '(click)': 'onClick()',
  },
})
export class LuminaRadioItemDirective {
  private group = inject(LuminaRadioGroupComponent);

  value = input.required<any>({ alias: 'lmRadioItem' });

  userClass = input('', { alias: 'class' });
  userDisabled = input(false, {
    alias: 'disabled',
    transform: (v: boolean | string) => (v === '' ? true : !!v),
  });

  selected = computed(() => this.group.value() === this.value());
  isDisabled = computed(() => this.userDisabled() || this.group.disabled());

  protected computedClass = computed(() =>
    cn(
      'flex items-center justify-center aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow transition-all',
      'focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
      this.selected()
        ? 'bg-primary text-primary-foreground after:content-[""] after:block after:h-2 after:w-2 after:rounded-full after:bg-current'
        : 'bg-transparent',
      this.userClass(),
    ),
  );

  onClick() {
    this.group.select(this.value());
  }
}
