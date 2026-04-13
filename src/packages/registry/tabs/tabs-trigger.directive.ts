import { Directive, input, computed, inject, ElementRef } from '@angular/core';
import { LuminaTabsDirective } from './tabs.directive';
import { cn } from '../../../lib/cn';
import { tabsTriggerVariants } from './tabs.variants';

@Directive({
  selector: '[lmTabsTrigger]',
  standalone: true,
  host: {
    'role': 'tab',
    'type': 'button',
    '[class]': 'computedClass()',
    '[attr.aria-selected]': 'isActive()',
    '[attr.data-state]': "isActive() ? 'active' : 'inactive'",
    '[tabindex]': 'isActive() ? 0 : -1',
    '(click)': 'tabs.value.set(value())',
  },
})
export class LuminaTabsTriggerDirective {
  protected tabs = inject(LuminaTabsDirective);
  public el = inject(ElementRef);
  value = input.required<string>({ alias: 'lmTabsTrigger' });
  userClass = input('', { alias: 'class' });

  isActive = computed(() => this.tabs.value() === this.value());

  computedClass = computed(() =>
    cn(
      tabsTriggerVariants({ variant: this.tabs.variant() }),
      this.tabs.orientation() === 'vertical' ? 'w-full justify-start' : '',
      this.userClass(),
    ),
  );
}
