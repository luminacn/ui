import { inject, Injectable, Type, TemplateRef, ViewContainerRef, signal } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';

export interface SheetConfig {
  side?: 'left' | 'right' | 'top' | 'bottom';
  viewContainerRef?: ViewContainerRef;
}

@Injectable({ providedIn: 'root' })
export class LuminaSheetService {
  private overlay = inject(Overlay);
  private activeOverlayRef: OverlayRef | null = null;
  private isClosing = false;

  // Track state for animations
  isOpen = signal(false);

  open<T>(content: Type<T> | TemplateRef<T>, config: SheetConfig = { side: 'right' }) {
    this.close(); // Instant clear of any old ones

    const overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop',
      positionStrategy: this.overlay.position().global(),
      scrollStrategy: this.overlay.scrollStrategies.block(),
    });

    this.activeOverlayRef = overlayRef;

    const portal =
      content instanceof TemplateRef
        ? new TemplatePortal(content, config.viewContainerRef!)
        : new ComponentPortal(content);

    overlayRef.attach(portal);
    this.isOpen.set(true);

    overlayRef.backdropClick().subscribe(() => this.closeWithAnimation());

    overlayRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') this.closeWithAnimation();
    });

    return overlayRef;
  }

  closeWithAnimation() {
    if (!this.activeOverlayRef || !this.isOpen() || this.isClosing) return;

    this.isClosing = true;
    this.isOpen.set(false);

    // Elite: Sync backdrop fade for mobile
    const backdrop = this.activeOverlayRef.backdropElement;
    if (backdrop) {
      backdrop.style.transition = 'opacity 300ms var(--ease-lumina)';
      backdrop.style.opacity = '0';
    }

    setTimeout(() => {
      this.close();
      this.isClosing = false; // Reset after disposal
    }, 300);
  }

  close() {
    if (this.activeOverlayRef) {
      this.activeOverlayRef.dispose();
      this.activeOverlayRef = null;
    }
  }
}
