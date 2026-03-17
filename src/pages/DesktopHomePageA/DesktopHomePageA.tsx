import { useState } from 'react';
import {
  DesktopShell,
  TopBar,
  DesktopHeader,
  Footer,
  DesktopNoticeBar,
  MegaMenu,
  DesktopBannerCarousel,
  DesktopCountdownTimer,
  DesktopCouponCard,
  DesktopCategoryIcon,
  FlashDealStrip,
  CategoryShowcase,
  DesktopSectionHeader,
  DesktopGroupBuyCard,
  DesktopShopCard,
  DesktopPromoBanner,
  DesktopProductGrid,
  DesktopSegmented,
  DesktopSocialProof,
  FloatingToolbar,
  DesktopCurrencySwitcher,
  DesktopLanguageSwitcher,
  DesktopThemeSwitcher,
} from '../../components';
import type {
  MegaMenuCategory,
  FlashDealItem,
  ShowcaseCategory,
  DesktopProductGridItem,
} from '../../components';
import styles from './DesktopHomePageA.module.scss';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function hoursFromNow(h: number): Date {
  const d = new Date();
  d.setHours(d.getHours() + h);
  return d;
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const footerColumns = [
  {
    title: 'Customer Service',
    links: [
      { label: 'Help Center' },
      { label: 'Returns & Refunds' },
      { label: 'Shipping Info' },
      { label: 'Order Tracking' },
    ],
  },
  {
    title: 'About GeekShop',
    links: [
      { label: 'About Us' },
      { label: 'Careers' },
      { label: 'Press' },
      { label: 'Blog' },
    ],
  },
  {
    title: 'Policies',
    links: [
      { label: 'Privacy Policy' },
      { label: 'Terms of Service' },
      { label: 'Cookie Policy' },
    ],
  },
  {
    title: 'Partner With Us',
    links: [
      { label: 'Sell on GeekShop' },
      { label: 'Affiliate Program' },
      { label: 'Advertise' },
    ],
  },
];

const megaMenuCategories: MegaMenuCategory[] = [
  {
    label: 'Graphics Cards',
    subcategories: [
      { label: 'NVIDIA GeForce RTX 40 Series' },
      { label: 'NVIDIA GeForce RTX 30 Series' },
      { label: 'AMD Radeon RX 7000 Series' },
      { label: 'AMD Radeon RX 6000 Series' },
      { label: 'Workstation GPUs' },
    ],
  },
  {
    label: 'Processors (CPU)',
    subcategories: [
      { label: 'Intel Core i9' },
      { label: 'Intel Core i7' },
      { label: 'AMD Ryzen 9' },
      { label: 'AMD Ryzen 7' },
      { label: 'Server CPUs' },
    ],
  },
  {
    label: 'Monitors',
    subcategories: [
      { label: '27" Gaming Monitors' },
      { label: '32" 4K Monitors' },
      { label: 'Ultrawide Monitors' },
      { label: 'Curved Monitors' },
    ],
  },
  {
    label: 'Laptops',
    subcategories: [
      { label: 'Gaming Laptops' },
      { label: 'Ultrabooks' },
      { label: 'Business Laptops' },
      { label: 'MacBooks' },
      { label: 'Budget Laptops' },
    ],
  },
  {
    label: 'RAM & Memory',
    subcategories: [
      { label: 'DDR5 Desktop' },
      { label: 'DDR4 Desktop' },
      { label: 'DDR5 Laptop' },
      { label: 'DDR4 Laptop' },
    ],
  },
  {
    label: 'SSD & Storage',
    subcategories: [
      { label: 'NVMe M.2 SSD' },
      { label: 'SATA SSD' },
      { label: 'External SSD' },
      { label: 'HDD Internal' },
      { label: 'NAS Storage' },
    ],
  },
  {
    label: 'Peripherals',
    subcategories: [
      { label: 'Mechanical Keyboards' },
      { label: 'Gaming Mice' },
      { label: 'Headsets' },
      { label: 'Webcams' },
    ],
  },
  {
    label: 'Networking',
    subcategories: [
      { label: 'Wi-Fi Routers' },
      { label: 'Mesh Systems' },
      { label: 'Network Switches' },
      { label: 'Wi-Fi Adapters' },
    ],
  },
];

const megaMenuNavItems = [
  { label: "Today's Deals" },
  { label: 'Best Sellers' },
  { label: 'New Arrivals' },
  { label: 'Group Buy' },
];

const bannerSlides = [
  {
    title: 'Tech Deals Up To 50% Off',
    subtitle: 'Grab GPUs, CPUs, and peripherals at unbeatable prices',
    ctaText: 'Shop Now',
    bgGradient: 'linear-gradient(135deg, #FF5000 0%, #FF7A33 100%)',
  },
  {
    title: 'New GPU Series Launch',
    subtitle: 'Experience next-gen performance with RTX 50 Series',
    ctaText: 'Explore',
    bgGradient: 'linear-gradient(135deg, #1890FF 0%, #096DD9 100%)',
  },
  {
    title: 'Member Exclusive: Extra 15% Off',
    subtitle: 'Sign up today and unlock exclusive member discounts',
    ctaText: 'Join Now',
    bgGradient: 'linear-gradient(135deg, #07C160 0%, #05A050 100%)',
  },
];

// ─── Category Icons ───────────────────────────────────────────────────────────

const GpuIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <circle cx="8" cy="12" r="2" />
    <circle cx="16" cy="12" r="2" />
    <line x1="5" y1="3" x2="5" y2="6" />
    <line x1="9" y1="3" x2="9" y2="6" />
    <line x1="15" y1="3" x2="15" y2="6" />
    <line x1="19" y1="3" x2="19" y2="6" />
  </svg>
);

const CpuIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" />
    <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
  </svg>
);

const MonitorIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const LaptopIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <line x1="2" y1="20" x2="22" y2="20" />
  </svg>
);

const RamIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="1" />
    <line x1="6" y1="10" x2="6" y2="14" />
    <line x1="10" y1="10" x2="10" y2="14" />
    <line x1="14" y1="10" x2="14" y2="14" />
    <line x1="18" y1="10" x2="18" y2="14" />
  </svg>
);

const SsdIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <path d="M7 12h4" /><path d="M13 12h4" />
  </svg>
);

const KeyboardIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <line x1="6" y1="10" x2="6" y2="10.01" />
    <line x1="10" y1="10" x2="10" y2="10.01" />
    <line x1="14" y1="10" x2="14" y2="10.01" />
    <line x1="18" y1="10" x2="18" y2="10.01" />
    <line x1="8" y1="14" x2="16" y2="14" />
  </svg>
);

const MouseIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="2" width="12" height="20" rx="6" />
    <line x1="12" y1="6" x2="12" y2="10" />
  </svg>
);

const HeadsetIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0118 0v6" />
    <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
  </svg>
);

const CameraIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const categoryIcons = [
  { icon: <GpuIcon />, label: 'GPU', color: '#FF5000' },
  { icon: <CpuIcon />, label: 'CPU', color: '#1890FF' },
  { icon: <MonitorIcon />, label: 'Monitor', color: '#722ED1' },
  { icon: <LaptopIcon />, label: 'Laptop', color: '#13C2C2' },
  { icon: <RamIcon />, label: 'RAM', color: '#FA8C16' },
  { icon: <SsdIcon />, label: 'SSD', color: '#52C41A' },
  { icon: <KeyboardIcon />, label: 'Keyboard', color: '#EB2F96' },
  { icon: <MouseIcon />, label: 'Mouse', color: '#F5222D' },
  { icon: <HeadsetIcon />, label: 'Headset', color: '#2F54EB' },
  { icon: <CameraIcon />, label: 'Camera', color: '#FAAD14' },
];

// ─── Flash Deals Data ─────────────────────────────────────────────────────────

const flashDealEndTime = hoursFromNow(3);

const flashDealItems: FlashDealItem[] = [
  { id: 'fd1', image: 'https://picsum.photos/seed/rtx4060/200/200', title: 'NVIDIA RTX 4060 Ti 8GB', price: 4_200_000, originalPrice: 6_500_000, discount: '-35%', soldPercent: 72 },
  { id: 'fd2', image: 'https://picsum.photos/seed/ryzen7800x3d/200/200', title: 'AMD Ryzen 7 7800X3D', price: 3_800_000, originalPrice: 5_500_000, discount: '-31%', soldPercent: 85 },
  { id: 'fd3', image: 'https://picsum.photos/seed/samsung980pro/200/200', title: 'Samsung 980 PRO 2TB NVMe', price: 1_900_000, originalPrice: 3_200_000, discount: '-41%', soldPercent: 63 },
  { id: 'fd4', image: 'https://picsum.photos/seed/lgmonitor27/200/200', title: 'LG 27GP850 27" 165Hz IPS', price: 3_500_000, originalPrice: 5_800_000, discount: '-40%', soldPercent: 48 },
  { id: 'fd5', image: 'https://picsum.photos/seed/corsairram/200/200', title: 'Corsair Vengeance DDR5 32GB', price: 1_200_000, originalPrice: 2_000_000, discount: '-40%', soldPercent: 91 },
  { id: 'fd6', image: 'https://picsum.photos/seed/logimouse/200/200', title: 'Logitech G Pro X Superlight 2', price: 1_100_000, originalPrice: 1_800_000, discount: '-39%', soldPercent: 56 },
  { id: 'fd7', image: 'https://picsum.photos/seed/hyperxcloud/200/200', title: 'HyperX Cloud III Wireless', price: 890_000, originalPrice: 1_500_000, discount: '-41%', soldPercent: 78 },
  { id: 'fd8', image: 'https://picsum.photos/seed/keychron/200/200', title: 'Keychron Q1 Max Mechanical', price: 1_500_000, originalPrice: 2_200_000, discount: '-32%', soldPercent: 34 },
];

// ─── Category Showcase Data ───────────────────────────────────────────────────

const showcaseCategories: ShowcaseCategory[] = [
  { label: 'Graphics Cards', image: 'https://picsum.photos/seed/cat-gpu/300/200', count: 456 },
  { label: 'Processors', image: 'https://picsum.photos/seed/cat-cpu/300/200', count: 312 },
  { label: 'Gaming Monitors', image: 'https://picsum.photos/seed/cat-monitor/300/200', count: 189 },
  { label: 'Gaming Laptops', image: 'https://picsum.photos/seed/cat-laptop/300/200', count: 234 },
  { label: 'Memory & RAM', image: 'https://picsum.photos/seed/cat-ram/300/200', count: 178 },
  { label: 'SSD Storage', image: 'https://picsum.photos/seed/cat-ssd/300/200', count: 267 },
  { label: 'Keyboards', image: 'https://picsum.photos/seed/cat-keyboard/300/200', count: 145 },
  { label: 'Networking', image: 'https://picsum.photos/seed/cat-network/300/200', count: 98 },
];

// ─── Group Buy Data ───────────────────────────────────────────────────────────

const groupBuyProducts = [
  {
    product: { name: 'NVIDIA GeForce RTX 4070 Super', image: 'https://picsum.photos/seed/gb-rtx4070/200/200', price: 6_200_000, originalPrice: 8_500_000 },
    groupSize: 5, currentMembers: 3, timeLeft: 7200,
    memberAvatars: ['https://picsum.photos/seed/avatar1/40/40', 'https://picsum.photos/seed/avatar2/40/40', 'https://picsum.photos/seed/avatar3/40/40'],
  },
  {
    product: { name: 'Keychron K8 Pro Mechanical Keyboard', image: 'https://picsum.photos/seed/gb-keychron/200/200', price: 850_000, originalPrice: 1_200_000 },
    groupSize: 10, currentMembers: 7, timeLeft: 3600,
    memberAvatars: ['https://picsum.photos/seed/avatar4/40/40', 'https://picsum.photos/seed/avatar5/40/40', 'https://picsum.photos/seed/avatar6/40/40'],
  },
  {
    product: { name: 'Samsung Odyssey G7 27" 240Hz', image: 'https://picsum.photos/seed/gb-samsung/200/200', price: 4_800_000, originalPrice: 6_500_000 },
    groupSize: 5, currentMembers: 2, timeLeft: 5400,
    memberAvatars: ['https://picsum.photos/seed/avatar7/40/40', 'https://picsum.photos/seed/avatar8/40/40'],
  },
];

// ─── Shop Data ────────────────────────────────────────────────────────────────

const shopData = [
  { name: 'TechZone Tashkent', logo: 'https://picsum.photos/seed/shop-techzone/80/80', rating: 4.9, followersCount: 15_000, productsCount: 320, responseRate: 98 },
  { name: 'CompMaster', logo: 'https://picsum.photos/seed/shop-compmaster/80/80', rating: 4.7, followersCount: 8_500, productsCount: 185, responseRate: 95 },
  { name: 'DigitalWave', logo: 'https://picsum.photos/seed/shop-digitalwave/80/80', rating: 4.5, followersCount: 3_200, productsCount: 78, responseRate: 90 },
  { name: 'GamersHub', logo: 'https://picsum.photos/seed/shop-gamershub/80/80', rating: 4.2, followersCount: 1_200, productsCount: 45, responseRate: 87 },
];

// ─── Product Grid Data ────────────────────────────────────────────────────────

const recommendedProducts: DesktopProductGridItem[] = [
  { id: 'rp1', images: ['https://picsum.photos/seed/prod-rtx4080/400/400'], title: 'NVIDIA GeForce RTX 4080 Super 16GB GDDR6X', shopName: 'TechZone Tashkent', price: 12_500_000, originalPrice: 15_000_000, discount: '-17%', rating: 4.8, soldCount: '342', freeShipping: true },
  { id: 'rp2', images: ['https://picsum.photos/seed/prod-i714700k/400/400'], title: 'Intel Core i7-14700K 20-Core Processor', shopName: 'CompMaster', price: 4_800_000, rating: 4.9, soldCount: '567', freeShipping: true },
  { id: 'rp3', images: ['https://picsum.photos/seed/prod-asus-mon/400/400'], title: 'ASUS ROG Swift PG27AQN 27" 360Hz', shopName: 'DigitalWave', price: 8_900_000, originalPrice: 11_200_000, discount: '-21%', rating: 4.7, soldCount: '89' },
  { id: 'rp4', images: ['https://picsum.photos/seed/prod-corsair-psu/400/400'], title: 'Corsair RM1000x 1000W 80+ Gold PSU', shopName: 'TechZone Tashkent', price: 2_100_000, rating: 4.6, soldCount: '234', freeShipping: true },
  { id: 'rp5', images: ['https://picsum.photos/seed/prod-samsung-nvme/400/400'], title: 'Samsung 990 PRO 4TB NVMe M.2 SSD', shopName: 'CompMaster', price: 5_200_000, originalPrice: 6_800_000, discount: '-24%', rating: 4.8, soldCount: '178' },
  { id: 'rp6', images: ['https://picsum.photos/seed/prod-razer-laptop/400/400'], title: 'Razer Blade 16 RTX 4090 Gaming Laptop', shopName: 'GamersHub', price: 35_000_000, originalPrice: 42_000_000, discount: '-17%', rating: 4.5, soldCount: '23', freeShipping: true },
  { id: 'rp7', images: ['https://picsum.photos/seed/prod-gskill-ram/400/400'], title: 'G.Skill Trident Z5 DDR5 64GB 6000MHz', shopName: 'TechZone Tashkent', price: 3_400_000, rating: 4.7, soldCount: '145', installmentPrice: '283 000' },
  { id: 'rp8', images: ['https://picsum.photos/seed/prod-noctua/400/400'], title: 'Noctua NH-D15 Chromax CPU Cooler', shopName: 'CompMaster', price: 1_200_000, rating: 4.9, soldCount: '456', freeShipping: true },
  { id: 'rp9', images: ['https://picsum.photos/seed/prod-logitech-kb/400/400'], title: 'Logitech MX Keys S Wireless Keyboard', shopName: 'DigitalWave', price: 1_350_000, originalPrice: 1_600_000, discount: '-16%', rating: 4.6, soldCount: '312' },
  { id: 'rp10', images: ['https://picsum.photos/seed/prod-elgato/400/400'], title: 'Elgato Stream Deck MK.2 15-Key', shopName: 'GamersHub', price: 2_800_000, rating: 4.4, soldCount: '67', installmentPrice: '233 000' },
];

// ─── Social Proof Data ────────────────────────────────────────────────────────

const socialProofAvatars = [
  'https://picsum.photos/seed/buyer1/40/40',
  'https://picsum.photos/seed/buyer2/40/40',
  'https://picsum.photos/seed/buyer3/40/40',
  'https://picsum.photos/seed/buyer4/40/40',
  'https://picsum.photos/seed/buyer5/40/40',
];

const recentBuyers = [
  { name: 'Aziz K.' },
  { name: 'Dilshod M.' },
  { name: 'Nodira S.' },
];

// ─── Floating Toolbar Icons ───────────────────────────────────────────────────

const CartToolbarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
  </svg>
);

const WishlistToolbarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

const CompareToolbarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="17 1 21 5 17 9" />
    <path d="M3 11V9a4 4 0 014-4h14" />
    <polyline points="7 23 3 19 7 15" />
    <path d="M21 13v2a4 4 0 01-4 4H3" />
  </svg>
);

const HistoryToolbarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ArrowUpToolbarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────

export const DesktopHomePageA: React.FC = () => {
  const [segmentedTab, setSegmentedTab] = useState('for-you');

  // ─── Shell Parts ──────────────────────────────────────────────────────
  const topBar = (
    <TopBar
      leftItems={[
        <span key="w">Welcome to GeekShop!</span>,
        <span key="s">Seller Center</span>,
        <span key="h">Help</span>,
      ]}
      rightItems={[
        <DesktopCurrencySwitcher key="cur" />,
        <DesktopLanguageSwitcher key="lang" />,
        <DesktopThemeSwitcher key="theme" variant="toggle" />,
      ]}
    />
  );

  const header = (
    <DesktopHeader
      logo={<span style={{ fontWeight: 700, fontSize: 20, color: '#FF5000' }}>GeekShop</span>}
      searchPlaceholder="Search products..."
      cartCount={3}
      wishlistCount={7}
    />
  );

  const footer = (
    <Footer
      columns={footerColumns}
      copyrightText={'\u00A9 2026 GeekShop. All rights reserved.'}
    />
  );

  // ─── Side panels for banner ───────────────────────────────────────────
  const sidePanel1 = (
    <div className={styles.sidePanelCard}>
      <DesktopCountdownTimer
        endTime={hoursFromNow(3)}
        label="Flash Sale Ends In"
        showDays={false}
      />
      <div className={styles.todaysPick}>
        <img
          src="https://picsum.photos/seed/todays-pick/160/120"
          alt="Today's Pick"
          className={styles.todaysPickImage}
        />
        <span className={styles.todaysPickTitle}>RTX 4060 Ti 8GB</span>
        <span className={styles.todaysPickPrice}>4 200 000 sum</span>
      </div>
    </div>
  );

  const sidePanel2 = (
    <div className={styles.sidePanelCard}>
      <DesktopCouponCard
        discount="15%"
        code="NEW2026"
        color="orange"
        minAmount="New members only"
      />
    </div>
  );

  return (
    <DesktopShell topBar={topBar} header={header} footer={footer}>
      {/* 1. Notice Bar */}
      <DesktopNoticeBar
        variant="warning"
        content="Grand Opening Sale: Free shipping on all orders over 500,000 UZS! Use code NEWSHOP"
        dismissible
      />

      {/* 2. Mega Menu */}
      <MegaMenu
        categories={megaMenuCategories}
        navItems={megaMenuNavItems}
      />

      {/* 3. Hero Banner + Side Panels */}
      <section className={styles.section}>
        <DesktopBannerCarousel
          slides={bannerSlides}
          sidePanel={sidePanel1}
          sidePanel2={sidePanel2}
          height={380}
        />
      </section>

      {/* 4. Category Icons Row */}
      <section className={styles.section}>
        <div className={styles.categoryIconRow}>
          {categoryIcons.map((cat) => (
            <DesktopCategoryIcon
              key={cat.label}
              icon={cat.icon}
              label={cat.label}
              color={cat.color}
            />
          ))}
        </div>
      </section>

      {/* 5. Flash Deals Strip */}
      <section className={styles.section}>
        <FlashDealStrip
          items={flashDealItems}
          endTime={flashDealEndTime}
          onViewAll={() => {}}
        />
      </section>

      {/* 6. Category Showcase */}
      <section className={styles.section}>
        <CategoryShowcase
          categories={showcaseCategories}
          columns={4}
          title="Shop by Category"
        />
      </section>

      {/* 7. Group Buy Section */}
      <section className={styles.section}>
        <DesktopSectionHeader
          title="Group Buy Deals"
          subtitle="Save more when you buy together"
          onViewAll={() => {}}
        />
        <div className={styles.groupBuyGrid}>
          {groupBuyProducts.map((gb, idx) => (
            <DesktopGroupBuyCard
              key={idx}
              product={gb.product}
              groupSize={gb.groupSize}
              currentMembers={gb.currentMembers}
              memberAvatars={gb.memberAvatars}
              timeLeft={gb.timeLeft}
              onJoinGroup={() => {}}
              onBuyAlone={() => {}}
            />
          ))}
        </div>
      </section>

      {/* 8. Coupon Bar */}
      <section className={styles.section}>
        <DesktopSectionHeader title="Grab Your Coupons" />
        <div className={styles.couponGrid}>
          <DesktopCouponCard
            discount="10%"
            code="GEEK10"
            color="orange"
            minAmount="Orders over 200,000 UZS"
          />
          <DesktopCouponCard
            discount="50,000"
            code="SAVE50K"
            color="red"
            minAmount="Orders over 500,000 UZS"
          />
          <DesktopCouponCard
            discount="15%"
            code="GPU15"
            color="blue"
            categories={['Graphics Cards']}
            minAmount="GPU orders only"
          />
          <DesktopCouponCard
            discount="Free Ship"
            code="FREESHIP"
            color="green"
            minAmount="Orders over 300,000 UZS"
          />
        </div>
      </section>

      {/* 9. Hot Shops */}
      <section className={styles.section}>
        <DesktopSectionHeader
          title="Hot Shops"
          onViewAll={() => {}}
        />
        <div className={styles.shopGrid}>
          {shopData.map((shop) => (
            <DesktopShopCard
              key={shop.name}
              name={shop.name}
              logo={shop.logo}
              rating={shop.rating}
              followersCount={shop.followersCount}
              productsCount={shop.productsCount}
              responseRate={shop.responseRate}
              onFollow={() => {}}
              onEnter={() => {}}
              onChat={() => {}}
            />
          ))}
        </div>
      </section>

      {/* 10. Mid-Page Promo */}
      <section className={styles.section}>
        <DesktopPromoBanner
          title="Upgrade Your Setup"
          description="Premium peripherals, monitors, and more. Elevate your workspace with the latest tech."
          image="https://picsum.photos/seed/promo-setup/600/300"
          imageAlign="right"
          ctaText="Shop Now"
          tag="LIMITED"
          background="linear-gradient(135deg, #1890FF 0%, #096DD9 100%)"
        />
      </section>

      {/* 11. Recommended Products */}
      <section className={styles.section}>
        <DesktopSectionHeader
          title="Recommended For You"
          count={200}
          onViewAll={() => {}}
        />
        <div className={styles.segmentedWrapper}>
          <DesktopSegmented
            options={[
              { label: 'For You', value: 'for-you' },
              { label: 'Hot', value: 'hot' },
              { label: 'New', value: 'new' },
              { label: 'Sale', value: 'sale' },
            ]}
            value={segmentedTab}
            onChange={setSegmentedTab}
          />
        </div>
        <DesktopProductGrid
          products={recommendedProducts}
          columns={5}
          totalCount={200}
        />

        {/* 12. Social Proof */}
        <div className={styles.socialProofWrapper}>
          <DesktopSocialProof
            count={2847}
            period="today"
            avatars={socialProofAvatars}
            recentBuyers={recentBuyers}
          />
        </div>
      </section>

      {/* 13. Floating Toolbar */}
      <FloatingToolbar
        items={[
          { icon: <CartToolbarIcon />, label: 'Cart', badge: 3 },
          { icon: <WishlistToolbarIcon />, label: 'Wishlist', badge: 7 },
          { icon: <CompareToolbarIcon />, label: 'Compare' },
          { icon: <HistoryToolbarIcon />, label: 'Recently Viewed' },
          { icon: <ArrowUpToolbarIcon />, label: 'Back to Top', showOnScroll: true, onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
        ]}
      />
    </DesktopShell>
  );
};
