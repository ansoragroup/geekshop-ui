import { forwardRef, useState, useCallback, type HTMLAttributes, type MouseEvent } from 'react';
import styles from './DesktopProductCard.module.scss';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface DesktopProductCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Array of product image URLs for the carousel */
  images: string[];
  /** Product title */
  title: string;
  /** Shop/store name */
  shopName: string;
  /** Current/sale price in UZS */
  price: number;
  /** Original price before discount */
  originalPrice?: number;
  /** Discount text, e.g. "-15%" */
  discount?: string;
  /** Star rating 0-5 */
  rating?: number;
  /** Number of units sold, e.g. "234" */
  soldCount?: string;
  /** Monthly installment price, e.g. "742 000" */
  installmentPrice?: string;
  /** Whether free shipping is available */
  freeShipping?: boolean;
  /** Callback when "add to cart" action clicked */
  onAddToCart?: () => void;
  /** Callback when "wishlist" action clicked */
  onWishlist?: () => void;
  /** Callback when "compare" action clicked */
  onCompare?: () => void;
  /** Callback when "quick view" action clicked */
  onQuickView?: () => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatPrice(value: number): string {
  return value.toLocaleString('uz-UZ').replace(/,/g, ' ');
}

function renderStars(rating: number): string {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '\u2605'.repeat(full) + (half ? '\u2606' : '') + '\u2606'.repeat(empty);
}

// ─── Inline SVG Icons ────────────────────────────────────────────────────────

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function CompareIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function CreditCardIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export const DesktopProductCard = forwardRef<HTMLDivElement, DesktopProductCardProps>(
  (
    {
      images,
      title,
      shopName,
      price,
      originalPrice,
      discount,
      rating,
      soldCount,
      installmentPrice,
      freeShipping,
      onAddToCart,
      onWishlist,
      onCompare,
      onQuickView,
      onClick,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const hasDiscount = originalPrice !== undefined && originalPrice > price;
    const displayImages = images.length > 0 ? images : [''];

    const handlePrev = useCallback(
      (e: MouseEvent) => {
        e.stopPropagation();
        setCurrentImage((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
      },
      [displayImages.length],
    );

    const handleNext = useCallback(
      (e: MouseEvent) => {
        e.stopPropagation();
        setCurrentImage((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
      },
      [displayImages.length],
    );

    const handleAction = useCallback(
      (e: MouseEvent, handler?: () => void) => {
        e.stopPropagation();
        handler?.();
      },
      [],
    );

    return (
      <div
        ref={ref}
        className={`${styles.root} ${className}`}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.(e as unknown as MouseEvent<HTMLDivElement>);
          }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="button"
        tabIndex={0}
        {...rest}
      >
        {/* Image area */}
        <div className={styles.imageArea}>
          <img
            src={displayImages[currentImage]}
            alt={title}
            className={styles.image}
            loading="lazy"
          />

          {/* Discount badge */}
          {discount && (
            <span className={styles.discountBadge}>{discount}</span>
          )}

          {/* Wishlist heart (always visible, top-right of image) */}
          <button
            type="button"
            className={styles.wishlistBtn}
            onClick={(e) => handleAction(e, onWishlist)}
            aria-label="Add to wishlist"
          >
            <HeartIcon />
          </button>

          {/* Image carousel arrows (visible on hover) */}
          {displayImages.length > 1 && isHovered && (
            <>
              <button
                type="button"
                className={`${styles.carouselArrow} ${styles.arrowLeft}`}
                onClick={handlePrev}
                aria-label="Previous image"
              >
                <ChevronLeftIcon />
              </button>
              <button
                type="button"
                className={`${styles.carouselArrow} ${styles.arrowRight}`}
                onClick={handleNext}
                aria-label="Next image"
              >
                <ChevronRightIcon />
              </button>
            </>
          )}

          {/* Image dots indicator */}
          {displayImages.length > 1 && (
            <div className={styles.dots}>
              {displayImages.map((_, idx) => (
                <span
                  key={idx}
                  className={`${styles.dot} ${idx === currentImage ? styles.dotActive : ''}`}
                />
              ))}
            </div>
          )}

          {/* Quick actions overlay (visible on hover) */}
          {isHovered && (
            <div className={styles.quickActions}>
              <button
                type="button"
                className={styles.actionBtn}
                onClick={(e) => handleAction(e, onAddToCart)}
                aria-label="Add to cart"
              >
                <CartIcon />
              </button>
              <button
                type="button"
                className={styles.actionBtn}
                onClick={(e) => handleAction(e, onWishlist)}
                aria-label="Add to wishlist"
              >
                <HeartIcon />
              </button>
              <button
                type="button"
                className={styles.actionBtn}
                onClick={(e) => handleAction(e, onCompare)}
                aria-label="Compare"
              >
                <CompareIcon />
              </button>
              <button
                type="button"
                className={styles.actionBtn}
                onClick={(e) => handleAction(e, onQuickView)}
                aria-label="Quick view"
              >
                <EyeIcon />
              </button>
            </div>
          )}
        </div>

        {/* Content area */}
        <div className={styles.content}>
          {/* Shop name */}
          <span className={styles.shopName}>{shopName}</span>

          {/* Title */}
          <h3 className={styles.title}>{title}</h3>

          {/* Rating + sold count */}
          {(rating !== undefined || soldCount) && (
            <div className={styles.ratingRow}>
              {rating !== undefined && (
                <span className={styles.stars} aria-label={`Rating: ${rating} out of 5`}>
                  {renderStars(rating)}
                </span>
              )}
              {soldCount && (
                <span className={styles.soldCount}>{soldCount} sold</span>
              )}
            </div>
          )}

          {/* Price row */}
          <div className={styles.priceRow}>
            <span className={styles.currentPrice}>
              {formatPrice(price)} so'm
            </span>
            {hasDiscount && (
              <span className={styles.originalPrice}>
                {formatPrice(originalPrice)} so'm
              </span>
            )}
          </div>

          {/* Installment */}
          {installmentPrice && (
            <div className={styles.installment}>
              <CreditCardIcon />
              <span>from {installmentPrice}/mo</span>
            </div>
          )}

          {/* Free shipping */}
          {freeShipping && (
            <div className={styles.freeShipping}>
              <TruckIcon />
              <span>Free shipping</span>
            </div>
          )}

          {/* Add to cart button */}
          <button
            type="button"
            className={styles.addToCartBtn}
            onClick={(e) => handleAction(e, onAddToCart)}
          >
            Add to cart
          </button>
        </div>
      </div>
    );
  },
);

DesktopProductCard.displayName = 'DesktopProductCard';
