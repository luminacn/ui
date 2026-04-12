import { Directive, model } from '@angular/core';

@Directive({
  selector: '[lmCollapsible]',
  exportAs: 'lmCollapsible',
  host: {
    '[attr.aria-expanded]': 'open()',
    '[attr.data-state]': 'open() ? "open" : "closed"',
  },
})
export class LuminaCollapsibleDirective {
  open = model(false);

  toggle() {
    this.open.update((v) => !v);
  }
}
