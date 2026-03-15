import { useState } from 'react';
import {
  NavBar,
  Swipe,
  CartItem,
  Checkbox,
  Divider,
  SpecsTable,
  CouponCard,
  Empty,
  TabBar,
  Button,
  useGeekShop,
} from '../../components';
import { emptyIcons } from '../../components/feedback/Empty/Empty';
import type { SwipeAction } from '../../components';
import styles from './CartPage.module.scss';

interface CartItemData {
  id: number;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  selected: boolean;
  image: string;
}

const initialCartItems: CartItemData[] = [
  {
    id: 1,
    name: 'MSI GeForce RTX 4060 Ventus 2X 8GB GDDR6',
    variant: '8GB / Qora',
    price: 5200000,
    quantity: 1,
    selected: true,
    image: 'https://picsum.photos/seed/cart-gpu/160/160',
  },
  {
    id: 2,
    name: 'AMD Ryzen 7 7800X3D Protsessor AM5',
    variant: '8 yadro / 16 ip',
    price: 4100000,
    quantity: 1,
    selected: true,
    image: 'https://picsum.photos/seed/cart-cpu/160/160',
  },
  {
    id: 3,
    name: 'Corsair Vengeance DDR5 32GB (2x16GB) 6000MHz',
    variant: '32GB / RGB',
    price: 2200000,
    quantity: 2,
    selected: false,
    image: 'https://picsum.photos/seed/cart-ram/160/160',
  },
];

export interface CartPageProps {
  empty?: boolean;
  hasCoupon?: boolean;
}

export const CartPage: React.FC<CartPageProps> = ({
  empty = false,
  hasCoupon = false,
}) => {
  const { t, formatPrice } = useGeekShop();
  const [items, setItems] = useState<CartItemData[]>(initialCartItems);

  const allSelected = items.length > 0 && items.every((i) => i.selected);
  const selectedItems = items.filter((i) => i.selected);
  const subtotal = selectedItems.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0,
  );
  const delivery = 0;
  const discount = hasCoupon ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discount + delivery;

  const handleSelectAll = (checked: boolean) => {
    setItems((prev) => prev.map((i) => ({ ...i, selected: checked })));
  };

  const handleItemSelect = (id: number, selected: boolean) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, selected } : i)),
    );
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i)),
    );
  };

  const handleDelete = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const deleteActions = (id: number): SwipeAction[] => [
    {
      key: 'delete',
      label: t('common.delete'),
      backgroundColor: '#FF3B30',
      onClick: () => handleDelete(id),
    },
  ];

  const priceSummary = [
    { label: t('cart.items'), value: formatPrice(subtotal) },
    { label: t('cart.delivery'), value: delivery === 0 ? t('cart.free') : formatPrice(delivery) },
    ...(hasCoupon
      ? [{ label: t('cart.couponDiscount'), value: `-${formatPrice(discount)}` }]
      : []),
    { label: t('cart.total'), value: formatPrice(total) },
  ];

  return (
    <div className={styles.page}>
      <NavBar title={t('page.cart')} showBack onBack={() => {}} />

      {empty ? (
        <div className={styles.emptyWrap}>
          <Empty
            icon={emptyIcons.cart}
            title={t('cart.empty')}
            description={t('cart.emptyDescription')}
            actionText={t('cart.shopNow')}
            onAction={() => {}}
          />
        </div>
      ) : (
        <>
          {/* Select All */}
          <div className={styles.selectAll}>
            <Checkbox
              checked={allSelected}
              label={t('cart.selectAll')}
              onChange={handleSelectAll}
            />
          </div>

          <Divider />

          {/* Cart Items */}
          <div className={styles.items}>
            {items.map((item) => (
              <Swipe key={item.id} rightActions={deleteActions(item.id)}>
                <CartItem
                  image={item.image}
                  title={item.name}
                  variant={item.variant}
                  price={item.price}
                  quantity={item.quantity}
                  selected={item.selected}
                  onSelect={(sel) => handleItemSelect(item.id, sel)}
                  onQuantityChange={(qty) =>
                    handleQuantityChange(item.id, qty)
                  }
                  onDelete={() => handleDelete(item.id)}
                />
              </Swipe>
            ))}
          </div>

          <Divider />

          {/* Coupon */}
          {hasCoupon && (
            <div className={styles.couponSection}>
              <CouponCard
                discount="-10%"
                code="GEEK2026"
                expiryDate="2026-04-01"
                minAmount={5000000}
                onUse={() => {}}
              />
            </div>
          )}

          {/* Price summary */}
          <div className={styles.summary}>
            <SpecsTable specs={priceSummary} />
          </div>

          <Divider />

          {/* Bottom action */}
          <div className={styles.actionBar}>
            <div className={styles.actionLeft}>
              <Checkbox
                checked={allSelected}
                label={t('common.all')}
                onChange={handleSelectAll}
              />
            </div>
            <div className={styles.actionRight}>
              <div className={styles.totalBlock}>
                <span className={styles.totalLabel}>{t('cart.total')}:</span>
                <span className={styles.totalPrice}>
                  {formatPrice(total)}
                </span>
              </div>
              <Button variant="primary" size="md">
                {t('cart.placeOrder')} ({selectedItems.length})
              </Button>
            </div>
          </div>
        </>
      )}

      <TabBar activeKey="cart" onChange={() => {}} />
    </div>
  );
};

export default CartPage;
