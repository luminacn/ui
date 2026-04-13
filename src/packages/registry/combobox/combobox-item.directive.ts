import { Directive, HostListener, inject, input } from '@angular/core';
import { LuminaComboboxDirective } from './combobox.directive';

@Directive({
  selector: '[lmComboboxItem]',
  standalone: true,
  host: {
    class:
      'flex cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
    '[attr.data-selected]': 'isSelected()',
  },
})
export class LuminaComboboxItemDirective {
  combobox = inject(LuminaComboboxDirective);

  value = input<any>(null);
  label = input<string>('');

  isSelected() {
    return this.combobox.isSelected(this.value());
  }

  @HostListener('click')
  select() {
    this.combobox.toggleValue(this.value());
  }
}
