import { useState } from 'react';
import {
  DesktopShell,
  TopBar,
  DesktopHeader,
  Footer,
  Breadcrumbs,
  TwoColumnLayout,
  Steps,
  AddressCard,
  PaymentMethodCard,
  Button,
} from '../../components';
import type { Address, PaymentMethod } from '../../components';
import { mockAddresses, mockPaymentMethods, mockCartItems, formatPrice } from '../_shared/mockData';
import styles from './DesktopCheckoutPage.module.scss';

// ─── Static data ──────────────────────────────────────────────────────────────

const footerColumns = [
  { title: 'Customer Service', links: [{ label: 'Help Center' }, { label: 'Returns & Refunds' }, { label: 'Shipping Info' }] },
  { title: 'About GeekShop', links: [{ label: 'About Us' }, { label: 'Careers' }, { label: 'Press' }] },
  { title: 'Policies', links: [{ label: 'Privacy Policy' }, { label: 'Terms of Service' }] },
];

const checkoutSteps = [
  { title: 'Shipping' },
  { title: 'Payment' },
  { title: 'Review' },
];

// ─── Shared shell slots ──────────────────────────────────────────────────────

const DesktopTopBar = () => (
  <TopBar
    leftItems={[<span key="w">Welcome to GeekShop!</span>, <span key="h">Help</span>]}
    rightItems={[
      <button key="l" type="button" style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: 'inherit' }}>EN</button>,
      <button key="c" type="button" style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: 'inherit' }}>USD</button>,
    ]}
  />
);

const DesktopHeaderBar = () => (
  <DesktopHeader
    logo={<span style={{ fontWeight: 700, fontSize: 20, color: '#FF5000' }}>GeekShop</span>}
    searchPlaceholder="Search products..."
    cartCount={3}
  />
);

const DesktopFooterSection = () => (
  <Footer columns={footerColumns} copyrightText="\u00A9 2026 GeekShop. All rights reserved." />
);

// ─── Component ────────────────────────────────────────────────────────────────

export const DesktopCheckoutPage: React.FC = () => {
  const [currentStep] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState<string>(mockAddresses[0].id);
  const [selectedPayment, setSelectedPayment] = useState<string>(mockPaymentMethods[0].id);

  const selectedCartItems = mockCartItems.filter((item) => item.selected);
  const subtotal = selectedCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const orderSummary = (
    <div className={styles.summaryCard}>
      <h2 className={styles.summaryTitle}>Order Summary</h2>

      {/* Mini cart items */}
      <div className={styles.miniCartList}>
        {selectedCartItems.map((item) => (
          <div key={item.id} className={styles.miniCartItem}>
            <img src={item.image} alt={item.name} className={styles.miniCartImage} />
            <div className={styles.miniCartInfo}>
              <span className={styles.miniCartName}>{item.name}</span>
              <span className={styles.miniCartVariant}>{item.variant}</span>
              <span className={styles.miniCartPrice}>{formatPrice(item.price)} UZS x{item.quantity}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.summaryDivider} />

      <div className={styles.summaryRows}>
        <div className={styles.summaryRow}>
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)} UZS</span>
        </div>
        <div className={styles.summaryRow}>
          <span>Shipping</span>
          <span className={styles.freeLabel}>Free</span>
        </div>
        <div className={styles.summaryDivider} />
        <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
          <span>Total</span>
          <span>{formatPrice(total)} UZS</span>
        </div>
      </div>

      <Button variant="primary" size="lg" style={{ width: '100%', marginTop: 16 }}>
        Place Order
      </Button>
    </div>
  );

  return (
    <DesktopShell
      topBar={<DesktopTopBar />}
      header={<DesktopHeaderBar />}
      footer={<DesktopFooterSection />}
    >
      {/* Breadcrumbs */}
      <div className={styles.breadcrumbs}>
        <Breadcrumbs items={[{ label: 'Home', href: '#' }, { label: 'Cart', href: '#' }, { label: 'Checkout' }]} />
      </div>

      {/* Checkout steps */}
      <div className={styles.stepsWrapper}>
        <Steps current={currentStep} items={checkoutSteps} />
      </div>

      <TwoColumnLayout
        sidebar={orderSummary}
        sidebarWidth={380}
        sidebarPosition="right"
        gap={24}
        stickyTop={24}
      >
        {/* Shipping Address Section */}
        <div className={styles.formSection}>
          <h2 className={styles.formSectionTitle}>Shipping Address</h2>
          <div className={styles.addressList}>
            {mockAddresses.map((addr: Address) => (
              <AddressCard
                key={addr.id}
                address={addr}
                selected={selectedAddress === addr.id}
                selectable
                onSelect={(a) => setSelectedAddress(a.id)}
              />
            ))}
          </div>
          <Button variant="outline" size="md" style={{ marginTop: 12 }}>
            + Add New Address
          </Button>
        </div>

        {/* Payment Method Section */}
        <div className={styles.formSection}>
          <h2 className={styles.formSectionTitle}>Payment Method</h2>
          <div className={styles.paymentList}>
            {mockPaymentMethods.map((method: PaymentMethod) => (
              <PaymentMethodCard
                key={method.id}
                method={method}
                selected={selectedPayment === method.id}
                selectable
                onSelect={(m) => setSelectedPayment(m.id)}
              />
            ))}
          </div>
        </div>
      </TwoColumnLayout>
    </DesktopShell>
  );
};
