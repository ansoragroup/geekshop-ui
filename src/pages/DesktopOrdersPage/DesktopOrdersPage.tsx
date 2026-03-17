import { useState } from 'react';
import {
  DesktopShell,
  TopBar,
  DesktopHeader,
  Footer,
  Breadcrumbs,
  TabFilter,
  DesktopOrderCard,
  Pagination,
} from '../../components';
import type { DesktopOrderStatus, DesktopOrderAction } from '../../components';
import { mockOrders } from '../_shared/mockData';
import styles from './DesktopOrdersPage.module.scss';

// ─── Static data ──────────────────────────────────────────────────────────────

const footerColumns = [
  { title: 'Customer Service', links: [{ label: 'Help Center' }, { label: 'Returns & Refunds' }, { label: 'Shipping Info' }] },
  { title: 'About GeekShop', links: [{ label: 'About Us' }, { label: 'Careers' }, { label: 'Press' }] },
  { title: 'Policies', links: [{ label: 'Privacy Policy' }, { label: 'Terms of Service' }] },
];

const orderFilterTabs = [
  { key: 'all', label: 'All Orders' },
  { key: 'pending', label: 'Pending' },
  { key: 'shipping', label: 'Shipping' },
  { key: 'delivered', label: 'Delivered' },
  { key: 'review', label: 'To Review' },
  { key: 'return', label: 'Returns' },
];

// Map page-level status to DesktopOrderStatus
function mapStatus(pageStatus: string): DesktopOrderStatus {
  switch (pageStatus) {
    case 'review': return 'delivered';
    case 'return': return 'returned';
    default: return pageStatus as DesktopOrderStatus;
  }
}

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

// ─── Action helpers ──────────────────────────────────────────────────────────

function getOrderActions(status: string): DesktopOrderAction[] {
  switch (status) {
    case 'pending':
      return [
        { id: 'pay', label: 'Pay Now', variant: 'primary' },
        { id: 'cancel', label: 'Cancel', variant: 'danger' },
      ];
    case 'shipping':
      return [
        { id: 'track', label: 'Track Order', variant: 'primary' },
      ];
    case 'delivered':
      return [
        { id: 'review', label: 'Write Review', variant: 'primary' },
        { id: 'rebuy', label: 'Buy Again', variant: 'secondary' },
      ];
    case 'review':
      return [
        { id: 'review', label: 'Write Review', variant: 'primary' },
      ];
    case 'cancelled':
      return [
        { id: 'rebuy', label: 'Buy Again', variant: 'primary' },
      ];
    default:
      return [];
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export const DesktopOrdersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredOrders = activeTab === 'all'
    ? mockOrders
    : mockOrders.filter((order) => order.status === activeTab);

  return (
    <DesktopShell
      topBar={<DesktopTopBar />}
      header={<DesktopHeaderBar />}
      footer={<DesktopFooterSection />}
    >
      {/* Breadcrumbs */}
      <div className={styles.breadcrumbs}>
        <Breadcrumbs items={[{ label: 'Home', href: '#' }, { label: 'My Orders' }]} />
      </div>

      <h1 className={styles.pageTitle}>My Orders</h1>

      {/* Tab filter */}
      <div className={styles.tabFilterWrap}>
        <TabFilter
          tabs={orderFilterTabs}
          activeTab={activeTab}
          onChange={(tab) => { setActiveTab(tab); setCurrentPage(1); }}
        />
      </div>

      {/* Order cards */}
      <div className={styles.ordersList}>
        {filteredOrders.length === 0 && (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>No orders found for this filter.</p>
          </div>
        )}
        {filteredOrders.map((order) => (
          <DesktopOrderCard
            key={order.id}
            orderId={order.id}
            status={mapStatus(order.status)}
            products={order.items.map((item) => ({
              id: item.id,
              image: item.image,
              title: item.name,
            }))}
            totalAmount={order.totalPrice}
            date={order.date}
            actions={getOrderActions(order.status)}
            onAction={(actionId) => console.log('action', actionId)}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className={styles.paginationWrap}>
        <Pagination
          currentPage={currentPage}
          totalPages={5}
          onPageChange={setCurrentPage}
        />
      </div>
    </DesktopShell>
  );
};
