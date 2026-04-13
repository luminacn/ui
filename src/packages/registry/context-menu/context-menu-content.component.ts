import {
  Component,
  input,
  computed,
  ViewEncapsulation,
  AfterViewInit,
  ElementRef,
  inject,
} from '@angular/core';
import { CdkMenu } from '@angular/cdk/menu';
import { cn } from '../../../lib/cn';
import { contextMenuContentVariants } from './context-menu.variants';

@Component({
  selector: 'div[lmContextMenuContent]',
  standalone: true,
  hostDirectives: [CdkMenu],
  template: `<ng-content />`,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'computedClass()',
    role: 'menu',
    tabindex: '-1',
    '[attr.data-active]': 'false',
  },
})
export class LuminaContextMenuContentComponent implements AfterViewInit {
  userClass = input('', { alias: 'class' });

  private el = inject(ElementRef<HTMLElement>);

  computedClass = computed(() => cn(contextMenuContentVariants(), this.userClass()));

  ngAfterViewInit() {
    // ensures hover works immediately on open
    queueMicrotask(() => this.el.nativeElement.focus());
  }
}
