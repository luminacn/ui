import { Directive } from '@angular/core';

@Directive({
  selector: '[lmSheetHeader]',
  standalone: true,
  host: {
    class: 'flex flex-col space-y-2 text-center sm:text-left',
  },
})
export class LuminaSheetHeaderDirective {}
