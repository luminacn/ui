import { Directive, signal, input, ElementRef } from '@angular/core';

@Directive({
  selector: '[lmNavigationMenu]',
  standalone: true,
  // Add this to ensure the menu can detect when the mouse is over the container
  host: {
    '(mouseleave)': 'onMouseLeave()',
  },
})
export class LuminaNavigationMenuDirective {
  userClass = input('', { alias: 'class' });
  triggerMode = input<'hover' | 'click'>('hover');

  activeValue = signal<string | null>(null);
  triggerElement = signal<HTMLElement | null>(null);

  // Track if the mouse is currently over the menu viewport
  toggle(value: string, element: HTMLElement) {
    if (this.triggerMode() === 'click') {
      this.activeValue.set(this.activeValue() === value ? null : value);
      this.triggerElement.set(element);
    }
  }

  isViewportHovered = signal(false);
  private delayTimeout?: any;

  setActive(value: string | null, element?: HTMLElement) {
    if (this.delayTimeout) clearTimeout(this.delayTimeout);

    if (value === null) {
      // Add a small grace period (200ms) to allow moving from trigger to viewport
      this.delayTimeout = setTimeout(() => {
        if (!this.isViewportHovered()) {
          this.activeValue.set(null);
        }
      }, 200);
    } else {
      if (element) this.triggerElement.set(element);
      this.activeValue.set(value);
    }
  }

  // Call this from the Viewport (mouseenter="setViewportHover(true)")
  setViewportHover(isHovered: boolean) {
    this.isViewportHovered.set(isHovered);
    if (!isHovered) {
      // If leaving the viewport, trigger the closing sequence
      this.setActive(null);
    }
  }

  protected onMouseLeave() {
    if (this.triggerMode() === 'hover') {
      this.setActive(null);
    }
  }
}
