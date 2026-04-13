import {
  Directive,
  output,
  input,
  ElementRef,
  inject,
  AfterViewInit,
  OnDestroy,
  effect,
} from '@angular/core';

@Directive({
  selector: '[lmInfiniteScroll]',
  standalone: true,
})
export class LuminaInfiniteScrollDirective implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);

  /** If true, the directive will stop triggering the scrolled event (e.g., during loading or end of data) */
  disabled = input<boolean>(false);

  /** Distance from the bottom to trigger the event (e.g., '200px' triggers early for a seamless feel) */
  rootMargin = input<string>('200px');

  /** Percentage of the sentinel visibility to trigger the event */
  threshold = input<number>(0.1);

  /** Emits when the user reaches the bottom of the container */
  scrolled = output<void>();

  private observer?: IntersectionObserver;
  private sentinel?: HTMLElement;

  constructor() {
    // ELITE: Automatically manage observer state based on the disabled input signal
    effect(() => {
      if (!this.sentinel || !this.observer) return;

      if (this.disabled()) {
        this.observer.unobserve(this.sentinel);
      } else {
        this.observer.observe(this.sentinel);
      }
    });
  }

  ngAfterViewInit() {
    this.createSentinel();

    this.observer = new IntersectionObserver(
      ([entry]) => {
        // Only emit if the sentinel is visible and we aren't disabled
        if (entry.isIntersecting && !this.disabled()) {
          this.scrolled.emit();
        }
      },
      {
        root: this.el.nativeElement.tagName === 'BODY' ? null : this.el.nativeElement,
        rootMargin: this.rootMargin(),
        threshold: this.threshold(),
      },
    );

    if (this.sentinel) {
      this.observer.observe(this.sentinel);
    }
  }

  private createSentinel() {
    this.sentinel = document.createElement('div');
    // Minimal styling to ensure it's at the bottom but invisible
    this.sentinel.style.cssText = 'height: 1px; width: 100%; pointer-events: none; opacity: 0;';
    this.sentinel.setAttribute('data-lm-sentinel', '');
    this.el.nativeElement.appendChild(this.sentinel);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    this.sentinel?.remove();
  }
}
