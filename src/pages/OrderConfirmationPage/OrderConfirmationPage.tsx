import { Button, useGeekShop } from '../../components';
import { mockOrderItems } from '../_shared';
import type { OrderItem } from '../_shared';
import styles from './OrderConfirmationPage.module.scss';

/* ---------- Props ---------- */

export interface OrderConfirmationPageProps {
  /** Order ID to display */
  orderId?: string;
  /** Estimated delivery in days (e.g. "3-5") */
  estimatedDays?: number;
  /** Subset of items to display; defaults to first 2 mockOrderItems */
  items?: OrderItem[];
  /** Called when "View Order" is tapped */
  onViewOrder?: () => void;
  /** Called when "Continue Shopping" is tapped */
  onContinueShopping?: () => void;
}

/* ---------- Component ---------- */

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({
  orderId = 'GS-20260315-001',
  estimatedDays = 5,
  items,
  onViewOrder,
  onContinueShopping,
}) => {
  const { t, formatPrice: fmtPrice } = useGeekShop();

  const displayItems = items ?? mockOrderItems.slice(0, 2);
  const totalPrice = displayItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className={styles.page}>
      {/* Success header */}
      <div className={styles.successHeader}>
        <div className={styles.checkmarkCircle} aria-hidden="true">
          <svg
            className={styles.checkmarkIcon}
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h1 className={styles.successTitle}>{t('order.confirmed')}</h1>
        <p className={styles.successSubtitle}>{t('order.thankYou')}</p>
      </div>

      {/* Order info */}
      <div className={styles.infoSection}>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>{t('order.orderNumber')}</span>
          <span className={styles.infoValue}>#{orderId}</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>{t('order.estimatedDelivery')}</span>
          <span className={styles.infoValue}>3-{t('order.days', { count: estimatedDays })}</span>
        </div>
      </div>

      {/* Order items */}
      <div className={styles.itemsSection}>
        <h2 className={styles.itemsTitle}>{t('checkout.orderItems')}:</h2>
        <div className={styles.itemsList}>
          {displayItems.map((item) => (
            <div className={styles.itemCard} key={item.id}>
              <img
                className={styles.itemImage}
                src={item.image}
                alt={item.name}
                loading="lazy"
              />
              <div className={styles.itemInfo}>
                <span className={styles.itemName}>{item.name}</span>
                <span className={styles.itemMeta}>x{item.quantity}</span>
                <span className={styles.itemPrice}>
                  {fmtPrice(item.price * item.quantity)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>{t('cart.total')}:</span>
          <span className={styles.totalPrice}>{fmtPrice(totalPrice)}</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className={styles.actionsSection}>
        <Button variant="primary" size="lg" block onClick={onViewOrder}>
          {t('order.viewOrder')}
        </Button>
        <Button variant="secondary" size="lg" block onClick={onContinueShopping}>
          {t('order.continueShopping')}
        </Button>
      </div>
    </div>
  );
};
