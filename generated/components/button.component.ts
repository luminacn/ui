import { Component } from '@angular/core';
import { LuminaButtonDirective } from '../components/ui/button';

@Component({
  standalone: true,
  imports: [LuminaButtonDirective],
  template: `<button lmButton></button>`
})
export class ButtonComponent {}