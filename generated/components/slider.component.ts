import { Component } from "@angular/core";
import { LuminaSliderDirective } from "../components/ui/slider";

@Component({
  standalone: true,
  imports: [LuminaSliderDirective],
  template: `<input lmSlider>
    </input>`,
})
export class SliderComponent {}
