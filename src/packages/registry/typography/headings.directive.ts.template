import { Directive, input, computed } from '@angular/core';
import { cn } from '../../../lib/cn';

@Directive({ selector: 'h1[lmH1]', standalone: true, host: { '[class]': 'computedClass()' } })
export class LuminaH1Directive {
  userClass = input('', { alias: 'class' });
  computedClass = computed(() =>
    cn('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', this.userClass()),
  );
}

@Directive({ selector: 'h2[lmH2]', standalone: true, host: { '[class]': 'computedClass()' } })
export class LuminaH2Directive {
  userClass = input('', { alias: 'class' });
  computedClass = computed(() =>
    cn(
      'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0',
      this.userClass(),
    ),
  );
}

@Directive({ selector: 'h3[lmH3]', standalone: true, host: { '[class]': 'computedClass()' } })
export class LuminaH3Directive {
  userClass = input('', { alias: 'class' });
  computedClass = computed(() =>
    cn('scroll-m-20 text-2xl font-semibold tracking-tight', this.userClass()),
  );
}

@Directive({ selector: 'h4[lmH4]', standalone: true, host: { '[class]': 'computedClass()' } })
export class LuminaH4Directive {
  userClass = input('', { alias: 'class' });
  computedClass = computed(() =>
    cn('scroll-m-20 text-xl font-semibold tracking-tight', this.userClass()),
  );
}

@Directive({ selector: 'h5[lmH5]', standalone: true, host: { '[class]': 'computedClass()' } })
export class LuminaH5Directive {
  userClass = input('', { alias: 'class' });
  computedClass = computed(() =>
    cn('scroll-m-20 text-lg font-semibold tracking-tight', this.userClass()),
  );
}
