import { Component } from '@angular/core';
import { LuminaCollapsibleDirective } from '../components/ui/collapsible';

@Component({
  standalone: true,
  imports: [LuminaCollapsibleDirective],
  template: `<div lmCollapsible></div>`
})
export class CollapsibleComponent {}