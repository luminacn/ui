import { cva } from '../../../lib/cva';

export const popoverContentVariants = cva(
  'z-50 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none animate-in fade-in zoom-in-95 duration-200',
  {
    variants: {
      size: {
        default: 'w-72',
        lg: 'w-96',
        full: 'w-[calc(100vw-2rem)] sm:w-[450px]',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);
