import { Directive, input, computed, output } from '@angular/core';
import { cn } from '../../../lib/cn';

@Directive({
  selector: '[lmInputIcon]',
  standalone: true,
  host: {
    '[class]': 'classes()',
    '(click)': 'handleClick($event)',
    '[attr.role]': 'isClickable() ? "button" : null',
    '[attr.tabindex]': 'isClickable() ? 0 : null',
  },
})
export class LuminaInputIconDirective {
  side = input<'start' | 'end'>('start');

  onClick = output<MouseEvent>();

  isClickable = computed(() => this.side() === 'end');

  classes = computed(() =>
    cn(
      'absolute h-4 w-4 text-muted-foreground top-1/2 -translate-y-1/2 transition-colors',
      this.side() === 'start' ? 'left-3' : 'right-3',
      // Add interactive styles if it's the end icon
      this.isClickable() && 'cursor-pointer hover:text-foreground pointer-events-auto',
    ),
  );

  handleClick(event: MouseEvent) {
    if (this.isClickable()) {
      event.stopPropagation();
      this.onClick.emit(event);
    }
  }
}
