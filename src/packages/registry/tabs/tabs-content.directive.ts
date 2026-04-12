import { Directive, input, computed, inject } from '@angular/core';
import { LuminaTabsDirective } from './tabs.directive';
import { cn } from '../../../lib/cn';

@Directive({
  selector: '[lmTabsContent]',
  standalone: true,
  host: {
    '[class]': 'computedClass()',
    '[hidden]': '!isActive()',
  },
})
export class LuminaTabsContentDirective {
  protected tabs = inject(LuminaTabsDirective);

  value = input.required<string>({ alias: 'lmTabsContent' });
  userClass = input('', { alias: 'class' });

  isActive = computed(() => this.tabs.value() === this.value());

  computedClass = computed(() =>
    cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      this.userClass(),
    ),
  );
}
