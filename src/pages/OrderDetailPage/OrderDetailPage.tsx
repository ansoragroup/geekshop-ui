import React, { useState } from 'react';
import {
  NavBar,
  Container,
  Section,
  CartItem,
  SpecsTable,
  AddressCard,
  PaymentMethodCard,
  Button,
  Badge,
  Divider,
  useGeekShop,
} from '../../components';
import type { Address, PaymentMethod } from '../../components';
import styles from './OrderDetailPage.module.scss';

/* ---------- Delivery step tracker ---------- */

const deliveryStepKeys = [
  { labelKey: 'order.paid', date: '12 mart', completed: true, active: false },
  { labelKey: 'order.shipped', date: '13 mart', completed: true, active: false },
  { labelKey: 'order.shipping', date: '14 mart', completed: false, active: true },
  { labelKey: 'order.delivered', completed: false, active: false },
];

/* ---------- Order items ---------- */

const orderItems = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=160&h=160&fit=crop',
    title: 'MSI GeForce RTX 4060 Ventus 2X 8GB GDDR6',
    variant: '8GB / Qora',
    price: 5200000,
    quantity: 1,
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1555618568-bfe052310f39?w=160&h=160&fit=crop',
    title: 'AMD Ryzen 7 7800X3D Protsessor AM5',
    variant: '8 yadro / 16 ip',
    price: 4100000,
    quantity: 1,
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=160&h=160&fit=crop',
    title: 'Corsair Vengeance DDR5 32GB (2x16GB) 6000MHz',
    variant: '32GB / RGB',
    price: 2200000,
    quantity: 2,
  },
];

/* ---------- Order summary ---------- */

const orderSummaryData = {
  subtotal: 13700000,
  delivery: 0,
  discount: 1370000,
  total: 12330000,
};

/* ---------- Address ---------- */

const deliveryAddress: Address = {
  id: 'addr-1',
  name: 'Aziz Karimov',
  phone: '+998 90 123 45 67',
  street: "Buyuk Ipak Yo'li ko'chasi, 42-uy, 15-xonadon",
  city: 'Toshkent',
  region: 'Toshkent shahri',
  postalCode: '100000',
  isDefault: true,
  label: 'Uy',
};

/* ---------- Payment method ---------- */

const paymentMethod: PaymentMethod = {
  id: 'pm-1',
  type: 'uzcard',
  label: 'UzCard',
  lastFour: '4523',
  expiryDate: '09/27',
  isDefault: true,
};

/* ---------- Status badge icon ---------- */

const TruckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="1" y="3" width="15" height="13" rx="1" />
    <path d="M16 8h4l3 5v4h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

/* ---------- Component ---------- */

export interface OrderDetailPageProps {
  status?: 'shipping' | 'delivered' | 'pending';
}

export const OrderDetailPage: React.FC<OrderDetailPageProps> = ({ status = 'shipping' }) => {
  const { t, formatPrice } = useGeekShop();
  const [, setCopied] = useState(false);

  const handleCopyOrderId = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statusLabel =
    status === 'shipping'
      ? t('order.shipping')
      : status === 'delivered'
      ? t('order.delivered')
      : t('order.statusPending');

  const statusColor =
    status === 'shipping' ? 'info' : status === 'delivered' ? 'success' : 'warning';

  const deliverySteps = deliveryStepKeys.map((step) => ({
    ...step,
    label: t(step.labelKey),
  }));

  const steps = deliverySteps.map((step, i) => {
    if (status === 'delivered') {
      return { ...step, completed: true, active: i === 3 };
    }
    if (status === 'pending') {
      return { ...step, completed: i === 0, active: i === 0 };
    }
    return step;
  });

  return (
    <div className={styles.page}>
      <NavBar
        title={t('order.id', { id: 'GS-2026031401' })}
        showBack
        onBack={() => {}}
        rightActions={[
          {
            key: 'copy',
            icon: (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
            ),
            onClick: handleCopyOrderId,
            ariaLabel: t('order.copy'),
          },
        ]}
      />

      <Container hasNavbar>
        {/* Order status badge */}
        <div className={styles.statusHeader}>
          <Badge
            type="text"
            content={statusLabel}
            color={statusColor as 'info' | 'success' | 'warning'}
            position="inline"
          />
          <span className={styles.orderDate}>14 mart, 2026</span>
        </div>

        {/* Delivery progress tracker */}
        <Section>
          <div className={styles.tracker}>
            <div className={styles.trackerIcon}>
              <TruckIcon />
            </div>
            <div className={styles.trackerSteps}>
              {steps.map((step, i) => (
                <div key={i} className={styles.step}>
                  <div className={styles.stepIndicator}>
                    <div
                      className={`${styles.stepDot} ${
                        step.completed ? styles.stepDotCompleted : ''
                      } ${step.active ? styles.stepDotActive : ''}`}
                    />
                    {i < steps.length - 1 && (
                      <div
                        className={`${styles.stepLine} ${
                          step.completed ? styles.stepLineCompleted : ''
                        }`}
                      />
                    )}
                  </div>
                  <div className={styles.stepInfo}>
                    <span
                      className={`${styles.stepLabel} ${step.active ? styles.stepLabelActive : ''}`}
                    >
                      {step.label}
                    </span>
                    {step.date && <span className={styles.stepDate}>{step.date}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Divider />

        {/* Order items */}
        <Section title={t('checkout.orderItems')}>
          <div className={styles.itemsList}>
            {orderItems.map((item) => (
              <CartItem
                key={item.id}
                image={item.image}
                title={item.title}
                variant={item.variant}
                price={item.price}
                quantity={item.quantity}
              />
            ))}
          </div>
        </Section>

        <Divider />

        {/* Order summary */}
        <Section title={t('order.summary')}>
          <SpecsTable
            specs={[
              { label: t('checkout.subtotal'), value: formatPrice(orderSummaryData.subtotal) },
              {
                label: t('cart.delivery'),
                value:
                  orderSummaryData.delivery === 0
                    ? t('cart.free')
                    : formatPrice(orderSummaryData.delivery),
              },
              { label: t('cart.discount'), value: `-${formatPrice(orderSummaryData.discount)}` },
              { label: t('cart.total'), value: formatPrice(orderSummaryData.total) },
            ]}
          />
        </Section>

        <Divider />

        {/* Delivery address */}
        <Section title={t('checkout.deliveryAddress')}>
          <AddressCard address={deliveryAddress} />
        </Section>

        <Divider />

        {/* Payment method */}
        <Section title={t('checkout.paymentMethod')}>
          <PaymentMethodCard method={paymentMethod} />
        </Section>

        {/* Bottom action buttons */}
        <div className={styles.bottomActions}>
          <Button variant="secondary" size="lg" block>
            {t('order.contactSeller')}
          </Button>
          <Button variant="primary" size="lg" block>
            {t('order.reorderFull')}
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default OrderDetailPage;
