'use client';
import { useGeekShop } from '../../../i18n';
import { cn } from '../../../utils/cn';
import { forwardRef, useEffect, type HTMLAttributes } from 'react';
import styles from './DesktopToast.module.scss';

export type DesktopToastType = 'success' | 'error' | 'warning' | 'info';

export interface DesktopToastProps extends HTMLAttributes<HTMLDivElement> {
  /** Toast type */
  type?: DesktopToastType;
  /** Toast message */
  message: string;
  /** Auto-dismiss duration in ms (0 = no auto-dismiss) */
  duration?: number;
  /** Whether to show close button */
  closable?: boolean;
  /** Close handler */
  onClose?: () => void;
  /** Whether the toast is visible */
  visible: boolean;
}

const SuccessIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="10" fill="#07C160" />
    <path d="M6 10l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ErrorIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="10" fill="#FF3B30" />
    <path d="M7 7l6 6M13 7l-6 6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const WarningIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="10" fill="#FFA726" />
    <path d="M10 6v5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    <circle cx="10" cy="14" r="1" fill="#fff" />
  </svg>
);

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="10" fill="#1890FF" />
    <circle cx="10" cy="7" r="1" fill="#fff" />
    <path d="M10 10v4" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const iconMap: Record<DesktopToastType, () => JSX.Element> = {
  success: SuccessIcon,
  error: ErrorIcon,
  warning: WarningIcon,
  info: InfoIcon,
};

export const DesktopToast = forwardRef<HTMLDivElement, DesktopToastProps>(
  ({ type = 'info', message, duration = 3000, closable = true, onClose, visible, className = '', ...rest }, ref) => {
  const { t } = useGeekShop();
    useEffect(() => {
      if (!visible || duration === 0) return;
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }, [visible, duration, onClose]);

    if (!visible) return null;

    const Icon = iconMap[type];

    return (
      <div
        ref={ref}
        className={cn(styles.toast, styles[`type-${type}`], className)}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        {...rest}
      >
        <span className={styles.icon}>
          <Icon />
        </span>
        <span className={styles.message}>{message}</span>
        {closable && (
          <button
            className={styles.closeBtn}
            onClick={onClose}
            type="button"
            aria-label={t('aria.closeNotification')}
          >
            <CloseIcon />
          </button>
        )}
      </div>
    );
  },
);

DesktopToast.displayName = 'DesktopToast';
