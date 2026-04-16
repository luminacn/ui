import { Component } from "@angular/core";
import { LuminaSpinnerComponent } from "../components/ui/spinner";

@Component({
  standalone: true,
  imports: [LuminaSpinnerComponent],
  template: `<lm-spinner> </lm-spinner>`,
})
export class SpinnerComponent {}
