import { Directive, input, computed } from '@angular/core';
import { cn } from '../../../lib/cn';

@Directive({
  selector: 'li[lmBreadcrumbSeparator]',
  standalone: true,
  host: {
    '[class]': 'computedClass()',
    role: 'presentation',
    'aria-hidden': 'true',
  },
})
export class LuminaBreadcrumbSeparatorDirective {
  userClass = input('', { alias: 'class' });
  computedClass = computed(() => cn('[&>svg]:size-3.5', this.userClass()));
}

@Directive({
  selector: 'span[lmBreadcrumbEllipsis]',
  standalone: true,
  host: {
    '[class]': 'computedClass()',
    role: 'presentation',
    'aria-hidden': 'true',
  },
})
export class LuminaBreadcrumbEllipsisDirective {
  userClass = input('', { alias: 'class' });
  computedClass = computed(() => cn('flex h-9 w-9 items-center justify-center', this.userClass()));
}
