import { Component } from "@angular/core";
import { LuminaAlertDirective } from "../components/ui/alert";

@Component({
  standalone: true,
  imports: [LuminaAlertDirective],
  template: `<div lmAlert></div>`,
})
export class AlertComponent {}
