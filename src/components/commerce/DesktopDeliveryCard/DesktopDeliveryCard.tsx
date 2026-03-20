import { cn } from '../../../utils/cn';
'use client';
import { forwardRef, useCallback, type HTMLAttributes, type MouseEvent } from 'react';
import styles from './DesktopDeliveryCard.module.scss';

// ─── Types ───────────────────────────────────────────────────────────────────

export type DesktopDeliveryStatus = 'pending' | 'shipped' | 'inTransit' | 'delivered';

export interface DesktopDeliveryCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Carrier/shipping company name */
  carrier: string;
  /** Tracking number */
  trackingNumber: string;
  /** Current delivery status */
  status: DesktopDeliveryStatus;
  /** Estimated delivery date */
  estimatedDate?: string;
  /** Last update time */
  lastUpdate?: string;
  /** Last known location */
  lastLocation?: string;
  /** Handler for "Track" button */
  onTrack?: () => void;
  /** Handler for "Copy tracking number" */
  onCopy?: () => void;
}

// ─── Constants ──────────────────────────────────────────────────────────────

const STATUS_STEP: Record<DesktopDeliveryStatus, number> = {
  pending: 0,
  shipped: 1,
  inTransit: 2,
  delivered: 3,
};

const STATUS_LABEL: Record<DesktopDeliveryStatus, string> = {
  pending: 'Pending',
  shipped: 'Shipped',
  inTransit: 'In Transit',
  delivered: 'Delivered',
};

const STATUS_COLOR: Record<DesktopDeliveryStatus, string> = {
  pending: '#FFA726',
  shipped: '#1890FF',
  inTransit: '#1890FF',
  delivered: '#07C160',
};

const STEP_LABELS = ['Ordered', 'Shipped', 'In Transit', 'Delivered'];

// ─── Inline SVG Icons ────────────────────────────────────────────────────────

function PackageIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M3 6l7-4 7 4v8l-7 4-7-4V6z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3 6l7 4M10 10v8M17 6l-7 4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="4.5" y="4.5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <path d="M9.5 4.5V3a1 1 0 00-1-1H3a1 1 0 00-1 1v5.5a1 1 0 001 1h1.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export const DesktopDeliveryCard = forwardRef<HTMLDivElement, DesktopDeliveryCardProps>(
  (
    {
      carrier,
      trackingNumber,
      status,
      estimatedDate,
      lastUpdate,
      lastLocation,
      onTrack,
      onCopy,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const step = STATUS_STEP[status];
    const statusLabel = STATUS_LABEL[status];
    const statusColor = STATUS_COLOR[status];

    const handleCopy = useCallback(
      (e: MouseEvent) => {
        e.stopPropagation();
        onCopy?.();
      },
      [onCopy],
    );

    const handleTrack = useCallback(
      (e: MouseEvent) => {
        e.stopPropagation();
        onTrack?.();
      },
      [onTrack],
    );

    return (
      <div ref={ref} className={cn(styles.root, className)} {...rest}>
        {/* Left: Icon + carrier info */}
        <div className={styles.headerSection}>
          <span className={styles.packageIcon} style={{ color: statusColor }}>
            <PackageIcon />
          </span>
          <div className={styles.headerInfo}>
            <span className={styles.carrier}>{carrier}</span>
            <span className={styles.statusLabel} style={{ color: statusColor }}>
              {statusLabel}
            </span>
          </div>
        </div>

        {/* Center: Progress + details inline */}
        <div className={styles.centerSection}>
          {/* Progress bar */}
          <div
            className={styles.progressRow}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={3}
            aria-valuenow={step}
            aria-label={statusLabel}
          >
            {[0, 1, 2, 3].map((s) => (
              <div key={s} className={styles.stepGroup}>
                <div className={styles.stepDotWrapper}>
                  <span
                    className={cn(styles.stepDot, s <= step ? styles.stepDotActive : '')}
                    style={s <= step ? { background: statusColor } : undefined}
                  />
                  <span className={styles.stepLabel}>{STEP_LABELS[s]}</span>
                </div>
                {s < 3 && (
                  <span
                    className={cn(styles.stepLine, s < step ? styles.stepLineActive : '')}
                    style={s < step ? { background: statusColor } : undefined}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Details row */}
          <div className={styles.detailsRow}>
            <div className={styles.trackingInfo}>
              <span className={styles.trackingLabel}>
                Tracking: {trackingNumber}
              </span>
              {onCopy && (
                <button
                  type="button"
                  className={styles.copyBtn}
                  onClick={handleCopy}
                  aria-label="Copy tracking number"
                >
                  <CopyIcon />
                </button>
              )}
            </div>
            {estimatedDate && (
              <span className={styles.detailItem}>Est. delivery: {estimatedDate}</span>
            )}
            {lastUpdate && (
              <span className={styles.detailItem}>Updated: {lastUpdate}</span>
            )}
            {lastLocation && (
              <span className={styles.detailItem}>{lastLocation}</span>
            )}
          </div>
        </div>

        {/* Right: Track button */}
        {onTrack && (
          <button
            type="button"
            className={styles.trackBtn}
            onClick={handleTrack}
            aria-label="Track delivery"
          >
            <span>Track</span>
            <ChevronRightIcon />
          </button>
        )}
      </div>
    );
  },
);

DesktopDeliveryCard.displayName = 'DesktopDeliveryCard';
