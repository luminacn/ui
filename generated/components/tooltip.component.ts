import { Component } from "@angular/core";
import {
  LuminaTooltipComponent,
  LuminaTooltipDirective,
} from "../components/ui/tooltip";

@Component({
  standalone: true,
  imports: [LuminaTooltipComponent, LuminaTooltipDirective],
  template: `<lm-tooltip>
    <div lmTooltip>...</div>
  </lm-tooltip>`,
})
export class TooltipComponent {}
