import { Directive, model, input, computed, contentChildren } from '@angular/core';
import { cn } from '../../../lib/cn';

@Directive({
  selector: '[lmToggleGroup]',
  standalone: true,
  exportAs: 'lmToggleGroup',
  host: {
    '[class]': 'computedClass()',
    role: 'group',
  },
})
export class LuminaToggleGroupDirective {
  // The state: can be a string or an array of strings
  value = model<string | string[]>([]);

  // Toggle between radio (single) and checkbox (multiple) behavior
  multiple = input(false, { transform: (v: boolean | string) => (v === '' ? true : !!v) });

  userClass = input('', { alias: 'class' });

  protected computedClass = computed(() =>
    cn(
      'flex items-center justify-center gap-1 rounded-md border bg-background p-1',
      this.userClass(),
    ),
  );

  toggleValue(itemValue: string) {
    const current = this.value();

    if (this.multiple()) {
      const arr = Array.isArray(current) ? current : [current].filter(Boolean);
      this.value.set(
        arr.includes(itemValue) ? arr.filter((v) => v !== itemValue) : [...arr, itemValue],
      );
    } else {
      // Single select: click again to deselect
      this.value.set(current === itemValue ? '' : itemValue);
    }
  }

  // Helper for the buttons to check their own state
  isSelected(itemValue: string): boolean {
    const val = this.value();
    return Array.isArray(val) ? val.includes(itemValue) : val === itemValue;
  }
}
