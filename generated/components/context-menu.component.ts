import { Component } from '@angular/core';
import { LuminaContextMenuContentComponent, LuminaContextMenuItemDirective, LuminaContextMenuSeparatorDirective, LuminaContextMenuTriggerDirective } from '../components/ui/context-menu';

@Component({
  standalone: true,
  imports: [LuminaContextMenuContentComponent, LuminaContextMenuItemDirective, LuminaContextMenuSeparatorDirective, LuminaContextMenuTriggerDirective],
  template: `<div lmContextMenuItem>
        <div lmContextMenuContent>...</div>
        <div lmContextMenuSeparator>...</div>
        <div lmContextMenuTrigger>...</div>
    </div>`
})
export class Context-menuComponent {}