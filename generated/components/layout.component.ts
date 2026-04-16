import { Component } from "@angular/core";
import {
  LuminaAspectRatioDirective,
  LuminaContainerDirective,
  LuminaSectionDirective,
} from "../components/ui/layout";

@Component({
  standalone: true,
  imports: [
    LuminaAspectRatioDirective,
    LuminaContainerDirective,
    LuminaSectionDirective,
  ],
  template: `<div lmAspectRatio>
    <div lmContainer>...</div>
    <section lmSection>...</section>
  </div>`,
})
export class LayoutComponent {}
