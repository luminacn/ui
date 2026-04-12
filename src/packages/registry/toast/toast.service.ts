import { Injectable, signal } from '@angular/core';

// toast.service.ts
export interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success';
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
  duration?: number;
  remainingTime?: number;
  timerId?: any;
  action?: { label: string; onClick: () => void };
}

@Injectable({ providedIn: 'root' })
export class LuminaToastService {
  toasts = signal<Toast[]>([]);
  position = signal<Toast['position']>('top-right');

  show(toast: Omit<Toast, 'id'>) {
    if (toast.position) {
      this.position.set(toast.position);
    }

    const id = Math.random().toString(36).substring(2, 9);
    const duration = toast.duration ?? 3000;
    const newToast: Toast = {
      ...toast,
      id,
      duration,
      remainingTime: duration,
      position: toast.position ?? this.position(),
    };

    this.toasts.update((prev) => [...prev, newToast]);

    if (duration !== 0) {
      this.startTimer(id);
    }
    return id;
  }

  private startTimer(id: string) {
    this.toasts.update((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;

        const timerId = setTimeout(() => this.dismiss(id), t.remainingTime);
        return { ...t, timerId, startTime: Date.now() };
      }),
    );
  }

  pause(id: string) {
    this.toasts.update((prev) =>
      prev.map((t) => {
        if (t.id !== id || !t.timerId) return t;

        clearTimeout(t.timerId);
        const elapsed = Date.now() - (t as any).startTime;
        return {
          ...t,
          timerId: undefined,
          remainingTime: Math.max(0, (t.remainingTime ?? 0) - elapsed),
        };
      }),
    );
  }

  resume(id: string) {
    const toast = this.toasts().find((t) => t.id === id);
    if (toast && toast.duration !== 0) {
      this.startTimer(id);
    }
  }

  dismiss(id: string) {
    this.toasts.update((prev) => {
      const toast = prev.find((t) => t.id === id);
      if (toast?.timerId) clearTimeout(toast.timerId);
      return prev.filter((t) => t.id !== id);
    });
  }
}
