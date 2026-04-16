import { Component } from '@angular/core';
import { LuminaH1Directive, LuminaLeadDirective, LuminaHrDirective, LuminaUlDirective, LuminaPDirective } from '../components/ui/typography';

@Component({
  standalone: true,
  imports: [LuminaH1Directive, LuminaLeadDirective, LuminaHrDirective, LuminaUlDirective, LuminaPDirective],
  template: `<h1 lmH1>
        <div lmLead>...</div>
        <hr lmHr>...</hr>
        <ul lmUl>...</ul>
        <p lmP>...</p>
    </h1>`
})
export class TypographyComponent {}