import { forwardRef, type HTMLAttributes } from 'react';
import { useGeekShop } from '../../../i18n';
import styles from './StockIndicator.module.scss';

export type StockIndicatorVariant = 'bar' | 'text' | 'badge';

export interface StockIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  /** Total stock quantity */
  total: number;
  /** Number of items sold */
  sold: number;
  /** Display variant */
  variant?: StockIndicatorVariant;
  /** Show the remaining count number */
  showCount?: boolean;
  /** Below this threshold, show urgency styling (remaining units) */
  urgencyThreshold?: number;
}

export const StockIndicator = forwardRef<HTMLDivElement, StockIndicatorProps>(
  (
    {
      total,
      sold,
      variant = 'bar',
      showCount = true,
      urgencyThreshold = 5,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const { t } = useGeekShop();

    const remaining = Math.max(0, total - sold);
    const soldPercent = total > 0 ? Math.min(Math.round((sold / total) * 100), 100) : 0;
    const isUrgent = remaining > 0 && remaining <= urgencyThreshold;
    const isSoldOut = remaining <= 0;

    const urgencyLabel = isSoldOut
      ? t('product.outOfStock')
      : isUrgent
        ? t('stock.onlyLeft', { count: remaining })
        : showCount
          ? t('stock.sold', { percent: soldPercent })
          : t('stock.inStock');

    if (variant === 'badge') {
      return (
        <span
          ref={ref as React.Ref<HTMLSpanElement>}
          className={`${styles.badge} ${isUrgent ? styles.badgeUrgent : ''} ${isSoldOut ? styles.badgeSoldOut : ''} ${className}`}
          role="status"
          aria-label={urgencyLabel}
          {...(rest as HTMLAttributes<HTMLSpanElement>)}
        >
          {isUrgent ? t('stock.onlyLeft', { count: remaining }) : isSoldOut ? t('product.outOfStock') : t('stock.lowStock')}
        </span>
      );
    }

    if (variant === 'text') {
      return (
        <div
          ref={ref}
          className={`${styles.textRoot} ${isUrgent ? styles.textUrgent : ''} ${className}`}
          role="status"
          aria-label={urgencyLabel}
          {...rest}
        >
          <span className={styles.textLabel}>{urgencyLabel}</span>
        </div>
      );
    }

    // Default: bar variant
    return (
      <div
        ref={ref}
        className={`${styles.barRoot} ${isUrgent ? styles.barUrgent : ''} ${className}`}
        role="status"
        aria-label={urgencyLabel}
        {...rest}
      >
        <div className={styles.barTrack}>
          <div
            className={`${styles.barFill} ${isUrgent ? styles.barFillUrgent : ''}`}
            style={{ width: `${soldPercent}%` }}
          />
        </div>
        {showCount && (
          <span className={`${styles.barText} ${isUrgent ? styles.barTextUrgent : ''}`}>
            {urgencyLabel}
          </span>
        )}
      </div>
    );
  },
);

StockIndicator.displayName = 'StockIndicator';
