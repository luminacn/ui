import { Directive, input } from '@angular/core';

@Directive({
  selector: '[lmAspectRatio]',
  standalone: true,
  host: {
    '[style.aspect-ratio]': 'ratio()',
    '[class]': '"overflow-hidden block w-full"',
  },
})
export class LuminaAspectRatioDirective {
  // Default to square if no ratio is provided
  ratio = input<string | number>('1 / 1', { alias: 'lmAspectRatio' });
}
