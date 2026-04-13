import {
  Component,
  signal,
  inject,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ElementRef,
  output,
} from '@angular/core';

import { Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

import { LuminaCalendarComponent } from './calendar.component';
import { CalendarValue } from './date-picker.types';

@Component({
  selector: 'lm-date-picker',
  standalone: true,
  imports: [LuminaCalendarComponent],
  template: `
    <div #trigger class="border rounded-md px-3 py-2 cursor-pointer" (click)="toggle()">
      {{ label() || 'Pick a date' }}
    </div>

    <ng-template #panel>
      <div class="bg-white border rounded-md shadow-md p-2" [style.width.px]="triggerWidth()">
        <lm-calendar [mode]="'single'" (valueChange)="onChange($event)" />
      </div>
    </ng-template>
  `,
})
export class LuminaDatePickerComponent {
  private overlay = inject(Overlay);
  private vcr = inject(ViewContainerRef);
  private el = inject(ElementRef);

  value = signal<CalendarValue | null>(null);
  valueChange = output<CalendarValue>();

  @ViewChild('panel') panel!: TemplateRef<any>;
  @ViewChild('trigger') trigger!: ElementRef<HTMLElement>;

  overlayRef: any;
  triggerWidth = signal(0);

  toggle() {
    this.overlayRef ? this.close() : this.open();
  }

  open() {
    this.triggerWidth.set(this.trigger.nativeElement.offsetWidth);

    const position = this.overlay
      .position()
      .flexibleConnectedTo(this.trigger.nativeElement)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: 8,
        },
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy: position,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });

    this.overlayRef.backdropClick().subscribe(() => this.close());

    this.overlayRef.attach(new TemplatePortal(this.panel, this.vcr));
  }

  close() {
    this.overlayRef?.dispose();
    this.overlayRef = null;
  }

  onChange(v: CalendarValue) {
    this.value.set(v);
    this.valueChange.emit(v);
    this.close();
  }

  label() {
    const v = this.value();
    if (!v) return '';

    return v.type === 'single'
      ? v.value.toLocaleDateString()
      : `${v.value.start.toLocaleDateString()} - ${v.value.end.toLocaleDateString()}`;
  }
}
