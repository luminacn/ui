import { Directive, inject, input, HostListener, ElementRef } from '@angular/core';
import { LuminaNavigationMenuDirective } from './navigation-menu.directive';

@Directive({
  selector: '[lmNavigationMenuTrigger]',
  standalone: true,
  host: {
    '[attr.data-state]': 'isOpen() ? "open" : "closed"',
    '[attr.aria-expanded]': 'isOpen()',
    '[attr.aria-controls]': '"navigation-menu-content-" + value()', // Link trigger to menu
    tabindex: '0',
    role: 'button',
  },
})
export class LuminaNavigationMenuTriggerDirective {
  private el = inject(ElementRef);
  private menu = inject(LuminaNavigationMenuDirective);

  value = input.required<string>({ alias: 'lmNavigationMenuTrigger' });

  isOpen() {
    return this.menu.activeValue() === this.value();
  }

  @HostListener('mouseenter')
  onHover() {
    if (this.menu.triggerMode() === 'hover') {
      this.menu.setActive(this.value(), this.el.nativeElement);
    }
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    // If click mode, we toggle. If hover mode, click does nothing (or can follow a link).
    if (this.menu.triggerMode() === 'click') {
      event.preventDefault();
      const newValue = this.isOpen() ? null : this.value();
      this.menu.setActive(newValue, this.el.nativeElement);
    }
  }
}
