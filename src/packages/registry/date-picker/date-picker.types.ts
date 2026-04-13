export type DatePickerMode = 'single' | 'range';

export interface DateRange {
  start: Date;
  end: Date;
}

export type CalendarMode = 'single' | 'range';

export type CalendarValue =
  | { type: 'single'; value: Date }
  | { type: 'range'; value: { start: Date; end: Date } };
