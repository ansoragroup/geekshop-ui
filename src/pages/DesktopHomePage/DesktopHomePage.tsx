import { useState } from 'react';
import {
  DesktopShell,
  TopBar,
  DesktopHeader,
  MegaMenu,
  Footer,
  HeroBanner,
  CategoryIconRow,
  SectionHeader,
  CountdownTimer,
  DealCard,
  ProductGrid,
  CouponCard,
  useGeekShop,
} from '../../components';
import type { MegaMenuCategory } from '../../components';
import type { ProductCardFlatProps } from '../../components/product/ProductCard';
import styles from './DesktopHomePage.module.scss';

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

const LightningIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#FF0000' }}>
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

// ─── Static data ──────────────────────────────────────────────────────────────

const categoryIcons = [
  { icon: <GpuIcon />, key: 'category.gpu', color: '#FF5000' },
  { icon: <CpuIcon />, key: 'category.cpu', color: '#1890FF' },
  { icon: <MonitorIcon />, key: 'category.monitor', color: '#722ED1' },
  { icon: <LaptopIcon />, key: 'category.laptop', color: '#07C160' },
  { icon: <RamIcon />, key: 'category.ram', color: '#FF3B30' },
  { icon: <SsdIcon />, key: 'category.ssd', color: '#FFA726' },
  { icon: <KeyboardIcon />, key: 'category.keyboard', color: '#00BCD4' },
  { icon: <MouseIcon />, key: 'category.mouse', color: '#E91E63' },
];

const megaMenuCategories: MegaMenuCategory[] = [
  { label: 'Graphics Cards', subcategories: [{ label: 'NVIDIA RTX 40' }, { label: 'NVIDIA RTX 30' }, { label: 'AMD Radeon RX' }, { label: 'Workstation GPUs' }] },
  { label: 'Processors', subcategories: [{ label: 'AMD Ryzen 7000' }, { label: 'Intel 14th Gen' }, { label: 'Intel 13th Gen' }, { label: 'AMD Ryzen 5000' }] },
  { label: 'Monitors', subcategories: [{ label: '4K Monitors' }, { label: '2K 165Hz' }, { label: 'Ultrawide' }, { label: 'Budget' }] },
  { label: 'Laptops', subcategories: [{ label: 'Gaming' }, { label: 'Ultrabook' }, { label: 'Business' }, { label: 'Budget' }] },
  { label: 'Memory (RAM)', subcategories: [{ label: 'DDR5' }, { label: 'DDR4' }, { label: 'Laptop RAM' }] },
  { label: 'Storage', subcategories: [{ label: 'NVMe SSD' }, { label: 'SATA SSD' }, { label: 'HDD' }, { label: 'External' }] },
  { label: 'Peripherals', subcategories: [{ label: 'Keyboards' }, { label: 'Mice' }, { label: 'Headsets' }, { label: 'Webcams' }] },
  { label: 'Cases & Cooling', subcategories: [{ label: 'ATX Cases' }, { label: 'AIO Coolers' }, { label: 'Air Coolers' }, { label: 'Fans' }] },
];

const megaMenuNavItems = [
  { label: 'Flash Deals' },
  { label: 'New Arrivals' },
  { label: 'Top Brands' },
  { label: 'PC Builder' },
];

const footerColumns = [
  { title: 'Customer Service', links: [{ label: 'Help Center' }, { label: 'Returns & Refunds' }, { label: 'Shipping Info' }, { label: 'Order Tracking' }] },
  { title: 'About GeekShop', links: [{ label: 'About Us' }, { label: 'Careers' }, { label: 'Press' }, { label: 'Affiliates' }] },
  { title: 'Policies', links: [{ label: 'Privacy Policy' }, { label: 'Terms of Service' }, { label: 'Cookie Policy' }] },
];

const deals = [
  { image: 'https://picsum.photos/seed/rtx4060/240/240', title: 'RTX 4060 Ti', price: 4200000, originalPrice: 5800000, discount: 28, soldPercent: 72 },
  { image: 'https://picsum.photos/seed/ryzen5800/240/240', title: 'Ryzen 7 5800X', price: 2100000, originalPrice: 3200000, discount: 34, soldPercent: 58 },
  { image: 'https://picsum.photos/seed/monitor27/240/240', title: 'Samsung 27"', price: 3400000, originalPrice: 4100000, discount: 17, soldPercent: 45 },
  { image: 'https://picsum.photos/seed/ddr5ram/240/240', title: 'DDR5 32GB', price: 1600000, originalPrice: 2000000, discount: 20, soldPercent: 83 },
  { image: 'https://picsum.photos/seed/nvmessd/240/240', title: 'NVMe SSD 1TB', price: 850000, originalPrice: 1200000, discount: 29, soldPercent: 61 },
];

const products: ProductCardFlatProps[] = [
  { image: 'https://picsum.photos/seed/gpu4070/400/400', title: 'MSI GeForce RTX 4070 Super 12GB GDDR6X', price: 8900000, soldCount: '234 sold', badge: 'top' },
  { image: 'https://picsum.photos/seed/ryzen9/400/400', title: 'AMD Ryzen 9 7950X Processor 16 Cores', price: 5600000, soldCount: '189 sold', badge: 'hot' },
  { image: 'https://picsum.photos/seed/rogmonitor/400/400', title: 'ASUS ROG Swift 27" 2K 165Hz Monitor', price: 4800000, soldCount: '156 sold', badge: 'top' },
  { image: 'https://picsum.photos/seed/corsairram/400/400', title: 'Corsair Vengeance DDR5 32GB 6000MHz', price: 2200000, soldCount: '312 sold', badge: 'new' },
  { image: 'https://picsum.photos/seed/samsung990/400/400', title: 'Samsung 990 Pro NVMe 2TB SSD', price: 2800000, soldCount: '278 sold', badge: 'top' },
  { image: 'https://picsum.photos/seed/rogstrix/400/400', title: 'ASUS ROG Strix B650E-F Motherboard', price: 3400000, soldCount: '98 sold' },
  { image: 'https://picsum.photos/seed/cooler360/400/400', title: 'NZXT Kraken X63 RGB 280mm AIO Cooler', price: 1900000, soldCount: '145 sold', badge: 'new' },
  { image: 'https://picsum.photos/seed/casergb/400/400', title: 'Lian Li O11 Dynamic EVO RGB Case', price: 2400000, soldCount: '87 sold' },
  { image: 'https://picsum.photos/seed/keychron/400/400', title: 'Keychron Q1 Pro Mechanical Keyboard', price: 1850000, soldCount: '203 sold', badge: 'new' },
  { image: 'https://picsum.photos/seed/gpro2/400/400', title: 'Logitech G Pro X Superlight 2', price: 1400000, soldCount: '410 sold', badge: 'hot' },
];

// ─── Shared shell slots ──────────────────────────────────────────────────────

const DesktopTopBar = () => (
  <TopBar
    leftItems={[
      <span key="w">Welcome to GeekShop!</span>,
      <span key="s">Seller Center</span>,
      <span key="h">Help</span>,
    ]}
    rightItems={[
      <button key="l" type="button" style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: 'inherit' }}>EN</button>,
      <button key="c" type="button" style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: 'inherit' }}>USD</button>,
    ]}
  />
);

const DesktopHeaderBar = () => (
  <DesktopHeader
    logo={<span style={{ fontWeight: 700, fontSize: 20, color: '#FF5000' }}>GeekShop</span>}
    searchPlaceholder="Search products..."
    cartCount={3}
    wishlistCount={5}
  />
);

const DesktopMegaMenuBar = () => (
  <MegaMenu
    categories={megaMenuCategories}
    navItems={megaMenuNavItems}
  />
);

const DesktopFooterSection = () => (
  <Footer
    columns={footerColumns}
    copyrightText="\u00A9 2026 GeekShop. All rights reserved."
    bottomLinks={[{ label: 'Privacy Policy' }, { label: 'Terms of Service' }]}
  />
);

// ─── Component ────────────────────────────────────────────────────────────────

export const DesktopHomePage: React.FC = () => {
  const { t } = useGeekShop();
  const [dealEndTime] = useState(() => new Date(Date.now() + 3 * 60 * 60 * 1000));

  const categories = categoryIcons.map((c) => ({
    icon: c.icon,
    label: t(c.key),
    color: c.color,
  }));

  return (
    <DesktopShell
      topBar={<DesktopTopBar />}
      header={
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <DesktopHeaderBar />
          <DesktopMegaMenuBar />
        </div>
      }
      footer={<DesktopFooterSection />}
    >
      {/* Hero Banner */}
      <div className={styles.heroBanner}>
        <HeroBanner
          title="Tech Deals Up To 50% Off"
          subtitle="Best prices on GPUs, CPUs, and more"
          badge="MEGA SALE"
          bgGradient="linear-gradient(135deg, #FF5000 0%, #FF8A33 50%, #FFB366 100%)"
        />
      </div>

      {/* Category Icons */}
      <div className={styles.section}>
        <CategoryIconRow items={categories} />
      </div>

      {/* Flash Deals */}
      <div className={styles.section}>
        <div className={styles.dealsHeader}>
          <SectionHeader
            title="Flash Deals"
            icon={<LightningIcon />}
            onViewAll={() => {}}
          />
          <CountdownTimer endTime={dealEndTime} label="" />
        </div>
        <div className={styles.dealsGrid}>
          {deals.map((deal, i) => (
            <DealCard key={i} {...deal} />
          ))}
        </div>
      </div>

      {/* Coupon */}
      <div className={styles.section}>
        <CouponCard
          discount="-10%"
          code="GEEK10"
          expiryDate="2026-04-01"
          minAmount={500000}
          color="#FF5000"
        />
      </div>

      {/* Recommended Products */}
      <div className={styles.section}>
        <SectionHeader
          title="Recommended For You"
          onViewAll={() => {}}
        />
        <div className={styles.productGridWrap}>
          <ProductGrid
            products={products}
            layout="grid"
            columns={5}
            gap={16}
          />
        </div>
      </div>
    </DesktopShell>
  );
};
