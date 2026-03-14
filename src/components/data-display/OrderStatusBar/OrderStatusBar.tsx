import type { ReactNode } from 'react';
import styles from './OrderStatusBar.module.scss';

export interface OrderStatusItem {
  /** Inline SVG icon or ReactNode */
  icon: ReactNode;
  /** Status label */
  label: string;
  /** Badge count (0 = hidden) */
  count?: number;
}

export interface OrderStatusBarProps {
  /** Status items to display */
  statuses: OrderStatusItem[];
  /** Callback when a status is tapped */
  onTap?: (index: number) => void;
  /** Additional CSS class */
  className?: string;
}

/* ---------- Default inline SVG icons ---------- */

const WalletIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M16 12.5a.5.5 0 110-1 .5.5 0 010 1z" fill="currentColor" stroke="none" />
    <path d="M2 10h20" />
  </svg>
);

const BoxIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 8V21H3V8" />
    <rect x="1" y="3" width="22" height="5" rx="1" />
    <path d="M10 12h4" />
  </svg>
);

const TruckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" rx="1" />
    <path d="M16 8h4l3 5v4h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const StarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const ReturnIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 14l-4-4 4-4" />
    <path d="M5 10h11a4 4 0 010 8H9" />
  </svg>
);

export const DEFAULT_ORDER_STATUSES: OrderStatusItem[] = [
  { icon: <WalletIcon />, label: "To'lov kutilmoqda", count: 0 },
  { icon: <BoxIcon />, label: 'Yuborilmagan', count: 0 },
  { icon: <TruckIcon />, label: 'Yetkazilmoqda', count: 0 },
  { icon: <StarIcon />, label: 'Baholash', count: 0 },
  { icon: <ReturnIcon />, label: 'Qaytarish', count: 0 },
];

export function OrderStatusBar({
  statuses = DEFAULT_ORDER_STATUSES,
  onTap,
  className = '',
}: OrderStatusBarProps) {
  return (
    <div className={`${styles.root} ${className}`}>
      {statuses.map((item, i) => (
        <button
          key={i}
          className={styles.item}
          onClick={() => onTap?.(i)}
          type="button"
        >
          <span className={styles.iconWrap}>
            {item.icon}
            {item.count != null && item.count > 0 && (
              <span className={styles.badge}>
                {item.count > 99 ? '99+' : item.count}
              </span>
            )}
          </span>
          <span className={styles.label}>{item.label}</span>
        </button>
      ))}
    </div>
  );
}

export default OrderStatusBar;
