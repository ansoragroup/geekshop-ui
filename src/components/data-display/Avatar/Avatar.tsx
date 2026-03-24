'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, type HTMLAttributes } from 'react';
import styles from './Avatar.module.scss';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Image source URL */
  src?: string;
  /** User's name (for initials fallback) */
  name?: string;
  /** Size of the avatar */
  size?: AvatarSize;
  /** Show online indicator dot */
  showOnline?: boolean;
}

const SIZES: Record<AvatarSize, number> = {
  sm: 32,
  md: 48,
  lg: 64,
  xl: 80,
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function getColorFromName(name: string): string {
  const colors = ['var(--gs-color-primary, #FF5000)', 'var(--gs-color-success, #07C160)', 'var(--gs-color-info, #1890FF)', 'var(--gs-color-warning, #FFA726)', 'var(--gs-color-avatar-purple, #9C27B0)', 'var(--gs-color-avatar-cyan, #00BCD4)'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ src, name = '', size = 'md', showOnline = false, className = '', ...rest }, ref) => {
    const px = SIZES[size];
    const initials = name ? getInitials(name) : '?';
    const bgColor = name ? getColorFromName(name) : 'var(--gs-text-placeholder, #CCCCCC)';

    return (
      <span
        ref={ref}
        className={cn(styles.wrapper, styles[`size-${size}`], className)}
        style={{ width: px, height: px }}
        {...rest}
      >
        {src ? (
          <img
            src={src}
            alt={name || 'Avatar'}
            className={styles.image}
            width={px}
            height={px}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              const parent = (e.target as HTMLImageElement).parentElement;
              if (parent) {
                const fallback = parent.querySelector(`.${styles.fallback}`) as HTMLElement | null;
                if (fallback) fallback.style.display = 'flex';
              }
            }}
          />
        ) : null}
        <span
          className={styles.fallback}
          style={{
            backgroundColor: bgColor,
            display: src ? 'none' : 'flex',
          }}
        >
          {initials}
        </span>
        {showOnline && <span className={styles.onlineDot} />}
      </span>
    );
  }
);

Avatar.displayName = 'Avatar';
