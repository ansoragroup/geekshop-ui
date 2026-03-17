import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';
import styles from './DesktopPullToRefresh.module.scss';

export interface DesktopPullToRefreshProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether refresh is in progress */
  refreshing: boolean;
  /** Callback when refresh is triggered */
  onRefresh: () => void;
  /** Content to display */
  children?: ReactNode;
  /** Custom button text */
  buttonText?: string;
}

const RefreshIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M13.65 2.35A8 8 0 1 0 15 8h-2a6 6 0 1 1-1.76-4.24L9 6h6V0l-1.35 2.35z"
      fill="currentColor"
    />
  </svg>
);

const SpinnerIcon = () => (
  <svg className={styles.spinner} width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6" stroke="#eee" strokeWidth="2" />
    <path d="M8 2a6 6 0 0 1 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const DesktopPullToRefresh = forwardRef<HTMLDivElement, DesktopPullToRefreshProps>(
  ({ refreshing, onRefresh, children, buttonText = 'Refresh', className = '', ...rest }, ref) => {
    return (
      <div ref={ref} className={`${styles.root} ${className}`} {...rest}>
        <div className={styles.toolbar}>
          <button
            className={`${styles.refreshBtn} ${refreshing ? styles.refreshing : ''}`}
            onClick={onRefresh}
            disabled={refreshing}
            type="button"
            aria-label={refreshing ? 'Refreshing...' : buttonText}
          >
            {refreshing ? <SpinnerIcon /> : <RefreshIcon />}
            <span className={styles.btnText}>
              {refreshing ? 'Refreshing...' : buttonText}
            </span>
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    );
  },
);

DesktopPullToRefresh.displayName = 'DesktopPullToRefresh';
