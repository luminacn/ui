import { Directive, input, computed } from '@angular/core';
import { cn } from '../../../lib/cn';

@Directive({
  selector: 'nav[lmBreadcrumb]',
  standalone: true,
  host: { 'aria-label': 'breadcrumb' },
})
export class LuminaBreadcrumbDirective {}

@Directive({
  selector: 'ol[lmBreadcrumbList]',
  standalone: true,
  host: { '[class]': 'computedClass()' },
})
export class LuminaBreadcrumbListDirective {
  userClass = input('', { alias: 'class' });
  computedClass = computed(() =>
    cn(
      'flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5',
      this.userClass(),
    ),
  );
}
