import { useState } from 'react';
import {
  DesktopShell,
  DesktopBreadcrumbs,
  DesktopButton,
  DesktopEmpty,
  DesktopBadge,
  DesktopAvatar,
  TabFilter,
} from '../../components';
import {
  mockNotifications,
  DefaultTopBar,
  DefaultHeaderRich,
  DefaultMegaMenu,
  DefaultFooter,
} from '../_shared';
import styles from './DesktopNotificationsPage.module.scss';

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

  const filtered =
    activeTab === 'all' ? notifications : notifications.filter((n) => n.type === activeTab);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const header = (
    <div className={styles.headerWrapper}>
      <DefaultHeaderRich searchValue={searchValue} onSearchChange={setSearchValue} />
      <DefaultMegaMenu />
    </div>
  );

  return (
    <DesktopShell topBar={<DefaultTopBar />} header={header} footer={<DefaultFooter />}>
      <div className={styles.breadcrumbs}>
        <DesktopBreadcrumbs items={[{ label: 'Home', href: '#' }, { label: 'Notifications' }]} />
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
                <DesktopAvatar name={notification.avatarName} src={notification.avatar} size="md" />
                {notification.badgeColor && (
                  <span
                    className={`${styles.dotBadge} ${
                      styles[`dot_${badgeColorMap[notification.badgeColor] || 'blue'}`]
                    }`}
                  />
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
