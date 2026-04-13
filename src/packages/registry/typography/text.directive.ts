import { Directive, input, computed } from '@angular/core';
import { cn } from '../../../lib/cn';

@Directive({ selector: 'p[lmP]', standalone: true, host: { '[class]': 'computedClass()' } })
export class LuminaPDirective {
  userClass = input('', { alias: 'class' });
  computedClass = computed(() => cn('leading-7 [&:not(:first-child)]:mt-6', this.userClass()));
}

@Directive({
  selector: 'blockquote[lmBlockquote]',
  standalone: true,
  host: { '[class]': 'computedClass()' },
})
export class LuminaBlockquoteDirective {
  userClass = input('', { alias: 'class' });
  computedClass = computed(() => cn('mt-6 border-l-2 pl-6 italic', this.userClass()));
}

@Directive({ selector: 'code[lmCode]', standalone: true, host: { '[class]': 'computedClass()' } })
export class LuminaCodeDirective {
  userClass = input('', { alias: 'class' });
  computedClass = computed(() =>
    cn(
      'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
      this.userClass(),
    ),
  );
}
