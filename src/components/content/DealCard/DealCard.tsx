import { forwardRef, type MouseEventHandler, type HTMLAttributes } from 'react';
import styles from './DealCard.module.scss';

export interface DealCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Product image URL */
  image: string;
  /** Product name */
  title: string;
  /** Current sale price in so'm */
  price: number;
  /** Original price before discount in so'm */
  originalPrice: number;
  /** Discount percentage (e.g. 35 for -35%) */
  discount: number;
  /** Percentage of items sold (0-100) */
  soldPercent?: number;
  /** Click handler */
  onClick?: MouseEventHandler<HTMLDivElement>;
}

function formatPrice(value: number): string {
  return value.toLocaleString('uz-UZ').replace(/,/g, ' ');
}

export const DealCard = forwardRef<HTMLDivElement, DealCardProps>(
  (
    {
      image,
      title,
      price,
      originalPrice,
      discount,
      soldPercent = 0,
      onClick,
      className,
      ...rest
    },
    ref,
  ) => {
  const savings = originalPrice - price;

  const rootClass = [styles.dealCard, className].filter(Boolean).join(' ');

  return (
    <div
      ref={ref}
      className={rootClass}
      onClick={onClick}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(e as unknown as React.MouseEvent<HTMLDivElement>); } } : undefined}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...rest}
    >
      <div className={styles.imageArea}>
        <img className={styles.image} src={image} alt={title} />
        <span className={styles.discountBadge}>-{discount}%</span>
      </div>

      <div className={styles.infoArea}>
        <p className={styles.title}>{title}</p>

        <div className={styles.priceRow}>
          <span className={styles.currentPrice}>
            {formatPrice(price)} <span className={styles.currency}>so'm</span>
          </span>
        </div>

        <span className={styles.originalPrice}>
          {formatPrice(originalPrice)} so'm
        </span>

        <div className={styles.savingsRow}>
          <svg
            className={styles.savingsIcon}
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 1v12M1 7l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={styles.savingsText}>
            Tejash: {formatPrice(savings)} so'm
          </span>
        </div>

        {soldPercent > 0 && (
          <div className={styles.progressArea}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${Math.min(soldPercent, 100)}%` }}
              />
            </div>
            <span className={styles.progressLabel}>
              {soldPercent}% sotildi
            </span>
          </div>
        )}
      </div>
    </div>
  );
  },
);

DealCard.displayName = 'DealCard';
