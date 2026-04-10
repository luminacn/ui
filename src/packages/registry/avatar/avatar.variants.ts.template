import { cva } from '../../../lib/cva';

export const avatarVariants = cva('relative flex shrink-0 overflow-hidden rounded-full', {
  variants: {
    size: {
      sm: 'h-8 w-8',
      md: 'h-10 w-10', // Default
      lg: 'h-12 w-12',
      xl: 'h-16 w-16',
    },
    shape: {
      circle: 'rounded-full',
      square: 'rounded-none',
      rounded: 'rounded-md',
    },
  },
  defaultVariants: {
    size: 'md',
    shape: 'circle',
  },
});
