'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, type HTMLAttributes } from 'react';
import { useGeekShop } from '../../../i18n';
import styles from './OrderCard.module.scss';

export type OrderStatus =
  | 'pending'    // To'lov kutilmoqda
  | 'shipping'   // Yetkazilmoqda
  | 'review'     // Baholash
  | 'return';    // Qaytarish

export interface OrderProduct {
  image: string;
  title: string;
  variant?: string;
  price: number;
  quantity: number;
}

export interface OrderAction {
  label: string;
  type?: 'primary' | 'default';
  onClick: () => void;
}

export interface OrderCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Order ID */
  orderId: string;
  /** Order status */
  status: OrderStatus;
  /** Products in the order */
  products: OrderProduct[];
  /** Total amount */
  totalAmount: number;
  /** Order date */
  date: string;
  /** Action buttons */
  actions?: OrderAction[];
  /** Link URL — when provided, renders as <a> */
  href?: string;
  /** Link target */
  target?: string;
}

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: '#FFA726',
  shipping: '#1890FF',
  review: '#07C160',
  return: '#FF3B30',
};

const STATUS_KEYS: Record<OrderStatus, string> = {
  pending: 'order.statusPending',
  shipping: 'order.statusShipping',
  review: 'order.statusReview',
  return: 'order.statusReturn',
};

export const OrderCard = forwardRef<HTMLDivElement, OrderCardProps>(
  ({ orderId, status, products, totalAmount, date, actions, href, target, className = '', ...rest }, ref) => {
    const Wrapper = href ? 'a' : 'article';
    const linkProps = href ? { href, target } : {};
    const { t, formatPrice } = useGeekShop();
    const statusColor = STATUS_COLORS[status];
    const statusLabel = t(STATUS_KEYS[status]);

    return (
      <Wrapper ref={ref as React.Ref<HTMLElement>} className={cn(styles.root, className)} {...linkProps} {...rest}>
        {/* Status header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.orderId}>{t('order.id', { id: orderId })}</span>
            <span className={styles.date}>{date}</span>
          </div>
          <span
            className={styles.statusBadge}
            style={{ color: statusColor }}
          >
            {statusLabel}
          </span>
        </div>

        {/* Products list */}
        <div className={styles.products}>
          {products.map((product, i) => (
            <div key={i} className={styles.productRow}>
              <img
                src={product.image}
                alt={product.title}
                className={styles.productImage}
                loading="lazy"
                width={72}
                height={72}
              />
              <div className={styles.productInfo}>
                <span className={styles.productTitle}>{product.title}</span>
                {product.variant && (
                  <span className={styles.productVariant}>{product.variant}</span>
                )}
                <div className={styles.productPriceRow}>
                  <span className={styles.productPrice}>
                    {formatPrice(product.price)}
                  </span>
                  <span className={styles.productQty}>x{product.quantity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>
            {t('order.total', { count: products.reduce((s, p) => s + p.quantity, 0) })}
          </span>
          <span className={styles.totalAmount}>
            {formatPrice(totalAmount)}
          </span>
        </div>

        {/* Actions */}
        {actions && actions.length > 0 && (
          <div className={styles.actions}>
            {actions.map((action, i) => (
              <button
                key={i}
                className={cn(styles.actionBtn, action.type === 'primary' ? styles.actionPrimary : styles.actionDefault)}
                onClick={action.onClick}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </Wrapper>
    );
  }
);

OrderCard.displayName = 'OrderCard';
