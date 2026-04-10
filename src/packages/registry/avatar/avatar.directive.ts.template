import { Directive, input, signal, computed } from '@angular/core';
import { cn } from '../../../lib/cn';

@Directive({
  selector: 'img[lmAvatarImage]',
  standalone: true,
  host: {
    '[class]': 'classes()',
    '(error)': 'onError()',
  },
})
export class LuminaAvatarImageDirective {
  // If the image fails, we hide it so the fallback behind it shows up
  hasError = signal(false);

  classes = computed(() =>
    cn('aspect-square h-full w-full object-cover', this.hasError() ? 'hidden' : 'block'),
  );

  onError() {
    this.hasError.set(true);
  }
}

@Directive({
  selector: '[lmAvatarFallback]',
  standalone: true,
  host: {
    '[class]': 'classes()',
  },
})
export class LuminaAvatarFallbackDirective {
  userClass = input('', { alias: 'class' });

  classes = computed(() =>
    cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium',
      this.userClass(),
    ),
  );
}
