import { Component, input, computed } from '@angular/core';
import { cn } from '../../../lib/cn';
import { avatarVariants } from './avatar.variants';
import { LmAvatarSize, LmAvatarShape } from './avatar.types';

@Component({
  selector: 'lm-avatar',
  standalone: true,
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
})
export class LuminaAvatarComponent {
  size = input<LmAvatarSize>('md');
  shape = input<LmAvatarShape>('circle');
  userClass = input('', { alias: 'class' });

  computedClass = computed(() =>
    cn(
      avatarVariants({
        size: this.size(),
        shape: this.shape(),
      }),
      this.userClass(),
    ),
  );
}
