export type LmAvatarSize = 'sm' | 'md' | 'lg' | 'xl';
export type LmAvatarShape = 'circle' | 'square' | 'rounded';

export interface LmAvatarProps {
  size?: LmAvatarSize;
  shape?: LmAvatarShape;
  class?: string;
}
