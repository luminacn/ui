import { Directive, input, computed, inject } from '@angular/core';
import { cn } from '../../../lib/cn';
import { LM_FORM_FIELD } from '../form/form-field.token';

@Directive({
  selector: 'label[lmLabel]',
  standalone: true,
  host: {
    '[class]': 'computedClass()',
    "[class.after:content-['*']]": 'required()',
    '[class.after:ml-0.5]': 'required()',
    '[class.after:text-destructive]': 'required()',
  },
})
export class LuminaLabelDirective {
  private field = inject(LM_FORM_FIELD, { optional: true });

  error = input(false, { transform: (v: boolean | string) => (v === '' ? true : !!v) });
  required = input(false, {
    alias: 'lmRequired',
    transform: (v: boolean | string) => (v === '' ? true : !!v),
  });
  userClass = input('', { alias: 'class' });

  isInvalid = computed(() => this.error() || (this.field?.isInvalid() ?? false));

  computedClass = computed(() =>
    cn(
      'text-sm font-medium leading-none transition-colors',
      this.isInvalid() ? 'text-destructive' : 'text-foreground',
      this.userClass(),
    ),
  );
}
