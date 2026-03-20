'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, type HTMLAttributes } from 'react';
import styles from './ProductListItem.module.scss';

export interface ProductListItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Product image URL */
  image: string;
  /** Product title */
  title: string;
  /** Current price */
  price: number;
  /** Original price before discount */
  originalPrice?: number;
  /** Discount percentage (e.g. 25 for 25%) */
  discount?: number;
  /** Rating value (0-5) */
  rating?: number;
  /** Number of reviews */
  reviewCount?: number;
  /** Whether the product is in stock */
  inStock?: boolean;
  /** Whether free shipping is available */
  freeShipping?: boolean;
  /** Callback when "Add to Cart" is clicked */
  onAddToCart?: () => void;
  /** Callback when "Wishlist" is clicked */
  onWishlist?: () => void;
  /** Callback when the card is clicked (not the buttons) */
  onClick?: () => void;
}

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M7 1.5l1.545 3.13 3.455.503-2.5 2.437.59 3.44L7 9.268 3.91 11.01l.59-3.44-2.5-2.437 3.455-.503L7 1.5z"
      fill={filled ? '#FFA726' : 'none'}
      stroke={filled ? '#FFA726' : '#EEEEEE'}
      strokeWidth="1"
    />
  </svg>
);

const HeartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M9 15.375s-6.75-4.125-6.75-8.25a3.375 3.375 0 0 1 6.75-1.125 3.375 3.375 0 0 1 6.75 1.125c0 4.125-6.75 8.25-6.75 8.25z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M1.5 1.5h2.25l1.2 6.75h9.3l1.5-4.5H5.25"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="6.75" cy="15" r="1.125" fill="currentColor" />
    <circle cx="13.5" cy="15" r="1.125" fill="currentColor" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M3 7l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function formatPrice(price: number): string {
  return price.toLocaleString('uz-UZ').replace(/,/g, ' ');
}

export const ProductListItem = forwardRef<HTMLDivElement, ProductListItemProps>(
  (
    {
      image,
      title,
      price,
      originalPrice,
      discount,
      rating,
      reviewCount,
      inStock = true,
      freeShipping,
      onAddToCart,
      onWishlist,
      onClick,
      className,
      ...rest
    },
    ref,
  ) => {
    const rootClass = cn(styles.root, className);

    const handleCardClick = () => {
      onClick?.();
    };

    const handleCardKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick?.();
      }
    };

    const handleButtonClick = (e: React.MouseEvent, handler?: () => void) => {
      e.stopPropagation();
      handler?.();
    };

    const handleButtonKeyDown = (e: React.KeyboardEvent, handler?: () => void) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        handler?.();
      }
    };

    const renderStars = () => {
      if (rating === undefined) return null;
      const stars = [];
      for (let i = 1; i <= 5; i++) {
        stars.push(<StarIcon key={i} filled={i <= Math.round(rating)} />);
      }
      return stars;
    };

    return (
      <div className={styles.wrapper}>
        <div
          ref={ref}
          className={rootClass}
          onClick={handleCardClick}
          onKeyDown={handleCardKeyDown}
          role="button"
          tabIndex={0}
          {...rest}
        >
          {/* Image */}
          <div className={styles.imageContainer}>
            <img src={image} alt={title} className={styles.image} loading="lazy" />
          </div>

          {/* Content */}
          <div className={styles.content}>
            {/* Title */}
            <h3 className={styles.title}>{title}</h3>

            {/* Rating */}
            {rating !== undefined && (
              <div className={styles.rating}>
                <div className={styles.stars}>{renderStars()}</div>
                {reviewCount !== undefined && (
                  <span className={styles.reviewCount}>({reviewCount} reviews)</span>
                )}
              </div>
            )}

            {/* Price Row */}
            <div className={styles.priceRow}>
              <span className={styles.price}>{formatPrice(price)} sum</span>
              {originalPrice && (
                <span className={styles.originalPrice}>{formatPrice(originalPrice)} sum</span>
              )}
              {discount && (
                <span className={styles.discount}>-{discount}%</span>
              )}
            </div>

            {/* Stock & Shipping */}
            <div className={styles.meta}>
              <span className={inStock ? styles.inStock : styles.outOfStock}>
                <CheckIcon />
                {inStock ? 'In stock' : 'Out of stock'}
              </span>
              {freeShipping && (
                <>
                  <span className={styles.metaSeparator}>&bull;</span>
                  <span className={styles.freeShipping}>Free shipping</span>
                </>
              )}
            </div>

            {/* Actions */}
            <div className={styles.actions}>
              {onWishlist && (
                <button
                  type="button"
                  className={styles.wishlistButton}
                  onClick={(e) => handleButtonClick(e, onWishlist)}
                  onKeyDown={(e) => handleButtonKeyDown(e, onWishlist)}
                  aria-label="Add to wishlist"
                >
                  <HeartIcon />
                  <span>Wishlist</span>
                </button>
              )}
              {onAddToCart && (
                <button
                  type="button"
                  className={styles.addToCartButton}
                  onClick={(e) => handleButtonClick(e, onAddToCart)}
                  onKeyDown={(e) => handleButtonKeyDown(e, onAddToCart)}
                  aria-label="Add to cart"
                  disabled={!inStock}
                >
                  <CartIcon />
                  <span>Add to cart</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

ProductListItem.displayName = 'ProductListItem';
