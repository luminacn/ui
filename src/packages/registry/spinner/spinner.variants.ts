import { cva } from '../../../lib/cva';

export const luminaSpinnerVariants = cva('animate-spin shrink-0', {
  variants: {
    variant: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      accent: 'text-accent',
      current: 'text-current',
      destructive: 'text-destructive',
    },
    size: {
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
      xl: 'h-12 w-12',
    },
  },
  defaultVariants: {
    variant: 'current',
    size: 'md',
  },
});
