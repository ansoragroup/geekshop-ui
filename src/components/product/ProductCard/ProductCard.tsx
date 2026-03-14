import { PriceDisplay } from '../PriceDisplay';
import styles from './ProductCard.module.scss';

export type ProductBadge = 'new' | 'top' | 'hot';

export interface ProductCardProps {
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
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS class */
  className?: string;
}

const badgeLabels: Record<ProductBadge, string> = {
  new: 'Yangi',
  top: 'TOP',
  hot: 'Xit',
};

export function ProductCard({
  image,
  title,
  price,
  originalPrice,
  discount,
  badge,
  soldCount,
  onClick,
  className = '',
}: ProductCardProps) {
  const hasDiscount = originalPrice !== undefined && originalPrice > price;

  return (
    <div className={`${styles.root} ${className}`} onClick={onClick} role="button" tabIndex={0}>
      {/* Image container */}
      <div className={styles.imageWrapper}>
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
  );
}

export default ProductCard;
