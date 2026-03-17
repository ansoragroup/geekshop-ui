import { useState } from 'react';
import {
  DesktopShell,
  TopBar,
  DesktopHeader,
  MegaMenu,
  Footer,
  DesktopHeroBanner,
  DesktopAuthenticityBadge,
  DesktopSectionHeader,
  DesktopTabs,
  DesktopProductCard,
  DesktopCountdownTimer,
  DesktopDealCard,
  DesktopCategoryIcon,
  DesktopSocialProof,
  DesktopRating,
  DesktopReviewCard,
  DesktopPromoBanner,
  DesktopSegmented,
  DesktopProductGrid,
  DesktopGroupBuyCard,
  DesktopCouponCard,
  FloatingToolbar,
  DesktopLanguageSwitcher,
  DesktopThemeSwitcher,
} from '../../components';
import type {
  MegaMenuCategory,
  DesktopProductGridItem,
} from '../../components';
import styles from './DesktopHomePageC.module.scss';

// ─── Category icon SVGs (mono-color, clean) ──────────────────────────────────

const GpuIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="6" width="16" height="12" rx="2" />
    <path d="M8 6V4M12 6V4M16 6V4M8 18v2M12 18v2M16 18v2" />
  </svg>
);

const CpuIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
  </svg>
);

const AudioIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0118 0v6" />
    <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
  </svg>
);

const DisplayIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
);

const LaptopIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v8H4V6z" />
    <path d="M2 17h20a1 1 0 01-1 1H3a1 1 0 01-1-1z" />
  </svg>
);

const StorageIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M7 9h4M7 12h6" />
  </svg>
);

const GamingIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <path d="M6 10h4M8 8v4M15 11h.01M18 9h.01" />
  </svg>
);

const AccessoriesIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <path d="M6 10h0M10 10h0M14 10h0M18 10h0M8 14h8" />
  </svg>
);

// ─── Floating toolbar icons ──────────────────────────────────────────────────

const CartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
  </svg>
);

const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

const CompareIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="17 1 21 5 17 9" />
    <path d="M3 11V9a4 4 0 014-4h14" />
    <polyline points="7 23 3 19 7 15" />
    <path d="M21 13v2a4 4 0 01-4 4H3" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const ArrowUpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
);

// ─── Fire icon for trending section ──────────────────────────────────────────

const FireIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#FF3B30' }}>
    <path d="M12 23c-4.97 0-9-3.58-9-8 0-3.19 2.13-6.02 4-8 .53-.56 1.39-.14 1.3.63-.1.84.51 1.37 1.2 1.37.83 0 1.5-.67 1.5-1.5 0-2.49 1.2-4.85 3.32-6.33.52-.36 1.18.11 1.05.73C14.9 4.02 16.22 5 17.5 5c.42 0 .84-.09 1.22-.26.47-.21 1.01.13.95.64C19.24 9.17 21 11.42 21 15c0 4.42-4.03 8-9 8z" />
  </svg>
);

// ─── Static data ──────────────────────────────────────────────────────────────

const megaMenuCategories: MegaMenuCategory[] = [
  { label: 'GPUs', subcategories: [{ label: 'NVIDIA RTX 50' }, { label: 'NVIDIA RTX 40' }, { label: 'AMD Radeon RX 7000' }, { label: 'Workstation GPUs' }] },
  { label: 'Processors', subcategories: [{ label: 'AMD Ryzen 9000' }, { label: 'Intel Core Ultra' }, { label: 'AMD Ryzen 7000' }, { label: 'Intel 14th Gen' }] },
  { label: 'Gaming', subcategories: [{ label: 'Gaming Chairs' }, { label: 'Controllers' }, { label: 'VR Headsets' }, { label: 'Streaming Gear' }] },
  { label: 'Monitors', subcategories: [{ label: '4K 144Hz' }, { label: 'OLED Gaming' }, { label: 'Ultrawide 34"' }, { label: 'Professional' }] },
  { label: 'Audio', subcategories: [{ label: 'Headphones' }, { label: 'Earbuds' }, { label: 'Speakers' }, { label: 'DACs & Amps' }] },
  { label: 'Laptops', subcategories: [{ label: 'Gaming' }, { label: 'Ultrabook' }, { label: 'Creator' }, { label: 'Business' }] },
  { label: 'Storage', subcategories: [{ label: 'Gen5 NVMe' }, { label: 'Gen4 NVMe' }, { label: 'SATA SSD' }, { label: 'External' }] },
  { label: 'Accessories', subcategories: [{ label: 'Keyboards' }, { label: 'Mice' }, { label: 'Mouse Pads' }, { label: 'Webcams' }] },
];

const megaMenuNavItems = [
  { label: 'Verified' },
  { label: 'New Drops' },
  { label: 'Trending' },
  { label: 'Deals' },
];

const footerColumns = [
  { title: 'Customer Service', links: [{ label: 'Help Center' }, { label: 'Returns & Refunds' }, { label: 'Shipping Info' }, { label: 'Order Tracking' }, { label: 'Contact Us' }] },
  { title: 'About GeekShop', links: [{ label: 'About Us' }, { label: 'Authenticity Guarantee' }, { label: 'Careers' }, { label: 'Press Room' }, { label: 'Blog' }] },
  { title: 'Policies', links: [{ label: 'Privacy Policy' }, { label: 'Terms of Service' }, { label: 'Cookie Policy' }, { label: 'IP Protection' }] },
  { title: 'Community', links: [{ label: 'Affiliate Program' }, { label: 'Tech Reviews' }, { label: 'Forum' }, { label: 'GeekShop Premium' }] },
];

const footerSocialLinks = [
  {
    label: 'Telegram',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.329-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141a.506.506 0 01.171.325c.016.093.036.306.02.472z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

// ─── Trending Products Data (Hot tab) ─────────────────────────────────────────

const trendingHotProducts = [
  {
    images: ['https://picsum.photos/seed/rtx4090premium/400/400'],
    title: 'NVIDIA GeForce RTX 4090 24GB GDDR6X Founders Edition',
    shopName: 'GeekShop Official',
    price: 24500000,
    originalPrice: 28000000,
    discount: '-12%',
    rating: 4.9,
    soldCount: '1.2K',
    freeShipping: true,
  },
  {
    images: ['https://picsum.photos/seed/macbookpro16/400/400'],
    title: 'Apple MacBook Pro 16" M3 Max 48GB 1TB Space Black',
    shopName: 'Apple Store UZ',
    price: 52000000,
    rating: 4.8,
    soldCount: '856',
    freeShipping: true,
  },
  {
    images: ['https://picsum.photos/seed/sonywh1000xm5/400/400'],
    title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    shopName: 'Sony Official',
    price: 4200000,
    originalPrice: 5500000,
    discount: '-24%',
    rating: 4.7,
    soldCount: '3.4K',
    freeShipping: true,
  },
  {
    images: ['https://picsum.photos/seed/odysseyg9/400/400'],
    title: 'Samsung Odyssey G9 49" DQHD 240Hz Curved Gaming Monitor',
    shopName: 'Samsung Official',
    price: 18500000,
    originalPrice: 22000000,
    discount: '-16%',
    rating: 4.6,
    soldCount: '312',
  },
  {
    images: ['https://picsum.photos/seed/corsairk100/400/400'],
    title: 'Corsair K100 RGB Optical-Mechanical Gaming Keyboard',
    shopName: 'Corsair Store',
    price: 3200000,
    rating: 4.5,
    soldCount: '1.8K',
    freeShipping: true,
  },
];

// ─── Flash Deals Data ─────────────────────────────────────────────────────────

const flashDealEndTime = new Date(Date.now() + 4 * 60 * 60 * 1000);

const flashDeals = [
  {
    image: 'https://picsum.photos/seed/rtx4080sprem/300/300',
    title: 'NVIDIA RTX 4080 Super 16GB',
    price: 8400000,
    originalPrice: 12000000,
    discount: 30,
    rating: 4.8,
    reviewCount: 234,
    soldPercent: 82,
  },
  {
    image: 'https://picsum.photos/seed/sonywfprem/300/300',
    title: 'Sony WF-1000XM5 Wireless Earbuds',
    price: 2100000,
    originalPrice: 3500000,
    discount: 40,
    rating: 4.7,
    reviewCount: 567,
    soldPercent: 90,
  },
  {
    image: 'https://picsum.photos/seed/lg27gpprem/300/300',
    title: 'LG 27GP950 4K Nano IPS 144Hz',
    price: 6300000,
    originalPrice: 9000000,
    discount: 30,
    rating: 4.6,
    reviewCount: 189,
    soldPercent: 65,
  },
  {
    image: 'https://picsum.photos/seed/corsairdom5/300/300',
    title: 'Corsair Dominator Platinum DDR5 64GB 6000MHz',
    price: 1680000,
    originalPrice: 2800000,
    discount: 40,
    rating: 4.5,
    reviewCount: 98,
    soldPercent: 73,
  },
];

// ─── Recommended Products Data ────────────────────────────────────────────────

const recommendedProducts: DesktopProductGridItem[] = [
  { id: 'rp1', images: ['https://picsum.photos/seed/recprod1/400/400'], title: 'ASUS ROG Strix RTX 4070 Ti Super OC 16GB', shopName: 'ASUS Official', price: 12500000, originalPrice: 14000000, discount: '-11%', rating: 4.8, soldCount: '432', freeShipping: true },
  { id: 'rp2', images: ['https://picsum.photos/seed/recprod2/400/400'], title: 'AMD Ryzen 9 7950X3D 16-Core Processor', shopName: 'AMD Store', price: 7800000, rating: 4.9, soldCount: '287', freeShipping: true },
  { id: 'rp3', images: ['https://picsum.photos/seed/recprod3/400/400'], title: 'Samsung 990 Pro 4TB NVMe Gen4 SSD', shopName: 'Samsung Store', price: 4500000, originalPrice: 5200000, discount: '-13%', rating: 4.7, soldCount: '1.1K' },
  { id: 'rp4', images: ['https://picsum.photos/seed/recprod4/400/400'], title: 'Dell Alienware AW3423DWF 34" QD-OLED 165Hz', shopName: 'Dell Official', price: 14200000, rating: 4.8, soldCount: '156', freeShipping: true },
  { id: 'rp5', images: ['https://picsum.photos/seed/recprod5/400/400'], title: 'Logitech G Pro X 2 Lightspeed Wireless Headset', shopName: 'Logitech UZ', price: 3100000, originalPrice: 3800000, discount: '-18%', rating: 4.6, soldCount: '789' },
  { id: 'rp6', images: ['https://picsum.photos/seed/recprod6/400/400'], title: 'Corsair Vengeance DDR5 64GB 6400MHz Kit', shopName: 'Corsair Store', price: 3800000, rating: 4.5, soldCount: '312', freeShipping: true },
  { id: 'rp7', images: ['https://picsum.photos/seed/recprod7/400/400'], title: 'MSI MEG Z790 GODLIKE Motherboard', shopName: 'MSI Store', price: 9200000, originalPrice: 10500000, discount: '-12%', rating: 4.7, soldCount: '67' },
  { id: 'rp8', images: ['https://picsum.photos/seed/recprod8/400/400'], title: 'NZXT Kraken Elite 360 RGB AIO Cooler', shopName: 'NZXT Official', price: 3400000, rating: 4.6, soldCount: '445', freeShipping: true },
  { id: 'rp9', images: ['https://picsum.photos/seed/recprod9/400/400'], title: 'Razer BlackWidow V4 Pro Mechanical Keyboard', shopName: 'Razer Store', price: 4100000, originalPrice: 4800000, discount: '-15%', rating: 4.5, soldCount: '623' },
  { id: 'rp10', images: ['https://picsum.photos/seed/recprod10/400/400'], title: 'SteelSeries Arctis Nova Pro Wireless Headset', shopName: 'SteelSeries UZ', price: 5200000, rating: 4.7, soldCount: '198', freeShipping: true },
  { id: 'rp11', images: ['https://picsum.photos/seed/recprod11/400/400'], title: 'ASUS ProArt PA32UCG-K 32" 4K HDR Monitor', shopName: 'ASUS Official', price: 28000000, originalPrice: 32000000, discount: '-12%', rating: 4.9, soldCount: '42' },
  { id: 'rp12', images: ['https://picsum.photos/seed/recprod12/400/400'], title: 'Lian Li O11D EVO XL Full Tower Case', shopName: 'Lian Li', price: 3600000, rating: 4.6, soldCount: '876', freeShipping: true },
  { id: 'rp13', images: ['https://picsum.photos/seed/recprod13/400/400'], title: 'Elgato Stream Deck + Streaming Controller', shopName: 'Elgato Official', price: 2800000, originalPrice: 3200000, discount: '-12%', rating: 4.4, soldCount: '534' },
  { id: 'rp14', images: ['https://picsum.photos/seed/recprod14/400/400'], title: 'WD Black SN850X 8TB NVMe SSD', shopName: 'WD Official', price: 8900000, rating: 4.7, soldCount: '123', freeShipping: true },
  { id: 'rp15', images: ['https://picsum.photos/seed/recprod15/400/400'], title: 'Bose QuietComfort Ultra Headphones', shopName: 'Bose Store', price: 5600000, originalPrice: 6400000, discount: '-12%', rating: 4.8, soldCount: '2.1K' },
];

// ─── Shell Slots ──────────────────────────────────────────────────────────────

const PremiumTopBar = () => (
  <TopBar
    leftItems={[
      <span key="auth" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <svg width="14" height="14" viewBox="0 0 20 20" fill="#07C160" aria-hidden="true">
          <path d="M10 1.5L3.5 4.5V9.5C3.5 13.8 6.5 17 10 19C13.5 17 16.5 13.8 16.5 9.5V4.5L10 1.5Z" />
          <path d="M7 10L9 12L13.5 7.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Authenticity Guaranteed — Every Product Verified
      </span>,
    ]}
    rightItems={[
      <DesktopLanguageSwitcher key="lang" />,
      <DesktopThemeSwitcher key="theme" variant="toggle" />,
    ]}
  />
);

const PremiumHeader = () => (
  <DesktopHeader
    logo={<span style={{ fontWeight: 800, fontSize: 22, color: '#FF5000', letterSpacing: '-0.02em' }}>GeekShop</span>}
    searchPlaceholder="Search verified products..."
    cartCount={2}
    wishlistCount={12}
  />
);

const PremiumMegaMenu = () => (
  <MegaMenu
    categories={megaMenuCategories}
    navItems={megaMenuNavItems}
  />
);

const PremiumFooter = () => (
  <Footer
    columns={footerColumns}
    socialLinks={footerSocialLinks}
    showNewsletter
    copyrightText={'\u00A9 2026 GeekShop. All rights reserved. Authenticity guaranteed on every purchase.'}
    bottomLinks={[{ label: 'Privacy Policy' }, { label: 'Terms of Service' }, { label: 'Authenticity Policy' }, { label: 'Sitemap' }]}
  />
);

// ─── Component ────────────────────────────────────────────────────────────────

export const DesktopHomePageC = () => {
  const [dealEndTime] = useState(() => flashDealEndTime);

  return (
    <DesktopShell
      topBar={<PremiumTopBar />}
      header={
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <PremiumHeader />
          <PremiumMegaMenu />
        </div>
      }
      footer={<PremiumFooter />}
    >
      {/* 1. Hero Banner */}
      <section className={styles.heroSection}>
        <DesktopHeroBanner
          title="Authentic Tech, Verified."
          subtitle="Every product authenticated by GeekShop experts"
          badge="NEW SEASON"
          ctaText="Explore Now"
          bgGradient="linear-gradient(135deg, #1A1A1A 0%, #333333 50%, #FF5000 100%)"
        />
      </section>

      {/* 2. Authenticity Trust Strip */}
      <section className={styles.trustStrip}>
        <DesktopAuthenticityBadge
          status="verified"
          label="100% Authentic"
          tooltip="Every product passes 12-point verification"
        />
        <DesktopAuthenticityBadge
          status="official"
          label="Authorized Dealer"
          tooltip="Direct partnerships with brands"
        />
        <DesktopAuthenticityBadge
          status="verified"
          label="Buyer Protection"
          tooltip="Full refund if not authentic"
        />
      </section>

      {/* 3. Trending Now — Tabbed Section */}
      <section className={styles.section}>
        <DesktopSectionHeader
          title="Trending Now"
          icon={<FireIcon />}
          onViewAll={() => {}}
        />
        <div className={styles.trendingTabs}>
          <DesktopTabs
            variant="line"
            defaultActiveKey="hot"
            items={[
              {
                key: 'hot',
                label: 'Hot',
                children: (
                  <div className={styles.trendingGrid}>
                    {trendingHotProducts.map((product, i) => (
                      <DesktopProductCard
                        key={i}
                        images={product.images}
                        title={product.title}
                        shopName={product.shopName}
                        price={product.price}
                        originalPrice={product.originalPrice}
                        discount={product.discount}
                        rating={product.rating}
                        soldCount={product.soldCount}
                        freeShipping={product.freeShipping}
                      />
                    ))}
                  </div>
                ),
              },
              {
                key: 'new',
                label: 'New Drops',
                children: <div className={styles.trendingGrid} />,
              },
              {
                key: 'rising',
                label: 'Rising',
                children: <div className={styles.trendingGrid} />,
              },
              {
                key: 'picks',
                label: 'Staff Picks',
                children: <div className={styles.trendingGrid} />,
              },
            ]}
          />
        </div>
      </section>

      {/* 4. Flash Deals with Countdown */}
      <section className={styles.section}>
        <div className={styles.flashDealsHeader}>
          <DesktopSectionHeader title="Flash Deals" onViewAll={() => {}} />
          <DesktopCountdownTimer endTime={dealEndTime} showDays={false} label="Ends In" />
        </div>
        <div className={styles.dealsGrid}>
          {flashDeals.map((deal, i) => (
            <DesktopDealCard
              key={i}
              image={deal.image}
              title={deal.title}
              price={deal.price}
              originalPrice={deal.originalPrice}
              discount={deal.discount}
              rating={deal.rating}
              reviewCount={deal.reviewCount}
              soldPercent={deal.soldPercent}
              endTime={dealEndTime}
            />
          ))}
        </div>
      </section>

      {/* 5. Category Icons */}
      <section className={styles.section}>
        <div className={styles.categoryRow}>
          <DesktopCategoryIcon icon={<GpuIcon />} label="GPU" color="#666666" />
          <DesktopCategoryIcon icon={<CpuIcon />} label="CPU" color="#666666" />
          <DesktopCategoryIcon icon={<AudioIcon />} label="Audio" color="#666666" />
          <DesktopCategoryIcon icon={<DisplayIcon />} label="Display" color="#666666" />
          <DesktopCategoryIcon icon={<LaptopIcon />} label="Laptop" color="#666666" />
          <DesktopCategoryIcon icon={<StorageIcon />} label="Storage" color="#666666" />
          <DesktopCategoryIcon icon={<GamingIcon />} label="Gaming" color="#666666" />
          <DesktopCategoryIcon icon={<AccessoriesIcon />} label="Accessories" color="#666666" />
        </div>
      </section>

      {/* 6. Social Proof + Ratings Strip */}
      <section className={styles.socialProofStrip}>
        <div className={styles.socialProofLeft}>
          <DesktopSocialProof
            count={15847}
            period="verified purchases this month"
            avatars={[
              'https://picsum.photos/seed/avatar1/40/40',
              'https://picsum.photos/seed/avatar2/40/40',
              'https://picsum.photos/seed/avatar3/40/40',
              'https://picsum.photos/seed/avatar4/40/40',
              'https://picsum.photos/seed/avatar5/40/40',
            ]}
            recentBuyers={[
              { name: 'Dilshod M.', avatar: 'https://picsum.photos/seed/buyer1/32/32' },
              { name: 'Aziza K.', avatar: 'https://picsum.photos/seed/buyer2/32/32' },
              { name: 'Rustam T.', avatar: 'https://picsum.photos/seed/buyer3/32/32' },
            ]}
          />
        </div>
        <div className={styles.socialProofRight}>
          <DesktopRating value={4.8} count={28943} readonly showValue size={28} />
          <p className={styles.ratingLabel}>Average product rating</p>
        </div>
      </section>

      {/* 7. Customer Reviews Showcase */}
      <section className={styles.section}>
        <DesktopSectionHeader title="What Buyers Say" count={28943} onViewAll={() => {}} />
        <div className={styles.reviewsGrid}>
          <DesktopReviewCard
            user={{ name: 'Nodira K.', avatar: 'https://picsum.photos/seed/revuser1/48/48' }}
            rating={5}
            variant="RTX 4090/24GB"
            content="The authentication process gives me complete confidence. Every product comes with a verification certificate and I know I'm getting genuine hardware. The RTX 4090 performs exactly as expected — no compromises."
            images={[
              'https://picsum.photos/seed/revimg1/200/200',
              'https://picsum.photos/seed/revimg2/200/200',
            ]}
            date="12 Mar 2026"
            helpfulCount={48}
          />
          <DesktopReviewCard
            user={{ name: 'Jamshid B.', avatar: 'https://picsum.photos/seed/revuser2/48/48' }}
            rating={5}
            variant="MacBook Pro M3"
            content="Best prices for verified authentic products in Uzbekistan. I compared prices across multiple sellers and GeekShop consistently offers the best value with genuine products. My MacBook Pro M3 is flawless."
            date="8 Mar 2026"
            helpfulCount={35}
          />
          <DesktopReviewCard
            user={{ name: 'Malika R.', avatar: 'https://picsum.photos/seed/revuser3/48/48' }}
            rating={4}
            variant="Sony WH-1000XM5/Silver"
            content="Great selection and fast delivery. The packaging was pristine and the headphones came with all original accessories. Noise cancellation is incredible. Slightly pricier than some sellers but worth it for the authenticity guarantee."
            images={[
              'https://picsum.photos/seed/revimg3/200/200',
              'https://picsum.photos/seed/revimg4/200/200',
              'https://picsum.photos/seed/revimg5/200/200',
            ]}
            date="3 Mar 2026"
            helpfulCount={22}
          />
        </div>
      </section>

      {/* 8. Promo Banner */}
      <section className={styles.section}>
        <DesktopPromoBanner
          title="Join GeekShop Premium"
          description="Get early access to drops, exclusive deals, and free express shipping"
          ctaText="Join Now — Free"
          tag="PREMIUM"
          background="linear-gradient(135deg, #1A1A1A 0%, #FF5000 100%)"
          image="https://picsum.photos/seed/premobanner/400/300"
          imageAlign="right"
        />
      </section>

      {/* 9. Recommended Products */}
      <section className={styles.section}>
        <DesktopSectionHeader title="Recommended For You" />
        <div className={styles.segmentedWrapper}>
          <DesktopSegmented
            options={[
              { label: 'All', value: 'all' },
              { label: 'Gaming', value: 'gaming' },
              { label: 'Workstation', value: 'workstation' },
              { label: 'Audio', value: 'audio' },
              { label: 'Peripherals', value: 'peripherals' },
            ]}
            defaultValue="all"
          />
        </div>
        <DesktopProductGrid
          products={recommendedProducts}
          columns={5}
        />
      </section>

      {/* 10. Group Buy Feature */}
      <section className={styles.section}>
        <DesktopSectionHeader title="Group Buy — Save More Together" onViewAll={() => {}} />
        <div className={styles.groupBuyGrid}>
          <DesktopGroupBuyCard
            product={{
              name: 'NVIDIA GeForce RTX 4090 24GB GDDR6X',
              image: 'https://picsum.photos/seed/gb4090/200/200',
              price: 22000000,
              originalPrice: 24500000,
            }}
            groupSize={10}
            currentMembers={7}
            memberAvatars={[
              'https://picsum.photos/seed/gbavt1/40/40',
              'https://picsum.photos/seed/gbavt2/40/40',
              'https://picsum.photos/seed/gbavt3/40/40',
            ]}
            timeLeft={7200}
          />
          <DesktopGroupBuyCard
            product={{
              name: 'Apple MacBook Pro 16" M3 Max 48GB',
              image: 'https://picsum.photos/seed/gbmacbook/200/200',
              price: 48000000,
              originalPrice: 52000000,
            }}
            groupSize={5}
            currentMembers={3}
            memberAvatars={[
              'https://picsum.photos/seed/gbavt4/40/40',
              'https://picsum.photos/seed/gbavt5/40/40',
            ]}
            timeLeft={10800}
          />
          <DesktopGroupBuyCard
            product={{
              name: 'Samsung Odyssey G9 49" DQHD 240Hz',
              image: 'https://picsum.photos/seed/gbodyssey/200/200',
              price: 16500000,
              originalPrice: 18500000,
            }}
            groupSize={15}
            currentMembers={11}
            memberAvatars={[
              'https://picsum.photos/seed/gbavt6/40/40',
              'https://picsum.photos/seed/gbavt7/40/40',
              'https://picsum.photos/seed/gbavt8/40/40',
              'https://picsum.photos/seed/gbavt9/40/40',
            ]}
            timeLeft={5400}
          />
        </div>
      </section>

      {/* 11. Coupons */}
      <section className={styles.section}>
        <div className={styles.couponsGrid}>
          <DesktopCouponCard
            discount="10% OFF"
            code="PREMIUM10"
            color="orange"
            categories={['All Products']}
            expiryDate="31 Mar 2026"
          />
          <DesktopCouponCard
            discount="500K UZS OFF"
            code="SAVE500K"
            color="red"
            minAmount="Orders over 5,000,000 UZS"
            expiryDate="15 Apr 2026"
          />
          <DesktopCouponCard
            discount="FREE SHIPPING"
            code="FREEPLUS"
            color="green"
            categories={['All Products']}
            expiryDate="30 Apr 2026"
          />
        </div>
      </section>

      {/* 12. Floating Toolbar */}
      <FloatingToolbar
        items={[
          { icon: <CartIcon />, label: 'Cart', badge: 2 },
          { icon: <HeartIcon />, label: 'Wishlist', badge: 12 },
          { icon: <CompareIcon />, label: 'Compare' },
          { icon: <ShieldIcon />, label: 'Authentication Info' },
          { icon: <ArrowUpIcon />, label: 'Back to Top', showOnScroll: true, onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
        ]}
      />
    </DesktopShell>
  );
};
