import { useState } from 'react';
import {
  DesktopShell,
  TopBar,
  DesktopHeader,
  Footer,
  Breadcrumbs,
  TwoColumnLayout,
  CartItem,
  CouponCard,
  Button,
} from '../../components';
import { mockCartItems, formatPrice } from '../_shared/mockData';
import type { CartItemData } from '../_shared/types';
import styles from './DesktopCartPage.module.scss';

// ─── Static data ──────────────────────────────────────────────────────────────

const footerColumns = [
  { title: 'Customer Service', links: [{ label: 'Help Center' }, { label: 'Returns & Refunds' }, { label: 'Shipping Info' }] },
  { title: 'About GeekShop', links: [{ label: 'About Us' }, { label: 'Careers' }, { label: 'Press' }] },
  { title: 'Policies', links: [{ label: 'Privacy Policy' }, { label: 'Terms of Service' }] },
];

// ─── Shared shell slots ──────────────────────────────────────────────────────

const DesktopTopBar = () => (
  <TopBar
    leftItems={[<span key="w">Welcome to GeekShop!</span>, <span key="s">Seller Center</span>, <span key="h">Help</span>]}
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
    wishlistCount={5}
  />
);

const DesktopFooterSection = () => (
  <Footer columns={footerColumns} copyrightText="\u00A9 2026 GeekShop. All rights reserved." />
);

// ─── Component ────────────────────────────────────────────────────────────────

export const DesktopCartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemData[]>(mockCartItems);

  const handleQuantityChange = (id: number, quantity: number) => {
    setCartItems((prev) => prev.map((item) => item.id === id ? { ...item, quantity } : item));
  };

  const handleSelect = (id: number, selected: boolean) => {
    setCartItems((prev) => prev.map((item) => item.id === id ? { ...item, selected } : item));
  };

  const handleDelete = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const selectedItems = cartItems.filter((item) => item.selected);
  const subtotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 5000000 ? 0 : 50000;
  const tax = Math.round(subtotal * 0.12);
  const total = subtotal + shipping + tax;

  const orderSummary = (
    <div className={styles.summaryCard}>
      <h2 className={styles.summaryTitle}>Order Summary</h2>
      <div className={styles.summaryRows}>
        <div className={styles.summaryRow}>
          <span>Subtotal ({selectedItems.length} items)</span>
          <span>{formatPrice(subtotal)} UZS</span>
        </div>
        <div className={styles.summaryRow}>
          <span>Shipping</span>
          <span className={shipping === 0 ? styles.freeLabel : ''}>{shipping === 0 ? 'Free' : `${formatPrice(shipping)} UZS`}</span>
        </div>
        <div className={styles.summaryRow}>
          <span>Tax (12%)</span>
          <span>{formatPrice(tax)} UZS</span>
        </div>
        <div className={styles.summaryDivider} />
        <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
          <span>Total</span>
          <span>{formatPrice(total)} UZS</span>
        </div>
      </div>
      <Button variant="primary" size="lg" style={{ width: '100%', marginTop: 16 }}>
        Proceed to Checkout
      </Button>
      <p className={styles.shippingNote}>Free shipping on orders over 5,000,000 UZS</p>
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
        <Breadcrumbs items={[{ label: 'Home', href: '#' }, { label: 'Cart' }]} />
      </div>

      <h1 className={styles.pageTitle}>Shopping Cart ({cartItems.length} items)</h1>

      <TwoColumnLayout
        sidebar={orderSummary}
        sidebarWidth={340}
        sidebarPosition="right"
        gap={24}
        stickyTop={24}
      >
        {/* Cart items */}
        <div className={styles.cartList}>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              image={item.image}
              title={item.name}
              variant={item.variant}
              price={item.price}
              quantity={item.quantity}
              selected={item.selected}
              onSelect={(selected) => handleSelect(item.id, selected)}
              onQuantityChange={(quantity) => handleQuantityChange(item.id, quantity)}
              onDelete={() => handleDelete(item.id)}
            />
          ))}
        </div>

        {/* Coupon section */}
        <div className={styles.couponSection}>
          <h3 className={styles.sectionTitle}>Have a coupon?</h3>
          <CouponCard
            discount="-10%"
            code="GEEK10"
            expiryDate="2026-04-01"
            minAmount={500000}
            color="#FF5000"
          />
        </div>
      </TwoColumnLayout>
    </DesktopShell>
  );
};
