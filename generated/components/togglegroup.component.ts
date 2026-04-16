import { Component } from '@angular/core';
import { LuminaToggleGroupDirective, LuminaToggleItemDirective } from '../components/ui/togglegroup';

@Component({
  standalone: true,
  imports: [LuminaToggleGroupDirective, LuminaToggleItemDirective],
  template: `<div lmToggleGroup>
      <button lmToggleItem>...</button>
    </div>`
})
export class TogglegroupComponent {}