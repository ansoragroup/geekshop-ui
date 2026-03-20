import { forwardRef, useCallback, type HTMLAttributes, type MouseEvent } from 'react';
import styles from './DesktopProductCard.module.scss';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface DesktopProductCardBadge {
  label: string;
  color?: 'green' | 'blue' | 'orange' | 'red' | 'purple';
}

export interface DesktopProductCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Product image URL */
  image: string;
  /** Product title */
  title: string;
  /** Current price in UZS (number) */
  price: number;
  /** Original price before discount */
  originalPrice?: number;
  /** Discount percentage e.g. "-17%" */
  discount?: string;
  /** Monthly installment price */
  installmentPrice?: number;
  /** Installment period text e.g. "so'm/oyiga" or "so'm/мес" */
  installmentLabel?: string;
  /** Rating value 1-5 */
  rating?: number;
  /** Number of reviews */
  reviewCount?: number;
  /** Badge labels shown at bottom of image e.g. [{label: "ORIGINAL", color: "green"}] */
  badges?: DesktopProductCardBadge[];
  /** CTA button text */
  ctaText?: string;
  /** CTA button color (CSS color string) */
  ctaColor?: string;
  /** Whether item has free shipping */
  freeShipping?: boolean;
  /** Delivery text e.g. "Ertaga" or "Доставка завтра" */
  deliveryText?: string;
  /** Whether wishlist is active */
  isWishlisted?: boolean;
  /** Callbacks */
  onAddToCart?: () => void;
  onWishlist?: () => void;
  onClick?: () => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatPrice(value: number): string {
  return value.toLocaleString('ru-RU').replace(/,/g, ' ');
}

// ─── Inline SVG Icons ────────────────────────────────────────────────────────

function HeartOutlineIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function HeartFilledIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

// ─── Badge Color Map ─────────────────────────────────────────────────────────

const BADGE_COLORS: Record<string, { bg: string; color: string }> = {
  green: { bg: '#07C160', color: '#FFFFFF' },
  blue: { bg: '#1890FF', color: '#FFFFFF' },
  orange: { bg: '#FF5000', color: '#FFFFFF' },
  red: { bg: '#FF3B30', color: '#FFFFFF' },
  purple: { bg: '#7B2BFC', color: '#FFFFFF' },
};

// ─── Component ───────────────────────────────────────────────────────────────

export const DesktopProductCard = forwardRef<HTMLDivElement, DesktopProductCardProps>(
  (
    {
      image,
      title,
      price,
      originalPrice,
      discount,
      installmentPrice,
      installmentLabel = "so'm/oyiga",
      rating,
      reviewCount,
      badges,
      ctaText = 'Savatga',
      ctaColor,
      freeShipping,
      deliveryText,
      isWishlisted = false,
      onAddToCart,
      onWishlist,
      onClick,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const hasDiscount = originalPrice !== undefined && originalPrice > price;

    const handleAction = useCallback(
      (e: MouseEvent, handler?: () => void) => {
        e.stopPropagation();
        handler?.();
      },
      [],
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
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
        className={`${styles.root} ${className}`}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        {...rest}
      >
        {/* ─── Image Area ─── */}
        <div className={styles.imageContainer}>
          <img
            src={image}
            alt={title}
            className={styles.image}
            loading="lazy"
          />

          {/* Discount badge — top left */}
          {discount && (
            <span className={styles.discountBadge}>{discount}</span>
          )}

          {/* Wishlist heart — top right */}
          <button
            type="button"
            className={`${styles.wishlistBtn} ${isWishlisted ? styles.wishlisted : ''}`}
            onClick={(e) => handleAction(e, onWishlist)}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {isWishlisted ? <HeartFilledIcon /> : <HeartOutlineIcon />}
          </button>

          {/* Product badges at bottom of image */}
          {badges && badges.length > 0 && (
            <div className={styles.badgeRow}>
              {badges.map((badge, idx) => {
                const colorSet = BADGE_COLORS[badge.color ?? 'green'];
                return (
                  <span
                    key={idx}
                    className={styles.badge}
                    style={{
                      background: colorSet.bg,
                      color: colorSet.color,
                    }}
                  >
                    {badge.label}
                  </span>
                );
              })}
            </div>
          )}
        </div>

        {/* ─── Content Area ─── */}
        <div className={styles.content}>
          {/* Price */}
          <div className={styles.priceBlock}>
            <span className={styles.price}>
              {formatPrice(price)} so'm
            </span>
            {hasDiscount && (
              <div className={styles.oldPriceRow}>
                <span className={styles.originalPrice}>
                  {formatPrice(originalPrice)}
                </span>
                {discount && (
                  <span className={styles.discountPercent}>{discount}</span>
                )}
              </div>
            )}
          </div>

          {/* Installment */}
          {installmentPrice && (
            <span className={styles.installment}>
              {formatPrice(installmentPrice)} {installmentLabel}
            </span>
          )}

          {/* Title — 2 line clamp */}
          <h3 className={styles.title}>{title}</h3>

          {/* Rating row */}
          {(rating !== undefined || reviewCount !== undefined) && (
            <div className={styles.ratingRow}>
              {rating !== undefined && (
                <>
                  <span className={styles.star}>
                    <StarIcon />
                  </span>
                  <span className={styles.ratingValue}>{rating.toFixed(1)}</span>
                </>
              )}
              {reviewCount !== undefined && (
                <span className={styles.reviewCount}>
                  ({formatPrice(reviewCount)})
                </span>
              )}
            </div>
          )}

          {/* Free shipping / delivery */}
          {(freeShipping || deliveryText) && (
            <div className={styles.deliveryRow}>
              {deliveryText && <span className={styles.deliveryText}>{deliveryText}</span>}
              {freeShipping && !deliveryText && <span className={styles.deliveryText}>Bepul yetkazib berish</span>}
            </div>
          )}

          {/* Spacer to push CTA to bottom */}
          <div className={styles.spacer} />

          {/* CTA button — full width */}
          <button
            type="button"
            className={styles.ctaButton}
            style={ctaColor ? { background: ctaColor } : undefined}
            onClick={(e) => handleAction(e, onAddToCart)}
          >
            <CartIcon />
            <span>{ctaText}</span>
          </button>
        </div>
      </div>
    );
  },
);

DesktopProductCard.displayName = 'DesktopProductCard';
