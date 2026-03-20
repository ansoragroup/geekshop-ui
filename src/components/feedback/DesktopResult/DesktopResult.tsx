'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';
import styles from './DesktopResult.module.scss';

export type DesktopResultStatus = 'success' | 'error' | 'info' | 'warning';

export interface DesktopResultAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export interface DesktopResultProps extends HTMLAttributes<HTMLDivElement> {
  /** Result status */
  status: DesktopResultStatus;
  /** Result title */
  title: string;
  /** Optional description */
  description?: string;
  /** Primary action button */
  primaryAction?: DesktopResultAction;
  /** Secondary action button */
  secondaryAction?: DesktopResultAction;
  /** Custom icon override */
  icon?: ReactNode;
}

const SuccessIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path
      d="M12 24L20 32L36 14"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ErrorIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path
      d="M14 14L34 34M34 14L14 34"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const InfoIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="14" r="2.5" fill="currentColor" />
    <path d="M24 22V36" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);

const WarningIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M24 12V28" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
    <circle cx="24" cy="35" r="2.5" fill="currentColor" />
  </svg>
);

const STATUS_ICONS: Record<DesktopResultStatus, ReactNode> = {
  success: <SuccessIcon />,
  error: <ErrorIcon />,
  info: <InfoIcon />,
  warning: <WarningIcon />,
};

export const DesktopResult = forwardRef<HTMLDivElement, DesktopResultProps>(
  ({ status, title, description, primaryAction, secondaryAction, icon, className = '', ...rest }, ref) => {
    return (
      <div ref={ref} className={cn(styles.root, className)} role="status" {...rest}>
        <div className={cn(styles.iconCircle, styles[`status-${status}`])} aria-hidden="true">
          {icon ?? STATUS_ICONS[status]}
        </div>

        <h2 className={styles.title}>{title}</h2>

        {description && <p className={styles.description}>{description}</p>}

        {(primaryAction || secondaryAction) && (
          <div className={styles.actions}>
            {primaryAction && (
              <button
                className={cn(styles.actionBtn, styles.primary)}
                onClick={primaryAction.onClick}
                type="button"
              >
                {primaryAction.label}
              </button>
            )}
            {secondaryAction && (
              <button
                className={cn(styles.actionBtn, styles.secondary)}
                onClick={secondaryAction.onClick}
                type="button"
              >
                {secondaryAction.label}
              </button>
            )}
          </div>
        )}
      </div>
    );
  },
);

DesktopResult.displayName = 'DesktopResult';
