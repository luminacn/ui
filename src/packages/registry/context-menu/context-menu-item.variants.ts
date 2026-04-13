import { cva } from '../../../lib/cva';

export const contextMenuItemVariants = cva(
  'relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
  {
    variants: {
      variant: {
        default: `
          hover:bg-accent hover:text-accent-foreground
          focus:bg-accent focus:text-accent-foreground
          active:bg-accent/80 active:text-accent-foreground
          data-[cdk-menu-item-highlighted]:bg-accent
          data-[cdk-menu-item-highlighted]:text-accent-foreground
          `,

        destructive: `
          text-destructive
          hover:bg-destructive/10 hover:text-destructive
          focus:bg-destructive/10 focus:text-destructive
          active:bg-destructive/20
          data-[cdk-menu-item-highlighted]:bg-destructive/10
          data-[cdk-menu-item-highlighted]:text-destructive
          `,
      },
      inset: {
        true: 'pl-8',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      inset: false,
    },
  },
);
