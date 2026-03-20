import { cn } from '../../../utils/cn';
'use client';
import { forwardRef, useState, useCallback, type HTMLAttributes } from 'react';
import styles from './DesktopNoticeBar.module.scss';

export type DesktopNoticeBarVariant = 'info' | 'success' | 'warning' | 'error';

export interface DesktopNoticeBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Notice text content */
  content: string;
  /** Visual variant */
  variant?: DesktopNoticeBarVariant;
  /** Custom icon element. If not provided, a default icon matching the variant is used */
  icon?: React.ReactNode;
  /** Whether the notice can be dismissed */
  dismissible?: boolean;
  /** Callback fired when dismiss button is clicked */
  onDismiss?: () => void;
}

function InfoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

function SuccessIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

const defaultIcons: Record<DesktopNoticeBarVariant, React.ReactNode> = {
  info: <InfoIcon />,
  success: <SuccessIcon />,
  warning: <WarningIcon />,
  error: <ErrorIcon />,
};

export const DesktopNoticeBar = forwardRef<HTMLDivElement, DesktopNoticeBarProps>(
  (
    {
      content,
      variant = 'info',
      icon,
      dismissible = false,
      onDismiss,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const [visible, setVisible] = useState(true);

    const handleDismiss = useCallback(() => {
      setVisible(false);
      onDismiss?.();
    }, [onDismiss]);

    if (!visible) return null;

    const variantClass = styles[variant] || '';

    return (
      <div
        ref={ref}
        className={cn(styles.root, variantClass, className)}
        role="alert"
        aria-live="polite"
        {...rest}
      >
        <span className={styles.icon}>
          {icon || defaultIcons[variant]}
        </span>

        <span className={styles.content}>{content}</span>

        {dismissible && (
          <button
            type="button"
            className={styles.dismissButton}
            onClick={handleDismiss}
            aria-label="Dismiss notice"
          >
            <CloseIcon />
          </button>
        )}
      </div>
    );
  },
);

DesktopNoticeBar.displayName = 'DesktopNoticeBar';
