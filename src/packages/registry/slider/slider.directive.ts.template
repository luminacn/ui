import { Directive, input, computed } from "@angular/core";
import { cn } from "../../../lib/cn";

@Directive({
  selector: 'input[lmSlider][type="range"]',
  standalone: true,
  host: { "[class]": "computedClass()" },
})
export class LuminaSliderDirective {
  userClass = input("", { alias: "class" });

  protected computedClass = computed(() =>
    cn(
      "relative flex w-full touch-none select-none items-center",
      "accent-primary cursor-pointer disabled:pointer-events-none disabled:opacity-50",
      // Webkit styling for the track/thumb is handled via Tailwind plugin or global CSS
      this.userClass(),
    ),
  );
}
