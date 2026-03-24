'use client';
import { useGeekShop } from '../../../i18n';
import { cn } from '../../../utils/cn';
import { formatNumber } from '../../../utils/formatPrice';
import { forwardRef, useState, useCallback, useEffect, useRef, type HTMLAttributes } from 'react';
import styles from './DesktopQuickBuyPopup.module.scss';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface DesktopQuickBuyVariant {
  /** Variant identifier */
  id: string;
  /** Display name */
  name: string;
}

export interface DesktopQuickBuyProduct {
  /** Product title */
  title: string;
  /** Product image URL */
  image: string;
  /** Price in UZS */
  price: number;
  /** Available stock */
  stock: number;
}

export interface DesktopQuickBuyPopupProps extends HTMLAttributes<HTMLDivElement> {
  /** Product data */
  product: DesktopQuickBuyProduct;
  /** Available variants */
  variants?: DesktopQuickBuyVariant[];
  /** Handler to close the popup */
  onClose?: () => void;
  /** Handler when add to cart is clicked */
  onAddToCart?: (variantId: string | null, quantity: number) => void;
  /** Whether the popup is open */
  open?: boolean;
}

// ─── Inline SVG Icons ────────────────────────────────────────────────────────

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 8h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 4v8M4 8h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export const DesktopQuickBuyPopup = forwardRef<HTMLDivElement, DesktopQuickBuyPopupProps>(
  (
    {
      product,
      variants = [],
      onClose,
      onAddToCart,
      open = true,
      className = '',
      ...rest
    },
    ref,
  ) => {
  const { t } = useGeekShop();
    const [quantity, setQuantity] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState<string | null>(
      variants.length > 0 ? variants[0].id : null,
    );
    const dialogRef = useRef<HTMLDivElement>(null);

    const handleAddToCart = useCallback(() => {
      onAddToCart?.(selectedVariant, quantity);
    }, [onAddToCart, selectedVariant, quantity]);

    const handleIncrement = useCallback(() => {
      setQuantity((prev) => Math.min(prev + 1, product.stock));
    }, [product.stock]);

    const handleDecrement = useCallback(() => {
      setQuantity((prev) => Math.max(prev - 1, 1));
    }, []);

    // Focus trap: trap focus within dialog
    useEffect(() => {
      if (!open) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose?.();
          return;
        }

        if (e.key === 'Tab' && dialogRef.current) {
          const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          );
          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault();
              last?.focus();
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault();
              first?.focus();
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [open, onClose]);

    // Auto-focus dialog on open
    useEffect(() => {
      if (open && dialogRef.current) {
        dialogRef.current.focus();
      }
    }, [open]);

    if (!open) return null;

    return (
      <div
        ref={ref}
        className={cn(styles.overlay, className)}
        onClick={onClose}
        role="presentation"
        {...rest}
      >
        <div
          ref={dialogRef}
          className={styles.dialog}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label={`Quick buy: ${product.title}`}
          tabIndex={-1}
        >
          {/* Close button */}
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label={t('aria.close')}
          >
            <CloseIcon />
          </button>

          {/* Content: image left, details right */}
          <div className={styles.content}>
            {/* Left: Product image */}
            <div className={styles.imageSection}>
              <img
                src={product.image}
                alt={product.title}
                className={styles.productImage}
                loading="lazy"
              />
            </div>

            {/* Right: Product details */}
            <div className={styles.detailsSection}>
              <h2 className={styles.title}>{product.title}</h2>

              <span className={styles.price}>{formatNumber(product.price)} sum</span>

              {/* Variants */}
              {variants.length > 0 && (
                <div className={styles.variantSection}>
                  <span className={styles.sectionLabel}>Variant</span>
                  <div className={styles.chips} role="radiogroup" aria-label={t('aria.selectVariant')}>
                    {variants.map((v) => (
                      <button
                        type="button"
                        key={v.id}
                        className={cn(styles.chip, selectedVariant === v.id ? styles.chipActive : '')}
                        onClick={() => setSelectedVariant(v.id)}
                        role="radio"
                        aria-checked={selectedVariant === v.id}
                      >
                        {v.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className={styles.quantitySection}>
                <span className={styles.sectionLabel}>Quantity</span>
                <div className={styles.quantityRow}>
                  <div className={styles.stepper}>
                    <button
                      type="button"
                      className={styles.stepperBtn}
                      onClick={handleDecrement}
                      disabled={quantity <= 1}
                      aria-label={t('aria.decreaseQuantity')}
                    >
                      <MinusIcon />
                    </button>
                    <span className={styles.stepperValue} aria-live="polite">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      className={styles.stepperBtn}
                      onClick={handleIncrement}
                      disabled={quantity >= product.stock}
                      aria-label={t('aria.increaseQuantity')}
                    >
                      <PlusIcon />
                    </button>
                  </div>
                  <span className={styles.stockText}>{product.stock} in stock</span>
                </div>
              </div>

              {/* Add to cart */}
              <button
                type="button"
                className={styles.addToCartBtn}
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

DesktopQuickBuyPopup.displayName = 'DesktopQuickBuyPopup';
