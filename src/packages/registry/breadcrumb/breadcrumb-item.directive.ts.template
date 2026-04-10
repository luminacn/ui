import { Directive, input, computed } from '@angular/core';
import { cn } from '../../../lib/cn';

@Directive({
  selector: 'li[lmBreadcrumbItem]',
  standalone: true,
  host: { '[class]': 'computedClass()' },
})
export class LuminaBreadcrumbItemDirective {
  userClass = input('', { alias: 'class' });
  computedClass = computed(() => cn('inline-flex items-center gap-1.5', this.userClass()));
}

@Directive({
  selector: 'a[lmBreadcrumbLink]',
  standalone: true,
  host: { '[class]': 'computedClass()' },
})
export class LuminaBreadcrumbLinkDirective {
  userClass = input('', { alias: 'class' });
  computedClass = computed(() => cn('transition-colors hover:text-foreground', this.userClass()));
}

@Directive({
  selector: 'span[lmBreadcrumbPage]',
  standalone: true,
  host: {
    '[class]': 'computedClass()',
    role: 'link',
    'aria-disabled': 'true',
    'aria-current': 'page',
  },
})
export class LuminaBreadcrumbPageDirective {
  userClass = input('', { alias: 'class' });
  computedClass = computed(() => cn('font-normal text-foreground', this.userClass()));
}
