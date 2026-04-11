import { Directive } from '@angular/core';
import { CdkMenuTrigger } from '@angular/cdk/menu';

@Directive({
  selector: '[lmDropdownMenuTrigger]',
  standalone: true,
  // We re-export the input so the user can still use [lmDropdownMenuTrigger]="menu"
  hostDirectives: [
    {
      directive: CdkMenuTrigger,
      inputs: ['cdkMenuTriggerFor: lmDropdownMenuTrigger'],
    },
  ],
})
export class LuminaDropdownMenuTriggerDirective {}
