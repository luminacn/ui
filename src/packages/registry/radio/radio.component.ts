import { Component, input, model, signal, computed } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cn } from '../../../lib/cn';

@Component({
  selector: 'lm-radio-group',
  standalone: true,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: LuminaRadioGroupComponent, multi: true }],
  template: `<div [class]="computedClass()" role="radiogroup"><ng-content /></div>`,
})
export class LuminaRadioGroupComponent implements ControlValueAccessor {
  userClass = input('', { alias: 'class' });
  value = model<any>(null);
  disabled = signal(false);

  protected computedClass = computed(() => cn('grid gap-2', this.userClass()));

  onChange = (_: any) => {};
  onTouched = () => {};

  select(val: any) {
    if (this.disabled()) return;
    this.value.set(val);
    this.onChange(val);
    this.onTouched();
  }

  writeValue(val: any) {
    this.value.set(val);
  }
  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
  setDisabledState(dis: boolean) {
    this.disabled.set(dis);
  }
}
