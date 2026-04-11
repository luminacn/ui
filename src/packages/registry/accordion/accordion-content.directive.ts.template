import { Directive, input, computed, inject } from '@angular/core';
import { CdkAccordionItem } from '@angular/cdk/accordion';
import { cn } from '../../../lib/cn';

@Directive({
  selector: '[lmAccordionContent]',
  standalone: true,
  host: {
    '[class]': 'computedClass()',
    role: 'region',
    '[attr.aria-hidden]': '!item.expanded',
  },
})
export class LuminaAccordionContentDirective {
  protected item = inject(CdkAccordionItem);
  userClass = input('', { alias: 'class' });

  computedClass = computed(() =>
    cn('lm-accordion-content overflow-hidden text-sm transition-all', this.userClass()),
  );
}
