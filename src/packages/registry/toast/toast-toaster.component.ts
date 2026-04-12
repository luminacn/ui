import { Component, inject, computed } from '@angular/core';
import { cn } from '../../../lib/cn';
import { LuminaToastService, Toast } from './toast.service';
import { LuminaToastComponent } from './toast.component';

@Component({
  selector: 'lm-toaster',
  standalone: true,
  imports: [LuminaToastComponent],
  template: `
    <div [class]="containerClass()">
      @for (toast of service.toasts(); track toast.id) {
        <lm-toast [toast]="toast" (onDismiss)="service.dismiss(toast.id)" />
      }
    </div>
  `,
})
export class LuminaToasterComponent {
  protected service = inject(LuminaToastService);

  containerClass = computed(() => {
    const pos = this.service.position() ?? 'top-right';

    const base =
      'fixed z-[100] flex p-4 flex-col gap-2 w-full md:max-w-[420px] pointer-events-none';

    const positions: Record<NonNullable<Toast['position']>, string> = {
      'top-left': 'top-0 left-0',
      'top-center': 'top-0 left-1/2 -translate-x-1/2',
      'top-right': 'top-0 right-0',
      'bottom-left': 'bottom-0 left-0 flex-col-reverse',
      'bottom-right': 'bottom-0 right-0 flex-col-reverse',
      'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2 flex-col-reverse',
    };

    return cn(base, positions[pos]);
  });
}
