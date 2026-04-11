import { Directive, input, model, computed } from '@angular/core';
import { cn } from '../../../lib/cn';

@Directive({
  selector: '[lmTabs]',
  standalone: true,
  host: { 
    '[class]': 'computedClass()',
    'role': 'none' 
  },
})
export class LuminaTabsDirective {
  value = model.required<string>();
  orientation = input<'horizontal' | 'vertical'>('horizontal');
  variant = input<'pill' | 'underline'>('pill');
  userClass = input('', { alias: 'class' });

  computedClass = computed(() =>
    cn(
      'flex w-full',
      this.orientation() === 'vertical' ? 'flex-row' : 'flex-col',
      this.userClass(),
    ),
  );
}
