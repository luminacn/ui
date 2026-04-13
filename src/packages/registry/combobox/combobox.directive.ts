import {
  Directive,
  signal,
  computed,
  input,
  HostListener,
  ElementRef,
  inject,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Directive({
  selector: '[lmCombobox]',
  standalone: true,
  exportAs: 'lmCombobox',
})
export class LuminaComboboxDirective {
  private el = inject(ElementRef<HTMLElement>);
  private overlay = inject(Overlay);
  private vcr = inject(ViewContainerRef);

  // ----------------------------
  // CONFIG
  // ----------------------------
  mode = input<'single' | 'multiple'>('single');
  items = input<any[]>([]);
  valueKey = input<string>('id');
  labelKey = input<string>('name'); // 🔥 NEW

  // ----------------------------
  // STATE
  // ----------------------------
  value = signal<(string | number)[]>([]);
  open = signal(false);
  query = signal('');
  activeIndex = signal(0);

  // ----------------------------
  // ARIA
  // ----------------------------
  listId = `lm-combobox-${Math.random().toString(36).slice(2)}`;

  // ----------------------------
  // OVERLAY
  // ----------------------------
  private overlayRef: OverlayRef | null = null;

  // ----------------------------
  // COMPUTED
  // ----------------------------
  isMultiple = computed(() => this.mode() === 'multiple');
  isOpen = computed(() => this.open());

  // 🔥 DISPLAY VALUE (IMPORTANT)
  displayValue = computed(() => {
    if (this.isMultiple()) return this.query();

    const selected = this.getSelectedItems()[0];
    if (!selected) return this.query();

    const key = this.labelKey();
    return typeof selected === 'object' ? String(selected[key]) : String(selected);
  });

  // ----------------------------
  // OPEN
  // ----------------------------
  openPanel(content: TemplateRef<any>, origin: HTMLElement) {
    if (this.overlayRef) return;

    const width = origin.getBoundingClientRect().width;

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(origin)
      .withFlexibleDimensions(false)
      .withPush(true)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: 6,
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
          offsetY: -6,
        },
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      width, // 🔥 THIS FIXES WIDTH
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      panelClass: 'lm-combobox-pane',
    });

    this.overlayRef.backdropClick().subscribe(() => this.close());

    const portal = new TemplatePortal(content, this.vcr);
    this.overlayRef.attach(portal);

    this.open.set(true);

    queueMicrotask(() => {
      const input = this.el.nativeElement.querySelector('input');
      input?.focus();
    });
  }

  // ----------------------------
  // CLOSE
  // ----------------------------
  close() {
    this.overlayRef?.dispose();
    this.overlayRef = null;
    this.open.set(false);
    this.activeIndex.set(0);
  }

  @HostListener('document:pointerdown', ['$event'])
  onOutside(event: PointerEvent) {
    if (!this.el.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }

  // ----------------------------
  // KEYBOARD
  // ----------------------------
  @HostListener('keydown.arrowdown', ['$event'])
  onDown(e: Event) {
    e.preventDefault();
    const max = this.filteredItems().length - 1;
    this.activeIndex.set(Math.min(max, this.activeIndex() + 1));
  }

  @HostListener('keydown.arrowup', ['$event'])
  onUp(e: Event) {
    e.preventDefault();
    this.activeIndex.set(Math.max(0, this.activeIndex() - 1));
  }

  @HostListener('keydown.enter', ['$event'])
  onEnter(e: Event) {
    e.preventDefault();
    const item = this.filteredItems()[this.activeIndex()];
    if (item) this.toggleValue(item);
  }

  @HostListener('keydown.escape')
  onEscape() {
    this.close();
  }

  // ----------------------------
  // SEARCH (FIXED)
  // ----------------------------
  filteredItems = computed(() => {
    const q = this.query().trim().toLowerCase();
    const items = this.items();
    const key = this.labelKey();

    const result = !q
      ? items
      : items.filter((item) => {
          const label =
            typeof item === 'object' ? String(item[key]).toLowerCase() : String(item).toLowerCase();

          return label.includes(q);
        });

    // 🔥 reset active index safely
    queueMicrotask(() => {
      if (this.activeIndex() >= result.length) {
        this.activeIndex.set(0);
      }
    });

    return result;
  });

  // ----------------------------
  // HELPERS
  // ----------------------------
  private getId(item: any): string | number {
    const key = this.valueKey();
    return typeof item === 'object' ? item?.[key] : item;
  }

  // ----------------------------
  // SELECTION
  // ----------------------------
  isSelected = (item: any) => this.value().includes(this.getId(item));

  toggleValue(item: any) {
    const id = this.getId(item);

    if (!this.isMultiple()) {
      this.value.set([id]);
      this.query.set(''); // 🔥 clear search
      this.close();
      return;
    }

    const exists = this.value().includes(id);

    this.value.update((v) => (exists ? v.filter((x) => x !== id) : [...v, id]));
  }

  // ----------------------------
  // RESOLVER
  // ----------------------------
  getSelectedItems = computed(() => {
    const ids = this.value();
    return this.items().filter((i) => ids.includes(this.getId(i)));
  });

  // ----------------------------
  // ACTIVE STATE
  // ----------------------------
  isActive = (i: number) => i === this.activeIndex();
}
