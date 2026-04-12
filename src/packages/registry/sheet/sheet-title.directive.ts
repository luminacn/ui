import { Directive } from '@angular/core';

@Directive({
  selector: '[lmSheetTitle]',
  standalone: true,
  host: {
    class: 'text-lg font-semibold text-foreground',
  },
})
export class LuminaSheetTitleDirective {}
