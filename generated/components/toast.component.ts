import { Component } from '@angular/core';
import { LuminaToasterComponent, LuminaToastComponent, LuminaToastService } from '../components/ui/toast';

@Component({
  standalone: true,
  imports: [LuminaToasterComponent, LuminaToastComponent, LuminaToastService],
  template: `<lm-toaster>
      <lm-toast>...</lm-toast>
    </lm-toaster>`
})
export class ToastComponent {}