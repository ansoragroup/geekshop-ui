import { useState } from 'react';
import {
  DesktopShell,
  TopBar,
  DesktopHeader,
  Footer,
  Breadcrumbs,
  TwoColumnLayout,
  DesktopCartItem,
  DesktopCouponCard,
  DesktopOrderSummary,
} from '../../components';
import { mockCartItems } from '../_shared/mockData';
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
    <DesktopOrderSummary
      subtotal={subtotal}
      shipping={shipping}
      tax={tax}
      total={total}
      itemCount={selectedItems.length}
      ctaText="Proceed to Checkout"
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
            <DesktopCartItem
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
          <DesktopCouponCard
            discount="-10%"
            code="GEEK10"
            expiryDate="2026-04-01"
            minAmount="Orders over 500,000 so'm"
            color="orange"
          />
        </div>
      </TwoColumnLayout>
    </DesktopShell>
  );
};
