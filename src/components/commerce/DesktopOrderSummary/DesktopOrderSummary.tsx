'use client';
import { cn } from '../../../utils/cn';
import { formatNumber } from '../../../utils/formatPrice';
import { forwardRef, type HTMLAttributes } from 'react';
import styles from './DesktopOrderSummary.module.scss';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface TrustBadge {
  icon: 'shipping' | 'secure' | 'returns' | 'warranty';
  text: string;
}

export interface DesktopOrderSummaryProps extends HTMLAttributes<HTMLDivElement> {
  /** Subtotal before shipping/tax */
  subtotal: number;
  /** Shipping cost (0 = "Free") */
  shipping?: number;
  /** Tax amount */
  tax?: number;
  /** Discount amount */
  discount?: number;
  /** Final total */
  total: number;
  /** Number of items in cart */
  itemCount?: number;
  /** CTA button text */
  ctaText?: string;
  /** Called when checkout button is clicked */
  onCheckout?: () => void;
  /** Loading/processing state */
  loading?: boolean;
  /** Trust badges displayed below CTA */
  trustBadges?: TrustBadge[];
}

// ─── Inline SVG Icons ────────────────────────────────────────────────────────

function ShippingIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function SecureIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function ReturnsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </svg>
  );
}

function WarrantyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className={styles.spinner}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

const TRUST_ICONS: Record<TrustBadge['icon'], () => JSX.Element> = {
  shipping: ShippingIcon,
  secure: SecureIcon,
  returns: ReturnsIcon,
  warranty: WarrantyIcon,
};

// ─── Component ───────────────────────────────────────────────────────────────

export const DesktopOrderSummary = forwardRef<HTMLDivElement, DesktopOrderSummaryProps>(
  (
    {
      subtotal,
      shipping = 0,
      tax,
      discount,
      total,
      itemCount,
      ctaText = 'Proceed to Checkout',
      onCheckout,
      loading = false,
      trustBadges,
      className = '',
      ...rest
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(styles.root, className)}
        {...rest}
      >
        {/* Header */}
        <h3 className={styles.header}>
          Order Summary
          {itemCount !== undefined && (
            <span className={styles.itemCount}>({itemCount} items)</span>
          )}
        </h3>

        <div className={styles.divider} />

        {/* Line Items */}
        <div className={styles.lineItems}>
          <div className={styles.lineItem}>
            <span className={styles.lineLabel}>Subtotal</span>
            <span className={styles.lineValue}>{formatNumber(subtotal)} so'm</span>
          </div>

          <div className={styles.lineItem}>
            <span className={styles.lineLabel}>Shipping</span>
            <span className={cn(styles.lineValue, shipping === 0 ? styles.freeText : '')}>
              {shipping === 0 ? 'Free' : `${formatNumber(shipping)} so'm`}
            </span>
          </div>

          {tax !== undefined && tax > 0 && (
            <div className={styles.lineItem}>
              <span className={styles.lineLabel}>Tax</span>
              <span className={styles.lineValue}>{formatNumber(tax)} so'm</span>
            </div>
          )}

          {discount !== undefined && discount > 0 && (
            <div className={styles.lineItem}>
              <span className={styles.lineLabel}>Discount</span>
              <span className={cn(styles.lineValue, styles.discountText)}>
                -{formatNumber(discount)} so'm
              </span>
            </div>
          )}
        </div>

        <div className={styles.divider} />

        {/* Total */}
        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>Total</span>
          <span className={styles.totalValue}>{formatNumber(total)} so'm</span>
        </div>

        {/* CTA */}
        <button
          type="button"
          className={styles.ctaButton}
          onClick={onCheckout}
          disabled={loading}
          aria-label={ctaText}
        >
          {loading ? <SpinnerIcon /> : ctaText}
        </button>

        {/* Trust Badges */}
        {trustBadges && trustBadges.length > 0 && (
          <div className={styles.trustBadges}>
            {trustBadges.map((badge, idx) => {
              const IconComponent = TRUST_ICONS[badge.icon];
              return (
                <div key={idx} className={styles.trustBadge}>
                  <IconComponent />
                  <span>{badge.text}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  },
);

DesktopOrderSummary.displayName = 'DesktopOrderSummary';
