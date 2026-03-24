'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, Children, type ReactNode, type HTMLAttributes } from 'react';
import styles from './AvatarGroup.module.scss';

export type AvatarGroupSize = 'sm' | 'md' | 'lg';

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Maximum number of avatars to show before +N overflow */
  max?: number;
  /** Size variant (must match Avatar sizes used as children) */
  size?: AvatarGroupSize;
  /** Avatar components */
  children: ReactNode;
}

const SIZES: Record<AvatarGroupSize, number> = {
  sm: 32,
  md: 48,
  lg: 64,
};

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ max, size = 'md', children, className = '', ...rest }, ref) => {
    const childArray = Children.toArray(children);
    const total = childArray.length;
    const overflow = max != null && total > max ? total - max : 0;
    const visible = overflow > 0 ? childArray.slice(0, max) : childArray;
    const px = SIZES[size];

    return (
      <div
        ref={ref}
        className={cn(styles.root, styles[`size-${size}`], className)}
        role="group"
        aria-label={`${total} avatars`}
        {...rest}
      >
        {visible.map((child, index) => (
          <div
            key={index}
            className={styles.item}
            style={{ zIndex: total - index }}
          >
            {child}
          </div>
        ))}

        {overflow > 0 && (
          <div
            className={styles.overflow}
            style={{ width: px, height: px }}
            aria-label={`+${overflow} more`}
          >
            <span className={styles.overflowText}>+{overflow}</span>
          </div>
        )}
      </div>
    );
  },
);

AvatarGroup.displayName = 'AvatarGroup';
