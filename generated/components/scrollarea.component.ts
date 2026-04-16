import { Component } from "@angular/core";
import { LuminaScrollAreaDirective } from "../components/ui/scrollarea";

@Component({
  standalone: true,
  imports: [LuminaScrollAreaDirective],
  template: `<div lmScrollArea></div>`,
})
export class ScrollareaComponent {}
