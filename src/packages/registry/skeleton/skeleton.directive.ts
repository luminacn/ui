import { Directive, input, computed } from '@angular/core';
import { cn } from '../../../lib/cn';

@Directive({
  selector: '[lmSkeleton]',
  standalone: true,
  host: {
    '[class]': 'computedClass()',
    'aria-hidden': 'true', // Skeletons should be hidden from screen readers
  },
})
export class LuminaSkeletonDirective {
  // Signal-based input for custom classes
  userClass = input('', { alias: 'class' });

  // Computed signal for better performance
  computedClass = computed(() =>
    cn('animate-pulse rounded-md bg-primary/10 block', this.userClass()),
  );
}
