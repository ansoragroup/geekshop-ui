import { useState } from 'react';
import {
  DesktopShell,
  DesktopBreadcrumbs,
  DesktopOrderStatusBar,
  DesktopTimeline,
  DesktopButton,
} from '../../components';
import type { DesktopOrderStep, DesktopTimelineItem } from '../../components';
import {
  DefaultTopBar,
  DefaultHeaderRich,
  DefaultMegaMenu,
  DefaultFooter,
  formatPriceUZS,
} from '../_shared';
import styles from './DesktopTrackOrderPage.module.scss';

const orderSteps: DesktopOrderStep[] = [
  { label: 'Order Placed', description: 'March 15, 2026' },
  { label: 'Processing', description: 'March 15, 2026' },
  { label: 'Shipped', description: 'March 16, 2026' },
  { label: 'Out for Delivery', description: 'March 19, 2026' },
  { label: 'Delivered', description: 'Expected March 19' },
];

const trackingEvents: DesktopTimelineItem[] = [
  {
    title: 'Package out for delivery',
    description: 'Your package is on the way to Amir Temur 15, Tashkent',
    time: 'March 19, 08:45',
    status: 'active',
  },
  {
    title: 'Arrived at local facility',
    description: 'Tashkent Distribution Center',
    time: 'March 18, 22:10',
    status: 'completed',
  },
  {
    title: 'In transit',
    description: 'Package departed from Samarkand sorting center',
    time: 'March 17, 14:30',
    status: 'completed',
  },
  {
    title: 'Shipped',
    description: 'Package picked up by courier from warehouse',
    time: 'March 16, 10:00',
    status: 'completed',
  },
  {
    title: 'Processing',
    description: 'Order confirmed and payment verified',
    time: 'March 15, 16:20',
    status: 'completed',
  },
  {
    title: 'Order placed',
    description: 'Order #GS-2026-0315-001 placed successfully',
    time: 'March 15, 15:45',
    status: 'completed',
  },
];

export interface DesktopTrackOrderPageProps {
  /** Current step (0-indexed) */
  currentStep?: number;
  /** Override order steps */
  steps?: DesktopOrderStep[];
  /** Override tracking events */
  events?: DesktopTimelineItem[];
  /** Tracking number */
  trackingNumber?: string;
}

export const DesktopTrackOrderPage: React.FC<DesktopTrackOrderPageProps> = ({
  currentStep = 3,
  steps: propSteps,
  events: propEvents,
  trackingNumber: propTrackingNumber = 'UZ1234567890',
}) => {
  const displaySteps = propSteps ?? orderSteps;
  const displayEvents = propEvents ?? trackingEvents;
  const [searchValue, setSearchValue] = useState('');

  const header = (
    <div className={styles.headerWrapper}>
      <DefaultHeaderRich searchValue={searchValue} onSearchChange={setSearchValue} />
      <DefaultMegaMenu />
    </div>
  );

  return (
    <DesktopShell topBar={<DefaultTopBar />} header={header} footer={<DefaultFooter />}>
      <div className={styles.breadcrumbs}>
        <DesktopBreadcrumbs
          items={[
            { label: 'Home', href: '#' },
            { label: 'My Orders', href: '#' },
            { label: 'Order #GS-2026-0315-001', href: '#' },
            { label: 'Track Order' },
          ]}
        />
      </div>

      <h1 className={styles.pageTitle}>Track Order</h1>

      {/* Order Status Bar */}
      <div className={styles.statusSection}>
        <DesktopOrderStatusBar steps={displaySteps} currentStep={currentStep} />
      </div>

      <div className={styles.contentGrid}>
        {/* Left: Timeline */}
        <div className={styles.mainColumn}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Tracking Details</h2>
            <div className={styles.trackingInfo}>
              <span className={styles.trackingLabel}>Tracking Number:</span>
              <span className={styles.trackingNumber}>{propTrackingNumber}</span>
            </div>
            <DesktopTimeline items={displayEvents} />
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className={styles.sideColumn}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Order Summary</h2>
            <div className={styles.orderItem}>
              <img
                src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=80&h=80&fit=crop"
                alt="MSI RTX 4060 Ti"
                className={styles.itemImage}
              />
              <div className={styles.itemInfo}>
                <span className={styles.itemName}>MSI RTX 4060 Ti Ventus 2X 8GB</span>
                <span className={styles.itemVariant}>8GB / Qora</span>
                <span className={styles.itemPrice}>{formatPriceUZS(4_800_000)}</span>
              </div>
            </div>
            <div className={styles.orderItem}>
              <img
                src="https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=80&h=80&fit=crop"
                alt="Logitech MX Master 3S"
                className={styles.itemImage}
              />
              <div className={styles.itemInfo}>
                <span className={styles.itemName}>Logitech MX Master 3S</span>
                <span className={styles.itemVariant}>Grafit</span>
                <span className={styles.itemPrice}>{formatPriceUZS(950_000)} x 2</span>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Delivery Address</h2>
            <p className={styles.addressText}>
              Jasur Karimov
              <br />
              +998 90 123 45 67
              <br />
              Amir Temur ko&apos;chasi, 15-uy, 42-xonadon
              <br />
              Toshkent, 100000
            </p>
          </div>

          <div className={styles.actions}>
            <DesktopButton variant="outline" size="lg" fullWidth>
              Contact Courier
            </DesktopButton>
            <DesktopButton variant="ghost" size="lg" fullWidth>
              Report Issue
            </DesktopButton>
          </div>
        </div>
      </div>
    </DesktopShell>
  );
};
