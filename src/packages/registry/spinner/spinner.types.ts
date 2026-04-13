export type LuminaSpinnerVariant = 'primary' | 'secondary' | 'accent' | 'current' | 'destructive';

export type LuminaSpinnerSize = 'sm' | 'md' | 'lg' | 'xl';

export interface LuminaSpinnerProps {
  variant?: LuminaSpinnerVariant;
  size?: LuminaSpinnerSize;
  class?: string;
}
