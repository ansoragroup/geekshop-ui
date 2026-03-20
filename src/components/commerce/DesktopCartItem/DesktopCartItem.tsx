import { cn } from '../../../utils/cn';
'use client';
import { forwardRef, useCallback, type HTMLAttributes } from 'react';
import { DesktopQuantityStepper } from '../DesktopQuantityStepper';
import styles from './DesktopCartItem.module.scss';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface DesktopCartItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Product image URL */
  image: string;
  /** Product title */
  title: string;
  /** Variant/option text, e.g. "Black / 256GB" */
  variant?: string;
  /** Price in UZS */
  price: number;
  /** Current quantity */
  quantity: number;
  /** Whether this item is selected */
  selected?: boolean;
  /** Whether the item is in stock */
  inStock?: boolean;
  /** Whether free shipping is available */
  freeShipping?: boolean;
  /** Called when checkbox is toggled */
  onSelect?: (selected: boolean) => void;
  /** Called when quantity changes */
  onQuantityChange?: (quantity: number) => void;
  /** Called when delete button is clicked */
  onDelete?: () => void;
  /** Called when item row is clicked (navigate to product) */
  onClick?: () => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatPrice(value: number): string {
  return value.toLocaleString('uz-UZ').replace(/,/g, ' ');
}

// ─── Inline SVG Icons ────────────────────────────────────────────────────────

function TrashIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export const DesktopCartItem = forwardRef<HTMLDivElement, DesktopCartItemProps>(
  (
    {
      image,
      title,
      variant,
      price,
      quantity,
      selected = false,
      inStock = true,
      freeShipping = false,
      onSelect,
      onQuantityChange,
      onDelete,
      onClick,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const handleCheckboxClick = useCallback(() => {
      onSelect?.(!selected);
    }, [selected, onSelect]);

    const handleCheckboxKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect?.(!selected);
        }
      },
      [selected, onSelect],
    );

    const handleDeleteClick = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete?.();
      },
      [onDelete],
    );

    const handleDeleteKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onDelete?.();
        }
      },
      [onDelete],
    );

    const handleTitleClick = useCallback(() => {
      onClick?.();
    }, [onClick]);

    const handleTitleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      },
      [onClick],
    );

    return (
      <div
        ref={ref}
        className={cn(styles.root, !inStock ? styles.outOfStock : '', className)}
        {...rest}
      >
        {/* Checkbox */}
        <div
          className={cn(styles.checkbox, selected ? styles.checkboxChecked : '')}
          role="checkbox"
          aria-checked={selected}
          aria-label={`Select ${title}`}
          tabIndex={0}
          onClick={handleCheckboxClick}
          onKeyDown={handleCheckboxKeyDown}
        >
          {selected && <CheckIcon />}
        </div>

        {/* Image */}
        <div className={styles.imageWrapper}>
          <img
            src={image}
            alt={title}
            className={styles.image}
            loading="lazy"
          />
        </div>

        {/* Info */}
        <div className={styles.info}>
          <span
            className={styles.title}
            role="link"
            tabIndex={0}
            onClick={handleTitleClick}
            onKeyDown={handleTitleKeyDown}
          >
            {title}
          </span>
          {variant && (
            <span className={styles.variant}>{variant}</span>
          )}
          <div className={styles.badges}>
            <span className={cn(styles.stockBadge, inStock ? styles.inStock : styles.noStock)}>
              {inStock ? 'In Stock' : 'Out of Stock'}
            </span>
            {freeShipping && (
              <span className={styles.shippingBadge}>
                <TruckIcon />
                Free Shipping
              </span>
            )}
          </div>
        </div>

        {/* Quantity Stepper */}
        <div className={styles.quantity}>
          <DesktopQuantityStepper
            value={quantity}
            min={1}
            max={99}
            size="sm"
            onChange={onQuantityChange}
            disabled={!inStock}
          />
        </div>

        {/* Price */}
        <div className={styles.price}>
          {formatPrice(price)} so'm
        </div>

        {/* Delete */}
        <div
          className={styles.deleteBtn}
          role="button"
          tabIndex={0}
          aria-label={`Delete ${title}`}
          onClick={handleDeleteClick}
          onKeyDown={handleDeleteKeyDown}
        >
          <TrashIcon />
        </div>
      </div>
    );
  },
);

DesktopCartItem.displayName = 'DesktopCartItem';
