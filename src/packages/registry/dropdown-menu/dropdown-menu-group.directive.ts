import { Directive } from '@angular/core';

@Directive({
  selector: '[lmDropdownMenuGroup]',
  standalone: true,
  host: {
    role: 'group',
    class: 'space-y-1',
  },
})
export class LuminaDropdownMenuGroupDirective {}
