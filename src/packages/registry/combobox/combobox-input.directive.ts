import { Directive, inject, effect, ElementRef } from '@angular/core';
import { LuminaComboboxDirective } from './combobox.directive';

@Directive({
  selector: 'input[lmComboboxInput]',
  standalone: true,
  host: {
    role: 'combobox',
    '[attr.aria-expanded]': 'cb.isOpen()',
    '[attr.aria-controls]': 'cb.listId',
    '[attr.aria-activedescendant]': 'cb.isOpen() ? "opt-" + cb.activeIndex() : null',
    'aria-autocomplete': 'list',
  },
})
export class LuminaComboboxInputDirective {
  private el = inject(ElementRef<HTMLInputElement>);
  cb = inject(LuminaComboboxDirective);

  constructor() {
    effect(() => {
      const value = this.cb.displayValue();

      if (this.el.nativeElement.value !== value) {
        this.el.nativeElement.value = value;
      }
    });
  }
}
