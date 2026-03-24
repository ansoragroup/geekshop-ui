import { useState } from 'react';
import {
  DesktopShell,
  DesktopHeaderRich,
  Breadcrumbs,
  TwoColumnLayout,
  DesktopSteps,
  DesktopAddressCard,
  DesktopPaymentMethodCard,
  DesktopOrderSummary,
  Button,
} from '../../components';
import type {
  DesktopAddress,
  DesktopPaymentMethod,
} from '../../components';
import { mockCartItems, DefaultTopBar, DefaultMegaMenu, DefaultFooter, defaultHeaderCategories, defaultPromoLinks } from '../_shared';
import styles from './DesktopCheckoutPage.module.scss';

// ─── Static data ──────────────────────────────────────────────────────────────

const addresses: DesktopAddress[] = [
  {
    id: 'addr-1',
    name: 'Jasur Karimov',
    phone: '+998 90 123 45 67',
    street: "Amir Temur ko'chasi, 15-uy, 42-xonadon",
    city: 'Toshkent',
    region: 'Toshkent shahri',
    postalCode: '100000',
    isDefault: true,
    label: 'Uy',
  },
  {
    id: 'addr-2',
    name: 'Jasur Karimov',
    phone: '+998 90 123 45 67',
    street: "Mustaqillik ko'chasi, 59-uy, 3-qavat",
    city: 'Toshkent',
    region: 'Chilonzor tumani',
    postalCode: '100115',
    isDefault: false,
    label: 'Ish',
  },
  {
    id: 'addr-3',
    name: 'Anvar Karimov',
    phone: '+998 71 234 56 78',
    street: "Navoiy ko'chasi, 28-uy",
    city: 'Toshkent',
    region: 'Yakkasaroy tumani',
    postalCode: '100028',
    isDefault: false,
    label: 'Ota-ona',
  },
];

const paymentMethods: DesktopPaymentMethod[] = [
  { id: 'pm-1', type: 'uzcard', label: 'UzCard', lastFour: '4523', expiryDate: '09/27', isDefault: true },
  { id: 'pm-2', type: 'humo', label: 'Humo', lastFour: '8901', expiryDate: '03/28', isDefault: false },
  { id: 'pm-3', type: 'payme', label: 'Payme', isDefault: false },
  { id: 'pm-4', type: 'cash', label: 'Naqd pul', isDefault: false },
];


const checkoutSteps = [
  { title: 'Shipping' },
  { title: 'Payment' },
  { title: 'Review' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export interface DesktopCheckoutPageProps {
  /** Initial step index (0=Shipping, 1=Payment, 2=Review) */
  initialStep?: number;
  /** Render with empty cart */
  emptyCart?: boolean;
}

export const DesktopCheckoutPage: React.FC<DesktopCheckoutPageProps> = ({
  initialStep = 0,
  emptyCart = false,
}) => {
  const [currentStep] = useState(initialStep);
  const [searchValue, setSearchValue] = useState('');
  const [selectedAddress, setSelectedAddress] = useState<string>(addresses[0].id);
  const [selectedPayment, setSelectedPayment] = useState<string>(paymentMethods[0].id);

  const selectedCartItems = emptyCart ? [] : mockCartItems.filter((item) => item.selected);
  const subtotal = selectedCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const header = (
    <div className={styles.headerWrapper}>
      <DesktopHeaderRich
        logo={<span className={styles.logoText}>GeekShop</span>}
        searchPlaceholder="Search for GPUs, laptops, monitors..."
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        cartCount={selectedCartItems.length}
        wishlistCount={2}
        categories={defaultHeaderCategories}
        promoLinks={defaultPromoLinks}
        location="Tashkent"
      />
      <DefaultMegaMenu />
    </div>
  );

  const orderSummary = (
    <DesktopOrderSummary
      subtotal={subtotal}
      shipping={shipping}
      total={total}
      itemCount={selectedCartItems.length}
      ctaText="Place Order"
      onCheckout={() => {}}
      trustBadges={[
        { icon: 'shipping', text: 'Free shipping on orders over 5,000,000 UZS' },
        { icon: 'secure', text: 'Secure checkout' },
        { icon: 'returns', text: '14-day returns' },
      ]}
    />
  );

  return (
    <DesktopShell
      topBar={<DefaultTopBar />}
      header={header}
      footer={<DefaultFooter />}
    >
      {/* Breadcrumbs */}
      <div className={styles.breadcrumbs}>
        <Breadcrumbs items={[{ label: 'Home', href: '#' }, { label: 'Cart', href: '#' }, { label: 'Checkout' }]} />
      </div>

      {/* Checkout steps */}
      <div className={styles.stepsWrapper}>
        <DesktopSteps current={currentStep} items={checkoutSteps} />
      </div>

      {emptyCart ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon} aria-hidden="true">🛒</div>
          <h2 className={styles.emptyTitle}>Your cart is empty</h2>
          <p className={styles.emptyText}>Add items to your cart before checking out.</p>
          <Button variant="primary" size="lg">Continue Shopping</Button>
        </div>
      ) : (
        <TwoColumnLayout
          sidebar={orderSummary}
          sidebarWidth={380}
          sidebarPosition="right"
          gap={24}
          stickyTop={24}
        >
          {/* Shipping Address Section */}
          {currentStep === 0 && (
            <section className={styles.formSection} aria-labelledby="shipping-heading">
              <h2 id="shipping-heading" className={styles.formSectionTitle}>Shipping Address</h2>
              <div className={styles.addressList}>
                {addresses.map((addr) => (
                  <DesktopAddressCard
                    key={addr.id}
                    address={addr}
                    selected={selectedAddress === addr.id}
                    selectable
                    onSelect={() => setSelectedAddress(addr.id)}
                  />
                ))}
              </div>
              <Button variant="outline" size="md" className={styles.addButton}>
                + Add New Address
              </Button>
            </section>
          )}

          {/* Payment Method Section */}
          {currentStep <= 1 && (
            <section className={styles.formSection} aria-labelledby="payment-heading">
              <h2 id="payment-heading" className={styles.formSectionTitle}>Payment Method</h2>
              <div className={styles.paymentList}>
                {paymentMethods.map((method) => (
                  <DesktopPaymentMethodCard
                    key={method.id}
                    method={method}
                    selected={selectedPayment === method.id}
                    selectable
                    onSelect={() => setSelectedPayment(method.id)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Review Section */}
          {currentStep === 2 && (
            <section className={styles.formSection} aria-labelledby="review-heading">
              <h2 id="review-heading" className={styles.formSectionTitle}>Order Review</h2>
              <div className={styles.reviewSummary}>
                <div className={styles.reviewBlock}>
                  <h3 className={styles.reviewBlockTitle}>Shipping to</h3>
                  <p className={styles.reviewBlockText}>
                    {addresses[0].name} — {addresses[0].street}, {addresses[0].city}
                  </p>
                </div>
                <div className={styles.reviewBlock}>
                  <h3 className={styles.reviewBlockTitle}>Payment</h3>
                  <p className={styles.reviewBlockText}>
                    {paymentMethods[0].label} {paymentMethods[0].lastFour ? `•••• ${paymentMethods[0].lastFour}` : ''}
                  </p>
                </div>
                <div className={styles.reviewBlock}>
                  <h3 className={styles.reviewBlockTitle}>Items ({selectedCartItems.length})</h3>
                  {selectedCartItems.map((item) => (
                    <p key={item.id} className={styles.reviewBlockText}>
                      {item.name} × {item.quantity}
                    </p>
                  ))}
                </div>
              </div>
            </section>
          )}
        </TwoColumnLayout>
      )}
    </DesktopShell>
  );
};
