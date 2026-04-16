import { Component } from '@angular/core';
import { LuminaInfiniteScrollDirective } from '../components/ui/infinite-scroll';

@Component({
  standalone: true,
  imports: [LuminaInfiniteScrollDirective],
  template: `<div lmInfiniteScroll>
    </div>`
})
export class Infinite-scrollComponent {}