import { Directive, HostListener, inject } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';

@Directive({
  selector: '[lmDialogClose]',
  standalone: true,
})
export class LuminaDialogCloseDirective {
  private ref = inject(DialogRef);

  @HostListener('click')
  close() {
    this.ref.close();
  }
}
