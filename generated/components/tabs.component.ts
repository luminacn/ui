import { Component } from '@angular/core';
import { LuminaTabsContentDirective, LuminaTabsListDirective, LuminaTabsTriggerDirective, LuminaTabsDirective } from '../components/ui/tabs';

@Component({
  standalone: true,
  imports: [LuminaTabsContentDirective, LuminaTabsListDirective, LuminaTabsTriggerDirective, LuminaTabsDirective],
  template: `<div lmTabs>
      <div lmTabsContent>...</div>
      <div lmTabsList>...</div>
      <div lmTabsTrigger>...</div>
    </div>`
})
export class TabsComponent {}