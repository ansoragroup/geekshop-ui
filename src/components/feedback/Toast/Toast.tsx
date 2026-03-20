import { cn } from '../../../utils/cn';
'use client';
import { forwardRef, useEffect, type HTMLAttributes } from 'react';
import styles from './Toast.module.scss';

export type ToastType = 'success' | 'error' | 'info' | 'loading';

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  /** Toast message text */
  message: string;
  /** Toast type determines icon and color */
  type?: ToastType;
  /** Auto-dismiss duration in ms (0 = no auto-dismiss) */
  duration?: number;
  /** Whether the toast is visible */
  visible: boolean;
  /** Callback when toast closes */
  onClose?: () => void;
}

const SuccessIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle cx="18" cy="18" r="18" fill="#07C160" />
    <path d="M11 18l5 5 9-9" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ErrorIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle cx="18" cy="18" r="18" fill="#FF3B30" />
    <path d="M13 13l10 10M23 13l-10 10" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const InfoIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle cx="18" cy="18" r="18" fill="#1890FF" />
    <circle cx="18" cy="12" r="2" fill="#fff" />
    <rect x="16.5" y="16" width="3" height="10" rx="1.5" fill="#fff" />
  </svg>
);

const LoadingSpinner = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className={styles.spinner}>
    <circle cx="18" cy="18" r="14" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
    <path d="M18 4a14 14 0 0 1 14 14" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const iconMap: Record<ToastType, () => JSX.Element> = {
  success: SuccessIcon,
  error: ErrorIcon,
  info: InfoIcon,
  loading: LoadingSpinner,
};

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  ({ message, type = 'info', duration = 2000, visible, onClose, className = '', ...rest }, ref) => {
    useEffect(() => {
      if (!visible || duration === 0 || type === 'loading') return;
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }, [visible, duration, onClose, type]);

    if (!visible) return null;

    const Icon = iconMap[type];

    return (
      <div ref={ref} className={cn(styles.overlay, className)} role="status" aria-live="assertive" aria-atomic="true" {...rest}>
        <div className={cn(styles.toast, styles[`type-${type}`])} role="alert">
          <span className={styles.icon}>
            <Icon />
          </span>
          <span className={styles.message}>{message}</span>
        </div>
      </div>
    );
  }
);

Toast.displayName = 'Toast';
