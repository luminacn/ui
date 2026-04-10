import { Component, input, model, computed } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cn } from '../../../lib/cn';

@Component({
  selector: 'lm-checkbox',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: LuminaCheckboxComponent,
      multi: true,
    },
  ],
  template: `
    <button
      type="button"
      role="checkbox"
      [attr.aria-checked]="checked()"
      [attr.disabled]="disabled() || null"
      [class]="computedClass()"
      (click)="toggle()"
      (blur)="onTouched()"
    >
      @if (checked()) {
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      }
    </button>
  `,
})
export class LuminaCheckboxComponent implements ControlValueAccessor {
  disabled = input(false, {
    transform: (v: boolean | string) => (typeof v === 'string' ? true : v),
  });
  userClass = input('', { alias: 'class' });

  // Use model() for two-way binding support (replaces @Input/@Output)
  checked = model(false);

  computedClass = computed(() =>
    cn(
      'peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow-sm',
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
      'disabled:cursor-not-allowed disabled:opacity-50',
      this.checked() ? 'bg-primary text-primary-foreground' : 'bg-transparent',
      this.userClass(),
    ),
  );

  onChange: (value: boolean) => void = () => {};
  onTouched: () => void = () => {};

  toggle() {
    if (this.disabled()) return;

    this.checked.update((v) => !v);
    this.onChange(this.checked());
    this.onTouched();
  }

  writeValue(value: boolean): void {
    this.checked.set(!!value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Note: setDisabledState requires a manual signal set because
    // inputs are technically read-only, but for CVA we usually
    // maintain a local state or use a private WritableSignal.
  }
}
