import { Component } from '@angular/core';
import { LuminaTextareaDirective } from '../components/ui/textarea';

@Component({
  standalone: true,
  imports: [LuminaTextareaDirective],
  template: `<textarea lmTextarea> </textarea>`
})
export class TextareaComponent {}