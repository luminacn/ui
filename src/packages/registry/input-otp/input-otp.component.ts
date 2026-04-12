import { Component, input, model, viewChildren, ElementRef, signal, effect } from '@angular/core';
import { cn } from '../../../lib/cn';
import { inputOtpVariants } from './input-otp.variants';

@Component({
  selector: 'lm-input-otp',
  standalone: true,
  host: {
    class: 'flex items-center gap-2',
    '(paste)': 'onPaste($event)',
  },
  template: `
    @for (slot of slots(); track $index) {
      <div class="relative">
        <input
          #otpInput
          type="text"
          inputmode="numeric"
          autocomplete="one-time-code"
          [attr.aria-label]="'Character ' + ($index + 1) + ' of ' + length()"
          [value]="value()[$index] || ''"
          (input)="onInput($index, $event)"
          (keydown)="onKeyDown($index, $event)"
          (focus)="onFocus($index)"
          [class]="computedClass($index)"
        />

        <!-- ELITE: The Fake Caret -->
        @if (focusedIndex() === $index && !value()[$index]) {
          <div class="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div class="animate-caret-blink h-4 w-px bg-foreground duration-1000"></div>
          </div>
        }
      </div>

      @if (showSeparator() && $index === length() / 2 - 1) {
        <div class="text-muted-foreground font-bold" aria-hidden="true">-</div>
      }
    }
  `,
})
export class LuminaInputOtpComponent {
  // Inputs & Model
  length = input<number>(6);
  showSeparator = input<boolean>(true);
  variant = input<'default' | 'filled' | 'error'>('default');
  size = input<'default' | 'sm' | 'lg'>('default');
  value = model<string>('');

  protected focusedIndex = signal<number | null>(null);

  protected onFocus(index: number) {
    // ELITE: Force focus to the first empty slot if user tries to skip ahead
    const firstEmpty = this.value().length;
    if (index > firstEmpty) {
      this.inputRefs()[firstEmpty]?.nativeElement.focus();
      this.focusedIndex.set(firstEmpty);
      return;
    }

    this.focusedIndex.set(index);
    this.inputRefs()[index]?.nativeElement.select();
  }

  // Internal State
  protected slots = signal<number[]>([]);
  private inputRefs = viewChildren<ElementRef<HTMLInputElement>>('otpInput');

  constructor() {
    // Re-generate slots if length changes
    effect(() => {
      this.slots.set(Array.from({ length: this.length() }, (_, i) => i));
    });
  }

  protected computedClass(index: number) {
    const isFilled = !!this.value()[index];
    return cn(
      inputOtpVariants({ variant: this.variant(), size: this.size() }),
      isFilled ? 'border-primary ring-1 ring-primary/20' : '',
    );
  }

  protected onInput(index: number, event: Event) {
    const inputEl = event.target as HTMLInputElement;
    const val = inputEl.value.replace(/[^0-9]/g, '');

    if (val) {
      this.updateValue(index, val[val.length - 1]); // Take last char if multiple
      this.focusNext(index);
    }
  }

  protected onKeyDown(index: number, event: KeyboardEvent) {
    if (event.key === 'Backspace') {
      // If current slot is empty, move back and clear previous
      if (!this.value()[index] && index > 0) {
        this.focusPrevious(index);
        this.updateValue(index - 1, '');
      } else {
        this.updateValue(index, '');
      }
    } else if (event.key === 'ArrowLeft') {
      this.focusPrevious(index);
    } else if (event.key === 'ArrowRight') {
      this.focusNext(index);
    }
  }

  protected onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text') || '';
    const digits = pastedData.replace(/[^0-9]/g, '').slice(0, this.length());

    if (digits) {
      this.value.set(digits);
      // Focus the next empty slot or the last one
      const targetIndex = digits.length >= this.length() ? this.length() - 1 : digits.length;
      this.inputRefs()[targetIndex]?.nativeElement.focus();
    }
  }

  private updateValue(index: number, char: string) {
    const current = this.value().split('');
    // Ensure array matches length
    while (current.length < this.length()) current.push('');

    current[index] = char;
    this.value.set(current.join('').slice(0, this.length()));
  }

  private focusNext(index: number) {
    if (index < this.length() - 1) {
      this.inputRefs()[index + 1]?.nativeElement.focus();
    }
  }

  private focusPrevious(index: number) {
    if (index > 0) {
      this.inputRefs()[index - 1]?.nativeElement.focus();
    }
  }
}
