import {
  Directive,
  input,
  computed,
  inject,
  ElementRef,
  output,
  HostListener,
  signal,
} from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { cn } from '../../../lib/cn';
import { dialogVariants } from './dialog.variants';
import { filter } from 'rxjs';

@Directive({
  selector: '[lmDialogContent]',
  standalone: true,
  host: {
    '[class]': 'classes()',
    role: 'dialog',
    'aria-modal': 'true',
    // Centering Fix: m-auto ensures Flexbox centers this element
    '[class.m-auto]': 'true',
    '[class.block]': 'true',
    '[style.will-change]': "'scale'",
  },
})
export class LuminaDialogContentDirective {
  private dialogRef = inject(DialogRef);
  isClosing = signal(false);

  private el = inject(ElementRef);
  private data = inject<any>(DIALOG_DATA, { optional: true });

  size = input<'sm' | 'md' | 'lg' | 'xl' | 'full'>(this.data?.size ?? 'md');
  variant = input<'default' | 'destructive'>(this.data?.variant ?? 'default');
  userClass = input('', { alias: 'class' });

  enableEnterKey = input<boolean>(false);
  onEnter = output<void>();

  constructor() {
    this.dialogRef.backdropClick.pipe(takeUntilDestroyed()).subscribe(() => {
      if (this.dialogRef.config.disableClose) this.triggerShake();
    });

    this.dialogRef.keydownEvents
      .pipe(
        takeUntilDestroyed(),
        filter((e): e is KeyboardEvent => e instanceof KeyboardEvent),
        filter((e) => e.key === 'Escape'),
      )
      .subscribe(() => {
        if (this.dialogRef.config.disableClose) this.triggerShake();
      });
  }

  @HostListener('keydown.enter', ['$event'])
  handleEnter(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    if (this.enableEnterKey() && !keyboardEvent.shiftKey) {
      keyboardEvent.preventDefault();
      this.onEnter.emit();
    }
  }

  private triggerShake() {
    const element = this.el.nativeElement;
    // Clean reset: remove class, force reflow, then re-add
    element.classList.remove('animate-shake');
    void element.offsetWidth;
    element.classList.add('animate-shake');
  }

  close(result?: any) {
    this.isClosing.set(true);

    // Wait for the animation to finish before destroying the component
    setTimeout(() => {
      this.dialogRef.close(result);
    }, 150); // Matches duration-150
  }

  classes = computed(() =>
    cn(
      dialogVariants({
        size: this.size(),
        variant: this.variant(),
      }),
      // --- ANIMATION LOGIC ---
      'duration-200 ease-in-out', // Base transition speed

      !this.isClosing()
        ? 'animate-in fade-in zoom-in-95'
        : 'animate-out fade-out zoom-out-95 fill-mode-forwards',
      this.userClass(),
    ),
  );
}
