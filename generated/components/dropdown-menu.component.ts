import { Component } from '@angular/core';
import { LuminaDropdownMenuCheckboxItemComponent, LuminaDropdownMenuContentComponent, LuminaDropdownMenuGroupDirective, LuminaDropdownMenuIconDirective, LuminaDropdownMenuItemDirective, LuminaDropdownMenuLabelDirective, LuminaDropdownMenuRadioItemComponent, LuminaDropdownMenuSeparatorDirective, LuminaDropdownMenuShortcutDirective, LuminaDropdownMenuSubChevronDirective, LuminaDropdownMenuSubTriggerDirective, LuminaDropdownMenuTriggerDirective } from '../components/ui/dropdown-menu';

@Component({
  standalone: true,
  imports: [LuminaDropdownMenuCheckboxItemComponent, LuminaDropdownMenuContentComponent, LuminaDropdownMenuGroupDirective, LuminaDropdownMenuIconDirective, LuminaDropdownMenuItemDirective, LuminaDropdownMenuLabelDirective, LuminaDropdownMenuRadioItemComponent, LuminaDropdownMenuSeparatorDirective, LuminaDropdownMenuShortcutDirective, LuminaDropdownMenuSubChevronDirective, LuminaDropdownMenuSubTriggerDirective, LuminaDropdownMenuTriggerDirective],
  template: `<button lmDropdownMenuCheckboxItem>
        <div lmDropdownMenuContent>...</div>
        <div lmDropdownMenuGroup>...</div>
        <div lmDropdownMenuIcon>...</div>
        <div lmDropdownMenuItem>...</div>
        <div lmDropdownMenuLabel>...</div>
        <button lmDropdownMenuRadioItem>...</button>
        <div lmDropdownMenuSeparator>...</div>
        <div lmDropdownMenuShortcut>...</div>
        <div lmDropdownMenuSubChevron>...</div>
        <div lmDropdownMenuSubTrigger>...</div>
        <div lmDropdownMenuTrigger>...</div>
    </button>`
})
export class Dropdown-menuComponent {}