import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import {
  Overlay,
  OverlayRef,
  ScrollStrategyOptions,
  ConnectedPosition,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ConfigurableFocusTrap, ConfigurableFocusTrapFactory } from '@angular/cdk/a11y';
import { filter } from 'rxjs/operators'; // Ensure this is imported

@Directive({
  selector: '[lmPopover]',
  standalone: true,
  exportAs: 'lmPopover',
})
export class LuminaPopoverDirective implements OnDestroy {
  private overlay = inject(Overlay);
  private elementRef = inject(ElementRef);
  private vcr = inject(ViewContainerRef);
  private scrollStrategy = inject(ScrollStrategyOptions);
  private focusTrapFactory = inject(ConfigurableFocusTrapFactory);

  content = input.required<TemplateRef<any>>({ alias: 'lmPopover' });
  align = input<'start' | 'center' | 'end'>('center');

  private overlayRef: OverlayRef | null = null;
  private focusTrap: ConfigurableFocusTrap | null = null;

  @HostListener('click')
  toggle() {
    this.overlayRef ? this.close() : this.open();
  }

  open() {
    if (this.overlayRef) return;

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions(this.getPositions());

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.scrollStrategy.reposition(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      panelClass: 'lm-popover-pane',
    });

    this.overlayRef.backdropClick().subscribe(() => this.close());

    // --- ADD THIS BLOCK FOR ESCAPE KEY ---
    this.overlayRef
      .keydownEvents()
      .pipe(filter((event) => event.key === 'Escape'))
      .subscribe(() => this.close());
    // -------------------------------------

    const portal = new TemplatePortal(this.content(), this.vcr);
    this.overlayRef.attach(portal);

    this.focusTrap = this.focusTrapFactory.create(this.overlayRef.overlayElement);
    this.focusTrap.focusInitialElementWhenReady();
  }

  private getPositions(): ConnectedPosition[] {
    const align = this.align();
    const xMap: Record<string, 'start' | 'center' | 'end'> = {
      start: 'start',
      center: 'center',
      end: 'end',
    };
    return [
      {
        originX: xMap[align],
        originY: 'bottom',
        overlayX: xMap[align],
        overlayY: 'top',
        offsetY: 8,
      },
      {
        originX: xMap[align],
        originY: 'top',
        overlayX: xMap[align],
        overlayY: 'bottom',
        offsetY: -8,
      },
    ];
  }

  close() {
    this.focusTrap?.destroy();
    this.overlayRef?.dispose();
    this.overlayRef = null;
  }

  ngOnDestroy() {
    this.close();
  }
}
