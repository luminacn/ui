import { cva } from '../../../lib/cva';

export type LuminaProgressVariant = 'default' | 'success' | 'destructive' | 'warning';

export const progressVariants = cva(
  'h-full w-full flex-1 transition-transform duration-500 ease-in-out',
  {
    variants: {
      variant: {
        default: 'bg-primary',
        success: 'bg-emerald-500',
        destructive: 'bg-destructive',
        warning: 'bg-amber-500',
        // This handles the indeterminate styling
        indeterminate: 'bg-primary origin-left animate-progress-indeterminate',
      } as Record<LuminaProgressVariant | 'indeterminate', string>,
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);
