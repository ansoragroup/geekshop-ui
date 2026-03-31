import React, { useState } from 'react';
import {
  NavBar,
  Container,
  TabFilter,
  TabBar,
  Avatar,
  Badge,
  Swipe,
  Empty,
  useGeekShop,
} from '../../components';
import styles from './NotificationsPage.module.scss';

/* ---------- Notification data types ---------- */

interface Notification {
  id: string;
  type: 'order' | 'promo' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  avatar?: string;
  avatarName: string;
  badgeColor?: 'primary' | 'success' | 'error' | 'warning' | 'info';
}

/* ---------- Notification items ---------- */

const notifications: Notification[] = [
  {
    id: '1',
    type: 'order',
    title: 'Buyurtma yetkazildi',
    message: 'GS-2026031401 raqamli buyurtmangiz yetkazildi. Mahsulotni qabul qilib, baholang!',
    timestamp: '5 daqiqa oldin',
    read: false,
    avatarName: 'Buyurtma',
    badgeColor: 'success',
  },
  {
    id: '2',
    type: 'promo',
    title: 'Mega chegirma! -30% barcha GPU larga',
    message: 'Faqat bugun! RTX 4060, 4070, 4080 videokartalariga katta chegirma. Shoshiling!',
    timestamp: '1 soat oldin',
    read: false,
    avatar: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=64&h=64&fit=crop',
    avatarName: 'GeekShop',
    badgeColor: 'primary',
  },
  {
    id: '3',
    type: 'order',
    title: 'Buyurtma yuborildi',
    message: 'GS-2026031302 raqamli buyurtmangiz yuborildi. Kuzatish raqami: UZ1234567890',
    timestamp: '3 soat oldin',
    read: true,
    avatarName: 'Yetkazish',
    badgeColor: 'info',
  },
  {
    id: '4',
    type: 'system',
    title: 'Xavfsizlik xabarnomasi',
    message:
      "Hisobingizga yangi qurilmadan kirish aniqlandi. Agar bu siz bo'lmasangiz, parolingizni o'zgartiring.",
    timestamp: '5 soat oldin',
    read: true,
    avatarName: 'Xavfsizlik',
    badgeColor: 'warning',
  },
  {
    id: '5',
    type: 'promo',
    title: "Kupon sovg'a! GEEK2026",
    message:
      "Sizga 500 000 so'mlik kupon berildi. 31 mart kunigacha amal qiladi. 5 000 000 so'mdan ortiq buyurtmalarda foydalaning.",
    timestamp: '1 kun oldin',
    read: true,
    avatar: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=64&h=64&fit=crop',
    avatarName: 'Kupon',
    badgeColor: 'primary',
  },
  {
    id: '6',
    type: 'order',
    title: "To'lov muvaffaqiyatli",
    message: "GS-2026031201 raqamli buyurtmangiz uchun 5 200 000 so'm to'landi. UzCard •••• 4523",
    timestamp: '2 kun oldin',
    read: true,
    avatarName: "To'lov",
    badgeColor: 'success',
  },
  {
    id: '7',
    type: 'system',
    title: 'Ilovani yangilang',
    message: 'GeekShop ilovasi 3.2.0 versiyasi chiqdi. Yangi funksiyalar va tuzatishlar mavjud.',
    timestamp: '3 kun oldin',
    read: true,
    avatarName: 'Tizim',
    badgeColor: 'info',
  },
  {
    id: '8',
    type: 'promo',
    title: '8 mart bayramiga maxsus chegirmalar!',
    message: 'Barcha elektronika mahsulotlariga 15% gacha chegirma. Faqat 8-10 mart kunlari.',
    timestamp: '7 kun oldin',
    read: true,
    avatar: 'https://images.unsplash.com/photo-1555618568-bfe052310f39?w=64&h=64&fit=crop',
    avatarName: 'Bayram',
    badgeColor: 'primary',
  },
];

/* ---------- Tab definition keys ---------- */

const tabKeys = [
  { key: 'all', labelKey: 'common.all', badge: 2 },
  { key: 'order', labelKey: 'page.orders' },
  { key: 'promo', labelKey: 'notification.promos' },
  { key: 'system', labelKey: 'notification.system' },
];

/* ---------- Notifications empty icon ---------- */

const BellEmptyIcon = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
    <circle cx="60" cy="60" r="50" fill="#F5F5F5" />
    <path
      d="M60 30C50 30 42 38 42 48V62L36 72H84L78 62V48C78 38 70 30 60 30Z"
      stroke="#CCCCCC"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M52 72V74C52 78.4183 55.5817 82 60 82C64.4183 82 68 78.4183 68 74V72"
      stroke="#CCCCCC"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <circle cx="72" cy="40" r="6" fill="#E0E0E0" />
  </svg>
);

/* ---------- Component ---------- */

export interface NotificationsPageProps {
  empty?: boolean;
}

export const NotificationsPage: React.FC<NotificationsPageProps> = ({ empty = false }) => {
  const { t } = useGeekShop();
  const [activeTab, setActiveTab] = useState('all');
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());

  const handleDismiss = (id: string) => {
    setDismissedIds((prev) => new Set(prev).add(id));
  };

  const activeNotifications = (empty ? [] : notifications)
    .filter((n) => !dismissedIds.has(n.id))
    .filter((n) => activeTab === 'all' || n.type === activeTab);

  const unreadCount = activeNotifications.filter((n) => !n.read).length;

  const tabs = tabKeys.map((tab) => ({
    key: tab.key,
    label: t(tab.labelKey),
    badge: tab.badge,
  }));

  return (
    <div className={styles.page}>
      <NavBar
        title={t('page.notifications')}
        showBack={false}
        rightActions={
          unreadCount > 0
            ? [
                {
                  key: 'mark-read',
                  icon: (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  ),
                  onClick: () => {},
                  ariaLabel: t('notification.markAllReadLabel'),
                },
              ]
            : []
        }
      />

      <Container hasNavbar hasTabbar>
        <TabFilter tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="underline" />

        {activeNotifications.length === 0 ? (
          <Empty
            icon={<BellEmptyIcon />}
            title={empty ? t('notification.empty') : t('notification.noNotifSection')}
            description={empty ? t('notification.newNotifDescription') : undefined}
          />
        ) : (
          <div className={styles.notifList}>
            {activeNotifications.map((notif) => (
              <Swipe
                key={notif.id}
                rightActions={[
                  {
                    key: 'dismiss',
                    label: t('common.delete'),
                    backgroundColor: '#FF3B30',
                    onClick: () => handleDismiss(notif.id),
                  },
                ]}
              >
                <div className={`${styles.notifItem} ${!notif.read ? styles.notifUnread : ''}`}>
                  <div className={styles.notifAvatar}>
                    <Badge type="dot" color={notif.badgeColor ?? 'primary'} position="top-right">
                      <Avatar src={notif.avatar} name={notif.avatarName} size="md" />
                    </Badge>
                  </div>

                  <div className={styles.notifContent}>
                    <div className={styles.notifHeader}>
                      <span
                        className={`${styles.notifTitle} ${
                          !notif.read ? styles.notifTitleUnread : ''
                        }`}
                      >
                        {notif.title}
                      </span>
                      {!notif.read && <span className={styles.unreadDot} />}
                    </div>
                    <p className={styles.notifMessage}>{notif.message}</p>
                    <span className={styles.notifTime}>{notif.timestamp}</span>
                  </div>
                </div>
              </Swipe>
            ))}
          </div>
        )}
      </Container>

      <TabBar activeKey="profile" onChange={() => {}} />
    </div>
  );
};

export default NotificationsPage;
