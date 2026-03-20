'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, type CSSProperties, type HTMLAttributes } from 'react';
import { useGeekShop, CURRENCY_CONFIGS } from '../../../i18n';
import styles from './PriceDisplay.module.scss';

export type PriceDisplayVariant = 'default' | 'sale' | 'range';
export type PriceDisplaySize = 'sm' | 'md' | 'lg' | 'xl';

export interface PriceDisplayProps extends HTMLAttributes<HTMLDivElement> {
  /** Current/discounted price */
  price: number;
  /** Original price (shown as strikethrough in sale variant) */
  originalPrice?: number;
  /** Min price for range variant */
  minPrice?: number;
  /** Max price for range variant */
  maxPrice?: number;
  /** Currency label (overrides context currency when provided as a custom string) */
  currency?: string;
  /** Display variant */
  variant?: PriceDisplayVariant;
  /** Size of the price text */
  size?: PriceDisplaySize;
  /** Whether to show the currency suffix */
  showCurrency?: boolean;
  /** Custom color override */
  color?: string;
}

export const PriceDisplay = forwardRef<HTMLDivElement, PriceDisplayProps>(
  (
    {
      price,
      originalPrice,
      minPrice,
      maxPrice,
      currency: currencyOverride,
      variant = 'default',
      size = 'md',
      showCurrency = true,
      color,
      className = '',
      style,
      ...rest
    },
    ref,
  ) => {
    const { formatPrice, locale, currency: contextCurrency } = useGeekShop();
    const rootStyle: CSSProperties = color ? { ...style, color } : style ?? {};

    // Resolve currency label: prop override > context-derived symbol
    const currencyLabel = currencyOverride ?? CURRENCY_CONFIGS[contextCurrency].symbol[locale];

    const formatNumber = (value: number) => formatPrice(value, { showCurrency: false });

    const renderPrice = () => {
      if (variant === 'range' && minPrice !== undefined && maxPrice !== undefined) {
        return (
          <span className={styles.priceValue}>
            {formatNumber(minPrice)}
            <span className={styles.rangeSeparator}>~</span>
            {formatNumber(maxPrice)}
          </span>
        );
      }

      return <span className={styles.priceValue}>{formatNumber(price)}</span>;
    };

    return (
      <div
        ref={ref}
        className={cn(styles.root, styles[`size-${size}`], styles[`variant-${variant}`], className)}
        style={rootStyle}
        {...rest}
      >
        <span className={styles.currentPrice}>
          {showCurrency && <span className={styles.currency}>{currencyLabel}</span>}
          {renderPrice()}
        </span>

        {variant === 'sale' && originalPrice !== undefined && (
          <span className={styles.originalPrice}>
            {showCurrency && <span className={styles.originalCurrency}>{currencyLabel}</span>}
            <span className={styles.originalValue}>{formatNumber(originalPrice)}</span>
          </span>
        )}
      </div>
    );
  },
);

PriceDisplay.displayName = 'PriceDisplay';
