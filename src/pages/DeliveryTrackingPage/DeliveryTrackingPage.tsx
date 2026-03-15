import {
  NavBar,
  Steps,
  Button,
  Divider,
  Badge,
  useGeekShop,
} from '../../components';
import styles from './DeliveryTrackingPage.module.scss';

/* ---------- SVG Icons ---------- */

const TruckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF5000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const MapPinIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF5000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

/* ---------- Props ---------- */

export type DeliveryTrackingPageProps = Record<string, never>;

/* ---------- Delivery timeline data ---------- */

const deliveryEvents = [
  { title: 'Yetkazilmoqda', description: '14 mart, 14:30 — Kuryer yo\'lda. Taxminiy yetkazish: 15:30' },
  { title: 'Saralash markazidan chiqdi', description: '14 mart, 10:00 — Toshkent saralash markazi' },
  { title: 'Saralash markaziga keldi', description: '14 mart, 08:00 — Toshkent saralash markazi' },
  { title: 'Yuborildi', description: '13 mart, 16:00 — Ombor: Toshkent, Chilonzor' },
  { title: 'Buyurtma tayyorlandi', description: '13 mart, 12:00 — Ombor: Toshkent' },
  { title: 'To\'lov qabul qilindi', description: '12 mart, 18:45 — UzCard **** 4523' },
];

/* ---------- Component ---------- */

export const DeliveryTrackingPage: React.FC<DeliveryTrackingPageProps> = () => {
  const { t } = useGeekShop();

  return (
    <div className={styles.page}>
      <NavBar title={t('page.deliveryTracking')} showBack onBack={() => {}} />

      <div className={styles.content}>
        {/* Delivery card */}
        <div className={styles.deliveryCard}>
          <div className={styles.cardHeader}>
            <TruckIcon />
            <div className={styles.cardHeaderInfo}>
              <div className={styles.carrierName}>GeekShop Express</div>
              <div className={styles.trackingRow}>
                <span className={styles.trackingLabel}>
                  {t('delivery.trackingNumber')}:
                </span>
                <span className={styles.trackingNumber}>UZ1234567890</span>
                <button type="button" className={styles.copyBtn} onClick={() => {}} aria-label={t('common.copy')}>
                  <CopyIcon />
                </button>
              </div>
            </div>
            <Badge type="text" content={t('delivery.inTransit')} color="primary" position="inline" />
          </div>

          <Divider />

          {/* Estimated delivery */}
          <div className={styles.estimatedDelivery}>
            <span className={styles.estimatedLabel}>{t('delivery.estimatedDelivery')}</span>
            <span className={styles.estimatedDate}>14 mart, 15:00 - 16:00</span>
          </div>
        </div>

        {/* Map placeholder */}
        <div className={styles.mapPlaceholder}>
          <MapPinIcon />
          <span className={styles.mapText}>{t('delivery.mapPlaceholder')}</span>
        </div>

        {/* Delivery timeline */}
        <div className={styles.timelineSection}>
          <h3 className={styles.sectionTitle}>{t('delivery.timeline')}</h3>
          <Steps
            current={0}
            items={deliveryEvents}
            direction="vertical"
          />
        </div>

        {/* Contact courier */}
        <div className={styles.actionSection}>
          <Button variant="secondary" size="lg" block onClick={() => {}}>
            <span className={styles.contactBtnContent}>
              <PhoneIcon />
              {t('delivery.contactCourier')}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};
