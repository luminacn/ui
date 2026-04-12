import { Directive, input, computed } from '@angular/core';
import { cn } from '../../../lib/cn';

@Directive({ selector: '[lmLead]', standalone: true, host: { '[class]': 'computedClass()' } })
export class LuminaLeadDirective {
  userClass = input('', { alias: 'class' });
  computedClass = computed(() => cn('text-xl text-muted-foreground', this.userClass()));
}

@Directive({ selector: '[lmLarge]', standalone: true, host: { '[class]': 'computedClass()' } })
export class LuminaLargeDirective {
  userClass = input('', { alias: 'class' });
  computedClass = computed(() => cn('text-lg font-semibold', this.userClass()));
}

@Directive({ selector: '[lmSmall]', standalone: true, host: { '[class]': 'computedClass()' } })
export class LuminaSmallDirective {
  userClass = input('', { alias: 'class' });
  computedClass = computed(() => cn('text-sm font-medium leading-none', this.userClass()));
}

@Directive({ selector: '[lmMuted]', standalone: true, host: { '[class]': 'computedClass()' } })
export class LuminaMutedDirective {
  userClass = input('', { alias: 'class' });
  computedClass = computed(() => cn('text-sm text-muted-foreground', this.userClass()));
}
