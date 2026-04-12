import { cva } from '../../../lib/cva';

export const inputOtpVariants = cva(
  'h-10 w-10 rounded-md border border-input bg-background text-center text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-input focus:border-primary',
        filled: 'bg-muted border-transparent focus:bg-background focus:border-primary',
        error: 'border-destructive text-destructive focus:ring-destructive',
      },
      size: {
        default: 'h-10 w-10',
        lg: 'h-12 w-12 text-base',
        sm: 'h-8 w-8 text-xs',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);
