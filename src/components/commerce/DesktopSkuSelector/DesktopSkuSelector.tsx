'use client';
import { cn } from '../../../utils/cn';
import { formatNumber } from '../../../utils/formatPrice';
import { forwardRef, useCallback, type HTMLAttributes } from 'react';
import styles from './DesktopSkuSelector.module.scss';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface DesktopSkuOption {
  value: string;
  image?: string;
  disabled?: boolean;
  outOfStock?: boolean;
}

export interface DesktopSkuVariant {
  name: string;
  options: DesktopSkuOption[];
}

export interface DesktopSkuSelectorProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Variant groups (e.g. Color, Storage) */
  variants: DesktopSkuVariant[];
  /** Currently selected values */
  selectedValues?: Record<string, string>;
  /** Called when an option is selected */
  onSelect?: (variantName: string, value: string) => void;
  /** Available stock count */
  stock?: number;
  /** Price in UZS */
  price?: number;
  /** Preview image URL that changes with selection */
  image?: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

export const DesktopSkuSelector = forwardRef<HTMLDivElement, DesktopSkuSelectorProps>(
  (
    { variants, selectedValues = {}, onSelect, stock, price, image, className = '', ...rest },
    ref
  ) => {
    const handleOptionClick = useCallback(
      (variantName: string, option: DesktopSkuOption) => {
        if (option.disabled || option.outOfStock) return;
        onSelect?.(variantName, option.value);
      },
      [onSelect]
    );

    const handleOptionKeyDown = useCallback(
      (e: React.KeyboardEvent, variantName: string, option: DesktopSkuOption) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (!option.disabled && !option.outOfStock) {
            onSelect?.(variantName, option.value);
          }
        }
      },
      [onSelect]
    );

    const getStockClass = () => {
      if (stock === undefined) return '';
      if (stock === 0) return styles.stockEmpty;
      if (stock < 5) return styles.stockLow;
      return '';
    };

    return (
      <div ref={ref} className={cn(styles.root, className)} {...rest}>
        {/* Preview Image */}
        {image && (
          <div className={styles.previewWrapper}>
            <img
              src={image}
              alt="Selected variant preview"
              className={styles.previewImage}
              loading="lazy"
            />
          </div>
        )}

        {/* Variant Groups */}
        <div className={styles.variantGroups}>
          {variants.map((variant) => (
            <div key={variant.name} className={styles.variantGroup}>
              <span className={styles.variantLabel}>
                {variant.name}:
                {selectedValues[variant.name] && (
                  <span className={styles.selectedValue}> {selectedValues[variant.name]}</span>
                )}
              </span>
              <div className={styles.options} role="radiogroup" aria-label={variant.name}>
                {variant.options.map((option) => {
                  const isSelected = selectedValues[variant.name] === option.value;
                  const isDisabled = option.disabled || option.outOfStock;

                  const chipClass = cn(
                    styles.chip,
                    isSelected && styles.chipSelected,
                    isDisabled && styles.chipDisabled,
                    option.outOfStock && styles.chipOutOfStock
                  );

                  return (
                    <div
                      key={option.value}
                      className={chipClass}
                      role="radio"
                      aria-checked={isSelected}
                      aria-disabled={isDisabled}
                      aria-label={`${variant.name}: ${option.value}${
                        option.outOfStock ? ' (out of stock)' : ''
                      }`}
                      tabIndex={isDisabled ? -1 : 0}
                      onClick={() => handleOptionClick(variant.name, option)}
                      onKeyDown={(e) => handleOptionKeyDown(e, variant.name, option)}
                    >
                      {option.image && (
                        <img
                          src={option.image}
                          alt=""
                          className={styles.chipImage}
                          loading="lazy"
                        />
                      )}
                      <span className={styles.chipText}>{option.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Stock & Price Line */}
        {(stock !== undefined || price !== undefined) && (
          <div className={styles.stockLine}>
            {stock !== undefined && (
              <span className={cn(styles.stockText, getStockClass())}>
                {stock === 0 ? 'Out of stock' : `${stock} available`}
              </span>
            )}
            {stock !== undefined && price !== undefined && (
              <span className={styles.stockSeparator} aria-hidden="true">
                &bull;
              </span>
            )}
            {price !== undefined && (
              <span className={styles.priceText}>{formatNumber(price)} so'm</span>
            )}
          </div>
        )}
      </div>
    );
  }
);

DesktopSkuSelector.displayName = 'DesktopSkuSelector';
