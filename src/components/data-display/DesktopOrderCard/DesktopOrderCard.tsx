import { forwardRef, useCallback, type HTMLAttributes, type MouseEvent } from 'react';
import styles from './DesktopOrderCard.module.scss';

// ─── Types ───────────────────────────────────────────────────────────────────

export type DesktopOrderStatus =
  | 'pending'
  | 'processing'
  | 'shipping'
  | 'delivered'
  | 'cancelled'
  | 'returned';

export interface DesktopOrderProduct {
  id: string;
  image: string;
  title: string;
}

export interface DesktopOrderAction {
  id: string;
  label: string;
  variant?: 'primary' | 'secondary' | 'danger';
}

export interface DesktopOrderCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Order identifier, e.g. "GS-2026-0047" */
  orderId: string;
  /** Current order status */
  status: DesktopOrderStatus;
  /** Products in the order */
  products: DesktopOrderProduct[];
  /** Total order amount in UZS */
  totalAmount: number;
  /** Formatted date string, e.g. "14 Mar 2026" */
  date: string;
  /** Action buttons for the order */
  actions?: DesktopOrderAction[];
  /** Callback when an action button is clicked */
  onAction?: (actionId: string) => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatPrice(value: number): string {
  return value.toLocaleString('uz-UZ').replace(/,/g, ' ');
}

const STATUS_LABELS: Record<DesktopOrderStatus, string> = {
  pending: 'Pending',
  processing: 'Processing',
  shipping: 'Shipping',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
  returned: 'Returned',
};

const STATUS_ICONS: Record<DesktopOrderStatus, string> = {
  pending: '\u23F3',
  processing: '\u2699\uFE0F',
  shipping: '\uD83D\uDE9A',
  delivered: '\u2713',
  cancelled: '\u2717',
  returned: '\u21A9',
};

const MAX_VISIBLE_PRODUCTS = 5;

// ─── Component ───────────────────────────────────────────────────────────────

export const DesktopOrderCard = forwardRef<HTMLDivElement, DesktopOrderCardProps>(
  (
    {
      orderId,
      status,
      products,
      totalAmount,
      date,
      actions,
      onAction,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const handleAction = useCallback(
      (e: MouseEvent, actionId: string) => {
        e.stopPropagation();
        onAction?.(actionId);
      },
      [onAction],
    );

    const visibleProducts = products.slice(0, MAX_VISIBLE_PRODUCTS);
    const overflowCount = products.length - MAX_VISIBLE_PRODUCTS;
    const statusClass = styles[`status_${status}`] || '';

    return (
      <div ref={ref} className={`${styles.root} ${className}`} {...rest}>
        {/* Top row: order ID + date left, status badge right */}
        <div className={styles.topRow}>
          <div className={styles.orderInfo}>
            <span className={styles.orderId}>Order #{orderId}</span>
            <span className={styles.dotSeparator} aria-hidden="true">&bull;</span>
            <span className={styles.date}>{date}</span>
          </div>
          <span className={`${styles.statusBadge} ${statusClass}`} data-testid="status-badge">
            {STATUS_LABELS[status]} {STATUS_ICONS[status]}
          </span>
        </div>

        {/* Middle row: product thumbnails + summary */}
        <div className={styles.middleRow}>
          <div className={styles.thumbnails} role="group" aria-label="Order products">
            {visibleProducts.map((product) => (
              <img
                key={product.id}
                src={product.image}
                alt={product.title}
                className={styles.thumbnail}
                loading="lazy"
              />
            ))}
            {overflowCount > 0 && (
              <div className={styles.overflowBadge} aria-label={`${overflowCount} more items`}>
                +{overflowCount}
              </div>
            )}
          </div>
          <div className={styles.summary}>
            <span className={styles.itemCount}>
              {products.length} {products.length === 1 ? 'item' : 'items'}
            </span>
            <span className={styles.dotSeparator} aria-hidden="true">&bull;</span>
            <span className={styles.totalAmount}>{formatPrice(totalAmount)} so'm</span>
          </div>
        </div>

        {/* Bottom row: action buttons */}
        {actions && actions.length > 0 && (
          <div className={styles.actionsRow}>
            {actions.map((action) => {
              const variantClass = action.variant === 'primary'
                ? styles.actionPrimary
                : action.variant === 'danger'
                  ? styles.actionDanger
                  : styles.actionSecondary;

              return (
                <button
                  key={action.id}
                  type="button"
                  className={`${styles.actionButton} ${variantClass}`}
                  onClick={(e) => handleAction(e, action.id)}
                >
                  {action.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  },
);

DesktopOrderCard.displayName = 'DesktopOrderCard';
