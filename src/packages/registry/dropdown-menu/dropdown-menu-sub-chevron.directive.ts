import { Directive } from '@angular/core';

@Directive({
  selector: '[lmDropdownMenuSubChevron]',
  standalone: true,
  host: { class: 'ml-auto h-4 w-4 opacity-50' },
})
export class LuminaDropdownMenuSubChevronDirective {}
