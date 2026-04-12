import { cva } from '../../../lib/cva';

export const tooltipVariants = cva(
  'z-50 overflow-hidden rounded-md px-3 py-1.5 text-xs shadow-md animate-in fade-in zoom-in-95 duration-150',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        outline: 'border bg-popover text-popover-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);
