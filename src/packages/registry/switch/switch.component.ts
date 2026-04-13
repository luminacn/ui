import { Component, input, model, signal, computed, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cn } from '../../../lib/cn';

@Component({
  selector: 'lm-switch',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: LuminaSwitchComponent,
      multi: true,
    },
  ],
  template: `
    <button
      type="button"
      role="switch"
      [attr.aria-checked]="checked()"
      [disabled]="isDisabled()"
      [attr.aria-label]="ariaLabel()"
      [class]="computedTrackClass()"
      (click)="toggle($event)"
      (blur)="onTouched()"
    >
      <span [class]="computedThumbClass()"></span>
    </button>
  `,
})
export class LuminaSwitchComponent implements ControlValueAccessor {
  // Use model() for automatic two-way binding support
  checked = model(false);

  // Use input() for one-way properties
  ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  userClass = input('', { alias: 'class' });

  // Internal signal for form-controlled disabled state
  private _disabled = signal(false);
  // Input for manual disabled state
  disabledInput = input(false, {
    alias: 'disabled',
    transform: (v: boolean | string) => (v === '' ? true : !!v),
  });

  // Combined disabled state
  isDisabled = computed(() => this._disabled() || this.disabledInput());

  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.toggle();
    }
  }

  protected computedTrackClass = computed(() =>
    cn(
      'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      'disabled:cursor-not-allowed disabled:opacity-50',
      this.checked() ? 'bg-primary' : 'bg-input',
      this.userClass(),
    ),
  );

  protected computedThumbClass = computed(() =>
    cn(
      'pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform',
      this.checked() ? 'translate-x-4' : 'translate-x-0',
    ),
  );

  private onChange = (_: boolean) => {};
  onTouched = () => {};

  toggle(event?: Event) {
    if (this.isDisabled()) return;
    event?.stopPropagation();

    this.checked.update((v) => !v);
    this.onChange(this.checked());
    this.onTouched();
  }

  // --- CVA Logic ---
  writeValue(value: any): void {
    this.checked.set(!!value);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this._disabled.set(isDisabled);
  }
}
