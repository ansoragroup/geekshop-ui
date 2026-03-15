import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';
import styles from './Result.module.scss';

export type ResultStatus = 'success' | 'error' | 'warning' | 'info';

export interface ResultProps extends HTMLAttributes<HTMLDivElement> {
  /** Result status type */
  status: ResultStatus;
  /** Result title */
  title: string;
  /** Optional description text */
  description?: string;
  /** Custom icon override (replaces default status icon) */
  icon?: ReactNode;
  /** Action buttons area */
  actions?: ReactNode;
}

const SuccessIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path
      d="M8 16L14 22L24 10"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ErrorIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path
      d="M10 10L22 22M22 10L10 22"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const WarningIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path
      d="M16 10V18"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <circle cx="16" cy="23" r="1.5" fill="currentColor" />
  </svg>
);

const InfoIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="10" r="1.5" fill="currentColor" />
    <path
      d="M16 15V23"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

const STATUS_ICONS: Record<ResultStatus, ReactNode> = {
  success: <SuccessIcon />,
  error: <ErrorIcon />,
  warning: <WarningIcon />,
  info: <InfoIcon />,
};

export const Result = forwardRef<HTMLDivElement, ResultProps>(
  ({ status, title, description, icon, actions, className = '', ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={`${styles.root} ${className}`}
        role="status"
        {...rest}
      >
        <div
          className={`${styles.iconCircle} ${styles[`status-${status}`]}`}
          aria-hidden="true"
        >
          {icon ?? STATUS_ICONS[status]}
        </div>

        <h2 className={styles.title}>{title}</h2>

        {description && (
          <p className={styles.description}>{description}</p>
        )}

        {actions && (
          <div className={styles.actions}>{actions}</div>
        )}
      </div>
    );
  },
);

Result.displayName = 'Result';
