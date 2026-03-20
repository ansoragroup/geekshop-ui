import { cn } from '../../../utils/cn';
'use client';
import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';
import styles from './DesktopEmpty.module.scss';

export interface DesktopEmptyProps extends HTMLAttributes<HTMLDivElement> {
  /** Custom icon or illustration */
  icon?: ReactNode;
  /** Title text */
  title?: string;
  /** Description text */
  description?: string;
  /** Action button text */
  actionText?: string;
  /** Callback when action button is clicked */
  onAction?: () => void;
}

const DefaultEmptyIcon = () => (
  <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
    <circle cx="80" cy="80" r="70" fill="#F5F5F5" />
    <rect x="45" y="50" width="70" height="55" rx="6" fill="#E8E8E8" />
    <rect x="55" y="62" width="50" height="4" rx="2" fill="#D4D4D4" />
    <rect x="55" y="72" width="38" height="4" rx="2" fill="#D4D4D4" />
    <rect x="55" y="82" width="26" height="4" rx="2" fill="#D4D4D4" />
    <circle cx="80" cy="72" r="24" fill="none" stroke="#CCCCCC" strokeWidth="2.5" strokeDasharray="5 4" />
  </svg>
);

export const DesktopEmpty = forwardRef<HTMLDivElement, DesktopEmptyProps>(
  (
    {
      icon,
      title = 'No data',
      description,
      actionText,
      onAction,
      className = '',
      ...rest
    },
    ref,
  ) => {
    return (
      <div ref={ref} className={cn(styles.root, className)} {...rest}>
        <div className={styles.icon}>
          {icon ?? <DefaultEmptyIcon />}
        </div>

        <h3 className={styles.title}>{title}</h3>

        {description && (
          <p className={styles.description}>{description}</p>
        )}

        {actionText && onAction && (
          <button
            type="button"
            className={styles.action}
            onClick={onAction}
          >
            {actionText}
          </button>
        )}
      </div>
    );
  },
);

DesktopEmpty.displayName = 'DesktopEmpty';
