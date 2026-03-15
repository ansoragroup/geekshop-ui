import { useState } from 'react';
import {
  NavBar,
  TabFilter,
  CouponCard,
  Empty,
  useGeekShop,
} from '../../components';
import { mockCoupons } from '../_shared';
import type { Coupon } from '../_shared';
import styles from './CouponCenterPage.module.scss';

/* ---------- Props ---------- */

export type CouponCenterPageProps = Record<string, never>;

/* ---------- Extra mock coupons for "available" ---------- */

const availableCoupons: Coupon[] = [
  {
    id: 101,
    code: 'WELCOME20',
    discount: 20,
    discountType: 'percentage',
    minAmount: 3_000_000,
    expiryDate: '2026-04-15',
    used: false,
  },
  {
    id: 102,
    code: 'TECHSALE',
    discount: 1_000_000,
    discountType: 'fixed',
    minAmount: 8_000_000,
    expiryDate: '2026-05-01',
    used: false,
  },
  ...mockCoupons.filter((c) => !c.used),
];

const myCoupons: Coupon[] = mockCoupons.filter((c) => !c.used);

const expiredCoupons: Coupon[] = [
  mockCoupons.find((c) => c.used)!,
  {
    id: 201,
    code: 'NEWYEAR',
    discount: 15,
    discountType: 'percentage',
    minAmount: 5_000_000,
    expiryDate: '2026-01-10',
    used: true,
  },
];

/* ---------- Component ---------- */

export const CouponCenterPage: React.FC<CouponCenterPageProps> = () => {
  const { t, formatPrice } = useGeekShop();
  const [activeTab, setActiveTab] = useState('available');

  const tabs = [
    { key: 'available', label: t('coupon.available') },
    { key: 'mine', label: t('coupon.myCoupons') },
    { key: 'expired', label: t('coupon.expired') },
  ];

  const getCoupons = (): Coupon[] => {
    switch (activeTab) {
      case 'available': return availableCoupons;
      case 'mine': return myCoupons;
      case 'expired': return expiredCoupons;
      default: return [];
    }
  };

  const coupons = getCoupons();

  const formatDiscount = (c: Coupon) => {
    if (c.discountType === 'percentage') return `-${c.discount}%`;
    return formatPrice(c.discount);
  };

  return (
    <div className={styles.page}>
      <NavBar title={t('page.couponCenter')} showBack onBack={() => {}} />

      <div className={styles.tabsWrap}>
        <TabFilter
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
          variant="underline"
        />
      </div>

      <div className={styles.content}>
        {coupons.length === 0 ? (
          <div className={styles.emptyWrap}>
            <Empty
              title={t('coupon.empty')}
              description={t('coupon.emptyDesc')}
            />
          </div>
        ) : (
          <div className={styles.couponList}>
            {coupons.map((coupon) => (
              <CouponCard
                key={coupon.id}
                discount={formatDiscount(coupon)}
                code={coupon.code}
                expiryDate={coupon.expiryDate}
                minAmount={coupon.minAmount}
                onUse={activeTab === 'expired' ? undefined : () => {}}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
