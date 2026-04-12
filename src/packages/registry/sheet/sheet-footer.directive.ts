import { Directive } from '@angular/core';

@Directive({
  selector: '[lmSheetFooter]',
  standalone: true,
  host: {
    class: 'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
  },
})
export class LuminaSheetFooterDirective {}
