import { cva } from '../../../lib/cva';

export const navigationMenuVariants = cva(
  'group relative z-10 flex max-w-max flex-1 items-center justify-center',
  {
    variants: {
      orientation: {
        horizontal: 'flex-row space-x-1',
        vertical: 'flex-col space-y-1',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  },
);

export const navigationMenuTriggerVariants = cva(
  'group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50',
);
