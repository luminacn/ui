import { Component } from "@angular/core";
import { LuminaSeparatorDirective } from "../components/ui/separator";

@Component({
  standalone: true,
  imports: [LuminaSeparatorDirective],
  template: `<div lmSeparator></div>`,
})
export class SeparatorComponent {}
