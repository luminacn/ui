import { Component } from '@angular/core';
import { LuminaKbdDirective } from '../components/ui/keyboard';

@Component({
  standalone: true,
  imports: [LuminaKbdDirective],
  template: `<kbd lmKbd> </kbd>`
})
export class KeyboardComponent {}