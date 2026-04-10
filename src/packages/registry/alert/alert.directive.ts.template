import { Directive, input, computed, output, signal } from '@angular/core';
import { cn } from '../../../lib/cn';
import { alertVariants } from './alert.variants';
import { LuminaAlertVariant } from './alert.types';

@Directive({
  selector: '[lmAlert]',
  standalone: true,
  exportAs: 'lmAlert',
  host: {
    '[class]': 'computedClass()',
    '[class.hidden]': 'closed()',
    role: 'alert',
  },
})
export class LuminaAlertDirective {
  // Shorthand: <div lmAlert="destructive">
  variant = input<LuminaAlertVariant, LuminaAlertVariant | ''>('default', {
    alias: 'lmAlert',
    transform: (v) => (v === '' ? 'default' : v),
  });
  protected closed = signal(false);
  onClose = output<void>();

  close() {
    this.closed.set(true);
    this.onClose.emit(); // Notify the parent
  }

  userClass = input('', { alias: 'class' });

  computedClass = computed(() =>
    cn(alertVariants({ variant: this.variant() as LuminaAlertVariant }), this.userClass()),
  );
}

@Directive({
  selector: '[lmAlertTitle]',
  standalone: true,
  host: {
    '[class]': 'computedClass()',
  },
})
export class LuminaAlertTitleDirective {
  userClass = input('', { alias: 'class' });
  computedClass = computed(() =>
    cn('mb-1 font-medium leading-none tracking-tight', this.userClass()),
  );
}

@Directive({
  selector: '[lmAlertDescription]',
  standalone: true,
  host: {
    '[class]': 'computedClass()',
  },
})
export class LuminaAlertDescriptionDirective {
  userClass = input('', { alias: 'class' });
  computedClass = computed(() => cn('text-sm [&_p]:leading-relaxed', this.userClass()));
}
