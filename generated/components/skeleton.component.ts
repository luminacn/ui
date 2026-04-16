import { Component } from "@angular/core";
import { LuminaSkeletonDirective } from "../components/ui/skeleton";

@Component({
  standalone: true,
  imports: [LuminaSkeletonDirective],
  template: `<div lmSkeleton></div>`,
})
export class SkeletonComponent {}
