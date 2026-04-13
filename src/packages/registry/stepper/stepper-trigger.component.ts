import { Component, inject, computed } from '@angular/core';
import { LuminaStepperItemDirective } from './stepper-item.directive';
import { LuminaStepperDirective } from './stepper.directive';
import { cn } from '../../../lib/cn';

@Component({
  selector: 'button[lmStepperTrigger]',
  standalone: true,
  template: `
    <div class="flex items-center gap-3">
      <div [class]="circleClass()">
        @if (item.state() === 'completed') {
          <svg
            xmlns="http://w3.org"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M20 6 9 17l-5-5" ) />
            >
          </svg>
        } @else {
          <span class="text-xs font-bold">{{ item.index() + 1 }}</span>
        }
      </div>
      <div class="flex flex-col items-start leading-none">
        <ng-content />
      </div>
    </div>

    <!-- The Connector Line -->
    @if (!item.isLast()) {
      <div [class]="separatorClass()"></div>
    }
  `,
  host: {
    type: 'button',
    '[class]': 'computedClass()',
    '[disabled]': 'isDisabled()',
    '(click)': 'setStep()',
  },
})
export class LuminaStepperTriggerComponent {
  protected item = inject(LuminaStepperItemDirective);
  protected stepper = inject(LuminaStepperDirective);

  isDisabled = computed(() => {
    if (this.item.disabled()) return true;
    if (!this.stepper.linear()) return false;
    return this.item.index() > this.stepper.activeStep();
  });

  setStep() {
    if (!this.isDisabled()) {
      this.stepper.activeStep.set(this.item.index());
    }
  }

  circleClass = computed(() =>
    cn(
      'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300',
      this.item.state() === 'active'
        ? 'bg-primary border-primary text-primary-foreground shadow-md scale-110'
        : '',
      this.item.state() === 'completed'
        ? 'bg-primary border-primary text-primary-foreground'
        : 'border-muted bg-background text-muted-foreground',
    ),
  );

  separatorClass = computed(() =>
    cn(
      'transition-colors duration-500',
      this.stepper.orientation() === 'horizontal'
        ? 'mx-4 h-[2px] flex-1 bg-muted group-data-[state=completed]:bg-primary'
        : 'ml-[18px] my-2 h-10 w-[2px] bg-muted group-data-[state=completed]:bg-primary',
      // Logic to color the line based on state
      this.item.state() === 'completed' ? 'bg-primary' : 'bg-muted',
    ),
  );

  computedClass = computed(() =>
    cn(
      'flex items-center outline-none transition-all w-full text-left',
      this.stepper.orientation() === 'horizontal' ? 'flex-1' : 'flex-col items-start',
      this.item.state() === 'inactive' ? 'opacity-60 hover:opacity-100' : 'opacity-100',
    ),
  );
}
