import { useState } from 'react';
import {
  NavBar,
  CountdownTimer,
  TabFilter,
  DealCard,
  Button,
  useGeekShop,
} from '../../components';
import { mockProducts } from '../_shared';
import styles from './FlashSalePage.module.scss';

/* ---------- SVG Icons ---------- */

const BellIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const FlashIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#FF5000" stroke="none">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

/* ---------- Props ---------- */

export interface FlashSalePageProps {}

/* ---------- Time slots ---------- */

const timeSlots = [
  { key: '10:00', label: '10:00', status: 'live' as const },
  { key: '14:00', label: '14:00', status: 'live' as const },
  { key: '20:00', label: '20:00', status: 'upcoming' as const },
];

/* ---------- Flash sale products ---------- */

const flashSaleProducts = mockProducts.slice(0, 8).map((p, i) => ({
  ...p,
  originalPrice: p.originalPrice || Math.round(p.price * 1.3),
  discount: Math.round(((p.originalPrice || p.price * 1.3) - p.price) / (p.originalPrice || p.price * 1.3) * 100),
  soldPercent: [78, 45, 92, 33, 67, 55, 88, 21][i],
}));

/* ---------- Component ---------- */

export const FlashSalePage: React.FC<FlashSalePageProps> = () => {
  const { t } = useGeekShop();
  const [activeSlot, setActiveSlot] = useState('10:00');

  // End time: 2 hours from now for the current slot
  const endTime = new Date(Date.now() + 2 * 60 * 60 * 1000);

  const currentSlot = timeSlots.find((s) => s.key === activeSlot);
  const isUpcoming = currentSlot?.status === 'upcoming';

  return (
    <div className={styles.page}>
      <NavBar title={t('page.flashSale')} showBack onBack={() => {}} />

      {/* Countdown header */}
      <div className={styles.countdownHeader}>
        <div className={styles.countdownTop}>
          <FlashIcon />
          <span className={styles.flashTitle}>{t('flashSale.title')}</span>
        </div>
        <CountdownTimer
          endTime={endTime}
          label={t('flashSale.endsIn')}
          onEnd={() => {}}
        />
      </div>

      {/* Time slot tabs */}
      <div className={styles.tabsWrap}>
        <TabFilter
          tabs={timeSlots.map((s) => ({
            key: s.key,
            label: s.label,
            badge: s.status === 'live' ? t('flashSale.live') : t('flashSale.upcoming'),
          }))}
          activeTab={activeSlot}
          onChange={setActiveSlot}
          variant="pill"
        />
      </div>

      {/* Products grid */}
      <div className={styles.content}>
        {isUpcoming ? (
          <div className={styles.upcomingWrap}>
            <p className={styles.upcomingText}>
              {t('flashSale.upcomingDesc')}
            </p>
            <Button variant="secondary" size="md" onClick={() => {}}>
              <span className={styles.notifyBtnContent}>
                <BellIcon />
                {t('flashSale.notifyMe')}
              </span>
            </Button>
          </div>
        ) : null}

        <div className={styles.dealGrid}>
          {flashSaleProducts.map((product) => (
            <DealCard
              key={product.id}
              image={product.image}
              title={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              discount={product.discount}
              soldPercent={product.soldPercent}
              onClick={() => {}}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
