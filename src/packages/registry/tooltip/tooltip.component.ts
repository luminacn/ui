import { Component, signal, computed } from '@angular/core';
import { tooltipVariants } from './tooltip.variants';
import { cn } from '../../../lib/cn';

@Component({
  selector: 'lm-tooltip',
  standalone: true,
  template: `<div [class]="computedClass()">{{ content() }}</div>`,
})
export class LuminaTooltipComponent {
  content = signal('');
  variant = signal<'default' | 'outline'>('default');

  computedClass = computed(() =>
    cn(
      tooltipVariants({ variant: this.variant() }),
      'max-w-[280px] break-words', // Prevents tooltips from becoming too wide
    ),
  );
}
