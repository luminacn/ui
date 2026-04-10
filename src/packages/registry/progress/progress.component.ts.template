import { Component, input, computed } from '@angular/core';
import { cn } from '../../../lib/cn';
import { progressVariants, LuminaProgressVariant } from './progress.variants';

@Component({
  selector: 'lm-progress',
  standalone: true,
  template: `
    <div
      class="relative h-4 w-full overflow-hidden rounded-full bg-secondary"
      role="progressbar"
      [attr.aria-valuemin]="0"
      [attr.aria-valuemax]="max()"
      [attr.aria-valuenow]="indeterminate() ? null : value()"
    >
      <div
        [class]="indicatorClass()"
        [style.transform]="indeterminate() ? null : transform()"
      ></div>
    </div>
  `,
})
export class LuminaProgressComponent {
  value = input<number>(0);
  max = input<number>(100);
  variant = input<LuminaProgressVariant>('default');
  indeterminate = input(false, { transform: (v: boolean | string) => (v === '' ? true : !!v) });

  protected transform = computed(() => {
    const percentage = Math.min(Math.max((this.value() / this.max()) * 100, 0), 100);
    return `translateX(-${100 - percentage}%)`;
  });

  protected indicatorClass = computed(() =>
    cn(
      progressVariants({
        variant: this.indeterminate() ? 'indeterminate' : this.variant(),
      }),
    ),
  );
}
