import { Directive, input, computed, inject } from '@angular/core';
import { CdkAccordionItem } from '@angular/cdk/accordion';
import { LuminaAccordionDirective } from './accordion.directive';
import { accordionItemVariants } from './accordion.variants';
import { cn } from '../../../lib/cn';

@Directive({
  selector: '[lmAccordionItem]',
  standalone: true,
  exportAs: 'cdkAccordionItem',
  hostDirectives: [
    {
      directive: CdkAccordionItem,
      inputs: ['expanded', 'disabled'],
      outputs: ['opened', 'closed', 'expandedChange'],
    },
  ],
  host: {
    '[class]': 'computedClass()',
  },
})
export class LuminaAccordionItemDirective {
  private accordion = inject(LuminaAccordionDirective);
  userClass = input('', { alias: 'class' });

  computedClass = computed(() =>
    cn(accordionItemVariants({ variant: this.accordion.variant() }), this.userClass()),
  );
}
