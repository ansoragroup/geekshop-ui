'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, useCallback, useState, useRef, type ElementType } from 'react';
import styles from './DesktopProductCard.module.scss';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface DesktopProductCardBadge {
  label: string;
  variant?: 'sale' | 'top' | 'hot' | 'custom';
  bgColor?: string;
  textColor?: string;
  /** @deprecated Use variant instead */
  color?: 'green' | 'blue' | 'orange' | 'red' | 'purple';
}

export interface DesktopProductCardOwnProps {
  /** Product image URL */
  image: string;
  /** Additional product images for mouse-swipe preview */
  images?: string[];
  /** Product title */
  title: string;
  /** Current price (number) */
  price: number;
  /** Original price before discount */
  originalPrice?: number;
  /** Discount percentage e.g. "-35%" */
  discount?: string;
  /** Currency label e.g. "UZS" */
  currency?: string;
  /** Rating value 1-5 */
  rating?: number;
  /** Number of purchases shown as "X купили" */
  purchaseCount?: number;
  /** @deprecated Use purchaseCount — shown as "X купили" for backward compat */
  reviewCount?: number;
  /** Badge labels shown at top-right of image */
  badges?: DesktopProductCardBadge[];
  /** Show "Рекомендуем" label */
  recommended?: boolean;
  /** Custom recommended label text */
  recommendedText?: string;
  /** Whether item has free shipping */
  freeShipping?: boolean;
  /** Delivery text e.g. "до 30 дней, бесплатно" */
  deliveryText?: string;
  /** Callback when card is clicked */
  onClick?: () => void;
  /** @deprecated CTA button removed in AliExpress design */
  ctaText?: string;
  /** @deprecated CTA button removed in AliExpress design */
  ctaColor?: string;
  /** @deprecated CTA button removed in AliExpress design */
  onAddToCart?: () => void;
  /** @deprecated Wishlist button removed in AliExpress design */
  isWishlisted?: boolean;
  /** @deprecated Wishlist button removed in AliExpress design */
  onWishlist?: () => void;
  /** @deprecated Installment display removed in AliExpress design */
  installmentPrice?: number;
  /** @deprecated Installment display removed in AliExpress design */
  installmentLabel?: string;
}

export type DesktopProductCardProps<C extends ElementType = 'div'> = DesktopProductCardOwnProps & {
  as?: C;
} & Omit<React.ComponentPropsWithoutRef<C>, keyof DesktopProductCardOwnProps | 'as'>;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatPrice(value: number): string {
  const isDecimal = value % 1 !== 0;
  const str = isDecimal ? value.toFixed(2) : Math.floor(value).toString();
  const [intPart, decPart] = str.split('.');
  const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return decPart ? `${formatted}.${decPart}` : formatted;
}

// ─── Inline SVG Icons ────────────────────────────────────────────────────────

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
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

// ─── Badge Color Map ─────────────────────────────────────────────────────────

const BADGE_VARIANTS: Record<string, { bg: string; color: string }> = {
  sale: { bg: '#FFE500', color: '#FF0000' },
  top: { bg: '#FF0000', color: '#FFFFFF' },
  hot: { bg: '#FF5000', color: '#FFFFFF' },
};

const LEGACY_COLORS: Record<string, { bg: string; color: string }> = {
  green: { bg: '#07C160', color: '#FFFFFF' },
  blue: { bg: '#1890FF', color: '#FFFFFF' },
  orange: { bg: '#FF5000', color: '#FFFFFF' },
  red: { bg: '#FF0000', color: '#FFFFFF' },
  purple: { bg: '#7B2BFC', color: '#FFFFFF' },
};

function getBadgeColors(badge: DesktopProductCardBadge): { bg: string; color: string } {
  if (badge.bgColor && badge.textColor) return { bg: badge.bgColor, color: badge.textColor };
  if (badge.variant && BADGE_VARIANTS[badge.variant]) return BADGE_VARIANTS[badge.variant];
  if (badge.color && LEGACY_COLORS[badge.color]) return LEGACY_COLORS[badge.color];
  return BADGE_VARIANTS.sale;
}

// ─── Component ───────────────────────────────────────────────────────────────

function DesktopProductCardInner<C extends ElementType = 'div'>(
  {
    as,
    image,
    images,
    title,
    price,
    originalPrice,
    discount,
    currency = 'UZS',
    rating,
    purchaseCount,
    reviewCount,
    badges,
    recommended,
    recommendedText = 'Рекомендуем',
    freeShipping,
    deliveryText,
    onClick,
    className = '',
    // Deprecated — accepted but not rendered
    ctaText: _ctaText,
    ctaColor: _ctaColor,
    onAddToCart: _onAddToCart,
    isWishlisted: _isWishlisted,
    onWishlist: _onWishlist,
    installmentPrice: _installmentPrice,
    installmentLabel: _installmentLabel,
    ...rest
  }: DesktopProductCardProps<C>,
  ref: React.Ref<Element>,
) {
  const Component = as || 'div';
  const hasDiscount = originalPrice !== undefined && originalPrice > price;
  const displayCount = purchaseCount ?? reviewCount;

  // ─── Image swipe preview ───
  // Combine primary image with additional images
  const allImages = images && images.length > 0 ? [image, ...images] : [image];
  const hasMultipleImages = allImages.length > 1;
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleImageMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!hasMultipleImages) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const ratio = x / rect.width;
      const idx = Math.min(Math.floor(ratio * allImages.length), allImages.length - 1);
      setActiveImageIndex(idx);
    },
    [hasMultipleImages, allImages.length],
  );

  const handleImageMouseLeave = useCallback(() => {
    setActiveImageIndex(0);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick?.();
      }
    },
    [onClick],
  );

  return (
    <Component
      ref={ref}
      className={cn(styles.root, className)}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      {...rest}
    >
      {/* ─── Image Area with mouse-swipe preview ─── */}
      <div
        ref={imageContainerRef}
        className={styles.imageContainer}
        onMouseMove={hasMultipleImages ? handleImageMouseMove : undefined}
        onMouseLeave={hasMultipleImages ? handleImageMouseLeave : undefined}
      >
        <img
          src={allImages[activeImageIndex]}
          alt={title}
          className={styles.image}
          loading="lazy"
          decoding="async"
        />

        {/* Dot indicators for multiple images */}
        {hasMultipleImages && (
          <div className={styles.imageDots}>
            {allImages.map((_, idx) => (
              <span
                key={idx}
                className={cn(styles.dot, idx === activeImageIndex && styles.dotActive)}
              />
            ))}
          </div>
        )}

        {/* Badges — top right, stacked vertically */}
        {badges && badges.length > 0 && (
          <div className={styles.badgeColumn}>
            {badges.map((badge, idx) => {
              const colors = getBadgeColors(badge);
              return (
                <span
                  key={idx}
                  className={styles.badge}
                  style={{ background: colors.bg, color: colors.color }}
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
        {/* Old price + discount (above current price) */}
        {hasDiscount && (
          <div className={styles.oldPriceRow}>
            <span className={styles.originalPrice}>
              {formatPrice(originalPrice)} {currency}
            </span>
            {discount && (
              <span className={styles.discountPercent}>{discount}</span>
            )}
          </div>
        )}

        {/* Current price */}
        <div className={styles.priceBlock}>
          <span className={styles.price}>
            {formatPrice(price)} {currency}
          </span>
        </div>

        {/* Rating + purchase count */}
        {(rating !== undefined || displayCount !== undefined) && (
          <div className={styles.ratingRow}>
            {rating !== undefined && (
              <span className={styles.ratingChip}>
                <StarIcon />
                <span className={styles.ratingValue}>{rating.toFixed(1)}</span>
              </span>
            )}
            {displayCount !== undefined && (
              <span className={styles.purchaseCount}>
                {formatPrice(displayCount)} купили
              </span>
            )}
          </div>
        )}

        {/* Title — 2 line clamp */}
        <h3 className={styles.title}>{title}</h3>

        {/* Recommended label */}
        {recommended && (
          <span className={styles.recommended}>{recommendedText}</span>
        )}

        {/* Delivery info */}
        {(freeShipping || deliveryText) && (
          <div className={styles.deliveryRow}>
            <span className={styles.truckIcon}><TruckIcon /></span>
            <span className={styles.deliveryText}>
              {deliveryText || 'до 30 дней, бесплатно'}
            </span>
          </div>
        )}
      </div>
    </Component>
  );
}

export const DesktopProductCard = forwardRef(DesktopProductCardInner) as <C extends ElementType = 'div'>(
  props: DesktopProductCardProps<C> & { ref?: React.Ref<Element> }
) => JSX.Element;

(DesktopProductCard as { displayName?: string }).displayName = 'DesktopProductCard';
