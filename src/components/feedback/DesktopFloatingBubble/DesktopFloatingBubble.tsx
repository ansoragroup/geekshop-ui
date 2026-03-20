import { forwardRef, useState, type ReactNode, type HTMLAttributes } from 'react';
import styles from './DesktopFloatingBubble.module.scss';

export interface DesktopFloatingBubbleProps extends HTMLAttributes<HTMLDivElement> {
  /** Custom icon content */
  icon?: ReactNode;
  /** Label text shown on hover */
  label?: string;
  /** Badge count */
  badgeCount?: number;
  /** Click handler */
  onClick?: () => void;
  /** Offset from bottom-right corner */
  offset?: { right?: number; bottom?: number };
}

const ChatIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.964L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="8.5" cy="12" r="1" fill="currentColor" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
    <circle cx="15.5" cy="12" r="1" fill="currentColor" />
  </svg>
);

export const DesktopFloatingBubble = forwardRef<HTMLDivElement, DesktopFloatingBubbleProps>(
  (
    {
      icon,
      label = 'Support',
      badgeCount,
      onClick,
      offset = {},
      className = '',
      ...rest
    },
    ref,
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const right = offset.right ?? 32;
    const bottom = offset.bottom ?? 32;

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick?.();
      }
    };

    return (
      <div
        ref={ref}
        className={`${styles.root} ${isHovered ? styles.expanded : ''} ${className}`}
        style={{ right, bottom }}
        role="button"
        tabIndex={0}
        aria-label={label || 'Floating action'}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...rest}
      >
        <span className={styles.icon}>{icon ?? <ChatIcon />}</span>

        {label && (
          <span className={styles.label}>{label}</span>
        )}

        {badgeCount != null && badgeCount > 0 && (
          <span className={styles.badge}>
            {badgeCount > 99 ? '99+' : badgeCount}
          </span>
        )}
      </div>
    );
  },
);

DesktopFloatingBubble.displayName = 'DesktopFloatingBubble';
