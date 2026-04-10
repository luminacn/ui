import { Directive, input, computed } from '@angular/core';
import { cn } from '../../../lib/cn';

@Directive({ selector: 'ul[lmUl]', standalone: true, host: { '[class]': 'computedClass()' } })
export class LuminaUlDirective {
  userClass = input('', { alias: 'class' });
  computedClass = computed(() => cn('my-6 ml-6 list-disc [&>li]:mt-2', this.userClass()));
}

@Directive({ selector: 'ol[lmOl]', standalone: true, host: { '[class]': 'computedClass()' } })
export class LuminaOlDirective {
  userClass = input('', { alias: 'class' });
  computedClass = computed(() => cn('my-6 ml-6 list-decimal [&>li]:mt-2', this.userClass()));
}

@Directive({ selector: 'table[lmTable]', standalone: true, host: { '[class]': 'computedClass()' } })
export class LuminaTableDirective {
  userClass = input('', { alias: 'class' });
  computedClass = computed(() => cn('w-full border-collapse text-left text-sm', this.userClass()));
}

@Directive({ selector: 'th[lmTh]', standalone: true, host: { '[class]': 'computedClass()' } })
export class LuminaThDirective {
  userClass = input('', { alias: 'class' });
  computedClass = computed(() =>
    cn(
      'border-b px-4 py-2 font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
      this.userClass(),
    ),
  );
}

@Directive({ selector: 'td[lmTd]', standalone: true, host: { '[class]': 'computedClass()' } })
export class LuminaTdDirective {
  userClass = input('', { alias: 'class' });
  computedClass = computed(() =>
    cn(
      'border-b px-4 py-2 [&[align=center]]:text-center [&[align=right]]:text-right',
      this.userClass(),
    ),
  );
}
