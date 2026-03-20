import {
  DesktopShell,
  TopBar,
  DesktopHeaderRich,
  MegaMenu,
  Footer,
  Breadcrumbs,
  DesktopOrderStatusBar,
  DesktopButton,
} from '../../components';
import type {
  MegaMenuCategory,
  CategoryItem,
  PromoLink,
  DesktopOrderStep,
} from '../../components';
import styles from './DesktopOrderDetailPage.module.scss';

// ─── Static data ──────────────────────────────────────────────────────────────

const footerColumns = [
  { title: 'Customer Service', links: [{ label: 'Help Center' }, { label: 'Returns & Refunds' }, { label: 'Shipping Info' }] },
  { title: 'About GeekShop', links: [{ label: 'About Us' }, { label: 'Careers' }, { label: 'Press' }] },
  { title: 'Policies', links: [{ label: 'Privacy Policy' }, { label: 'Terms of Service' }] },
  { title: 'Connect', links: [{ label: 'Telegram' }, { label: 'Instagram' }, { label: 'Facebook' }] },
];

const megaMenuCategories: MegaMenuCategory[] = [
  { label: 'Graphics Cards', subcategories: [{ label: 'NVIDIA RTX 40' }, { label: 'AMD Radeon RX' }] },
  { label: 'Processors', subcategories: [{ label: 'AMD Ryzen 7000' }, { label: 'Intel 14th Gen' }] },
  { label: 'Monitors' },
  { label: 'Laptops' },
];

const headerCategories: CategoryItem[] = [
  { id: '1', label: 'Smartphones', icon: '' },
  { id: '2', label: 'Laptops', icon: '' },
  { id: '3', label: 'GPUs', icon: '' },
];

const promoLinks: PromoLink[] = [
  { id: '1', label: 'Delivery & Returns' },
  { id: '2', label: 'Premium', highlight: true },
  { id: '3', label: 'Help' },
];

const orderSteps: DesktopOrderStep[] = [
  { label: 'Order Placed', description: 'March 15, 2026' },
  { label: 'Processing', description: 'March 15, 2026' },
  { label: 'Shipped', description: 'March 16, 2026' },
  { label: 'Delivered', description: 'Expected March 19' },
];

const orderItems = [
  {
    id: '1',
    image: 'https://c1.neweggimages.com/ProductImageCompressAll1280/14-137-781-V01.jpg',
    name: 'MSI RTX 4060 Ti Ventus 2X 8GB',
    quantity: 1,
    price: 4_800_000,
  },
  {
    id: '2',
    image: 'https://c1.neweggimages.com/ProductImageCompressAll1280/26-104-747-V01.jpg',
    name: 'Logitech MX Master 3S Wireless Mouse',
    quantity: 2,
    price: 950_000,
  },
];

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatPrice(value: number): string {
  return value.toLocaleString('uz-UZ') + ' UZS';
}

// ─── Component ────────────────────────────────────────────────────────────────

export interface DesktopOrderDetailPageProps {
  orderId?: string;
  orderDate?: string;
  status?: string;
  statusStep?: number;
  steps?: DesktopOrderStep[];
  items?: typeof orderItems;
  shippingAddress?: { name: string; phone: string; street: string; city: string; postal: string };
  paymentMethod?: string;
  trackingNumber?: string;
  cancellationReason?: string;
  returnStatus?: string;
}

export const DesktopOrderDetailPage: React.FC<DesktopOrderDetailPageProps> = ({
  orderId = 'GS-2026-0315-001',
  orderDate = 'March 15, 2026',
  status = 'Shipped',
  statusStep = 2,
  steps: propSteps,
  items: propItems,
  shippingAddress,
  paymentMethod = 'Visa •••• 4242',
  trackingNumber,
  cancellationReason,
  returnStatus,
}) => {
  const displayItems = propItems ?? orderItems;
  const displaySteps = propSteps ?? orderSteps;
  const addr = shippingAddress ?? { name: 'Islom Karimov', phone: '+998 90 123 45 67', street: '123 Amir Temur Street, Apt 42', city: 'Tashkent, Uzbekistan', postal: '100000' };
  const subtotal = displayItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 50_000;
  const total = subtotal + shipping;

  const header = (
    <div className={styles.headerWrapper}>
      <DesktopHeaderRich
        logo={<span className={styles.logoText}>GeekShop</span>}
        searchPlaceholder="Search products..."
        searchValue=""
        onSearchChange={() => {}}
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
        <Breadcrumbs items={[{ label: 'Home', href: '#' }, { label: 'My Orders', href: '#' }, { label: 'Order #{orderId}' }]} />
      </div>

      <h1 className={styles.pageTitle}>Order #{orderId}</h1>

      {/* Status bar */}
      <div className={styles.statusSection}>
        <DesktopOrderStatusBar steps={displaySteps} currentStep={statusStep} />
      </div>

      <div className={styles.contentGrid}>
        {/* Left: Items + Shipping */}
        <div className={styles.mainColumn}>
          {/* Order Info */}
          <div className={styles.infoCard}>
            <h2 className={styles.cardTitle}>Order Information</h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Order Number</span>
                <span className={styles.infoValue}>{orderId}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Date</span>
                <span className={styles.infoValue}>{orderDate}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Payment Method</span>
                <span className={styles.infoValue}>{paymentMethod}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Status</span>
                <span className={styles.statusBadge}>{status}</span>
              </div>
              {trackingNumber && (
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Tracking</span>
                  <span className={styles.infoValue}>{trackingNumber}</span>
                </div>
              )}
              {cancellationReason && (
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Cancellation Reason</span>
                  <span className={styles.infoValue}>{cancellationReason}</span>
                </div>
              )}
              {returnStatus && (
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Return Status</span>
                  <span className={styles.infoValue}>{returnStatus}</span>
                </div>
              )}
            </div>
          </div>

          {/* Items */}
          <div className={styles.infoCard}>
            <h2 className={styles.cardTitle}>Items ({displayItems.length})</h2>
            <div className={styles.itemsList}>
              {displayItems.map((item) => (
                <div key={item.id} className={styles.orderItem}>
                  <img src={item.image} alt={item.name} className={styles.itemImage} />
                  <div className={styles.itemDetails}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemQty}>Qty: {item.quantity}</span>
                  </div>
                  <span className={styles.itemPrice}>{formatPrice(item.price)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div className={styles.infoCard}>
            <h2 className={styles.cardTitle}>Shipping Address</h2>
            <p className={styles.addressText}>
              {addr.name}<br />
              {addr.phone}<br />
              {addr.street}<br />
              {addr.city} {addr.postal}
            </p>
          </div>
        </div>

        {/* Right: Payment Summary + Actions */}
        <div className={styles.sideColumn}>
          <div className={styles.summaryCard}>
            <h2 className={styles.cardTitle}>Payment Summary</h2>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>{formatPrice(shipping)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Tax</span>
              <span>{formatPrice(0)}</span>
            </div>
            <div className={styles.summaryDivider} />
            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <div className={styles.actionsCard}>
            <DesktopButton variant="primary" size="lg" fullWidth>
              Track Package
            </DesktopButton>
            <DesktopButton variant="outline" size="lg" fullWidth>
              Request Return
            </DesktopButton>
            <DesktopButton variant="secondary" size="lg" fullWidth>
              Buy Again
            </DesktopButton>
          </div>
        </div>
      </div>
    </DesktopShell>
  );
};
