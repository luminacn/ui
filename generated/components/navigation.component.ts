import { Component } from "@angular/core";
import {
  LuminaNavigationMenuTriggerDirective,
  LuminaNavigationMenuViewportComponent,
  LuminaNavigationMenuDirective,
} from "../components/ui/navigation";

@Component({
  standalone: true,
  imports: [
    LuminaNavigationMenuTriggerDirective,
    LuminaNavigationMenuViewportComponent,
    LuminaNavigationMenuDirective,
  ],
  template: `<div lmNavigationMenu>
    <div lmNavigationMenuTrigger>...</div>
    <lm-navigation-menu-viewport>...</lm-navigation-menu-viewport>
  </div>`,
})
export class NavigationComponent {}
