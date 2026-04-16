import { Component } from '@angular/core';
import { LuminaCalendarComponent, LuminaDatePickerComponent } from '../components/ui/date-picker';

@Component({
  standalone: true,
  imports: [LuminaCalendarComponent, LuminaDatePickerComponent],
  template: `<lm-calendar>
        <lm-date-picker>...</lm-date-picker>
    </lm-calendar>`
})
export class Date-pickerComponent {}