import { Component } from "@angular/core";
import {
  LuminaAccordionContentDirective,
  LuminaAccordionItemDirective,
  LuminaAccordionTriggerComponent,
  LuminaAccordionDirective,
} from "../components/ui/accordion";

@Component({
  standalone: true,
  imports: [
    LuminaAccordionContentDirective,
    LuminaAccordionItemDirective,
    LuminaAccordionTriggerComponent,
    LuminaAccordionDirective,
  ],
  template: `<div lmAccordion>
    <div lmAccordionContent>...</div>
    <div lmAccordionItem>...</div>
    <button lmAccordionTrigger>...</button>
  </div>`,
})
export class AccordionComponent {}
