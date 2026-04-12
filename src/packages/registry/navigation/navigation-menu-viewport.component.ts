import {
  Component,
  inject,
  computed,
  signal,
  viewChild,
  ElementRef,
  effect,
  afterRenderEffect,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { LuminaNavigationMenuDirective } from './navigation-menu.directive';
import { cn } from '../../../lib/cn';

@Component({
  selector: 'lm-navigation-menu-viewport',
  standalone: true,
  template: `
    <div
      [class]="computedClass()"
      [style.left.px]="leftOffset()"
      [style.width.px]="size().width"
      [style.height.px]="size().height"
    >
      <div #wrapper class="w-max h-max">
        <ng-content />
      </div>
    </div>
  `,
  host: { '[attr.data-state]': 'state()' },
})
export class LuminaNavigationMenuViewportComponent implements AfterViewInit, OnDestroy {
  private menu = inject(LuminaNavigationMenuDirective);
  private wrapper = viewChild.required<ElementRef>('wrapper');

  // FIX: Inject ElementRef here to access the component's host element
  private elementRef = inject(ElementRef);

  size = signal({ width: 0, height: 0 });
  triggerRect = signal<{ left: number; width: number } | null>(null);

  constructor() {
    afterRenderEffect(() => {
      if (this.menu.activeValue()) {
        this.updatePosition();
      }
    });

    effect((onCleanup) => {
      const handler = () => this.updatePosition();
      window.addEventListener('resize', handler);
      onCleanup(() => window.removeEventListener('resize', handler));
    });
  }

  state = computed(() => (this.menu.activeValue() ? 'open' : 'closed'));

  private updatePosition() {
    const triggerEl = this.menu.triggerElement();
    const hostEl = this.elementRef.nativeElement;

    if (triggerEl && hostEl.offsetParent) {
      const triggerRect = triggerEl.getBoundingClientRect();
      const parentRect = hostEl.offsetParent.getBoundingClientRect();

      // Align to the left edge of the trigger
      const relativeLeft = triggerRect.left - parentRect.left;

      this.triggerRect.set({
        left: relativeLeft,
        width: triggerRect.width,
      } as DOMRect);
    }
  }

  leftOffset = computed(() => {
    const rect = this.triggerRect();
    return rect ? rect.left : 0; // No more + width / 2
  });

  protected computedClass = computed(() =>
    cn(
      'absolute top-full mt-2 z-50 overflow-hidden rounded-md border bg-popover shadow-lg',
      // Ensure all size properties are transitionable
      'transition-all duration-300 ease-out',
      this.state() === 'closed' ? 'opacity-0 pointer-events-none' : 'opacity-100',
    ),
  );
  // Replace measureContent with this ResizeObserver implementation
  private resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const { width, height } = entry.contentRect;
      requestAnimationFrame(() => {
        this.size.set({ width, height });
      });
    }
  });

  ngAfterViewInit() {
    this.resizeObserver.observe(this.wrapper().nativeElement);
  }

  ngOnDestroy() {
    this.resizeObserver.disconnect();
  }
}
