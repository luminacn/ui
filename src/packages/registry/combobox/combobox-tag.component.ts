import { Component, input } from '@angular/core';

@Component({
  selector: 'span[lmComboboxTag]',
  standalone: true,
  template: `
    <span class="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs">
      {{ label() }}
      <button class="ml-1 text-muted-foreground hover:text-foreground">×</button>
    </span>
  `,
})
export class LuminaComboboxTagComponent {
  label = input<string>('');
}
