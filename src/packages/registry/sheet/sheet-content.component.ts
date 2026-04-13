import { Component, input, computed, inject, signal } from '@angular/core';
import { cn } from '../../../lib/cn';
import { sheetVariants } from './sheet.variants';
import { LucideX } from '@lucide/angular';
import { LuminaSheetService } from './sheet.service';

@Component({
  selector: 'lm-sheet-content',
  standalone: true,
  imports: [LucideX],
  host: {
    '(touchstart)': 'onTouchStart($event)',
    '(touchmove)': 'onTouchMove($event)',
    '(touchend)': 'onTouchEnd()',
    '[style.transform]': 'translateStyle()',
    '[style.transition]': 'isDragging() ? "none" : ""',
  },
  template: `
    <div [class]="computedClass()" [attr.data-state]="state()">
      <ng-content />
      <button (click)="close()" class="absolute right-4 top-4 opacity-70 hover:opacity-100">
        <svg lucideX class="h-4 w-4"></svg>
      </button>
    </div>
  `,
})
export class LuminaSheetContentComponent {
  private sheetService = inject(LuminaSheetService);

  side = input<'top' | 'bottom' | 'left' | 'right'>('right');
  userClass = input('', { alias: 'class' });

  // Swipe State
  protected isDragging = signal(false);
  private startX = 0;
  private currentX = signal(0);

  protected state = computed(() => (this.sheetService.isOpen() ? 'open' : 'closed'));

  protected translateStyle = computed(() => {
    if (!this.isDragging() || this.side() !== 'right') return '';
    // Only allow swiping to the right (positive X)
    const x = Math.max(0, this.currentX());
    return `translateX(${x}px)`;
  });

  protected computedClass = computed(() =>
    cn(sheetVariants({ side: this.side() }), this.userClass()),
  );

  onTouchStart(event: TouchEvent) {
    const target = event.target as HTMLElement;
    // If the user touched the close button, don't start a drag
    if (target.closest('button')) return;

    this.startX = event.touches[0].clientX;
    this.isDragging.set(true);
  }

  onTouchMove(event: TouchEvent) {
    const moveX = event.touches[0].clientX;
    this.currentX.set(moveX - this.startX);
  }

  onTouchEnd() {
    this.isDragging.set(false);
    const swipeDistance = this.currentX();
    const screenWidth = window.innerWidth;

    if (swipeDistance > screenWidth * 0.3 && this.side() === 'right') {
      this.close();
    } else {
      this.currentX.set(0);
    }
  }

  close(event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.isDragging.set(false);
    this.sheetService.closeWithAnimation();
  }
}
