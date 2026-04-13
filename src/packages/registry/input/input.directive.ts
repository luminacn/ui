import { Directive, input, computed, inject } from '@angular/core';
import { cn } from '../../../lib/cn';
import { LuminaInputGroupComponent } from './input-group.component';
import { LM_FORM_FIELD } from '../form/form-field.token'; // Import the token

@Directive({
  selector: 'input[lmInput], textarea[lmInput]',
  standalone: true,
  host: {
    '[class]': 'computedClass()',
    '[attr.aria-invalid]': 'isInvalid()', // Essential for screen readers
  },
})
export class LuminaInputDirective {
  private readonly group = inject(LuminaInputGroupComponent, { optional: true });
  // Add the form field handshake
  private readonly field = inject(LM_FORM_FIELD, { optional: true });

  userClass = input('', { alias: 'class' });

  protected hasStart = computed(() => this.group?.hasStart() ?? false);
  protected hasEnd = computed(() => this.group?.hasEnd() ?? false);

  // New reactive state
  protected isInvalid = computed(() => this.field?.isInvalid() ?? false);

  computedClass = computed(() =>
    cn(
      'peer flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors',
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',

      // AUTO-RED BORDER when invalid
      this.isInvalid() ? 'border-destructive focus-visible:ring-destructive' : 'border-input',

      this.hasStart() ? 'pl-10' : 'pl-3',
      this.hasEnd() ? 'pr-10' : 'pr-3',
      this.userClass(),
    ),
  );
}
