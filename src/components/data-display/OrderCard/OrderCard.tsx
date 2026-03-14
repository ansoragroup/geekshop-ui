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

export interface OrderCardProps {
  /** Order ID */
  orderId: string;
  /** Order status */
  status: OrderStatus;
  /** Products in the order */
  products: OrderProduct[];
  /** Total amount in so'm */
  totalAmount: number;
  /** Order date */
  date: string;
  /** Action buttons */
  actions?: OrderAction[];
  /** Additional CSS class */
  className?: string;
}

const STATUS_MAP: Record<OrderStatus, { label: string; color: string }> = {
  pending: { label: "To'lov kutilmoqda", color: '#FFA726' },
  shipping: { label: 'Yetkazilmoqda', color: '#1890FF' },
  review: { label: 'Baholash', color: '#07C160' },
  return: { label: 'Qaytarish', color: '#FF3B30' },
};

function formatPrice(value: number): string {
  return value.toLocaleString('ru-RU').replace(/,/g, ' ');
}

export function OrderCard({
  orderId,
  status,
  products,
  totalAmount,
  date,
  actions,
  className = '',
}: OrderCardProps) {
  const statusInfo = STATUS_MAP[status];

  return (
    <div className={`${styles.root} ${className}`}>
      {/* Status header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.orderId}>Buyurtma #{orderId}</span>
          <span className={styles.date}>{date}</span>
        </div>
        <span
          className={styles.statusBadge}
          style={{ color: statusInfo.color }}
        >
          {statusInfo.label}
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
            />
            <div className={styles.productInfo}>
              <span className={styles.productTitle}>{product.title}</span>
              {product.variant && (
                <span className={styles.productVariant}>{product.variant}</span>
              )}
              <div className={styles.productPriceRow}>
                <span className={styles.productPrice}>
                  {formatPrice(product.price)} so'm
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
          Jami ({products.reduce((s, p) => s + p.quantity, 0)} ta mahsulot):
        </span>
        <span className={styles.totalAmount}>
          {formatPrice(totalAmount)} so'm
        </span>
      </div>

      {/* Actions */}
      {actions && actions.length > 0 && (
        <div className={styles.actions}>
          {actions.map((action, i) => (
            <button
              key={i}
              className={`${styles.actionBtn} ${action.type === 'primary' ? styles.actionPrimary : styles.actionDefault}`}
              onClick={action.onClick}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderCard;
