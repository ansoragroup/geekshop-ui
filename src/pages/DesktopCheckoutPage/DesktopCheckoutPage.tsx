import { useState } from 'react';
import {
  DesktopShell,
  TopBar,
  DesktopHeaderRich,
  MegaMenu,
  Footer,
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
  MegaMenuCategory,
  CategoryItem,
  PromoLink,
} from '../../components';
import { mockCartItems } from '../_shared/mockData';
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

const megaMenuCategories: MegaMenuCategory[] = [
  { label: 'Graphics Cards', subcategories: [{ label: 'NVIDIA RTX 40' }, { label: 'AMD Radeon RX' }] },
  { label: 'Processors', subcategories: [{ label: 'AMD Ryzen 7000' }, { label: 'Intel 14th Gen' }] },
  { label: 'Monitors' },
  { label: 'Laptops' },
  { label: 'Memory (RAM)' },
  { label: 'Storage' },
  { label: 'Peripherals' },
  { label: 'Cases & Cooling' },
];

const headerCategories: CategoryItem[] = [
  { id: '1', label: 'Smartphones', icon: 'https://dlcdnwebimgs.asus.com/gain/0FA075BB-D898-43D4-8B05-3F9DA241E070/w240' },
  { id: '2', label: 'Laptops', icon: 'https://dlcdnwebimgs.asus.com/gain/D4B0EA38-B5D0-4F2A-8C6F-C4AC9CDFF498/w240' },
  { id: '3', label: 'Headphones', icon: 'https://dlcdnwebimgs.asus.com/gain/C39B4183-6D56-4DC2-A224-2E3A267FA44C/w240' },
  { id: '4', label: 'Monitors', icon: 'https://dlcdnwebimgs.asus.com/gain/6D76BE3F-52BA-4F8A-A0F0-7E4B2A86C3AB/w240' },
  { id: '5', label: 'Keyboards', icon: 'https://dlcdnwebimgs.asus.com/gain/5F8DAD71-F3C5-44A1-B7E4-3D8E8D3F8D6F/w240' },
];

const promoLinks: PromoLink[] = [
  { id: '1', label: 'Delivery & Returns' },
  { id: '2', label: 'Sell on GeekShop' },
  { id: '3', label: 'Premium', highlight: true },
  { id: '4', label: 'Gift Cards' },
  { id: '5', label: 'Help' },
];

const footerColumns = [
  { title: 'Customer Service', links: [{ label: 'Help Center' }, { label: 'Returns & Refunds' }, { label: 'Shipping Info' }, { label: 'Track Order' }] },
  { title: 'About GeekShop', links: [{ label: 'About Us' }, { label: 'Careers' }, { label: 'Press' }, { label: 'Blog' }] },
  { title: 'Policies', links: [{ label: 'Privacy Policy' }, { label: 'Terms of Service' }, { label: 'Cookie Policy' }] },
  { title: 'Connect', links: [{ label: 'Telegram' }, { label: 'Instagram' }, { label: 'Facebook' }] },
];

const checkoutSteps = [
  { title: 'Shipping' },
  { title: 'Payment' },
  { title: 'Review' },
];

// ─── Shared shell slots ──────────────────────────────────────────────────────

const DesktopTopBar = () => (
  <TopBar
    leftItems={[<span key="w">Welcome to GeekShop!</span>, <span key="s">Seller Center</span>, <span key="h">Help</span>]}
    rightItems={[
      <button key="l" type="button" className={styles.topBarBtn}>EN</button>,
      <button key="c" type="button" className={styles.topBarBtn}>UZS</button>,
    ]}
  />
);

const DesktopMegaMenuBar = () => (
  <MegaMenu categories={megaMenuCategories} navItems={[{ label: 'Flash Deals' }, { label: 'New Arrivals' }, { label: 'Top Brands' }]} />
);

const DesktopFooterSection = () => (
  <Footer columns={footerColumns} copyrightText={'\u00A9 2026 GeekShop. All rights reserved.'} />
);

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
        categories={headerCategories}
        promoLinks={promoLinks}
        location="Tashkent"
      />
      <DesktopMegaMenuBar />
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
      topBar={<DesktopTopBar />}
      header={header}
      footer={<DesktopFooterSection />}
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
