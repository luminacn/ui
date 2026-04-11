import { Directive, inject, input, ViewContainerRef } from '@angular/core';
import { LuminaSheetService } from './sheet.service';

@Directive({
  selector: '[lmSheetTrigger]',
  standalone: true,
  host: { '(click)': 'openSheet()' },
})
export class LuminaSheetTriggerDirective {
  private sheetService = inject(LuminaSheetService);
  private vcr = inject(ViewContainerRef); // Inject this

  content = input.required<any>({ alias: 'lmSheetTrigger' });
  side = input<'top' | 'bottom' | 'left' | 'right'>('right');

  openSheet() {
    this.sheetService.open(this.content(), {
      side: this.side(),
      viewContainerRef: this.vcr,
    });
  }
}
