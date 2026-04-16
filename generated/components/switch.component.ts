import { Component } from "@angular/core";
import { LuminaSwitchComponent } from "../components/ui/switch";

@Component({
  standalone: true,
  imports: [LuminaSwitchComponent],
  template: `<lm-switch> </lm-switch>`,
})
export class SwitchComponent {}
