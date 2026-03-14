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
} from '../../components';
import type { Address, PaymentMethod } from '../../components';
import styles from './CheckoutPage.module.scss';

/* ---------- Addresses ---------- */

const addresses: Address[] = [
  {
    id: 'addr-1',
    name: 'Aziz Karimov',
    phone: '+998 90 123 45 67',
    street: 'Buyuk Ipak Yo\'li ko\'chasi, 42-uy, 15-xonadon',
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
    street: 'Amir Temur shoh ko\'chasi, 108-uy, IT Park',
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
    image: 'https://picsum.photos/seed/checkout-gpu/160/160',
    title: 'MSI GeForce RTX 4060 Ventus 2X 8GB GDDR6',
    variant: '8GB / Qora',
    price: 5200000,
    quantity: 1,
  },
  {
    id: '2',
    image: 'https://picsum.photos/seed/checkout-cpu/160/160',
    title: 'AMD Ryzen 7 7800X3D Protsessor AM5',
    variant: '8 yadro / 16 ip',
    price: 4100000,
    quantity: 1,
  },
  {
    id: '3',
    image: 'https://picsum.photos/seed/checkout-ram/160/160',
    title: 'Corsair Vengeance DDR5 32GB (2x16GB) 6000MHz',
    variant: '32GB / RGB',
    price: 2200000,
    quantity: 2,
  },
];

/* ---------- Price breakdown ---------- */

const priceBreakdown = [
  { label: 'Mahsulotlar (4 ta)', value: '13 700 000 so\'m' },
  { label: 'Yetkazib berish', value: 'Bepul' },
  { label: 'Chegirma', value: '-1 370 000 so\'m' },
  { label: 'Kupon chegirmasi', value: '-500 000 so\'m' },
  { label: 'Jami', value: '11 830 000 so\'m' },
];

/* ---------- Plus icon ---------- */

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

/* ---------- Coupon icon ---------- */

const CouponIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  hasCoupon = false,
}) => {
  const [selectedAddress, setSelectedAddress] = useState('addr-1');
  const [selectedPayment, setSelectedPayment] = useState('pm-1');
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(hasCoupon);

  return (
    <div className={styles.page}>
      <NavBar
        title="Buyurtma berish"
        showBack
        onBack={() => {}}
      />

      <Container hasNavbar>
        {/* Delivery address section */}
        <Section title="Yetkazib berish manzili">
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
          <Button
            variant="text"
            size="md"
            className={styles.addButton}
            onClick={() => {}}
          >
            <PlusIcon /> Yangi manzil qo'shish
          </Button>
        </Section>

        <Divider />

        {/* Payment method section */}
        <Section title="To'lov usuli">
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
        <Section title="Buyurtma mahsulotlari">
          <SectionHeader title="Mahsulotlar" count={cartItems.length} />
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
        <Section title="Kupon kodi">
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
                placeholder="Kupon kodini kiriting"
                leftIcon={<CouponIcon />}
                clearable
              />
              <Button
                variant="primary"
                size="md"
                disabled={!couponCode.trim()}
                onClick={() => setCouponApplied(true)}
              >
                Qo'llash
              </Button>
            </div>
          )}
        </Section>

        <Divider />

        {/* Price breakdown */}
        <Section title="Narx tafsiloti">
          <SpecsTable specs={priceBreakdown} />
        </Section>

        {/* Bottom action bar */}
        <div className={styles.bottomBar}>
          <div className={styles.totalSection}>
            <span className={styles.totalLabel}>Jami:</span>
            <div className={styles.totalPrice}>
              <span className={styles.totalCurrency}>so'm</span>
              <span className={styles.totalAmount}>11 830 000</span>
            </div>
          </div>
          <Button variant="primary" size="lg" className={styles.placeOrderBtn}>
            Buyurtma berish
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default CheckoutPage;
