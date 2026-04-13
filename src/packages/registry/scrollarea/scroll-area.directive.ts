import { Directive, input, computed } from "@angular/core";
import { cn } from "../../../lib/cn";

@Directive({
  selector: "[lmScrollArea]",
  standalone: true,
  host: { "[class]": "computedClass()" },
})
export class LuminaScrollAreaDirective {
  userClass = input("", { alias: "class" });

  protected computedClass = computed(() =>
    cn(
      "h-full w-full overflow-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent",
      "hover:scrollbar-thumb-muted-foreground/50 transition-colors",
      this.userClass(),
    ),
  );
}
