import { useState } from 'react';
import {
  DesktopShell,
  TopBar,
  DesktopHeaderRich,
  MegaMenu,
  Footer,
  DesktopBannerCarousel,
  DesktopSectionHeader,
  DesktopProductGrid,
  DesktopCountdownTimer,
  DesktopCategoryIcon,
  DesktopPromoBanner,
} from '../../components';
import type {
  BannerSlide,
  MegaMenuCategory,
  DesktopProductGridItem,
  CategoryItem,
  PromoLink,
} from '../../components';
import styles from './DesktopHomePage.module.scss';

// ─── Static data ──────────────────────────────────────────────────────────────

const bannerSlides: BannerSlide[] = [
  {
    title: 'RTX 5090 is Here',
    subtitle: 'Next-gen gaming performance. Pre-order now with free shipping.',
    ctaText: 'Pre-order Now',
    bgImage: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=1360&h=400&fit=crop&q=80',
    bgGradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    textColor: '#ffffff',
  },
  {
    title: 'Spring Tech Sale',
    subtitle: 'Up to 40% off on laptops, monitors, and peripherals.',
    ctaText: 'Shop Deals',
    bgImage: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=1360&h=400&fit=crop&q=80',
    bgGradient: 'linear-gradient(135deg, #FF5000 0%, #FF7A33 50%, #FFB088 100%)',
    textColor: '#ffffff',
  },
  {
    title: 'Build Your Dream PC',
    subtitle: 'Complete PC builds starting from 5,000,000 UZS. Free assembly.',
    ctaText: 'Start Building',
    bgImage: 'https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?w=1360&h=400&fit=crop&q=80',
    bgGradient: 'linear-gradient(135deg, #0f3460 0%, #533483 50%, #e94560 100%)',
    textColor: '#ffffff',
  },
];

const megaMenuCategories: MegaMenuCategory[] = [
  { label: 'Graphics Cards', subcategories: [{ label: 'NVIDIA RTX 40' }, { label: 'AMD Radeon RX' }] },
  { label: 'Processors', subcategories: [{ label: 'AMD Ryzen 7000' }, { label: 'Intel 14th Gen' }] },
  { label: 'Monitors' },
  { label: 'Laptops' },
  { label: 'Memory (RAM)' },
  { label: 'Storage' },
  { label: 'Peripherals' },
  { label: 'Cases & Cooling' },
];

const headerCategories: CategoryItem[] = [
  { id: '1', label: 'Smartphones', icon: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=80&h=80&fit=crop&q=80' },
  { id: '2', label: 'Laptops', icon: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=80&h=80&fit=crop&q=80' },
  { id: '3', label: 'Headphones', icon: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop&q=80' },
  { id: '4', label: 'Monitors', icon: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=80&h=80&fit=crop&q=80' },
  { id: '5', label: 'Keyboards', icon: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=80&h=80&fit=crop&q=80' },
  { id: '6', label: 'Mice', icon: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=80&h=80&fit=crop&q=80' },
  { id: '7', label: 'GPUs', icon: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=80&h=80&fit=crop&q=80' },
  { id: '8', label: 'Storage', icon: 'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?w=80&h=80&fit=crop&q=80' },
  { id: '9', label: 'Cameras', icon: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=80&h=80&fit=crop&q=80' },
  { id: '10', label: 'Audio', icon: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop&q=80' },
];

const promoLinks: PromoLink[] = [
  { id: '1', label: 'Delivery & Returns' },
  { id: '2', label: 'Sell on GeekShop' },
  { id: '3', label: 'Premium', highlight: true },
  { id: '4', label: 'Gift Cards' },
  { id: '5', label: 'Help' },
];

const flashDeals: DesktopProductGridItem[] = [
  { id: 'fd1', image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&h=300&fit=crop&q=80', title: 'Samsung Galaxy S24 Ultra 256GB', price: 12500000, originalPrice: 16900000, discount: '-26%', rating: 4.8, reviewCount: 1234, freeShipping: true },
  { id: 'fd2', image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=300&h=300&fit=crop&q=80', title: 'Apple AirPods Pro 2nd Gen USB-C', price: 2800000, originalPrice: 3500000, discount: '-20%', rating: 4.9, reviewCount: 892, freeShipping: true },
  { id: 'fd3', image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&h=300&fit=crop&q=80', title: 'MSI RTX 4060 Ti Ventus 2X 8GB', price: 4800000, originalPrice: 6200000, discount: '-23%', rating: 4.5, reviewCount: 456, freeShipping: true },
  { id: 'fd4', image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=300&fit=crop&q=80', title: 'LG UltraGear 27" 165Hz IPS Monitor', price: 3200000, originalPrice: 4100000, discount: '-22%', rating: 4.6, reviewCount: 678, freeShipping: false },
  { id: 'fd5', image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=300&h=300&fit=crop&q=80', title: 'Logitech MX Master 3S Wireless Mouse', price: 950000, originalPrice: 1350000, discount: '-30%', rating: 4.7, reviewCount: 2100, freeShipping: true },
];

const products: DesktopProductGridItem[] = [
  { id: '1', image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&h=300&fit=crop&q=80', title: 'Apple MacBook Air M3 15" 16GB RAM 512GB', price: 18900000, originalPrice: 21500000, discount: '-12%', rating: 4.9, reviewCount: 567, freeShipping: true },
  { id: '2', image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300&h=300&fit=crop&q=80', title: 'Samsung 990 Pro 2TB NVMe SSD', price: 2400000, rating: 4.8, reviewCount: 1234, freeShipping: true },
  { id: '3', image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=300&h=300&fit=crop&q=80', title: 'ASUS ROG Strix RTX 4070 Super OC 12GB', price: 8900000, originalPrice: 10200000, discount: '-13%', rating: 4.7, reviewCount: 345, freeShipping: true },
  { id: '4', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=300&fit=crop&q=80', title: 'Sony WH-1000XM5 Wireless Noise Cancelling', price: 3900000, rating: 4.8, reviewCount: 2100, freeShipping: false },
  { id: '5', image: 'https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=300&h=300&fit=crop&q=80', title: 'Keychron Q1 Pro 75% Mechanical Keyboard', price: 1850000, originalPrice: 2200000, discount: '-16%', rating: 4.6, reviewCount: 890, freeShipping: true },
  { id: '6', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop&q=80', title: 'Dell UltraSharp U2723QE 27" 4K USB-C Monitor', price: 5600000, rating: 4.7, reviewCount: 432, freeShipping: true },
  { id: '7', image: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=300&h=300&fit=crop&q=80', title: 'AMD Ryzen 9 7950X3D Processor', price: 7200000, originalPrice: 8500000, discount: '-15%', rating: 4.9, reviewCount: 234, freeShipping: true },
  { id: '8', image: 'https://images.unsplash.com/photo-1563297007-0686b7003af7?w=300&h=300&fit=crop&q=80', title: 'Razer DeathAdder V3 HyperSpeed Wireless', price: 1200000, rating: 4.5, reviewCount: 1567, freeShipping: false },
  { id: '9', image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=300&h=300&fit=crop&q=80', title: 'Corsair Dominator Platinum 64GB DDR5 6000MHz', price: 4200000, originalPrice: 4800000, discount: '-13%', rating: 4.8, reviewCount: 178, freeShipping: true },
  { id: '10', image: 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=300&h=300&fit=crop&q=80', title: 'Apple iPad Pro M4 11" 256GB Wi-Fi', price: 14500000, rating: 4.9, reviewCount: 789, freeShipping: true },
];

const recentlyViewed: DesktopProductGridItem[] = [
  { id: 'r1', image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=300&h=300&fit=crop&q=80', title: 'Elgato Stream Deck MK.2 \u2014 15 Keys', price: 1800000, rating: 4.6, reviewCount: 345, freeShipping: false },
  { id: 'r2', image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=300&h=300&fit=crop&q=80', title: 'BenQ ScreenBar Halo LED Monitor Light', price: 1400000, rating: 4.7, reviewCount: 567, freeShipping: true },
  { id: 'r3', image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop&q=80', title: 'Anker 737 Power Bank 24,000mAh 140W', price: 950000, rating: 4.5, reviewCount: 1200, freeShipping: true },
  { id: 'r4', image: 'https://images.unsplash.com/photo-1622782914767-404fb9ab3f57?w=300&h=300&fit=crop&q=80', title: 'CalDigit TS4 Thunderbolt 4 Dock', price: 4800000, originalPrice: 5500000, discount: '-13%', rating: 4.8, reviewCount: 234, freeShipping: true },
  { id: 'r5', image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300&h=300&fit=crop&q=80', title: 'Rode NT-USB Mini Studio Microphone', price: 1100000, rating: 4.6, reviewCount: 890, freeShipping: false },
];

const categoryIcons = [
  { icon: '\u{1F4BB}', label: 'Laptops', color: '#E3F2FD' },
  { icon: '\u{1F4F1}', label: 'Smartphones', color: '#FFF3E0' },
  { icon: '\u{1F3AE}', label: 'Gaming', color: '#E8F5E9' },
  { icon: '\u{1F5A5}\uFE0F', label: 'Monitors', color: '#F3E5F5' },
  { icon: '\u2328\uFE0F', label: 'Keyboards', color: '#FFF8E1' },
  { icon: '\u{1F3A7}', label: 'Audio', color: '#E0F2F1' },
  { icon: '\u{1F4F8}', label: 'Cameras', color: '#FCE4EC' },
  { icon: '\u{1F4BE}', label: 'Storage', color: '#E8EAF6' },
  { icon: '\u{1F5B1}\uFE0F', label: 'Peripherals', color: '#FBE9E7' },
  { icon: '\u{1F527}', label: 'PC Parts', color: '#ECEFF1' },
];

const footerColumns = [
  { title: 'Customer Service', links: [{ label: 'Help Center' }, { label: 'Returns & Refunds' }, { label: 'Shipping Info' }, { label: 'Track Order' }] },
  { title: 'About GeekShop', links: [{ label: 'About Us' }, { label: 'Careers' }, { label: 'Press' }, { label: 'Blog' }] },
  { title: 'Policies', links: [{ label: 'Privacy Policy' }, { label: 'Terms of Service' }, { label: 'Cookie Policy' }] },
  { title: 'Connect', links: [{ label: 'Telegram' }, { label: 'Instagram' }, { label: 'Facebook' }] },
];

// ─── Shared shell slots ──────────────────────────────────────────────────────

const DesktopTopBar = () => (
  <TopBar
    leftItems={[<span key="w">Welcome to GeekShop!</span>, <span key="s">Seller Center</span>, <span key="h">Help</span>]}
    rightItems={[
      <button key="l" type="button" className={styles.topBarBtn}>EN</button>,
      <button key="c" type="button" className={styles.topBarBtn}>UZS</button>,
    ]}
  />
);

const DesktopMegaMenuBar = () => (
  <MegaMenu categories={megaMenuCategories} navItems={[{ label: 'Flash Deals' }, { label: 'New Arrivals' }, { label: 'Top Brands' }]} />
);

const DesktopFooterSection = () => (
  <Footer columns={footerColumns} copyrightText={'\u00A9 2026 GeekShop. All rights reserved.'} />
);

// ─── Flash Deals Timer Icon ──────────────────────────────────────────────────

const FlashIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────

export interface DesktopHomePageProps {
  /** Override flash deals products */
  initialFlashDeals?: DesktopProductGridItem[];
  /** Override popular products */
  initialProducts?: DesktopProductGridItem[];
  /** Override recently viewed */
  initialRecentlyViewed?: DesktopProductGridItem[];
}

export const DesktopHomePage: React.FC<DesktopHomePageProps> = ({
  initialFlashDeals,
  initialProducts,
  initialRecentlyViewed,
}) => {
  const displayFlashDeals = initialFlashDeals ?? flashDeals;
  const displayProducts = initialProducts ?? products;
  const displayRecentlyViewed = initialRecentlyViewed ?? recentlyViewed;
  const [searchValue, setSearchValue] = useState('');

  const header = (
    <div className={styles.headerWrapper}>
      <DesktopHeaderRich
        logo={<span className={styles.logoText}>GeekShop</span>}
        searchPlaceholder="Search for GPUs, laptops, monitors..."
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        cartCount={3}
        wishlistCount={5}
        categories={headerCategories}
        promoLinks={promoLinks}
        location="Tashkent"
      />
      <DesktopMegaMenuBar />
    </div>
  );

  return (
    <DesktopShell
      topBar={<DesktopTopBar />}
      header={header}
      footer={<DesktopFooterSection />}
    >
      {/* Hero Banner Carousel */}
      <section className={styles.section}>
        <DesktopBannerCarousel slides={bannerSlides} autoPlay autoPlayInterval={5000} />
      </section>

      {/* Category Icons */}
      <section className={styles.section}>
        <DesktopSectionHeader title="Shop by Category" onViewAll={() => {}} />
        <div className={styles.categoryGrid}>
          {categoryIcons.map((cat) => (
            <DesktopCategoryIcon
              key={cat.label}
              icon={<span className={styles.categoryEmoji}>{cat.icon}</span>}
              label={cat.label}
              color={cat.color}
            />
          ))}
        </div>
      </section>

      {/* Flash Deals */}
      <section className={styles.section}>
        <div className={styles.flashHeader}>
          <DesktopSectionHeader
            title="Flash Deals"
            icon={<FlashIcon />}
            onViewAll={() => {}}
          />
          <div className={styles.flashTimer}>
            <span className={styles.flashTimerLabel}>Ends in</span>
            <DesktopCountdownTimer endTime={new Date(Date.now() + 4 * 60 * 60 * 1000)} />
          </div>
        </div>
        <DesktopProductGrid
          products={displayFlashDeals}
          columns={5}
          viewMode="grid"
        />
      </section>

      {/* Popular Products */}
      <section className={styles.section}>
        <DesktopSectionHeader
          title="Popular Products"
          subtitle="Based on sales this week"
          tabs={[
            { label: 'All', value: 'all' },
            { label: 'Laptops', value: 'laptops' },
            { label: 'GPUs', value: 'gpus' },
            { label: 'Monitors', value: 'monitors' },
          ]}
          activeTab="all"
          onViewAll={() => {}}
        />
        <DesktopProductGrid
          products={displayProducts}
          columns={5}
          viewMode="grid"
        />
      </section>

      {/* Promo Banners */}
      <section className={styles.section}>
        <div className={styles.promoBanners}>
          <DesktopPromoBanner
            title="Free Shipping Week"
            description="All orders over 500,000 UZS ship free. No code needed."
            image="https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&h=400&fit=crop&q=80"
            ctaText="Shop Now"
            tag="FREE"
            background="linear-gradient(135deg, #07C160 0%, #0ea05c 100%)"
          />
          <DesktopPromoBanner
            title="Student Discount"
            description="15% off on all laptops with a valid student ID."
            image="https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?w=800&h=400&fit=crop&q=80"
            imageAlign="right"
            ctaText="Learn More"
            tag="-15%"
            background="linear-gradient(135deg, #1890FF 0%, #096dd9 100%)"
          />
        </div>
      </section>

      {/* Recently Viewed */}
      <section className={styles.section}>
        <DesktopSectionHeader title="Recently Viewed" onViewAll={() => {}} />
        <DesktopProductGrid
          products={displayRecentlyViewed}
          columns={5}
          viewMode="grid"
        />
      </section>
    </DesktopShell>
  );
};
