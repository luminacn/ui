import { Directive, HostListener, inject, input } from '@angular/core';
import { CdkContextMenuTrigger } from '@angular/cdk/menu';

@Directive({
  selector: '[lmContextMenuTrigger]',
  standalone: true,
  hostDirectives: [
    {
      directive: CdkContextMenuTrigger,
      inputs: ['cdkContextMenuTriggerFor: lmContextMenuTrigger'],
    },
  ],
})
export class LuminaContextMenuTriggerDirective {
  private trigger = inject(CdkContextMenuTrigger);

  menu = input<any>(null);

  @HostListener('contextmenu', ['$event'])
  onRightClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    // 🔥 KEY: open at cursor position
    this.trigger.open({
      x: event.clientX,
      y: event.clientY,
    } as any);
    queueMicrotask(() => {
      const active = document.querySelector(
        '[data-cdk-menu-item-highlighted]',
      ) as HTMLElement | null;

      active?.blur();
    });
  }
}
