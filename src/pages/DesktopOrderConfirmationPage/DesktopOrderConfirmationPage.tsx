'use client';
import { useState } from 'react';
import {
  DesktopShell,
  Breadcrumbs,
  DesktopButton,
} from '../../components';
import { DefaultTopBar, DefaultHeaderRich, DefaultMegaMenu, DefaultFooter, formatPriceUZS } from '../_shared';
import styles from './DesktopOrderConfirmationPage.module.scss';

// ─── Static data ──────────────────────────────────────────────────────────────

const defaultItems = [
  {
    id: '1',
    image: 'https://picsum.photos/seed/conf-gpu/160/160',
    name: 'MSI RTX 4060 Ti Ventus 2X 8GB',
    quantity: 1,
    price: 4_800_000,
  },
  {
    id: '2',
    image: 'https://picsum.photos/seed/conf-mouse/160/160',
    name: 'Logitech MX Master 3S Wireless Mouse',
    quantity: 2,
    price: 950_000,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export interface DesktopOrderConfirmationPageProps {
  orderId?: string;
  estimatedDelivery?: string;
  items?: typeof defaultItems;
  shippingAddress?: { name: string; phone: string; street: string; city: string; postal: string };
  paymentMethod?: string;
  contactPhone?: string;
  /** Whether the order was paid via installment */
  withInstallment?: boolean;
  /** Installment details (months / monthly amount) */
  installmentMonths?: number;
  installmentMonthly?: number;
  /** Express delivery tag */
  expressDelivery?: boolean;
}

export const DesktopOrderConfirmationPage: React.FC<DesktopOrderConfirmationPageProps> = ({
  orderId = 'GS-2024-5678',
  estimatedDelivery = '3-5 business days',
  items: propItems,
  shippingAddress,
  paymentMethod = 'UzCard •••• 4523',
  contactPhone = '+998 90 123 4567',
  withInstallment = false,
  installmentMonths = 6,
  installmentMonthly,
  expressDelivery = false,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const displayItems = propItems ?? defaultItems;
  const addr = shippingAddress ?? {
    name: 'Islom Karimov',
    phone: '+998 90 123 45 67',
    street: "Amir Temur ko'chasi, 15-uy, 42-xonadon",
    city: 'Tashkent, Uzbekistan',
    postal: '100000',
  };

  const subtotal = displayItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = expressDelivery ? 80_000 : 50_000;
  const total = subtotal + shipping;
  const monthlyAmount = installmentMonthly ?? Math.round(total / installmentMonths);

  const header = (
    <div className={styles.headerWrapper}>
      <DefaultHeaderRich searchValue={searchValue} onSearchChange={setSearchValue} />
      <DefaultMegaMenu />
    </div>
  );

  return (
    <DesktopShell
      topBar={<DefaultTopBar />}
      header={header}
      footer={<DefaultFooter />}
    >
      <div className={styles.breadcrumbs}>
        <Breadcrumbs items={[{ label: 'Home', href: '#' }, { label: 'Order Confirmation' }]} />
      </div>

      {/* Success banner */}
      <div className={styles.successBanner}>
        <div className={styles.checkmarkCircle}>
          <svg className={styles.checkmarkIcon} viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className={styles.successTitle}>Order placed successfully!</h1>
        <p className={styles.successSubtitle}>
          Order <strong>#{orderId}</strong> — estimated delivery: <strong>{estimatedDelivery}</strong>
        </p>
        {expressDelivery && (
          <span className={styles.expressBadge}>Express Delivery</span>
        )}
      </div>

      <div className={styles.contentGrid}>
        {/* Left column */}
        <div className={styles.mainColumn}>
          {/* Order summary card */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Order Summary</h2>
            <div className={styles.itemsList}>
              {displayItems.map((item) => (
                <div key={item.id} className={styles.orderItem}>
                  <img src={item.image} alt={item.name} className={styles.itemImage} />
                  <div className={styles.itemDetails}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemQty}>Qty: {item.quantity}</span>
                  </div>
                  <span className={styles.itemPrice}>{formatPriceUZS(item.price)}</span>
                </div>
              ))}
            </div>
            <div className={styles.priceSummary}>
              <div className={styles.priceRow}>
                <span>Subtotal</span>
                <span>{formatPriceUZS(subtotal)}</span>
              </div>
              <div className={styles.priceRow}>
                <span>Shipping{expressDelivery ? ' (Express)' : ''}</span>
                <span>{formatPriceUZS(shipping)}</span>
              </div>
              <div className={styles.priceDivider} />
              <div className={styles.priceTotal}>
                <span>Total</span>
                <span>{formatPriceUZS(total)}</span>
              </div>
              {withInstallment && (
                <div className={styles.installmentRow}>
                  <span>{installmentMonths} months installment</span>
                  <span>{formatPriceUZS(monthlyAmount)}/mo</span>
                </div>
              )}
            </div>
          </div>

          {/* Shipping address card */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Shipping Address</h2>
            <p className={styles.addressText}>
              {addr.name}<br />
              {addr.phone}<br />
              {addr.street}<br />
              {addr.city} {addr.postal}
            </p>
          </div>

          {/* Payment method card */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Payment Method</h2>
            <p className={styles.paymentText}>{paymentMethod}</p>
            {withInstallment && (
              <p className={styles.installmentNote}>
                Paid via {installmentMonths}-month installment plan — {formatPriceUZS(monthlyAmount)}/month
              </p>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className={styles.sideColumn}>
          <div className={styles.actionsCard}>
            <DesktopButton variant="primary" size="lg" fullWidth>
              Track Order
            </DesktopButton>
            <DesktopButton variant="outline" size="lg" fullWidth>
              Continue Shopping
            </DesktopButton>
          </div>

          <div className={styles.noticeCard}>
            <p className={styles.noticeText}>
              We&apos;ve sent a confirmation to <strong>{contactPhone}</strong>
            </p>
          </div>
        </div>
      </div>
    </DesktopShell>
  );
};
