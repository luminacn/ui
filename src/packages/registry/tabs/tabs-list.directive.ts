import { Directive, input, computed, inject, HostListener, contentChildren } from '@angular/core';
import { LuminaTabsDirective } from './tabs.directive';
import { LuminaTabsTriggerDirective } from './tabs-trigger.directive';
import { cn } from '../../../lib/cn';
import { tabsListVariants } from './tabs.variants';

@Directive({
  selector: '[lmTabsList]',
  standalone: true,
  host: {
    '[class]': 'computedClass()',
    'role': 'tablist',
    '[attr.aria-orientation]': 'tabs.orientation()',
  },
})
export class LuminaTabsListDirective {
  protected tabs = inject(LuminaTabsDirective);
  triggers = contentChildren(LuminaTabsTriggerDirective);
  align = input<'left' | 'center' | 'right' | 'stretch'>('center');
  userClass = input('', { alias: 'class' });

  computedClass = computed(() => {
    const isVertical = this.tabs.orientation() === 'vertical';
    const alignments = {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
      stretch: 'justify-stretch',
    };

    return cn(
      tabsListVariants({ variant: this.tabs.variant() }),
      isVertical ? 'flex-col h-auto w-fit' : 'h-10 flex-row w-full',
      !isVertical ? alignments[this.align()] : '',
      this.userClass(),
    );
  });

  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    const list = this.triggers();
    const currentIdx = list.findIndex((t) => t.isActive());
    let nextIdx: number | null = null;
    const isHorizontal = this.tabs.orientation() === 'horizontal';

    if (isHorizontal) {
      if (event.key === 'ArrowRight') nextIdx = (currentIdx + 1) % list.length;
      if (event.key === 'ArrowLeft') nextIdx = (currentIdx - 1 + list.length) % list.length;
    } else {
      if (event.key === 'ArrowDown') nextIdx = (currentIdx + 1) % list.length;
      if (event.key === 'ArrowUp') nextIdx = (currentIdx - 1 + list.length) % list.length;
    }

    if (event.key === 'Home') nextIdx = 0;
    if (event.key === 'End') nextIdx = list.length - 1;

    if (nextIdx !== null) {
      event.preventDefault();
      const target = list[nextIdx];
      this.tabs.value.set(target.value());
      target.el.nativeElement.focus();
    }
  }
}
