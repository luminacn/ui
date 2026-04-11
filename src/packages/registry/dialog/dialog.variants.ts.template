import { cva } from '../../../lib/cva';

export const dialogVariants = cva(
  `w-full flex flex-col border bg-background p-6 shadow-lg sm:rounded-lg`,
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-none w-screen h-screen sm:rounded-none border-none',
      },
      variant: {
        default: '',
        destructive: 'border-destructive/50',
      },
    },
    defaultVariants: { size: 'md', variant: 'default' },
  },
);
