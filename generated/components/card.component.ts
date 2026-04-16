import { Component } from "@angular/core";
import {
  LuminaCardContentDirective,
  LuminaCardDescriptionDirective,
  LuminaCardFooterDirective,
  LuminaCardHeaderDirective,
  LuminaCardTitleDirective,
  LuminaCardDirective,
} from "../components/ui/card";

@Component({
  standalone: true,
  imports: [
    LuminaCardContentDirective,
    LuminaCardDescriptionDirective,
    LuminaCardFooterDirective,
    LuminaCardHeaderDirective,
    LuminaCardTitleDirective,
    LuminaCardDirective,
  ],
  template: `<div lmCardContent>
    <div lmCardDescription>...</div>
    <div lmCardFooter>...</div>
    <div lmCardHeader>...</div>
    <div lmCardTitle>...</div>
    <div lmCard>...</div>
  </div>`,
})
export class CardComponent {}
