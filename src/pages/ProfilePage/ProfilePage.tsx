import React from 'react';
import {
  NavBar,
  Avatar,
  Section,
  Divider,
  Badge,
  AddressCard,
  PaymentMethodCard,
  Button,
  TabBar,
  Container,
} from '../../components';
import type { Address, PaymentMethod } from '../../components';
import styles from './ProfilePage.module.scss';

/* ---------- SVG Icons ---------- */

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const OrdersIcon = () => (
  <svg className={styles.menuIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const HeartIcon = () => (
  <svg className={styles.menuIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const LocationIcon = () => (
  <svg className={styles.menuIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const CreditCardIcon = () => (
  <svg className={styles.menuIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const GearIcon = () => (
  <svg className={styles.menuIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const HelpIcon = () => (
  <svg className={styles.menuIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const LogoutIcon = () => (
  <svg className={styles.menuIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const ChevronRight = () => (
  <svg className={styles.chevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

/* ---------- Data ---------- */

const defaultAddress: Address = {
  id: 'addr-1',
  name: 'Jasur Karimov',
  phone: '+998 90 123 45 67',
  street: 'Amir Temur ko\'chasi, 15-uy, 42-xonadon',
  city: 'Toshkent',
  region: 'Toshkent shahri',
  postalCode: '100000',
  isDefault: true,
  label: 'Uy',
};

const defaultPayment: PaymentMethod = {
  id: 'pm-1',
  type: 'uzcard',
  label: 'UzCard',
  lastFour: '4521',
  expiryDate: '08/27',
  isDefault: true,
};

/* ---------- Menu Item Component ---------- */

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  badgeCount?: number;
  badgeText?: string;
  onClick?: () => void;
}

function MenuItem({ icon, label, badgeCount, badgeText, onClick }: MenuItemProps) {
  return (
    <div
      className={styles.menuItem}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-label={label}
    >
      {icon}
      <span className={styles.menuLabel}>{label}</span>
      <span className={styles.menuTrailing}>
        {badgeCount !== undefined && badgeCount > 0 && (
          <Badge type="count" content={badgeCount} color="error" position="inline" />
        )}
        {badgeText && (
          <Badge type="text" content={badgeText} color="primary" position="inline" />
        )}
        <ChevronRight />
      </span>
    </div>
  );
}

/* ---------- Props ---------- */

export interface ProfilePageProps {
  /** Whether the user is a new user with no data */
  newUser?: boolean;
}

/* ---------- Component ---------- */

export const ProfilePage: React.FC<ProfilePageProps> = ({
  newUser = false,
}) => {
  const userName = newUser ? 'Mehmon' : 'Jasur Karimov';
  const userPhone = newUser ? undefined : '+998 90 123 45 67';

  return (
    <div className={styles.page}>
      {/* NavBar */}
      <NavBar
        title="Profil"
        showBack={false}
        rightActions={[
          {
            key: 'settings',
            icon: <SettingsIcon />,
            onClick: () => {},
            ariaLabel: 'Sozlamalar',
          },
        ]}
      />

      <Container hasNavbar hasTabbar>
        {/* User Header with Avatar */}
        <div className={styles.userHeader}>
          <Avatar
            name={userName}
            size="xl"
            src={newUser ? undefined : 'https://picsum.photos/seed/profile-avatar/200/200'}
          />
          <div>
            <div className={styles.userName}>{userName}</div>
            {userPhone ? (
              <div className={styles.userPhone}>{userPhone}</div>
            ) : (
              <div className={styles.userGuest}>Tizimga kiring yoki ro'yxatdan o'ting</div>
            )}
          </div>
        </div>

        <div className={styles.sectionGap} />

        {/* Orders & Favorites Section */}
        <Section title="Buyurtmalar">
          <MenuItem
            icon={<OrdersIcon />}
            label="Mening buyurtmalarim"
            badgeCount={newUser ? 0 : 3}
            onClick={() => {}}
          />
          <Divider variant="inset" />
          <MenuItem
            icon={<HeartIcon />}
            label="Sevimlilar"
            badgeCount={newUser ? 0 : 12}
            onClick={() => {}}
          />
        </Section>

        <div className={styles.sectionGap} />

        {/* Address Section */}
        <Section title="Manzillar">
          <MenuItem
            icon={<LocationIcon />}
            label="Manzillarim"
            onClick={() => {}}
          />
          {!newUser && (
            <div className={styles.previewSection}>
              <AddressCard
                address={defaultAddress}
                editable={false}
                deletable={false}
              />
            </div>
          )}
        </Section>

        <div className={styles.sectionGap} />

        {/* Payment Section */}
        <Section title="To'lov">
          <MenuItem
            icon={<CreditCardIcon />}
            label="To'lov usullari"
            onClick={() => {}}
          />
          {!newUser && (
            <div className={styles.previewSection}>
              <PaymentMethodCard
                method={defaultPayment}
              />
            </div>
          )}
        </Section>

        <div className={styles.sectionGap} />

        {/* Settings & Help Section */}
        <Section title="Umumiy">
          <MenuItem
            icon={<GearIcon />}
            label="Sozlamalar"
            onClick={() => {}}
          />
          <Divider variant="inset" />
          <MenuItem
            icon={<HelpIcon />}
            label="Yordam"
            onClick={() => {}}
          />
        </Section>

        <div className={styles.sectionGap} />

        {/* Logout */}
        <div className={styles.logoutSection}>
          <MenuItem
            icon={<LogoutIcon />}
            label="Chiqish"
            onClick={() => {}}
          />
          <Divider variant="full" />
          <div style={{ marginTop: 16 }}>
            <Button variant="secondary" size="full" block onClick={() => {}}>
              Chiqish
            </Button>
          </div>
        </div>
      </Container>

      {/* TabBar */}
      <TabBar activeKey="profile" onChange={() => {}} />
    </div>
  );
};

export default ProfilePage;
