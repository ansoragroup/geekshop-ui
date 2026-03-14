import type { CSSProperties } from 'react';
import styles from './PriceDisplay.module.scss';

export type PriceDisplayVariant = 'default' | 'sale' | 'range';
export type PriceDisplaySize = 'sm' | 'md' | 'lg' | 'xl';

export interface PriceDisplayProps {
  /** Current/discounted price */
  price: number;
  /** Original price (shown as strikethrough in sale variant) */
  originalPrice?: number;
  /** Min price for range variant */
  minPrice?: number;
  /** Max price for range variant */
  maxPrice?: number;
  /** Currency label */
  currency?: string;
  /** Display variant */
  variant?: PriceDisplayVariant;
  /** Size of the price text */
  size?: PriceDisplaySize;
  /** Whether to show the currency suffix */
  showCurrency?: boolean;
  /** Custom color override */
  color?: string;
  /** Additional CSS class */
  className?: string;
}

/**
 * Formats a number in Uzbek style with space separators.
 * e.g. 5200000 => "5 200 000"
 */
export function formatPrice(value: number): string {
  return value.toLocaleString('ru-RU').replace(/,/g, ' ');
}

export function PriceDisplay({
  price,
  originalPrice,
  minPrice,
  maxPrice,
  currency = "so'm",
  variant = 'default',
  size = 'md',
  showCurrency = true,
  color,
  className = '',
}: PriceDisplayProps) {
  const rootStyle: CSSProperties = color ? { color } : {};

  const renderPrice = () => {
    if (variant === 'range' && minPrice !== undefined && maxPrice !== undefined) {
      return (
        <span className={styles.priceValue}>
          {formatPrice(minPrice)}
          <span className={styles.rangeSeparator}>~</span>
          {formatPrice(maxPrice)}
        </span>
      );
    }

    return <span className={styles.priceValue}>{formatPrice(price)}</span>;
  };

  return (
    <div
      className={`${styles.root} ${styles[`size-${size}`]} ${styles[`variant-${variant}`]} ${className}`}
      style={rootStyle}
    >
      <span className={styles.currentPrice}>
        {showCurrency && <span className={styles.currency}>{currency}</span>}
        {renderPrice()}
      </span>

      {variant === 'sale' && originalPrice !== undefined && (
        <span className={styles.originalPrice}>
          {showCurrency && <span className={styles.originalCurrency}>{currency}</span>}
          <span className={styles.originalValue}>{formatPrice(originalPrice)}</span>
        </span>
      )}
    </div>
  );
}

export default PriceDisplay;
