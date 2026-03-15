import { useState } from 'react';
import {
  AppBar,
  NoticeBar,
  HeroBanner,
  PromoBanner,
  CategoryIconRow,
  SectionHeader,
  CountdownTimer,
  DealCard,
  CouponCard,
  TabFilter,
  ProductGrid,
  TabBar,
} from '../../components';
import type { ProductCardFlatProps } from '../../components/product/ProductCard';
import styles from './HomePage.module.scss';

// ─── Category icon SVGs ───────────────────────────────────────────────────────

const GpuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="6" width="16" height="12" rx="2" />
    <path d="M8 6V4M12 6V4M16 6V4M8 18v2M12 18v2M16 18v2" />
  </svg>
);

const CpuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
  </svg>
);

const MonitorIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
);

const LaptopIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v8H4V6z" />
    <path d="M2 17h20a1 1 0 01-1 1H3a1 1 0 01-1-1z" />
  </svg>
);

const RamIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="1" />
    <path d="M6 10v4M10 10v4M14 10v4M18 10v4" />
  </svg>
);

const SsdIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M7 9h4M7 12h6" />
  </svg>
);

const KeyboardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <path d="M6 10h0M10 10h0M14 10h0M18 10h0M8 14h8" />
  </svg>
);

const MouseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="3" width="12" height="18" rx="6" />
    <path d="M12 3v6" />
  </svg>
);

// ─── Static data ──────────────────────────────────────────────────────────────

const categories = [
  { icon: <GpuIcon />, label: 'Videokartalar', color: '#FF5000' },
  { icon: <CpuIcon />, label: 'Protsessorlar', color: '#1890FF' },
  { icon: <MonitorIcon />, label: 'Monitorlar', color: '#722ED1' },
  { icon: <LaptopIcon />, label: 'Noutbuklar', color: '#07C160' },
  { icon: <RamIcon />, label: 'Xotira (RAM)', color: '#FF3B30' },
  { icon: <SsdIcon />, label: 'SSD/HDD', color: '#FFA726' },
  { icon: <KeyboardIcon />, label: 'Klaviatura', color: '#00BCD4' },
  { icon: <MouseIcon />, label: 'Sichqoncha', color: '#E91E63' },
];

const promoBanners = [
  {
    title: 'Aksiya 50% gacha',
    subtitle: 'Tanlangan GPU larga',
    tag: 'HOT',
    gradient: 'linear-gradient(135deg, #FF3B30, #FF6B5A)',
  },
  {
    title: 'Yangi kelganlar',
    subtitle: 'RTX 50 seriyasi',
    tag: 'NEW',
    gradient: 'linear-gradient(135deg, #1890FF, #45A5FF)',
  },
];

const deals = [
  { image: 'https://picsum.photos/seed/rtx4060/240/240', title: 'RTX 4060 Ti', price: 4200000, originalPrice: 5800000, discount: 28, soldPercent: 72 },
  { image: 'https://picsum.photos/seed/ryzen5800/240/240', title: 'Ryzen 7 5800X', price: 2100000, originalPrice: 3200000, discount: 34, soldPercent: 58 },
  { image: 'https://picsum.photos/seed/monitor27/240/240', title: 'Samsung 27"', price: 3400000, originalPrice: 4100000, discount: 17, soldPercent: 45 },
  { image: 'https://picsum.photos/seed/ddr5ram/240/240', title: 'DDR5 32GB', price: 1600000, originalPrice: 2000000, discount: 20, soldPercent: 83 },
  { image: 'https://picsum.photos/seed/nvmessd/240/240', title: 'NVMe SSD 1TB', price: 850000, originalPrice: 1200000, discount: 29, soldPercent: 61 },
];

const products: ProductCardFlatProps[] = [
  // Distribution: index%2=0 → left col (standard), index%2=1 → right col (taller)
  // Left col (standard height images):
  { image: 'https://picsum.photos/seed/gpu4070/400/400', title: 'MSI GeForce RTX 4070 Super 12GB GDDR6X', price: 8900000, soldCount: '234 dona sotilgan', badge: 'top' },
  // Right col (taller images):
  { image: 'https://picsum.photos/seed/ryzen9/400/560', title: 'AMD Ryzen 9 7950X Protsessor 16 yadro', price: 5600000, soldCount: '189 dona sotilgan', badge: 'hot' },
  // Left:
  { image: 'https://picsum.photos/seed/rogmonitor/400/400', title: 'ASUS ROG Swift 27" 2K 165Hz Monitor', price: 4800000, soldCount: '156 dona sotilgan', badge: 'top' },
  // Right:
  { image: 'https://picsum.photos/seed/corsairram/400/520', title: 'Corsair Vengeance DDR5 32GB 6000MHz', price: 2200000, soldCount: '312 dona sotilgan', badge: 'new' },
  // Left:
  { image: 'https://picsum.photos/seed/samsung990/400/400', title: 'Samsung 990 Pro NVMe 2TB SSD', price: 2800000, soldCount: '278 dona sotilgan', badge: 'top' },
  // Right:
  { image: 'https://picsum.photos/seed/rogstrix/400/540', title: 'ASUS ROG Strix B650E-F Motherboard', price: 3400000, soldCount: '98 dona sotilgan' },
  // Left:
  { image: 'https://picsum.photos/seed/cooler360/400/400', title: 'NZXT Kraken X63 RGB 280mm AIO Cooler', price: 1900000, soldCount: '145 dona sotilgan', badge: 'new' },
  // Right:
  { image: 'https://picsum.photos/seed/casergb/400/500', title: 'Lian Li O11 Dynamic EVO RGB Case', price: 2400000, soldCount: '87 dona sotilgan' },
];

const filterTabs = [
  { key: 'all', label: 'Barchasi' },
  { key: 'gpu', label: 'Videokartalar' },
  { key: 'cpu', label: 'Protsessorlar' },
  { key: 'laptop', label: 'Noutbuklar' },
  { key: 'monitor', label: 'Monitorlar' },
  { key: 'ssd', label: 'SSD' },
];

// ─── Deals section lightning icon ─────────────────────────────────────────────

const LightningIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#FF0000' }}>
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────

export interface HomePageProps {
  /** ProductGrid layout mode */
  gridLayout?: 'grid' | 'waterfall';
  /** AppBar variant */
  appBarVariant?: 'colored' | 'transparent';
  /** AppBar custom background color */
  appBarBackgroundColor?: string;
}

export const HomePage: React.FC<HomePageProps> = ({
  gridLayout = 'waterfall',
  appBarVariant = 'colored',
  appBarBackgroundColor,
}) => {
  const [activeTab, setActiveTab] = useState('all');
  const [activeBarTab, setActiveBarTab] = useState('home');

  // Countdown: 3 hours from now (stable reference)
  const [dealEndTime] = useState(() => new Date(Date.now() + 3 * 60 * 60 * 1000));

  return (
    <div className={styles.homePage}>
      {/* 1. AppBar */}
      <AppBar
        variant={appBarVariant}
        backgroundColor={appBarBackgroundColor}
        location="Toshkent"
        showLocation
        showScan
        searchPlaceholder="RTX 4090 qidirish..."
      />

      {/* 2. NoticeBar */}
      <NoticeBar
        content="Yangi foydalanuvchilar uchun 10% chegirma! Kod: GEEK10"
        mode="scroll"
      />

      {/* 3. HeroBanner */}
      <div className={styles.heroBannerSection}>
        <HeroBanner
          title="Noutbuk Festival"
          subtitle="500 000 so'mgacha chegirma!"
          badge="GeekShop Exclusive"
          bgGradient="linear-gradient(135deg, #FF5000 0%, #FF8A33 50%, #FFB366 100%)"
        />
      </div>

      {/* 4. PromoBanner row */}
      <div className={styles.promoSection}>
        <PromoBanner items={promoBanners} />
      </div>

      {/* 5. CategoryIcon row */}
      <div className={styles.categorySection}>
        <CategoryIconRow items={categories} />
      </div>

      {/* 6. Deals section */}
      <div className={styles.dealsSection}>
        <div className={styles.dealsHeader}>
          <SectionHeader
            title="Chegirmalar"
            icon={<LightningIcon />}
            onViewAll={() => {}}
          />
          <CountdownTimer endTime={dealEndTime} label="" />
        </div>
        <div className={styles.dealsScroll}>
          {deals.map((deal, i) => (
            <DealCard key={i} {...deal} />
          ))}
        </div>
      </div>

      {/* 7. CouponCard */}
      <div className={styles.couponSection}>
        <CouponCard
          discount="-10%"
          code="GEEK10"
          expiryDate="2026-04-01"
          minAmount={500000}
          color="#FF5000"
        />
      </div>

      {/* 8. Recommended section */}
      <div className={styles.recommendedSection}>
        <SectionHeader
          title="Tavsiya etamiz"
          onViewAll={() => {}}
        />
        <div className={styles.tabFilterWrap}>
          <TabFilter
            tabs={filterTabs}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        </div>
        <ProductGrid
          products={products}
          layout={gridLayout}
          columns={2}
          gap={8}
        />
      </div>

      {/* 9. TabBar */}
      <TabBar
        activeKey={activeBarTab}
        onChange={setActiveBarTab}
      />
    </div>
  );
};

export default HomePage;
