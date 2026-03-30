import { useState } from 'react';
import {
  DesktopShell,
  DesktopBreadcrumbs,
  DesktopTwoColumnLayout,
  DesktopCartItem,
  DesktopCouponCard,
  DesktopOrderSummary,
  DesktopEmpty,
} from '../../components';
import { mockCartItems, DefaultTopBar, DefaultHeader, DefaultFooter } from '../_shared';
import type { CartItemData } from '../_shared/types';
import styles from './DesktopCartPage.module.scss';

// ─── Component ────────────────────────────────────────────────────────────────

export interface DesktopCartPageProps {
  /** Override initial cart items. Defaults to mockCartItems. */
  initialItems?: CartItemData[];
  /** Coupon code to show as applied */
  appliedCoupon?: { code: string; discountPercent: number };
}

export const DesktopCartPage: React.FC<DesktopCartPageProps> = ({
  initialItems,
  appliedCoupon,
}) => {
  const [cartItems, setCartItems] = useState<CartItemData[]>(initialItems ?? mockCartItems);

  const handleQuantityChange = (id: number, quantity: number) => {
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const handleSelect = (id: number, selected: boolean) => {
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, selected } : item)));
  };

  const handleDelete = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const selectedItems = cartItems.filter((item) => item.selected);
  const subtotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = appliedCoupon ? Math.round((subtotal * appliedCoupon.discountPercent) / 100) : 0;
  const afterDiscount = subtotal - discount;
  const shipping = afterDiscount > 5000000 ? 0 : 50000;
  const tax = Math.round(afterDiscount * 0.12);
  const total = afterDiscount + shipping + tax;

  const orderSummary = (
    <DesktopOrderSummary
      subtotal={subtotal}
      discount={discount > 0 ? discount : undefined}
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
    <DesktopShell topBar={<DefaultTopBar />} header={<DefaultHeader />} footer={<DefaultFooter />}>
      {/* Breadcrumbs */}
      <div className={styles.breadcrumbs}>
        <DesktopBreadcrumbs items={[{ label: 'Home', href: '#' }, { label: 'Cart' }]} />
      </div>

      <h1 className={styles.pageTitle}>Shopping Cart ({cartItems.length} items)</h1>

      {cartItems.length === 0 ? (
        <DesktopEmpty
          title="Your cart is empty"
          description="Browse our products and add items to your cart."
        />
      ) : (
        <DesktopTwoColumnLayout
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
        </DesktopTwoColumnLayout>
      )}
    </DesktopShell>
  );
};
