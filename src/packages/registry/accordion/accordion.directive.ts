import { Directive, input, computed } from '@angular/core';
import { CdkAccordion } from '@angular/cdk/accordion';
import { cn } from '../../../lib/cn';
import { accordionVariants } from './accordion.variants';

@Directive({
  selector: '[lmAccordion]',
  standalone: true,
  hostDirectives: [{ directive: CdkAccordion, inputs: ['multi'] }],
  host: {
    '[class]': 'computedClass()',
  },
})
export class LuminaAccordionDirective {
  variant = input<'default' | 'separated' | 'ghost'>('default');
  userClass = input('', { alias: 'class' });

  computedClass = computed(() =>
    cn(accordionVariants({ variant: this.variant() }), this.userClass()),
  );
}
