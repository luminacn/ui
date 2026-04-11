import { Injectable, inject } from '@angular/core';
import { Dialog, DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';

export interface LmDialogConfig<D = any> extends DialogConfig<D> {
  persistent?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  variant?: 'default' | 'destructive';
}

@Injectable({ providedIn: 'root' })
export class LuminaDialogService {
  private dialog = inject(Dialog);

  open<R = any, D = any>(
    component: ComponentType<any>,
    config?: LmDialogConfig<D>,
  ): DialogRef<R, any> {
    const {
      persistent = false,
      hasBackdrop = true,
      size = 'md', // Default from your variants
      variant = 'default', // Default from your variants
      panelClass,
      backdropClass,
      data,
      ...rest
    } = config || {};

    const normalize = (v?: string | string[]) => (!v ? [] : Array.isArray(v) ? v : [v]);

    const mergedConfig: any = {
      ...rest,
      // 1. Allow the container to fill the screen width so variants can work
      maxWidth: size === 'full' ? '100vw' : '100vw',

      // 2. Setting a hard 50vh height is why it looks like a thin strip.
      // Set it to 'none' or a much higher value so it grows with content.
      maxHeight: size === 'full' ? '100vh' : '90vh',
      hasBackdrop,
      disableClose: persistent,
      // Pass size and variant through the data token
      data: { ...data, size, variant },
      panelClass: [
        'lm-dialog-panel',
        `lm-dialog-${size}`, // This adds 'lm-dialog-full' to the wrapper
        persistent ? 'is-persistent' : '',
        ...normalize(panelClass),
      ],
      backdropClass: ['lm-dialog-backdrop', ...normalize(backdropClass)],
    };

    return this.dialog.open<R, D>(component, mergedConfig);
  }

  closeAll() {
    this.dialog.closeAll();
  }
}
