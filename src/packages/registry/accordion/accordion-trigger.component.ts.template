import { Component, input, computed, inject } from '@angular/core';
import { CdkAccordionItem } from '@angular/cdk/accordion';
import { cn } from '../../../lib/cn';

@Component({
  selector: 'button[lmAccordionTrigger]',
  standalone: true,
  template: `
    <ng-content />
    <svg
      xmlns="http://w3.org"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="shrink-0 transition-transform duration-200"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  `,
  host: {
    '[class]': 'computedClass()',
    '(click)': 'item.toggle()',
    type: 'button',
    '[attr.aria-expanded]': 'item.expanded',
  },
})
export class LuminaAccordionTriggerComponent {
  protected item = inject(CdkAccordionItem);
  userClass = input('', { alias: 'class' });

  computedClass = computed(() =>
    cn(
      'flex w-full items-center justify-between py-4 text-left font-medium transition-all hover:underline outline-none',
      'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      '[&[aria-expanded=true]>svg]:rotate-180',
      this.userClass(),
    ),
  );
}
