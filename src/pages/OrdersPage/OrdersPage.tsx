import React, { useState, useCallback } from 'react';
import {
  NavBar,
  TabFilter,
  OrderCard,
  Empty,
  InfiniteScroll,
  TabBar,
  Container,
  useGeekShop,
} from '../../components';
import type { OrderStatus } from '../../components/data-display/OrderCard/OrderCard';
import styles from './OrdersPage.module.scss';

/* ---------- Tab definition keys ---------- */

const tabKeys = [
  { key: 'all', labelKey: 'common.all' },
  { key: 'pending', labelKey: 'order.statusPending' },
  { key: 'shipping', labelKey: 'order.shipping' },
  { key: 'delivered', labelKey: 'order.delivered' },
  { key: 'cancelled', labelKey: 'order.cancelled' },
];

/* ---------- Order data ---------- */

interface OrderData {
  id: string;
  date: string;
  status: OrderStatus;
  products: {
    image: string;
    title: string;
    variant?: string;
    price: number;
    quantity: number;
  }[];
  totalAmount: number;
  actions: { labelKey: string; type: 'primary' | 'default'; onClick: () => void }[];
  filterKey: string;
}

const allOrders: OrderData[] = [
  {
    id: 'GS-2026031401',
    date: '14 mart, 2026',
    status: 'shipping',
    filterKey: 'shipping',
    products: [
      {
        image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=128&h=128&fit=crop',
        title: 'MSI GeForce RTX 4060 Ventus 2X 8GB',
        variant: '8GB / Qora',
        price: 5200000,
        quantity: 1,
      },
    ],
    totalAmount: 5200000,
    actions: [
      { labelKey: 'order.track', type: 'primary', onClick: () => {} },
      { labelKey: 'order.details', type: 'default', onClick: () => {} },
    ],
  },
  {
    id: 'GS-2026030802',
    date: '8 mart, 2026',
    status: 'review',
    filterKey: 'delivered',
    products: [
      {
        image: 'https://images.unsplash.com/photo-1555618568-bfe052310f39?w=128&h=128&fit=crop',
        title: 'AMD Ryzen 7 7800X3D Protsessor AM5',
        variant: '8 yadro / 16 ip',
        price: 4100000,
        quantity: 1,
      },
      {
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=128&h=128&fit=crop',
        title: 'Corsair Vengeance DDR5 32GB 6000MHz',
        variant: '32GB / 2x16GB',
        price: 2200000,
        quantity: 1,
      },
    ],
    totalAmount: 6300000,
    actions: [
      { labelKey: 'order.rate', type: 'primary', onClick: () => {} },
      { labelKey: 'order.details', type: 'default', onClick: () => {} },
    ],
  },
  {
    id: 'GS-2026022515',
    date: '25 fevral, 2026',
    status: 'review',
    filterKey: 'delivered',
    products: [
      {
        image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=128&h=128&fit=crop',
        title: 'Samsung 990 Pro NVMe 2TB SSD',
        variant: '2TB / M.2',
        price: 2800000,
        quantity: 2,
      },
    ],
    totalAmount: 5600000,
    actions: [
      { labelKey: 'order.reorder', type: 'primary', onClick: () => {} },
      { labelKey: 'order.details', type: 'default', onClick: () => {} },
    ],
  },
  {
    id: 'GS-2026020103',
    date: '1 fevral, 2026',
    status: 'pending',
    filterKey: 'pending',
    products: [
      {
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=128&h=128&fit=crop',
        title: 'ASUS ROG Swift 27" 2K 165Hz Gaming Monitor',
        variant: '27 dyuym / 2K',
        price: 4800000,
        quantity: 1,
      },
    ],
    totalAmount: 4800000,
    actions: [
      { labelKey: 'order.pay', type: 'primary', onClick: () => {} },
      { labelKey: 'order.cancel', type: 'default', onClick: () => {} },
    ],
  },
];

/* ---------- Empty state icon ---------- */

const OrdersEmptyIcon = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
    <circle cx="60" cy="60" r="50" fill="#F5F5F5" />
    <rect x="35" y="35" width="50" height="50" rx="6" fill="#E8E8E8" />
    <rect x="45" y="48" width="30" height="3" rx="1.5" fill="#D4D4D4" />
    <rect x="45" y="56" width="22" height="3" rx="1.5" fill="#D4D4D4" />
    <rect x="45" y="64" width="16" height="3" rx="1.5" fill="#D4D4D4" />
    <path d="M55 40h10M60 35v10" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* ---------- Component ---------- */

export interface OrdersPageProps {
  /** Show empty state */
  empty?: boolean;
  /** Pre-selected tab key */
  initialTab?: string;
}

export const OrdersPage: React.FC<OrdersPageProps> = ({ empty = false, initialTab = 'all' }) => {
  const { t } = useGeekShop();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [hasMore, setHasMore] = useState(true);

  const tabs = tabKeys.map((tab) => ({
    key: tab.key,
    label: t(tab.labelKey),
  }));

  const filteredOrders = empty
    ? []
    : activeTab === 'all'
    ? allOrders
    : allOrders.filter((o) => o.filterKey === activeTab);

  const handleLoadMore = useCallback(() => {
    // Simulated: in real app, fetch next page
    setHasMore(false);
  }, []);

  return (
    <div className={styles.page}>
      <NavBar title={t('page.orders')} showBack onBack={() => {}} />

      <Container hasNavbar hasTabbar>
        <TabFilter tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="underline" />

        {filteredOrders.length === 0 ? (
          <Empty
            icon={<OrdersEmptyIcon />}
            title={t('order.empty')}
            description={t('order.emptyDescription')}
            actionText={t('cart.shopNow')}
            onAction={() => {}}
          />
        ) : (
          <InfiniteScroll
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
            endContent={<span>{t('order.allLoaded')}</span>}
          >
            <div className={styles.list}>
              {filteredOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  orderId={order.id}
                  status={order.status}
                  products={order.products}
                  totalAmount={order.totalAmount}
                  date={order.date}
                  actions={order.actions.map((a) => ({ ...a, label: t(a.labelKey) }))}
                />
              ))}
            </div>
          </InfiniteScroll>
        )}
      </Container>

      <TabBar activeKey="profile" onChange={() => {}} />
    </div>
  );
};

export default OrdersPage;
