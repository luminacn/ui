import { Directive } from '@angular/core';

@Directive({
  selector: '[lmContextMenuSeparator]',
  standalone: true,
  host: {
    class: '-mx-1 my-1 h-px bg-border block',
  },
})
export class LuminaContextMenuSeparatorDirective {}
