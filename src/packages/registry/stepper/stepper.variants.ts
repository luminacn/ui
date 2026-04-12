import { cva } from '../../../lib/cva';

export const stepperTriggerVariants = cva(
  'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300',
  {
    variants: {
      state: {
        inactive: 'border-muted bg-background text-muted-foreground',
        active: 'bg-primary border-primary text-primary-foreground shadow-md scale-110',
        completed: 'bg-primary border-primary text-primary-foreground',
      },
    },
    defaultVariants: {
      state: 'inactive',
    },
  },
);
