import { Component } from "@angular/core";
import {
  LuminaDialogCloseButtonComponent,
  LuminaDialogCloseDirective,
  LuminaDialogContentDirective,
  LuminaDialogDescriptionDirective,
  LuminaDialogFooterDirective,
  LuminaDialogHeaderDirective,
  LuminaDialogTitleDirective,
  LuminaDialogTriggerDirective,
  LuminaDialogService,
} from "../components/ui/dialog";

@Component({
  standalone: true,
  imports: [
    LuminaDialogCloseButtonComponent,
    LuminaDialogCloseDirective,
    LuminaDialogContentDirective,
    LuminaDialogDescriptionDirective,
    LuminaDialogFooterDirective,
    LuminaDialogHeaderDirective,
    LuminaDialogTitleDirective,
    LuminaDialogTriggerDirective,
    LuminaDialogService,
  ],
  template: `<button lmDialogCloseButton>
    <div lmDialogClose>...</div>
    <div lmDialogContent>...</div>
    <div lmDialogDescription>...</div>
    <div lmDialogFooter>...</div>
    <div lmDialogHeader>...</div>
    <div lmDialogTitle>...</div>
    <div lmDialogTrigger>...</div>
  </button>`,
})
export class DialogComponent {}
