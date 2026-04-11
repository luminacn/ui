import { cva } from '../../../lib/cva';

export const dropdownMenuContentVariants = cva(
  'lm-dropdown-menu z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
  {
    variants: {
      variant: { default: '' },
    },
    defaultVariants: { variant: 'default' },
  },
);

export const dropdownMenuItemVariants = cva(
  'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full',
  {
    variants: {
      variant: {
        default: 'focus:bg-accent focus:text-accent-foreground',
        destructive: 'text-destructive focus:bg-destructive/10 focus:text-destructive',
      },
      inset: { true: 'pl-8', false: '' },
    },
    defaultVariants: {
      variant: 'default',
      inset: false,
    },
  },
);
