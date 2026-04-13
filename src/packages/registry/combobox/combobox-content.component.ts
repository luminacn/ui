import { Component } from '@angular/core';

@Component({
  selector: 'div[lmComboboxContent]',
  standalone: true,
  host: {
    class: 'mt-1 max-h-60 min-h-[80px] w-full overflow-auto rounded-md border bg-popover shadow-lg',
    role: 'listbox',
  },
  template: `<ng-content />`,
})
export class LuminaComboboxContentComponent {}
