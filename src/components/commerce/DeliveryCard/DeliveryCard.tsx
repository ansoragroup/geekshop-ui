'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, useCallback, type HTMLAttributes } from 'react';
import { useGeekShop } from '../../../i18n';
import styles from './DeliveryCard.module.scss';

export type DeliveryStatus = 'pending' | 'shipped' | 'inTransit' | 'delivered';

export interface DeliveryCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Carrier/shipping company name */
  carrier: string;
  /** Tracking number */
  trackingNumber: string;
  /** Current delivery status */
  status: DeliveryStatus;
  /** Estimated delivery date */
  estimatedDate?: string;
  /** Last update time */
  lastUpdate?: string;
  /** Last known location */
  lastLocation?: string;
  /** Handler for "Track" button */
  onTrack?: () => void;
  /** Handler for "Copy tracking number" button */
  onCopy?: () => void;
}

const STATUS_STEP: Record<DeliveryStatus, number> = {
  pending: 0,
  shipped: 1,
  inTransit: 2,
  delivered: 3,
};

const STATUS_KEY: Record<DeliveryStatus, string> = {
  pending: 'delivery.pending',
  shipped: 'delivery.shipped',
  inTransit: 'delivery.inTransit',
  delivered: 'delivery.delivered',
};

const STATUS_COLOR: Record<DeliveryStatus, string> = {
  pending: '#FFA726',
  shipped: '#1890FF',
  inTransit: '#1890FF',
  delivered: '#07C160',
};

function PackageIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
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
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="4.5" y="4.5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <path d="M9.5 4.5V3a1 1 0 00-1-1H3a1 1 0 00-1 1v5.5a1 1 0 001 1h1.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const DeliveryCard = forwardRef<HTMLDivElement, DeliveryCardProps>(
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
    const { t } = useGeekShop();
    const step = STATUS_STEP[status];
    const statusLabel = t(STATUS_KEY[status]);
    const statusColor = STATUS_COLOR[status];

    const handleCopy = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onCopy?.();
      },
      [onCopy],
    );

    const handleTrack = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onTrack?.();
      },
      [onTrack],
    );

    return (
      <div
        ref={ref}
        className={cn(styles.root, className)}
        {...rest}
      >
        {/* Header: icon + carrier + status */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
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
        </div>

        {/* Progress steps */}
        <div className={styles.progressRow} role="progressbar" aria-valuemin={0} aria-valuemax={3} aria-valuenow={step} aria-label={statusLabel}>
          {[0, 1, 2, 3].map((s) => (
            <div key={s} className={styles.stepGroup}>
              <span
                className={cn(styles.stepDot, s <= step ? styles.stepDotActive : '')}
                style={s <= step ? { background: statusColor } : undefined}
              />
              {s < 3 && (
                <span
                  className={cn(styles.stepLine, s < step ? styles.stepLineActive : '')}
                  style={s < step ? { background: statusColor } : undefined}
                />
              )}
            </div>
          ))}
        </div>

        {/* Details */}
        <div className={styles.details}>
          <div className={styles.trackingRow}>
            <span className={styles.trackingLabel}>
              {t('delivery.trackingNumber', { number: trackingNumber })}
            </span>
            {onCopy && (
              <button
                type="button"
                className={styles.copyBtn}
                onClick={handleCopy}
                aria-label={t('delivery.copy')}
              >
                <CopyIcon />
              </button>
            )}
          </div>

          {estimatedDate && (
            <span className={styles.detailLine}>
              {t('delivery.estimated', { date: estimatedDate })}
            </span>
          )}

          {lastUpdate && (
            <span className={styles.detailLine}>
              {t('delivery.lastUpdate', { time: lastUpdate })}
            </span>
          )}

          {lastLocation && (
            <span className={styles.detailLine}>
              {lastLocation}
            </span>
          )}
        </div>

        {/* Track action */}
        {onTrack && (
          <button
            type="button"
            className={styles.trackBtn}
            onClick={handleTrack}
            aria-label={t('delivery.track')}
          >
            <span>{t('delivery.track')}</span>
            <ChevronRightIcon />
          </button>
        )}
      </div>
    );
  },
);

DeliveryCard.displayName = 'DeliveryCard';
