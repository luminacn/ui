import { Directive } from '@angular/core';

@Directive({
  selector: '[lmDropdownMenuIcon]',
  standalone: true,
  host: { class: 'mr-2 h-4 w-4 flex-shrink-0' },
})
export class LuminaDropdownMenuIconDirective {}
