'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, type ElementType, type MouseEventHandler } from 'react';
import { useGeekShop } from '../../../i18n';
import styles from './DealCard.module.scss';

export interface DealCardOwnProps {
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

export type DealCardProps<C extends ElementType = 'div'> = DealCardOwnProps & {
  as?: C;
} & Omit<React.ComponentPropsWithoutRef<C>, keyof DealCardOwnProps | 'as'>;

function DealCardInner<C extends ElementType = 'div'>(
  {
    as,
    image,
    title,
    price,
    originalPrice,
    discount,
    soldPercent = 0,
    onClick,
    className,
    ...rest
  }: DealCardProps<C>,
  ref: React.Ref<Element>,
) {
  const Component = as || 'div';
  const { t, formatPrice } = useGeekShop();
  const savings = originalPrice - price;

  const rootClass = cn(styles.dealCard, className);

  return (
    <Component
      ref={ref}
      className={rootClass}
      onClick={onClick}
      onKeyDown={onClick ? (e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(e as unknown as React.MouseEvent<HTMLDivElement>); } } : undefined}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...rest}
    >
      <div className={styles.inner}>
        <div className={styles.imageArea}>
          <img className={styles.image} src={image} alt={title} />
          <span className={styles.discountBadge}>-{discount}%</span>
        </div>

        <div className={styles.infoArea}>
          <p className={styles.title}>{title}</p>

          <div className={styles.priceRow}>
            <span className={styles.currentPrice}>
              {formatPrice(price)}
            </span>
          </div>

          <span className={styles.originalPrice}>
            {formatPrice(originalPrice)}
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
              {t('product.savings', { amount: formatPrice(savings) })}
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
                {t('product.soldPercent', { percent: soldPercent })}
              </span>
            </div>
          )}
        </div>
      </div>
    </Component>
  );
}

export const DealCard = forwardRef(DealCardInner) as <C extends ElementType = 'div'>(
  props: DealCardProps<C> & { ref?: React.Ref<Element> }
) => JSX.Element;

(DealCard as { displayName?: string }).displayName = 'DealCard';
