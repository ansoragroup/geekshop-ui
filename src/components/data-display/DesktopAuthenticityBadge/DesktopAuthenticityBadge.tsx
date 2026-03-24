'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, useState, useCallback, type HTMLAttributes } from 'react';
import styles from './DesktopAuthenticityBadge.module.scss';

export type DesktopAuthenticityStatus = 'verified' | 'official' | 'unverified';

export interface DesktopAuthenticityBadgeProps extends HTMLAttributes<HTMLDivElement> {
  /** Verification status */
  status: DesktopAuthenticityStatus;
  /** Display label text (overrides default) */
  label?: string;
  /** Tooltip text shown on hover */
  tooltip?: string;
  /** Name of the verifying authority */
  verifiedBy?: string;
  /** Date of verification */
  verifiedDate?: string;
}

const ShieldIcon = ({ status }: { status: DesktopAuthenticityStatus }) => {
  if (status === 'verified') {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M10 1.5L3.5 4.5V9.5C3.5 13.8 6.5 17 10 19C13.5 17 16.5 13.8 16.5 9.5V4.5L10 1.5Z"
          fill="var(--gs-color-success, #07C160)"
          stroke="var(--gs-color-success, #07C160)"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M7 10L9 12L13.5 7.5"
          stroke="var(--gs-bg-card, white)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (status === 'official') {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M10 1.5L3.5 4.5V9.5C3.5 13.8 6.5 17 10 19C13.5 17 16.5 13.8 16.5 9.5V4.5L10 1.5Z"
          fill="var(--gs-color-info, #1890FF)"
          stroke="var(--gs-color-info, #1890FF)"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M7.5 10L9.5 12L13 7.5"
          stroke="var(--gs-bg-card, white)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="14.5" cy="5.5" r="3.5" fill="var(--gs-color-star-filled, #FFD700)" stroke="var(--gs-bg-card, white)" strokeWidth="1" />
        <text x="14.5" y="7" textAnchor="middle" fill="var(--gs-bg-card, white)" fontSize="5" fontWeight="bold">&#9733;</text>
      </svg>
    );
  }

  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 1.5L3.5 4.5V9.5C3.5 13.8 6.5 17 10 19C13.5 17 16.5 13.8 16.5 9.5V4.5L10 1.5Z"
        fill="none"
        stroke="var(--gs-text-placeholder, #CCCCCC)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 7.5L12.5 12.5M12.5 7.5L7.5 12.5"
        stroke="var(--gs-text-placeholder, #CCCCCC)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

const STATUS_LABELS: Record<DesktopAuthenticityStatus, string> = {
  verified: 'Verified',
  official: 'Official Store',
  unverified: 'Unverified',
};

export const DesktopAuthenticityBadge = forwardRef<HTMLDivElement, DesktopAuthenticityBadgeProps>(
  (
    {
      status,
      label,
      tooltip,
      verifiedBy = 'GeekShop Verify',
      verifiedDate,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleMouseEnter = useCallback(() => {
      setShowTooltip(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
      setShowTooltip(false);
    }, []);

    const displayLabel = label ?? STATUS_LABELS[status];
    const tooltipText = tooltip ?? `${displayLabel} by ${verifiedBy}${verifiedDate ? ` on ${verifiedDate}` : ''}`;

    return (
      <div
        ref={ref}
        className={cn(styles.root, styles[`status-${status}`], className)}
        role="status"
        aria-label={tooltipText}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...rest}
      >
        <span className={styles.icon}>
          <ShieldIcon status={status} />
        </span>
        <span className={styles.label}>{displayLabel}</span>
        {verifiedBy && (
          <>
            <span className={styles.dot} aria-hidden="true">&middot;</span>
            <span className={styles.verifier}>{verifiedBy}</span>
          </>
        )}

        {showTooltip && (
          <div className={styles.tooltip} role="tooltip">
            <div className={styles.tooltipArrow} />
            <div className={styles.tooltipContent}>
              <ShieldIcon status={status} />
              <div className={styles.tooltipText}>
                <span className={styles.tooltipTitle}>{displayLabel}</span>
                <span className={styles.tooltipMeta}>by {verifiedBy}</span>
                {verifiedDate && (
                  <span className={styles.tooltipDate}>{verifiedDate}</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },
);

DesktopAuthenticityBadge.displayName = 'DesktopAuthenticityBadge';
