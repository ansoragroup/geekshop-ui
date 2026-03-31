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
  Input,
  Divider,
  CouponCard,
  SectionHeader,
  useGeekShop,
} from '../../components';
import type { Address, PaymentMethod } from '../../components';
import styles from './CheckoutPage.module.scss';

/* ---------- Addresses ---------- */

const addresses: Address[] = [
  {
    id: 'addr-1',
    name: 'Aziz Karimov',
    phone: '+998 90 123 45 67',
    street: "Buyuk Ipak Yo'li ko'chasi, 42-uy, 15-xonadon",
    city: 'Toshkent',
    region: 'Toshkent shahri',
    postalCode: '100000',
    isDefault: true,
    label: 'Uy',
  },
  {
    id: 'addr-2',
    name: 'Aziz Karimov',
    phone: '+998 90 123 45 67',
    street: "Amir Temur shoh ko'chasi, 108-uy, IT Park",
    city: 'Toshkent',
    region: 'Toshkent shahri',
    postalCode: '100084',
    isDefault: false,
    label: 'Ish',
  },
];

/* ---------- Payment methods ---------- */

const paymentMethods: PaymentMethod[] = [
  {
    id: 'pm-1',
    type: 'uzcard',
    label: 'UzCard',
    lastFour: '4523',
    expiryDate: '09/27',
    isDefault: true,
  },
  {
    id: 'pm-2',
    type: 'humo',
    label: 'Humo',
    lastFour: '8901',
    expiryDate: '03/28',
    isDefault: false,
  },
  {
    id: 'pm-3',
    type: 'payme',
    label: 'Payme',
    isDefault: false,
  },
  {
    id: 'pm-4',
    type: 'cash',
    label: 'Naqd pul',
    isDefault: false,
  },
];

/* ---------- Cart items ---------- */

const cartItems = [
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

/* ---------- Price breakdown ---------- */

const priceBreakdownData = {
  subtotal: 13700000,
  delivery: 0,
  discount: 1370000,
  couponDiscount: 500000,
  total: 11830000,
};

/* ---------- Plus icon ---------- */

const PlusIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

/* ---------- Coupon icon ---------- */

const CouponIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 12V22H4V12" />
    <rect x="2" y="7" width="20" height="5" rx="1" />
    <path d="M12 22V7" />
    <path d="M12 7H7.5a2.5 2.5 0 110-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 100-5C13 2 12 7 12 7z" />
  </svg>
);

/* ---------- Component ---------- */

export interface CheckoutPageProps {
  hasCoupon?: boolean;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ hasCoupon = false }) => {
  const { t, formatPrice } = useGeekShop();
  const [selectedAddress, setSelectedAddress] = useState('addr-1');
  const [selectedPayment, setSelectedPayment] = useState('pm-1');
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(hasCoupon);

  return (
    <div className={styles.page}>
      <NavBar title={t('page.checkout')} showBack onBack={() => {}} />

      <Container hasNavbar>
        {/* Delivery address section */}
        <Section title={t('checkout.deliveryAddress')}>
          <div className={styles.addressList} role="listbox">
            {addresses.map((addr) => (
              <AddressCard
                key={addr.id}
                address={addr}
                selectable
                selected={selectedAddress === addr.id}
                onSelect={() => setSelectedAddress(addr.id)}
              />
            ))}
          </div>
          <Button variant="text" size="md" className={styles.addButton} onClick={() => {}}>
            <PlusIcon /> {t('address.add')}
          </Button>
        </Section>

        <Divider />

        {/* Payment method section */}
        <Section title={t('checkout.paymentMethod')}>
          <div className={styles.paymentList} role="listbox">
            {paymentMethods.map((pm) => (
              <PaymentMethodCard
                key={pm.id}
                method={pm}
                selectable
                selected={selectedPayment === pm.id}
                onSelect={() => setSelectedPayment(pm.id)}
              />
            ))}
          </div>
        </Section>

        <Divider />

        {/* Order items section */}
        <Section title={t('checkout.orderItems')}>
          <SectionHeader title={t('cart.items')} count={cartItems.length} />
          <div className={styles.itemsList}>
            {cartItems.map((item) => (
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

        {/* Coupon section */}
        <Section title={t('checkout.couponCode')}>
          {couponApplied ? (
            <CouponCard
              discount="-5%"
              code="GEEK2026"
              expiryDate="31 mart, 2026"
              minAmount={5000000}
              onUse={() => setCouponApplied(false)}
            />
          ) : (
            <div className={styles.couponInput}>
              <Input
                value={couponCode}
                onChange={setCouponCode}
                placeholder={t('checkout.enterCoupon')}
                leftIcon={<CouponIcon />}
                clearable
              />
              <Button
                variant="primary"
                size="md"
                disabled={!couponCode.trim()}
                onClick={() => setCouponApplied(true)}
              >
                {t('checkout.applyCoupon')}
              </Button>
            </div>
          )}
        </Section>

        <Divider />

        {/* Price breakdown */}
        <Section title={t('checkout.priceDetails')}>
          <SpecsTable
            specs={[
              { label: t('checkout.subtotal'), value: formatPrice(priceBreakdownData.subtotal) },
              {
                label: t('cart.delivery'),
                value:
                  priceBreakdownData.delivery === 0
                    ? t('cart.free')
                    : formatPrice(priceBreakdownData.delivery),
              },
              { label: t('cart.discount'), value: `-${formatPrice(priceBreakdownData.discount)}` },
              {
                label: t('cart.couponDiscount'),
                value: `-${formatPrice(priceBreakdownData.couponDiscount)}`,
              },
              { label: t('cart.total'), value: formatPrice(priceBreakdownData.total) },
            ]}
          />
        </Section>

        {/* Bottom action bar */}
        <div className={styles.bottomBar}>
          <div className={styles.totalSection}>
            <span className={styles.totalLabel}>{t('cart.total')}:</span>
            <div className={styles.totalPrice}>
              <span className={styles.totalAmount}>{formatPrice(priceBreakdownData.total)}</span>
            </div>
          </div>
          <Button variant="primary" size="lg" className={styles.placeOrderBtn}>
            {t('cart.placeOrder')}
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default CheckoutPage;
