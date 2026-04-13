import { cva } from '../../../lib/cva';
import { LuminaAlertVariant } from './alert.types';

export const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground [&>svg]:text-foreground',
        destructive:
          'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
        success:
          'border-emerald-500/50 text-emerald-600 dark:text-emerald-400 [&>svg]:text-emerald-600 dark:[&>svg]:text-emerald-400',
        warning:
          'border-amber-500/50 text-amber-600 dark:text-amber-400 [&>svg]:text-amber-600 dark:[&>svg]:text-amber-400',
      } as Record<LuminaAlertVariant, string>,
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);
