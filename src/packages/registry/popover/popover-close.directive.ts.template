import { Directive, input } from '@angular/core';
import { LuminaPopoverDirective } from './popover.directive';

@Directive({
  selector: '[lmPopoverClose]',
  standalone: true,
  host: {
    '(click)': 'close()',
    type: 'button',
  },
})
export class LuminaPopoverCloseDirective {
  // Input accepts the instance of the parent directive
  popover = input.required<LuminaPopoverDirective>({ alias: 'lmPopoverClose' });

  close() {
    this.popover().close();
  }
}
