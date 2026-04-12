import { Directive, HostListener, Input, inject, Type } from '@angular/core';
import { LuminaDialogService } from './dialog.service';

@Directive({
  selector: '[lmDialogTrigger]',
  standalone: true,
})
export class LuminaDialogTriggerDirective {
  @Input('lmDialogTrigger') component!: Type<any>;

  private dialog = inject(LuminaDialogService);

  @HostListener('click')
  open() {
    if (!this.component) return;
    this.dialog.open(this.component);
  }
}
