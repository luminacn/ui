import { cva } from '../../../lib/cva';

export const tabsListVariants = cva(
  'inline-flex items-center justify-center rounded-md text-muted-foreground transition-all',
  {
    variants: {
      variant: {
        pill: 'bg-muted p-1',
        underline: 'border-b bg-transparent p-0 rounded-none gap-4',
      },
    },
    defaultVariants: { variant: 'pill' },
  }
);

export const tabsTriggerVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        pill: 'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
        underline: 'rounded-none border-b-2 border-transparent bg-transparent px-0 pb-3 pt-2 data-[state=active]:border-primary data-[state=active]:text-primary',
      },
    },
    defaultVariants: { variant: 'pill' },
  }
);
