import { cn } from '../../../utils/cn';
'use client';
import { forwardRef, useState, useCallback, type HTMLAttributes } from 'react';
import styles from './DesktopAvatar.module.scss';

export type DesktopAvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface DesktopAvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Image source URL */
  src?: string;
  /** Alt text for the image */
  alt?: string;
  /** User's full name (for initials fallback and tooltip) */
  name?: string;
  /** Size of the avatar */
  size?: DesktopAvatarSize;
  /** Show online indicator dot */
  showOnline?: boolean;
  /** Whether user is online */
  online?: boolean;
}

const SIZES: Record<DesktopAvatarSize, number> = {
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
  const colors = ['#FF5000', '#07C160', '#1890FF', '#FFA726', '#9C27B0', '#00BCD4'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export const DesktopAvatar = forwardRef<HTMLSpanElement, DesktopAvatarProps>(
  (
    {
      src,
      alt,
      name = '',
      size = 'md',
      showOnline = false,
      online = false,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [imgError, setImgError] = useState(false);
    const px = SIZES[size];
    const initials = name ? getInitials(name) : '?';
    const bgColor = name ? getColorFromName(name) : '#CCCCCC';
    const altText = alt ?? name ?? 'Avatar';

    const handleMouseEnter = useCallback(() => {
      if (name) setShowTooltip(true);
    }, [name]);

    const handleMouseLeave = useCallback(() => {
      setShowTooltip(false);
    }, []);

    const handleImgError = useCallback(() => {
      setImgError(true);
    }, []);

    const showImage = src && !imgError;

    return (
      <span
        ref={ref}
        className={cn(styles.wrapper, styles[`size-${size}`], className)}
        style={{ width: px, height: px }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...rest}
      >
        {showImage ? (
          <img
            src={src}
            alt={altText}
            className={styles.image}
            width={px}
            height={px}
            onError={handleImgError}
          />
        ) : (
          <span
            className={styles.fallback}
            style={{ backgroundColor: bgColor }}
          >
            {initials}
          </span>
        )}

        {showOnline && (
          <span
            className={cn(styles.onlineDot, online ? styles.online : styles.offline)}
            aria-label={online ? 'Online' : 'Offline'}
          />
        )}

        {showTooltip && name && (
          <div className={styles.tooltip} role="tooltip">
            {name}
          </div>
        )}
      </span>
    );
  },
);

DesktopAvatar.displayName = 'DesktopAvatar';
