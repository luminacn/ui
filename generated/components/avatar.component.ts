import { Component } from '@angular/core';
import { LuminaAvatarComponent, LuminaAvatarImageDirective } from '../components/ui/avatar';

@Component({
  standalone: true,
  imports: [LuminaAvatarComponent, LuminaAvatarImageDirective],
  template: `<lm-avatar>
        <img lmAvatarImage>...</img>
    </lm-avatar>`
})
export class AvatarComponent {}