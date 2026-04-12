import { cva } from '../../../lib/cva';

export const accordionVariants = cva('w-full', {
  variants: {
    variant: {
      default: '',
      separated: 'space-y-4',
      ghost: 'space-y-1', // Tight spacing for a list-like feel
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const accordionItemVariants = cva('', {
  variants: {
    variant: {
      default: 'border-b',
      separated: 'rounded-lg border shadow-sm px-6',
      ghost: 'border-none px-2 rounded-md hover:bg-muted/50 transition-colors',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
