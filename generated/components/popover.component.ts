import { Component } from "@angular/core";
import {
  LuminaPopoverCloseDirective,
  LuminaPopoverContentComponent,
  LuminaPopoverDirective,
} from "../components/ui/popover";

@Component({
  standalone: true,
  imports: [
    LuminaPopoverCloseDirective,
    LuminaPopoverContentComponent,
    LuminaPopoverDirective,
  ],
  template: `<div lmPopoverClose>
    <div lmPopoverContent>...</div>
    <div lmPopover>...</div>
  </div>`,
})
export class PopoverComponent {}
