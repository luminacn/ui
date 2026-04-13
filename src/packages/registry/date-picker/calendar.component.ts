import { Component, signal, computed, input, output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarValue, CalendarMode } from './date-picker.types';
import { LucideChevronLeft, LucideChevronRight, LucideChevronLast } from '@lucide/angular';

@Component({
  selector: 'lm-calendar',
  standalone: true,
  imports: [CommonModule, LucideChevronLeft, LucideChevronRight, LucideChevronLast],
  template: `
    <div class="flex gap-6 p-4 select-none">
      <!-- MONTH -->
      <div class="w-72">
        <!-- HEADER -->
        <div class="flex items-center justify-between mb-3">
          <button
            (click)="prevMonth()"
            class="p-2 rounded hover:bg-muted"
            aria-label="Previous month"
          >
            <svg lucideChevronLeft></svg>
          </button>

          <div class="text-sm font-medium">
            {{ monthLabel() }}
          </div>

          <button (click)="nextMonth()" class="p-2 rounded hover:bg-muted" aria-label="Next month">
            <svg lucideChevronRight></svg>
          </button>
        </div>

        <!-- DAYS HEADER -->
        <div
          class="grid grid-cols-7 text-[11px] text-muted-foreground mb-2 cursor-pointer"
          role="row"
        >
          <div class="text-center" *ngFor="let d of daysHeader">
            {{ d }}
          </div>
        </div>

        <!-- GRID -->
        <div
          class="grid grid-cols-7 gap-1"
          role="grid"
          [attr.aria-activedescendant]="'cell-' + activeIndex()"
        >
          <button
            *ngFor="let day of days(); let i = index"
            (click)="select(day)"
            (mouseenter)="hovered.set(day); activeIndex.set(i)"
            class="h-9 w-9 rounded-md text-sm flex items-center justify-center transition relative"
            role="gridcell"
            [attr.id]="'cell-' + i"
            [attr.aria-selected]="isSelected(day)"
            [attr.aria-disabled]="isDisabled(day)"
            [class.text-muted-foreground]="!isCurrentMonth(day)"
            [class.ring-1]="isToday(day)"
            [class.ring-primary]="isToday(day)"
            [class.bg-primary]="isSelected(day)"
            [class.text-white]="isSelected(day)"
          >
            <!-- 🟣 RANGE ANIMATION LAYER -->
            <span
              class="absolute inset-0 rounded-md transition-colors duration-150"
              [class.bg-muted]="isInRange(day)"
              [class.opacity-60]="isInRange(day)"
            ></span>

            <span class="relative z-10">
              {{ day.getDate() }}
            </span>
          </button>
        </div>
      </div>
    </div>
  `,
})
export class LuminaCalendarComponent {
  // ---------------- CONFIG ----------------
  mode = input<CalendarMode>('single');
  valueChange = output<CalendarValue>();

  // ---------------- STATE ----------------
  currentMonth = signal(new Date());

  selected = signal<Date | null>(null);

  rangeStart = signal<Date | null>(null);
  rangeEnd = signal<Date | null>(null);
  hovered = signal<Date | null>(null);

  activeIndex = signal(0);

  daysHeader = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  // ---------------- LABEL ----------------
  monthLabel = computed(() =>
    this.currentMonth().toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    }),
  );

  // ---------------- NAV ----------------
  prevMonth() {
    const d = new Date(this.currentMonth());
    d.setMonth(d.getMonth() - 1);
    this.currentMonth.set(d);
  }

  nextMonth() {
    const d = new Date(this.currentMonth());
    d.setMonth(d.getMonth() + 1);
    this.currentMonth.set(d);
  }

  // ---------------- GRID ----------------
  days = computed(() => {
    const base = this.currentMonth();
    const year = base.getFullYear();
    const month = base.getMonth();

    const first = new Date(year, month, 1);
    const offset = first.getDay();

    const result: Date[] = [];

    for (let i = offset; i > 0; i--) {
      result.push(new Date(year, month, 1 - i));
    }

    const last = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= last; i++) {
      result.push(new Date(year, month, i));
    }

    while (result.length < 42) {
      const lastDay = result[result.length - 1];
      result.push(new Date(lastDay.getFullYear(), lastDay.getMonth(), lastDay.getDate() + 1));
    }

    return result;
  });

  // ---------------- HELPERS ----------------
  isToday(d: Date) {
    const n = new Date();
    return (
      d.getDate() === n.getDate() &&
      d.getMonth() === n.getMonth() &&
      d.getFullYear() === n.getFullYear()
    );
  }

  isCurrentMonth(d: Date) {
    return d.getMonth() === this.currentMonth().getMonth();
  }

  isSelected(d: Date) {
    const s = this.selected();
    return s ? d.toDateString() === s.toDateString() : false;
  }

  isInRange(d: Date) {
    const start = this.rangeStart();
    const end = this.rangeEnd();
    const hover = this.hovered();

    if (!start) return false;

    if (!end && hover) {
      return d >= start && d <= hover;
    }

    if (!end) return false;

    return d >= start && d <= end;
  }

  isDisabled(d: Date) {
    return false;
  }

  // ---------------- SELECT ----------------
  select(date: Date) {
    if (this.mode() === 'single') {
      this.selected.set(date);

      this.valueChange.emit({
        type: 'single',
        value: date,
      });

      return;
    }

    const start = this.rangeStart();
    const end = this.rangeEnd();

    if (!start || end) {
      this.rangeStart.set(date);
      this.rangeEnd.set(null);
      return;
    }

    if (date < start) {
      this.rangeStart.set(date);
    } else {
      this.rangeEnd.set(date);

      this.valueChange.emit({
        type: 'range',
        value: { start, end: date },
      });
    }
  }

  // ---------------- KEYBOARD NAV (🔥 FINAL) ----------------

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    const days = this.days();
    let index = this.activeIndex();

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        index = Math.min(index + 1, days.length - 1);
        break;

      case 'ArrowLeft':
        e.preventDefault();
        index = Math.max(index - 1, 0);
        break;

      case 'ArrowDown':
        e.preventDefault();
        index = Math.min(index + 7, days.length - 1);
        break;

      case 'ArrowUp':
        e.preventDefault();
        index = Math.max(index - 7, 0);
        break;

      case 'Enter':
        e.preventDefault();
        this.select(days[index]);
        return;

      case 'Escape':
        e.preventDefault();
        this.hovered.set(null);
        return;
    }

    this.activeIndex.set(index);
    this.hovered.set(days[index]);
  }
}
