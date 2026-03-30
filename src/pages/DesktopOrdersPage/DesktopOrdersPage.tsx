import { useState } from 'react';
import {
  DesktopShell,
  DesktopBreadcrumbs,
  TabFilter,
  DesktopOrderCard,
  DesktopPagination,
} from '../../components';
import type { DesktopOrderStatus, DesktopOrderAction } from '../../components';
import { mockOrders, DefaultTopBar, DefaultHeader, DefaultFooter } from '../_shared';
import styles from './DesktopOrdersPage.module.scss';

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
    case 'review':
      return 'delivered';
    case 'return':
      return 'returned';
    default:
      return pageStatus as DesktopOrderStatus;
  }
}

// ─── Action helpers ──────────────────────────────────────────────────────────

function getOrderActions(status: string): DesktopOrderAction[] {
  switch (status) {
    case 'pending':
      return [
        { id: 'pay', label: 'Pay Now', variant: 'primary' },
        { id: 'cancel', label: 'Cancel', variant: 'danger' },
      ];
    case 'shipping':
      return [{ id: 'track', label: 'Track Order', variant: 'primary' }];
    case 'delivered':
      return [
        { id: 'review', label: 'Write Review', variant: 'primary' },
        { id: 'rebuy', label: 'Buy Again', variant: 'secondary' },
      ];
    case 'review':
      return [{ id: 'review', label: 'Write Review', variant: 'primary' }];
    case 'cancelled':
      return [{ id: 'rebuy', label: 'Buy Again', variant: 'primary' }];
    default:
      return [];
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export interface DesktopOrdersPageProps {
  /** Override orders. Defaults to mockOrders. */
  initialOrders?: typeof mockOrders;
}

export const DesktopOrdersPage: React.FC<DesktopOrdersPageProps> = ({ initialOrders }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const orders = initialOrders ?? mockOrders;

  const filteredOrders =
    activeTab === 'all' ? orders : orders.filter((order) => order.status === activeTab);

  return (
    <DesktopShell topBar={<DefaultTopBar />} header={<DefaultHeader />} footer={<DefaultFooter />}>
      {/* Breadcrumbs */}
      <div className={styles.breadcrumbs}>
        <DesktopBreadcrumbs items={[{ label: 'Home', href: '#' }, { label: 'My Orders' }]} />
      </div>

      <h1 className={styles.pageTitle}>My Orders</h1>

      {/* Tab filter */}
      <div className={styles.tabFilterWrap}>
        <TabFilter
          tabs={orderFilterTabs}
          activeTab={activeTab}
          onChange={(tab) => {
            setActiveTab(tab);
            setCurrentPage(1);
          }}
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
        <DesktopPagination currentPage={currentPage} totalPages={5} onPageChange={setCurrentPage} />
      </div>
    </DesktopShell>
  );
};
