import { useState } from 'react';
import {
  DesktopShell,
  TopBar,
  DesktopHeaderRich,
  MegaMenu,
  Footer,
  Breadcrumbs,
  DesktopButton,
  DesktopEmpty,
  DesktopBadge,
  DesktopAvatar,
  TabFilter,
} from '../../components';
import type {
  MegaMenuCategory,
  CategoryItem,
  PromoLink,
} from '../../components';
import { mockNotifications } from '../_shared/mockData';
import styles from './DesktopNotificationsPage.module.scss';

const footerColumns = [
  { title: 'Customer Service', links: [{ label: 'Help Center' }, { label: 'Returns & Refunds' }] },
  { title: 'About GeekShop', links: [{ label: 'About Us' }, { label: 'Careers' }] },
  { title: 'Policies', links: [{ label: 'Privacy Policy' }, { label: 'Terms of Service' }] },
];

const megaMenuCategories: MegaMenuCategory[] = [
  { label: 'Graphics Cards' },
  { label: 'Processors' },
  { label: 'Monitors' },
];

const headerCategories: CategoryItem[] = [
  { id: '1', label: 'Smartphones', icon: '' },
  { id: '2', label: 'Laptops', icon: '' },
];

const promoLinks: PromoLink[] = [
  { id: '1', label: 'Delivery & Returns' },
  { id: '2', label: 'Premium', highlight: true },
];

const filterTabs = [
  { key: 'all', label: 'All' },
  { key: 'order', label: 'Orders' },
  { key: 'promo', label: 'Promotions' },
  { key: 'system', label: 'System' },
];

const badgeColorMap: Record<string, 'blue' | 'green' | 'red' | 'orange'> = {
  primary: 'blue',
  success: 'green',
  error: 'red',
  warning: 'orange',
  info: 'blue',
};

export interface DesktopNotificationsPageProps {
  /** Override notifications */
  initialNotifications?: typeof mockNotifications;
}

export const DesktopNotificationsPage: React.FC<DesktopNotificationsPageProps> = ({
  initialNotifications,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState(initialNotifications ?? mockNotifications);

  const filtered = activeTab === 'all'
    ? notifications
    : notifications.filter((n) => n.type === activeTab);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const header = (
    <div className={styles.headerWrapper}>
      <DesktopHeaderRich
        logo={<span className={styles.logoText}>GeekShop</span>}
        searchPlaceholder="Search products..."
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        cartCount={3}
        wishlistCount={5}
        categories={headerCategories}
        promoLinks={promoLinks}
        location="Tashkent"
      />
      <MegaMenu categories={megaMenuCategories} navItems={[{ label: 'Flash Deals' }, { label: 'New Arrivals' }]} />
    </div>
  );

  return (
    <DesktopShell
      topBar={
        <TopBar
          leftItems={[<span key="w">Welcome to GeekShop!</span>]}
          rightItems={[
            <button key="l" type="button" className={styles.topBarBtn}>EN</button>,
            <button key="c" type="button" className={styles.topBarBtn}>UZS</button>,
          ]}
        />
      }
      header={header}
      footer={<Footer columns={footerColumns} copyrightText="© 2026 GeekShop. All rights reserved." />}
    >
      <div className={styles.breadcrumbs}>
        <Breadcrumbs items={[{ label: 'Home', href: '#' }, { label: 'Notifications' }]} />
      </div>

      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>
          Notifications
          {unreadCount > 0 && <DesktopBadge type="count" content={unreadCount} />}
        </h1>
        {unreadCount > 0 && (
          <DesktopButton variant="ghost" size="sm" onClick={markAllRead}>
            Mark all as read
          </DesktopButton>
        )}
      </div>

      <div className={styles.tabFilterWrap}>
        <TabFilter tabs={filterTabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      {filtered.length === 0 ? (
        <DesktopEmpty
          title="No notifications"
          description="You're all caught up! We'll notify you when something happens."
        />
      ) : (
        <div className={styles.notificationsList}>
          {filtered.map((notification) => (
            <div
              key={notification.id}
              className={`${styles.notificationItem} ${!notification.read ? styles.unread : ''}`}
            >
              <div className={styles.notifAvatar}>
                <DesktopAvatar
                  name={notification.avatarName}
                  src={notification.avatar}
                  size="md"
                />
                {notification.badgeColor && (
                  <span className={`${styles.dotBadge} ${styles[`dot_${badgeColorMap[notification.badgeColor] || 'blue'}`]}`} />
                )}
              </div>
              <div className={styles.notifContent}>
                <h3 className={styles.notifTitle}>{notification.title}</h3>
                <p className={styles.notifMessage}>{notification.message}</p>
                <span className={styles.notifTime}>{notification.timestamp}</span>
              </div>
              {!notification.read && <span className={styles.unreadDot} />}
            </div>
          ))}
        </div>
      )}
    </DesktopShell>
  );
};
