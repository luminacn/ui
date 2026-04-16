import { Component } from '@angular/core';
import { LuminaBadgeDirective } from '../components/ui/badge';

@Component({
  standalone: true,
  imports: [LuminaBadgeDirective],
  template: `<div lmBadge></div>`
})
export class BadgeComponent {}