import { useState } from 'react';
import {
  DesktopShell,
  TopBar,
  DesktopHeaderRich,
  MegaMenu,
  Footer,
  Breadcrumbs,
  DesktopButton,
  DesktopInput,
  DesktopAvatar,
  DesktopOrderCard,
} from '../../components';
import type {
  MegaMenuCategory,
  CategoryItem,
  PromoLink,
  DesktopOrderAction,
} from '../../components';
import styles from './DesktopProfilePage.module.scss';

// ─── Static data ──────────────────────────────────────────────────────────────

const footerColumns = [
  { title: 'Customer Service', links: [{ label: 'Help Center' }, { label: 'Returns & Refunds' }, { label: 'Shipping Info' }] },
  { title: 'About GeekShop', links: [{ label: 'About Us' }, { label: 'Careers' }, { label: 'Press' }] },
  { title: 'Policies', links: [{ label: 'Privacy Policy' }, { label: 'Terms of Service' }] },
  { title: 'Connect', links: [{ label: 'Telegram' }, { label: 'Instagram' }] },
];

const megaMenuCategories: MegaMenuCategory[] = [
  { label: 'Graphics Cards', subcategories: [{ label: 'NVIDIA RTX 40' }] },
  { label: 'Processors' },
  { label: 'Monitors' },
  { label: 'Laptops' },
];

const headerCategories: CategoryItem[] = [
  { id: '1', label: 'Smartphones', icon: '' },
  { id: '2', label: 'Laptops', icon: '' },
];

const promoLinks: PromoLink[] = [
  { id: '1', label: 'Delivery & Returns' },
  { id: '2', label: 'Premium', highlight: true },
];

const sidebarNavItems = [
  { id: 'profile', label: 'Profile', active: true },
  { id: 'orders', label: 'Orders' },
  { id: 'wishlist', label: 'Wishlist' },
  { id: 'addresses', label: 'Addresses' },
  { id: 'payments', label: 'Payment Methods' },
  { id: 'settings', label: 'Settings' },
];

const recentOrders: Array<{
  id: string;
  status: 'delivered' | 'shipping';
  products: Array<{ id: string; image: string; title: string }>;
  totalAmount: number;
  date: string;
  actions: DesktopOrderAction[];
}> = [
  {
    id: 'GS-2026-0315-001',
    status: 'delivered',
    products: [{ id: '1', image: 'https://c1.neweggimages.com/ProductImageCompressAll1280/14-137-781-V01.jpg', title: 'MSI RTX 4060 Ti Ventus 2X 8GB' }],
    totalAmount: 4_800_000,
    date: 'March 15, 2026',
    actions: [{ id: 'review', label: 'Write Review', variant: 'primary' }],
  },
  {
    id: 'GS-2026-0310-002',
    status: 'shipping',
    products: [{ id: '2', image: 'https://c1.neweggimages.com/ProductImageCompressAll1280/26-104-747-V01.jpg', title: 'Logitech MX Master 3S' }],
    totalAmount: 950_000,
    date: 'March 10, 2026',
    actions: [{ id: 'track', label: 'Track Order', variant: 'primary' }],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export interface DesktopProfilePageProps {
  /** User display name */
  userName?: string;
  /** User email */
  userEmail?: string;
  /** User phone */
  userPhone?: string;
}

export const DesktopProfilePage: React.FC<DesktopProfilePageProps> = ({
  userName = 'Islom Karimov',
  userEmail = 'islom.karimov@example.com',
  userPhone = '+998 90 123 45 67',
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [activeNav, setActiveNav] = useState('profile');

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
        <Breadcrumbs items={[{ label: 'Home', href: '#' }, { label: 'My Profile' }]} />
      </div>

      <h1 className={styles.pageTitle}>My Account</h1>

      <div className={styles.layout}>
        {/* Left Sidebar */}
        <nav className={styles.sidebar}>
          {sidebarNavItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.navItem} ${activeNav === item.id ? styles.navItemActive : ''}`}
              onClick={() => setActiveNav(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Content */}
        <div className={styles.mainContent}>
          {/* User Info Card */}
          <div className={styles.card}>
            <div className={styles.userHeader}>
              <DesktopAvatar name={userName} size="xl" />
              <div className={styles.userInfo}>
                <h2 className={styles.userName}>{userName}</h2>
                <p className={styles.userEmail}>{userEmail}</p>
                <p className={styles.userPhone}>{userPhone}</p>
              </div>
              <DesktopButton variant="outline" size="md">
                Edit Profile
              </DesktopButton>
            </div>
          </div>

          {/* Edit Profile Form */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Personal Information</h2>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.formRow}>
                <DesktopInput label="First name" placeholder="Islom" defaultValue="Islom" />
                <DesktopInput label="Last name" placeholder="Karimov" defaultValue="Karimov" />
              </div>
              <DesktopInput label="Email" type="email" placeholder="islom.karimov@example.com" defaultValue="islom.karimov@example.com" />
              <DesktopInput label="Phone" type="tel" placeholder="+998 90 123 45 67" defaultValue="+998 90 123 45 67" />
              <div className={styles.formActions}>
                <DesktopButton variant="primary" size="md" type="submit">Save Changes</DesktopButton>
                <DesktopButton variant="ghost" size="md" type="button">Cancel</DesktopButton>
              </div>
            </form>
          </div>

          {/* Recent Orders */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Recent Orders</h2>
              <a href="#" className={styles.viewAllLink}>View All</a>
            </div>
            <div className={styles.ordersList}>
              {recentOrders.map((order) => (
                <DesktopOrderCard
                  key={order.id}
                  orderId={order.id}
                  status={order.status}
                  products={order.products}
                  totalAmount={order.totalAmount}
                  date={order.date}
                  actions={order.actions}
                  onAction={(actionId) => console.log('action', actionId)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DesktopShell>
  );
};
