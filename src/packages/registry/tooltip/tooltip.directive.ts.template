import { Directive, ElementRef, HostListener, inject, input, OnDestroy } from '@angular/core';
import {
  Overlay,
  OverlayRef,
  ScrollStrategyOptions,
  ConnectedPosition,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { LuminaTooltipComponent } from './tooltip.component';

@Directive({
  selector: '[lmTooltip]',
  standalone: true,
})
export class LuminaTooltipDirective implements OnDestroy {
  private overlay = inject(Overlay);
  private elementRef = inject(ElementRef);
  private scrollStrategy = inject(ScrollStrategyOptions);

  content = input.required<string>({ alias: 'lmTooltip' });
  position = input<'top' | 'bottom' | 'left' | 'right'>('top');
  variant = input<'default' | 'outline'>('default');

  // V2: Delay configurations
  showDelay = input<number>(200);
  hideDelay = input<number>(150);

  private overlayRef: OverlayRef | null = null;
  private timeoutId: any;

  @HostListener('mouseenter')
  @HostListener('focus')
  show() {
    this.clearTimer();

    // Only delay if it's not already open
    if (this.overlayRef) return;

    this.timeoutId = setTimeout(() => {
      this.createOverlay();
    }, this.showDelay());
  }

  private createOverlay() {
    if (this.overlayRef) return;

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions(this.getPositions());

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.scrollStrategy.reposition(),
      panelClass: 'lm-tooltip-pane',
    });

    const portal = new ComponentPortal<LuminaTooltipComponent>(LuminaTooltipComponent);
    const componentRef = this.overlayRef.attach(portal);

    componentRef.instance.content.set(this.content());
    componentRef.instance.variant.set(this.variant());
  }

  private getPositions(): ConnectedPosition[] {
    const offset = 8;
    const primary = this.position();

    const posMap: Record<string, ConnectedPosition> = {
      top: {
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom',
        offsetY: -offset,
      },
      bottom: {
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top',
        offsetY: offset,
      },
      left: {
        originX: 'start',
        originY: 'center',
        overlayX: 'end',
        overlayY: 'center',
        offsetX: -offset,
      },
      right: {
        originX: 'end',
        originY: 'center',
        overlayX: 'start',
        overlayY: 'center',
        offsetX: offset,
      },
    };

    const fallbacks = Object.keys(posMap)
      .filter((k) => k !== primary)
      .map((k) => posMap[k]);

    return [posMap[primary], ...fallbacks];
  }

  @HostListener('mouseleave')
  @HostListener('blur')
  hide() {
    this.clearTimer();

    // V2: Delay hiding so it doesn't "blink" out instantly
    this.timeoutId = setTimeout(() => {
      this.overlayRef?.dispose();
      this.overlayRef = null;
    }, this.hideDelay());
  }

  private clearTimer() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  ngOnDestroy() {
    this.hide();
  }
}
