import { Component } from '@angular/core';
import { LuminaBreadcrumbItemDirective, LuminaBreadcrumbSeparatorDirective, LuminaBreadcrumbDirective } from '../components/ui/breadcrumb';

@Component({
  standalone: true,
  imports: [LuminaBreadcrumbItemDirective, LuminaBreadcrumbSeparatorDirective, LuminaBreadcrumbDirective],
  template: `<li lmBreadcrumbItem>
        <li lmBreadcrumbSeparator>...</li>
        <nav lmBreadcrumb>...</nav>
    </li>`
})
export class BreadcrumbComponent {}