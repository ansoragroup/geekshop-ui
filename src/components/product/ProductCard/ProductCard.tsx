import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { useGeekShop } from '../../../i18n';
import { PriceDisplay } from '../PriceDisplay';
import { Rating } from '../../data-display/Rating';
import styles from './ProductCard.module.scss';

// ─── Types ───────────────────────────────────────────────────────────────────

export type ProductBadge = 'new' | 'top' | 'hot';

/** Props for the flat API (backward-compatible) */
export interface ProductCardFlatProps extends HTMLAttributes<HTMLDivElement> {
  /** Product image URL */
  image: string;
  /** Product title */
  title: string;
  /** Current/sale price */
  price: number;
  /** Original price before discount */
  originalPrice?: number;
  /** Discount percentage text, e.g. "-6%" */
  discount?: string;
  /** Badge type: "new" = Yangi, "top" = TOP, "hot" = Xit */
  badge?: ProductBadge;
  /** Sold count text, e.g. "700+ sotilgan" */
  soldCount?: string;
  /** Image aspect ratio override, e.g. "auto" for natural height (waterfall), "1/1" for square (default) */
  imageAspectRatio?: string;
  children?: never;
}

/** Props for the compound API */
export interface ProductCardCompoundProps extends HTMLAttributes<HTMLDivElement> {
  /** Compound sub-components */
  children: ReactNode;
  image?: never;
  title?: never;
  price?: never;
}

export type ProductCardProps = ProductCardFlatProps | ProductCardCompoundProps;

// ─── Sub-component props ─────────────────────────────────────────────────────

export interface ProductCardImageProps {
  /** Image URL */
  src: string;
  /** Alt text for the image */
  alt?: string;
  /** Badges to display on the image */
  badges?: ProductBadge[];
  /** Discount text, e.g. "-6%" */
  discount?: string;
  /** Additional CSS class */
  className?: string;
}

export interface ProductCardBodyProps {
  /** Content to render inside the body */
  children: ReactNode;
  /** Additional CSS class */
  className?: string;
}

export interface ProductCardTitleProps {
  /** Title text */
  children: ReactNode;
  /** Max number of lines before truncation */
  lineClamp?: number;
  /** Additional CSS class */
  className?: string;
}

export interface ProductCardPriceProps {
  /** Current/sale price */
  current: number;
  /** Original price before discount */
  original?: number;
  /** Monthly installment amount */
  installment?: number;
  /** Additional CSS class */
  className?: string;
}

export interface ProductCardRatingProps {
  /** Rating value (0-5) */
  value: number;
  /** Number of reviews */
  count?: number;
  /** Additional CSS class */
  className?: string;
}

// ─── Badge labels ────────────────────────────────────────────────────────────

const badgeLabels: Record<ProductBadge, string> = {
  new: 'Yangi',
  top: 'TOP',
  hot: 'Xit',
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function ProductCardImage({
  src,
  alt = '',
  badges,
  discount,
  className = '',
}: ProductCardImageProps) {
  return (
    <div className={`${styles.imageWrapper} ${className}`}>
      <img src={src} alt={alt} className={styles.image} loading="lazy" />

      {discount && (
        <span className={styles.discountBadge}>{discount}</span>
      )}

      {badges?.map((badge) => (
        <span
          key={badge}
          className={`${styles.badge} ${styles[`badge-${badge}`]}`}
        >
          {badgeLabels[badge]}
        </span>
      ))}
    </div>
  );
}
ProductCardImage.displayName = 'ProductCard.Image';

function ProductCardBody({ children, className = '' }: ProductCardBodyProps) {
  return (
    <div className={`${styles.content} ${className}`}>
      {children}
    </div>
  );
}
ProductCardBody.displayName = 'ProductCard.Body';

function ProductCardTitle({
  children,
  lineClamp,
  className = '',
}: ProductCardTitleProps) {
  const style = lineClamp ? { WebkitLineClamp: lineClamp } as React.CSSProperties : undefined;

  return (
    <h3 className={`${styles.title} ${className}`} style={style}>
      {children}
    </h3>
  );
}
ProductCardTitle.displayName = 'ProductCard.Title';

function ProductCardPrice({
  current,
  original,
  installment,
  className = '',
}: ProductCardPriceProps) {
  const { t, formatPrice } = useGeekShop();
  const hasDiscount = original !== undefined && original > current;

  return (
    <div className={`${styles.priceRow} ${className}`}>
      <PriceDisplay
        price={current}
        originalPrice={hasDiscount ? original : undefined}
        variant={hasDiscount ? 'sale' : 'default'}
        size="sm"
      />
      {installment !== undefined && (
        <span className={styles.soldCount}>
          {t('product.installment', { price: formatPrice(installment) })}
        </span>
      )}
    </div>
  );
}
ProductCardPrice.displayName = 'ProductCard.Price';

function ProductCardRating({
  value,
  count,
  className = '',
}: ProductCardRatingProps) {
  return (
    <Rating
      value={value}
      count={count}
      size="sm"
      className={className}
    />
  );
}
ProductCardRating.displayName = 'ProductCard.Rating';

// ─── Detection helper ────────────────────────────────────────────────────────

function isCompoundMode(props: ProductCardProps): props is ProductCardCompoundProps {
  return 'children' in props && props.children !== undefined && !('title' in props && props.title !== undefined);
}

// ─── Main component ─────────────────────────────────────────────────────────

const ProductCardBase = forwardRef<HTMLDivElement, ProductCardProps>(
  (props, ref) => {
    const { onClick, className = '', ...rest } = props;

    if (isCompoundMode(props)) {
      // Compound API: render children directly
      const { children, ...compoundRest } = rest as Omit<ProductCardCompoundProps, 'onClick' | 'className'>;
      return (
        <div
          ref={ref}
          className={`${styles.root} ${className}`}
          onClick={onClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onClick?.();
            }
          }}
          role="button"
          tabIndex={0}
          {...compoundRest}
        >
          <div className={styles.inner}>
            {children}
          </div>
        </div>
      );
    }

    // Flat API: existing behavior (backward-compatible)
    const {
      image,
      title,
      price,
      originalPrice,
      discount,
      badge,
      soldCount,
      imageAspectRatio,
      ...flatRest
    } = rest as Omit<ProductCardFlatProps, 'onClick' | 'className'>;
    const hasDiscount = originalPrice !== undefined && originalPrice > price;

    return (
      <div
        ref={ref}
        className={`${styles.root} ${className}`}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
          }
        }}
        role="button"
        tabIndex={0}
        {...flatRest}
      >
        <div className={styles.inner}>
          {/* Image container */}
          <div className={styles.imageWrapper} style={imageAspectRatio ? { aspectRatio: imageAspectRatio } : undefined}>
            <img src={image} alt={title} className={styles.image} loading="lazy" />

            {/* Discount badge */}
            {discount && (
              <span className={styles.discountBadge}>{discount}</span>
            )}

            {/* Status badge */}
            {badge && (
              <span className={`${styles.badge} ${styles[`badge-${badge}`]}`}>
                {badgeLabels[badge]}
              </span>
            )}
          </div>

          {/* Content */}
          <div className={styles.content}>
            <h3 className={styles.title}>{title}</h3>

            <div className={styles.priceRow}>
              <PriceDisplay
                price={price}
                originalPrice={hasDiscount ? originalPrice : undefined}
                variant={hasDiscount ? 'sale' : 'default'}
                size="sm"
              />
            </div>

            {soldCount && (
              <span className={styles.soldCount}>{soldCount}</span>
            )}
          </div>
        </div>
      </div>
    );
  },
);

ProductCardBase.displayName = 'ProductCard';

// ─── Attach sub-components ───────────────────────────────────────────────────

export const ProductCard = Object.assign(ProductCardBase, {
  Image: ProductCardImage,
  Body: ProductCardBody,
  Title: ProductCardTitle,
  Price: ProductCardPrice,
  Rating: ProductCardRating,
});
