import { Directive, input, computed } from '@angular/core';
import { cn } from '../../../lib/cn';

@Directive({
  selector: 'kbd[lmKbd]',
  standalone: true,
  host: {
    '[class]': 'computedClass()',
  },
})
export class LuminaKbdDirective {
  userClass = input('', { alias: 'class' });

  protected computedClass = computed(() =>
    cn(
      'pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100',
      this.userClass(),
    ),
  );
}
