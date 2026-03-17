import { useState } from 'react';
import { DesktopShell } from '../../components/layout/DesktopShell';
import { TopBar } from '../../components/navigation/TopBar';
import { DesktopHeader } from '../../components/navigation/DesktopHeader';
import { DesktopLanguageSwitcher } from '../../components/navigation/DesktopLanguageSwitcher';
import { DesktopCurrencySwitcher } from '../../components/navigation/DesktopCurrencySwitcher';
import { DesktopSidebar } from '../../components/navigation/DesktopSidebar';
import { Footer } from '../../components/layout/Footer';
import { DesktopBannerCarousel } from '../../components/content/DesktopBannerCarousel';
import { DesktopPopularSearches } from '../../components/navigation/DesktopPopularSearches';
import { DesktopSectionHeader } from '../../components/content/DesktopSectionHeader';
import { DesktopSteps } from '../../components/data-display/DesktopSteps';
import { DesktopShopCard } from '../../components/commerce/DesktopShopCard';
import { FlashDealStrip } from '../../components/commerce/FlashDealStrip';
import { DesktopFilterBar } from '../../components/navigation/DesktopFilterBar';
import { DesktopProductGrid } from '../../components/product/DesktopProductGrid';
import { CategoryShowcase } from '../../components/content/CategoryShowcase';
import { DesktopReviewCard } from '../../components/data-display/DesktopReviewCard';
import { DesktopSocialProof } from '../../components/content/DesktopSocialProof';
import { DesktopPromoBanner } from '../../components/content/DesktopPromoBanner';
import { FloatingToolbar } from '../../components/navigation/FloatingToolbar';
import type { DesktopProductGridItem } from '../../components/product/DesktopProductGrid';
import styles from './DesktopHomePageB.module.scss';

// ─── Static Data ─────────────────────────────────────────────────────────────

const sidebarCategories = [
  { label: 'Graphics Cards', count: 1240 },
  { label: 'Processors', count: 890 },
  { label: 'Motherboards', count: 567 },
  { label: 'RAM Modules', count: 432 },
  { label: 'Storage Drives', count: 765 },
  { label: 'Monitors', count: 345 },
  { label: 'Laptops', count: 234 },
  { label: 'Peripherals', count: 890 },
  { label: 'Networking', count: 123 },
  { label: 'Components', count: 456 },
];

const sidebarBrands = [
  { label: 'NVIDIA', value: 'nvidia' },
  { label: 'AMD', value: 'amd' },
  { label: 'Intel', value: 'intel' },
  { label: 'Samsung', value: 'samsung' },
  { label: 'ASUS', value: 'asus' },
  { label: 'MSI', value: 'msi' },
  { label: 'Corsair', value: 'corsair' },
  { label: 'Kingston', value: 'kingston' },
];

const bannerSlides = [
  {
    title: 'Wholesale Tech Prices',
    subtitle: 'Direct from Suppliers — Best Bulk Rates in Uzbekistan',
    ctaText: 'Start Buying',
    bgGradient: 'linear-gradient(135deg, #FF5000 0%, #FF7A33 50%, #FFB088 100%)',
  },
  {
    title: 'Verified Suppliers',
    subtitle: '100% Authentic Products — Buyer Protection Guaranteed',
    ctaText: 'Browse Suppliers',
    bgGradient: 'linear-gradient(135deg, #1890FF 0%, #40A9FF 50%, #91D5FF 100%)',
  },
  {
    title: 'Bulk Orders — Volume Discounts',
    subtitle: 'Up to 40% Off When You Buy in Quantity',
    ctaText: 'See Deals',
    bgGradient: 'linear-gradient(135deg, #07C160 0%, #36D981 50%, #95F3B0 100%)',
  },
];

const popularSearchItems = [
  { text: 'RTX 4090', count: 15420 },
  { text: 'DDR5 RAM', count: 12300 },
  { text: 'NVMe SSD 2TB', count: 9800 },
  { text: '4K Monitor', count: 8700 },
  { text: 'i9-14900K', count: 7650 },
  { text: 'RX 7900 XTX', count: 6540 },
  { text: 'Mechanical Keyboard', count: 5430 },
  { text: '360Hz Monitor', count: 4320 },
  { text: 'PCIe 5.0 SSD', count: 3210 },
  { text: 'Mesh WiFi Router', count: 2890 },
  { text: 'USB-C Hub', count: 2340 },
  { text: 'Thunderbolt Dock', count: 1890 },
];

const howItWorksSteps = [
  {
    title: 'Browse Products',
    description: 'Search 50,000+ products from verified suppliers',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    title: 'Get Quotes',
    description: 'Contact suppliers for bulk pricing',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    title: 'Place Order',
    description: 'Secure payment with buyer protection',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
      </svg>
    ),
  },
  {
    title: 'Receive Goods',
    description: 'Track shipment in real-time',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
];

const suppliers = [
  {
    name: 'Silicon Valley Electronics',
    logo: 'https://picsum.photos/seed/shop-sv/100/100',
    rating: 4.9,
    productsCount: 2400,
    followersCount: 50000,
    responseRate: 99,
  },
  {
    name: 'Shenzhen Direct',
    logo: 'https://picsum.photos/seed/shop-sz/100/100',
    rating: 4.7,
    productsCount: 1800,
    followersCount: 38000,
    responseRate: 97,
  },
  {
    name: 'TechWholesale UZ',
    logo: 'https://picsum.photos/seed/shop-tw/100/100',
    rating: 4.5,
    productsCount: 950,
    followersCount: 25000,
    responseRate: 95,
  },
  {
    name: 'MegaChip Supply',
    logo: 'https://picsum.photos/seed/shop-mc/100/100',
    rating: 4.8,
    productsCount: 500,
    followersCount: 31000,
    responseRate: 98,
  },
];

const flashDealEndTime = new Date(Date.now() + 6 * 60 * 60 * 1000);

const flashDealItems = [
  { id: 'fd1', image: 'https://picsum.photos/seed/fd-ram/200/200', title: '10x DDR5 32GB RAM Sticks', price: 12000000, originalPrice: 18000000, discount: '-33%', soldPercent: 72 },
  { id: 'fd2', image: 'https://picsum.photos/seed/fd-ssd/200/200', title: '5-Pack Samsung 990 PRO 2TB SSD', price: 15000000, originalPrice: 22000000, discount: '-32%', soldPercent: 58 },
  { id: 'fd3', image: 'https://picsum.photos/seed/fd-gpu/200/200', title: 'RTX 4070 Ti Super Bundle (3 units)', price: 30000000, originalPrice: 42000000, discount: '-28%', soldPercent: 89 },
  { id: 'fd4', image: 'https://picsum.photos/seed/fd-mb/200/200', title: '5x ASUS B650 Motherboards', price: 8500000, originalPrice: 12000000, discount: '-29%', soldPercent: 45 },
  { id: 'fd5', image: 'https://picsum.photos/seed/fd-psu/200/200', title: '10x Corsair RM850x PSU', price: 9500000, originalPrice: 14000000, discount: '-32%', soldPercent: 67 },
  { id: 'fd6', image: 'https://picsum.photos/seed/fd-mon/200/200', title: '3-Pack 27" 4K IPS Monitors', price: 20000000, originalPrice: 28000000, discount: '-28%', soldPercent: 34 },
];

const filterBarItems = [
  { label: 'All Products', value: 'all', active: true },
  { label: 'Best Sellers', value: 'best-sellers' },
  { label: 'New Arrivals', value: 'new-arrivals' },
  { label: 'Most Reviewed', value: 'most-reviewed' },
  { label: 'Bulk Discount', value: 'bulk-discount' },
];

const products: DesktopProductGridItem[] = [
  { id: 'p1', images: ['https://picsum.photos/seed/b2b-1/400/400'], title: 'NVIDIA RTX 4070 Ti Super 16GB — MOQ: 5 units', shopName: 'Silicon Valley Electronics', price: 12500000, originalPrice: 14000000, discount: '-11%', rating: 4.8, soldCount: '1,240', freeShipping: true },
  { id: 'p2', images: ['https://picsum.photos/seed/b2b-2/400/400'], title: 'Samsung 990 PRO 2TB NVMe — Box of 10', shopName: 'Shenzhen Direct', price: 3200000, originalPrice: 3800000, discount: '-16%', rating: 4.7, soldCount: '3,450', freeShipping: true },
  { id: 'p3', images: ['https://picsum.photos/seed/b2b-3/400/400'], title: 'Intel Core i9-14900K — MOQ: 3 units', shopName: 'MegaChip Supply', price: 7800000, originalPrice: 8500000, discount: '-8%', rating: 4.9, soldCount: '567', freeShipping: true },
  { id: 'p4', images: ['https://picsum.photos/seed/b2b-4/400/400'], title: 'Corsair Vengeance DDR5 32GB Kit — MOQ: 10', shopName: 'TechWholesale UZ', price: 1200000, originalPrice: 1500000, discount: '-20%', rating: 4.5, soldCount: '5,678', freeShipping: true },
  { id: 'p5', images: ['https://picsum.photos/seed/b2b-5/400/400'], title: 'ASUS ROG Strix B650-E — MOQ: 5 units', shopName: 'Silicon Valley Electronics', price: 3900000, originalPrice: 4500000, discount: '-13%', rating: 4.6, soldCount: '890', freeShipping: false },
  { id: 'p6', images: ['https://picsum.photos/seed/b2b-6/400/400'], title: 'AMD Ryzen 9 7950X — MOQ: 3 units', shopName: 'MegaChip Supply', price: 8200000, rating: 4.8, soldCount: '432', freeShipping: true },
  { id: 'p7', images: ['https://picsum.photos/seed/b2b-7/400/400'], title: 'Dell UltraSharp 27" 4K Monitor — MOQ: 5', shopName: 'Shenzhen Direct', price: 5500000, originalPrice: 6200000, discount: '-11%', rating: 4.7, soldCount: '1,230', freeShipping: true },
  { id: 'p8', images: ['https://picsum.photos/seed/b2b-8/400/400'], title: 'WD Black SN850X 4TB — Box of 5', shopName: 'TechWholesale UZ', price: 4800000, originalPrice: 5500000, discount: '-13%', rating: 4.6, soldCount: '780', freeShipping: false },
  { id: 'p9', images: ['https://picsum.photos/seed/b2b-9/400/400'], title: 'Corsair RM1000x PSU — MOQ: 10 units', shopName: 'Silicon Valley Electronics', price: 1800000, originalPrice: 2200000, discount: '-18%', rating: 4.5, soldCount: '2,100', freeShipping: true },
  { id: 'p10', images: ['https://picsum.photos/seed/b2b-10/400/400'], title: 'MSI MAG 271QPX 27" QD-OLED — MOQ: 3', shopName: 'Shenzhen Direct', price: 9500000, originalPrice: 11000000, discount: '-14%', rating: 4.9, soldCount: '345', freeShipping: true },
  { id: 'p11', images: ['https://picsum.photos/seed/b2b-11/400/400'], title: 'Logitech MX Master 3S — Case of 20', shopName: 'TechWholesale UZ', price: 950000, originalPrice: 1200000, discount: '-21%', rating: 4.4, soldCount: '4,560', freeShipping: true },
  { id: 'p12', images: ['https://picsum.photos/seed/b2b-12/400/400'], title: 'Kingston Fury Beast 64GB DDR5 — MOQ: 5', shopName: 'MegaChip Supply', price: 2400000, rating: 4.6, soldCount: '1,890', freeShipping: false },
  { id: 'p13', images: ['https://picsum.photos/seed/b2b-13/400/400'], title: 'Noctua NH-D15 Cooler — Box of 10', shopName: 'Silicon Valley Electronics', price: 1100000, originalPrice: 1400000, discount: '-21%', rating: 4.8, soldCount: '2,340', freeShipping: true },
  { id: 'p14', images: ['https://picsum.photos/seed/b2b-14/400/400'], title: 'NVIDIA RTX 4090 24GB — MOQ: 2 units', shopName: 'Shenzhen Direct', price: 25000000, originalPrice: 28000000, discount: '-11%', rating: 4.9, soldCount: '156', freeShipping: true },
  { id: 'p15', images: ['https://picsum.photos/seed/b2b-15/400/400'], title: 'TP-Link Deco XE75 Mesh System — MOQ: 10', shopName: 'TechWholesale UZ', price: 3500000, originalPrice: 4200000, discount: '-17%', rating: 4.5, soldCount: '670', freeShipping: true },
];

const sortOptions = [
  { id: 'best-match', label: 'Best Match' },
  { id: 'price-asc', label: 'Price: Low-High' },
  { id: 'price-desc', label: 'Price: High-Low' },
  { id: 'most-orders', label: 'Most Orders' },
  { id: 'rating', label: 'Rating' },
];

const showcaseCategories = [
  { label: 'Graphics Cards', image: 'https://picsum.photos/seed/cat-gpu/400/300', count: 1240 },
  { label: 'Processors', image: 'https://picsum.photos/seed/cat-cpu/400/300', count: 890 },
  { label: 'Motherboards', image: 'https://picsum.photos/seed/cat-mb/400/300', count: 567 },
  { label: 'RAM Modules', image: 'https://picsum.photos/seed/cat-ram/400/300', count: 432 },
  { label: 'Storage Drives', image: 'https://picsum.photos/seed/cat-ssd/400/300', count: 765 },
  { label: 'Monitors', image: 'https://picsum.photos/seed/cat-mon/400/300', count: 345 },
  { label: 'Laptops', image: 'https://picsum.photos/seed/cat-lap/400/300', count: 234 },
  { label: 'Peripherals', image: 'https://picsum.photos/seed/cat-per/400/300', count: 890 },
];

const reviews = [
  {
    user: { name: 'Dilshod R.', avatar: 'https://picsum.photos/seed/avatar-dilshod/80/80' },
    rating: 5,
    content: 'Excellent wholesale prices on GPU bulk orders. Received 10 RTX 4070 units in perfect condition, all factory sealed. Shipping was fast and customer support was responsive throughout the entire process. Will definitely order again for our computer shop inventory.',
    date: '12 Mar 2026',
    helpfulCount: 47,
    variant: 'RTX 4070/Bulk 10 units',
  },
  {
    user: { name: 'Kamola A.', avatar: 'https://picsum.photos/seed/avatar-kamola/80/80' },
    rating: 4,
    content: 'Good quality products, fast delivery to Tashkent. Ordered 20 sets of DDR5 RAM for our assembly line. One kit had a minor packaging issue but the supplier resolved it within 24 hours. Pricing is competitive compared to other wholesale platforms.',
    date: '8 Mar 2026',
    helpfulCount: 32,
    variant: 'DDR5 32GB/Bulk 20 kits',
  },
  {
    user: { name: 'Sardor T.', avatar: 'https://picsum.photos/seed/avatar-sardor/80/80' },
    rating: 5,
    content: 'Best supplier for GPU bulk orders in Central Asia. We have been ordering from Silicon Valley Electronics for 6 months now. Consistent quality, genuine products with warranty, and the best wholesale pricing. Their response rate is incredible.',
    date: '5 Mar 2026',
    helpfulCount: 61,
    variant: 'RTX 4090/Bulk 5 units',
  },
];

const socialProofAvatars = [
  'https://picsum.photos/seed/sp1/60/60',
  'https://picsum.photos/seed/sp2/60/60',
  'https://picsum.photos/seed/sp3/60/60',
  'https://picsum.photos/seed/sp4/60/60',
  'https://picsum.photos/seed/sp5/60/60',
  'https://picsum.photos/seed/sp6/60/60',
  'https://picsum.photos/seed/sp7/60/60',
];

const socialProofRecentBuyers = [
  { name: 'Aziz M.', avatar: 'https://picsum.photos/seed/buyer1/40/40' },
  { name: 'Nodira K.', avatar: 'https://picsum.photos/seed/buyer2/40/40' },
  { name: 'Bekzod S.', avatar: 'https://picsum.photos/seed/buyer3/40/40' },
];

const footerColumns = [
  {
    title: 'Buyer Help',
    links: [
      { label: 'How to Buy' },
      { label: 'Bulk Order Guide' },
      { label: 'Payment Methods' },
      { label: 'Shipping & Delivery' },
      { label: 'Returns & Refunds' },
      { label: 'Buyer Protection' },
    ],
  },
  {
    title: 'Seller Center',
    links: [
      { label: 'Become a Seller' },
      { label: 'Seller Dashboard' },
      { label: 'Listing Guidelines' },
      { label: 'Seller Protection' },
      { label: 'Analytics Tools' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'About GeekShop B2B' },
      { label: 'Contact Us' },
      { label: 'Press & Media' },
      { label: 'Careers' },
      { label: 'Terms of Service' },
      { label: 'Privacy Policy' },
    ],
  },
];

// ─── Inline SVG icons for FloatingToolbar ────────────────────────────────────

const CartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
  </svg>
);

const OrdersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const MessagesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);

const CompareIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const ArrowUpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

// ─── Component ───────────────────────────────────────────────────────────────

export const DesktopHomePageB: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSortId, setActiveSortId] = useState('best-match');

  const handleFilterClick = (value: string) => {
    setActiveFilter(value);
  };

  const filterItems = filterBarItems.map((item) => ({
    ...item,
    active: item.value === activeFilter,
  }));

  return (
    <>
      <DesktopShell
        topBar={
          <TopBar
            leftItems={[
              <span key="title" style={{ fontWeight: 600 }}>GeekShop B2B — Wholesale Electronics</span>,
            ]}
            rightItems={[
              <DesktopLanguageSwitcher key="lang" defaultValue="en" />,
              <DesktopCurrencySwitcher key="curr" defaultValue="UZS" />,
            ]}
          />
        }
        header={
          <DesktopHeader
            logo={
              <span style={{ fontWeight: 700, fontSize: 22, color: '#FF5000', letterSpacing: '-0.5px' }}>
                GeekShop <span style={{ fontWeight: 400, fontSize: 14, color: '#666', marginLeft: 4 }}>B2B</span>
              </span>
            }
            searchPlaceholder="Search wholesale products..."
            cartCount={5}
          />
        }
        sidebar={
          <DesktopSidebar
            categories={sidebarCategories}
            brands={sidebarBrands}
            priceRange={{ min: 0, max: 50000000 }}
            onCategorySelect={() => {}}
            onBrandToggle={() => {}}
            onPriceChange={() => {}}
            onRatingChange={() => {}}
          />
        }
        footer={
          <Footer
            columns={footerColumns}
            copyrightText={'\u00A9 2026 GeekShop B2B. All rights reserved.'}
            showNewsletter
            bottomLinks={[
              { label: 'Terms of Service' },
              { label: 'Privacy Policy' },
              { label: 'Cookie Policy' },
            ]}
          />
        }
      >
        {/* 1. Banner Carousel */}
        <section className={styles.section}>
          <DesktopBannerCarousel
            slides={bannerSlides}
            height={320}
            interval={6000}
          />
        </section>

        {/* 2. Popular Searches */}
        <section className={styles.section}>
          <DesktopPopularSearches
            items={popularSearchItems}
            title="Trending Wholesale Searches"
          />
        </section>

        {/* 3. How It Works — Steps */}
        <section className={styles.section}>
          <DesktopSectionHeader title="How Wholesale Works" />
          <div className={styles.stepsContainer}>
            <DesktopSteps
              items={howItWorksSteps}
              current={4}
              direction="horizontal"
            />
          </div>
        </section>

        {/* 4. Top Suppliers */}
        <section className={styles.section}>
          <DesktopSectionHeader
            title="Verified Suppliers"
            count={156}
            onViewAll={() => {}}
          />
          <div className={styles.suppliersGrid}>
            {suppliers.map((supplier) => (
              <DesktopShopCard
                key={supplier.name}
                name={supplier.name}
                logo={supplier.logo}
                rating={supplier.rating}
                productsCount={supplier.productsCount}
                followersCount={supplier.followersCount}
                responseRate={supplier.responseRate}
                onFollow={() => {}}
                onEnter={() => {}}
                onChat={() => {}}
              />
            ))}
          </div>
        </section>

        {/* 5. Flash Deals */}
        <section className={styles.section}>
          <DesktopSectionHeader title="Today's Wholesale Deals" />
          <FlashDealStrip
            items={flashDealItems}
            endTime={flashDealEndTime}
            title="FLASH DEALS"
            onViewAll={() => {}}
          />
        </section>

        {/* 6. Filter Bar + Product Grid */}
        <section className={styles.section}>
          <DesktopFilterBar
            items={filterItems}
            onItemClick={handleFilterClick}
          />
          <div className={styles.productGridArea}>
            <DesktopProductGrid
              products={products}
              totalCount={5843}
              columns={5}
              sortOptions={sortOptions}
              activeSortId={activeSortId}
              onSortChange={setActiveSortId}
            />
          </div>
        </section>

        {/* 7. Category Showcase */}
        <section className={styles.section}>
          <DesktopSectionHeader title="Shop by Category" onViewAll={() => {}} />
          <CategoryShowcase
            categories={showcaseCategories}
            columns={4}
          />
        </section>

        {/* 8. Trust Section — Reviews */}
        <section className={styles.section}>
          <DesktopSectionHeader
            title="Buyer Reviews"
            count={12450}
            onViewAll={() => {}}
          />
          <div className={styles.reviewsGrid}>
            {reviews.map((review) => (
              <DesktopReviewCard
                key={review.user.name}
                user={review.user}
                rating={review.rating}
                content={review.content}
                date={review.date}
                helpfulCount={review.helpfulCount}
                variant={review.variant}
                onHelpful={() => {}}
                onNotHelpful={() => {}}
              />
            ))}
          </div>
        </section>

        {/* 9. Social Proof */}
        <section className={styles.section}>
          <DesktopSocialProof
            count={48523}
            period="this month"
            avatars={socialProofAvatars}
            recentBuyers={socialProofRecentBuyers}
          />
        </section>

        {/* 10. Promo Banner */}
        <section className={styles.section}>
          <DesktopPromoBanner
            title="Become a Verified Seller"
            description="Join 500+ sellers on GeekShop B2B. Reach thousands of wholesale buyers across Uzbekistan and Central Asia."
            ctaText="Register Now"
            tag="FOR SELLERS"
            image="https://picsum.photos/seed/promo-seller/600/400"
            imageAlign="left"
            background="linear-gradient(135deg, #1A1A1A 0%, #333333 100%)"
          />
        </section>
      </DesktopShell>

      {/* 11. Floating Toolbar */}
      <FloatingToolbar
        items={[
          { icon: <CartIcon />, label: 'Cart', badge: 5 },
          { icon: <OrdersIcon />, label: 'Orders' },
          { icon: <MessagesIcon />, label: 'Messages' },
          { icon: <CompareIcon />, label: 'Compare' },
          {
            icon: <ArrowUpIcon />,
            label: 'Back to Top',
            showOnScroll: true,
            onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
          },
        ]}
      />
    </>
  );
};
