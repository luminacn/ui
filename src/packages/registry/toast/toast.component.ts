import { Component, input, output, computed, signal, HostListener, inject } from '@angular/core';
import { LuminaToastService, Toast } from './toast.service';
import { toastVariants } from './toast.variants';
import { cn } from '../../../lib/cn';

@Component({
  selector: 'lm-toast',
  standalone: true,
  template: `
    <div
      [class]="computedClass()"
      [style.transform]="swipeTransform()"
      [style.opacity]="swipeOpacity()"
    >
      <div class="grid gap-1">
        @if (toast().title) {
          <div class="text-sm font-semibold">{{ toast().title }}</div>
        }
        @if (toast().description) {
          <div class="text-sm opacity-90">{{ toast().description }}</div>
        }
      </div>

      @if (toast().action; as action) {
        <button
          (click)="action.onClick(); onDismiss.emit()"
          class="inline-flex shrink-0 items-center justify-center rounded-md border bg-transparent px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground"
        >
          {{ action.label }}
        </button>
      }

      <button
        (click)="onDismiss.emit()"
        class="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2"
      >
        <svg
          xmlns="http://w3.org"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M18 6 6 18"></path>
          <path d="m6 6 12 12"></path>
        </svg>
      </button>
    </div>
  `,
  host: {
    class: 'lm-toast-animate block touch-none',
    '[style.transition]': 'isSwiping() ? "none" : "all 200ms ease-out"',
  },
})
export class LuminaToastComponent {
  toast = input.required<Toast>();
  onDismiss = output<void>();
  private service = inject(LuminaToastService);

  // --- Swipe Logic ---
  private startX = 0;
  protected isSwiping = signal(false);
  protected currentX = signal(0);

  protected swipeTransform = computed(() => `translateX(${this.currentX()}px)`);
  protected swipeOpacity = computed(() => 1 - Math.abs(this.currentX()) / 300);

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].clientX;
    this.isSwiping.set(true);
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    const x = event.touches[0].clientX;
    const diff = x - this.startX;
    // Allow swiping in both directions, but usually right for dismiss
    this.currentX.set(diff);
  }

  @HostListener('touchend')
  onTouchEnd() {
    this.isSwiping.set(false);
    // Threshold: 100px to dismiss
    if (Math.abs(this.currentX()) > 100) {
      const exitDirection = this.currentX() > 0 ? 500 : -500;
      this.currentX.set(exitDirection);
      setTimeout(() => this.onDismiss.emit(), 150);
    } else {
      this.currentX.set(0); // Snap back to center
    }
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.service.pause(this.toast().id);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.service.resume(this.toast().id);
  }

  computedClass = computed(() =>
    cn(toastVariants({ variant: this.toast().variant ?? 'default' }), 'relative'),
  );
}
