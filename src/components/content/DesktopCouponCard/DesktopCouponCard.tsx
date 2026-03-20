import { forwardRef, type HTMLAttributes, type MouseEvent } from 'react';
import styles from './DesktopCouponCard.module.scss';

// ─── Types ────────────────────────────────────────────────────────────────────

export type DesktopCouponCardColor = 'orange' | 'red' | 'green' | 'blue';

export interface DesktopCouponCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Discount display text, e.g. "50,000 so'm" or "15%" */
  discount: string;
  /** Coupon code */
  code: string;
  /** Minimum order requirement, e.g. "Orders over 500,000 so'm" */
  minAmount?: string;
  /** Applicable product categories */
  categories?: string[];
  /** Expiry date string, e.g. "31 Mar 2026" */
  expiryDate?: string;
  /** Callback when Apply button is clicked */
  onApply?: () => void;
  /** Whether the coupon has been applied */
  applied?: boolean;
  /** Color variant for the discount block */
  color?: DesktopCouponCardColor;
}

// ─── Inline SVG Icons ─────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export const DesktopCouponCard = forwardRef<HTMLDivElement, DesktopCouponCardProps>(
  (
    {
      discount,
      code,
      minAmount,
      categories,
      expiryDate,
      onApply,
      applied = false,
      color = 'orange',
      className = '',
      ...rest
    },
    ref,
  ) => {
    const handleApplyClick = (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onApply?.();
    };

    const colorClass = styles[`color-${color}`] || styles['color-orange'];

    return (
      <div
        ref={ref}
        className={`${styles.root} ${className}`}
        {...rest}
      >
        {/* Discount block (left ticket section) */}
        <div className={`${styles.discountBlock} ${colorClass}`}>
          <div className={styles.cutoutTop} />
          <div className={styles.cutoutBottom} />
          <span className={styles.discountValue}>{discount}</span>
          <span className={styles.discountLabel}>OFF</span>
        </div>

        {/* Dashed divider */}
        <div className={styles.divider}>
          <div className={styles.dashedLine} />
        </div>

        {/* Details section (right) */}
        <div className={styles.detailsBlock}>
          <div className={styles.detailsContent}>
            <div className={styles.codeRow}>
              <span className={styles.codeLabel}>Code:</span>
              <span className={styles.codeValue}>{code}</span>
            </div>

            {minAmount && (
              <span className={styles.minAmount}>{minAmount}</span>
            )}

            <div className={styles.metaRow}>
              {categories && categories.length > 0 && (
                <span className={styles.categories}>
                  {categories.join(' \u2022 ')}
                </span>
              )}
              {categories && categories.length > 0 && expiryDate && (
                <span className={styles.metaSeparator}>{'\u2022'}</span>
              )}
              {expiryDate && (
                <span className={styles.expiry}>Exp: {expiryDate}</span>
              )}
            </div>
          </div>

          {/* Action */}
          <div className={styles.actionBlock}>
            {applied ? (
              <span className={styles.appliedBadge}>
                <CheckIcon />
                Applied
              </span>
            ) : (
              <button
                type="button"
                className={styles.applyButton}
                onClick={handleApplyClick}
                aria-label={`Apply coupon ${code}`}
              >
                Apply
              </button>
            )}
          </div>
        </div>
      </div>
    );
  },
);

DesktopCouponCard.displayName = 'DesktopCouponCard';
