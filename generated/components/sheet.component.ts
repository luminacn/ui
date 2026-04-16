import { Component } from "@angular/core";
import {
  LuminaSheetContentComponent,
  LuminaSheetDescriptionDirective,
  LuminaSheetFooterDirective,
  LuminaSheetHeaderDirective,
  LuminaSheetTitleDirective,
  LuminaSheetTriggerDirective,
  LuminaSheetService,
} from "../components/ui/sheet";

@Component({
  standalone: true,
  imports: [
    LuminaSheetContentComponent,
    LuminaSheetDescriptionDirective,
    LuminaSheetFooterDirective,
    LuminaSheetHeaderDirective,
    LuminaSheetTitleDirective,
    LuminaSheetTriggerDirective,
    LuminaSheetService,
  ],
  template: `<div lmSheetDescription>
    <lm-sheet-content>...</lm-sheet-content>
    <div lmSheetFooter>...</div>
    <div lmSheetHeader>...</div>
    <div lmSheetTitle>...</div>
    <div lmSheetTrigger>...</div>
  </div>`,
})
export class SheetComponent {}
