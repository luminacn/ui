import {
  Directive,
  input,
  computed,
  inject,
  ElementRef,
  afterRenderEffect,
  Optional,
  Self,
  OnDestroy,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { cn } from '../../../lib/cn';
import { LM_FORM_FIELD } from '../form/form-field.token'; // Import the token

@Directive({
  selector: 'textarea[lmTextarea]',
  standalone: true,
  host: {
    '[class]': 'computedClass()',
    '(input)': 'onInput()',
    '(window:resize)': 'onInput()',
    '[attr.aria-multiline]': 'true',
    '[attr.aria-invalid]': 'isInvalid()', // Essential for screen readers
  },
})
export class LuminaTextareaDirective implements OnDestroy {
  private readonly el = inject(ElementRef<HTMLTextAreaElement>);
  @Optional() @Self() private readonly ngControl = inject(NgControl, { optional: true });

  // Handshake with parent form field coordinator
  private readonly field = inject(LM_FORM_FIELD, { optional: true });

  // Signal to track form value changes reactively
  private value = this.ngControl?.valueChanges ? toSignal(this.ngControl.valueChanges) : null;

  autoResize = input(false, { transform: (v: boolean | string) => (v === '' ? true : !!v) });
  userClass = input('', { alias: 'class' });

  // Reactive state: checks if parent field reports an error
  protected isInvalid = computed(() => this.field?.isInvalid() ?? false);

  protected computedClass = computed(() =>
    cn(
      'flex min-h-[80px] w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background transition-colors',
      'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',

      // AUTO-RED BORDER: Turns red only if invalid
      this.isInvalid() ? 'border-destructive focus-visible:ring-destructive' : 'border-input',

      this.autoResize() && 'resize-none overflow-hidden',
      this.userClass(),
    ),
  );

  constructor() {
    afterRenderEffect(() => {
      // Trigger effect on value changes for auto-resize
      this.value?.();

      if (this.autoResize()) {
        this.adjustHeight();
      }
    });
  }

  onInput() {
    if (this.autoResize()) {
      this.adjustHeight();
    }
  }

  private adjustHeight() {
    const textarea = this.el.nativeElement;
    textarea.style.height = '0px';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  ngOnDestroy() {
    this.el.nativeElement.style.height = '';
  }
}
