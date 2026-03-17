import { useState, useRef, useCallback } from 'react';
import { DesktopShell } from '../../components/layout/DesktopShell';
import { TopBar } from '../../components/navigation/TopBar';
import { DesktopHeader } from '../../components/navigation/DesktopHeader';
import { DesktopLanguageSwitcher } from '../../components/navigation/DesktopLanguageSwitcher';
import { Footer } from '../../components/layout/Footer';
import { DesktopBannerCarousel } from '../../components/content/DesktopBannerCarousel';
import { DesktopProductCard } from '../../components/product/DesktopProductCard';
import styles from './DesktopHomePageA.module.scss';

// ─── SVG Icons ───────────────────────────────────────────────────────────────

const ChevronRightIcon = () => (
  <svg className={styles.sectionArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 6 15 12 9 18" />
  </svg>
);

const CarouselLeftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const CarouselRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 6 15 12 9 18" />
  </svg>
);

// ─── Social Icons ────────────────────────────────────────────────────────────

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TelegramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

// ─── Promo Icon Components ───────────────────────────────────────────────────

const BabyIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12h.01M15 12h.01M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" />
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
  </svg>
);

const CheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const TrendingIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const GiftIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 12 20 22 4 22 4 12" />
    <rect x="2" y="7" width="20" height="5" />
    <line x1="12" y1="22" x2="12" y2="7" />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </svg>
);

// ─── Static Data ─────────────────────────────────────────────────────────────

const categoryChips = [
  { emoji: '🔥', label: 'Hafta tovarlari' },
  { emoji: '🌸', label: 'Bahorgi kolleksiya' },
  { emoji: '💄', label: "Go'zallik" },
  { emoji: '🎨', label: 'Xobbi' },
  { emoji: '📱', label: 'Smartfonlar' },
  { emoji: '🛋', label: 'Mebel' },
  { emoji: '🏕', label: 'Turizm' },
  { emoji: '💻', label: 'Elektronika' },
  { emoji: '👗', label: 'Kiyim' },
  { emoji: '👟', label: 'Poyabzal' },
];

const bannerSlides = [
  {
    title: 'GeekShop Tech Festival',
    subtitle: 'Chegirmalar 50% gacha — faqat shu hafta!',
    ctaText: "Xarid qilish",
    bgGradient: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 50%, #c4b5fd 100%)',
  },
  {
    title: 'Yangi GPU Series',
    subtitle: 'RTX 50 seriyasi — hozir buyurtma bering',
    ctaText: "Ko'rish",
    bgGradient: 'linear-gradient(135deg, #1a73e8 0%, #4da3ff 50%, #93c5fd 100%)',
  },
  {
    title: "A'zolar uchun qo'shimcha 15% chegirma",
    subtitle: "Ro'yxatdan o'ting va imtiyozlarga ega bo'ling",
    ctaText: "Ro'yxatdan o'tish",
    bgGradient: 'linear-gradient(135deg, #137333 0%, #34a853 50%, #81c995 100%)',
  },
];

interface ProductData {
  id: string;
  images: string[];
  title: string;
  shopName: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  rating: number;
  soldCount: string;
  installmentPrice?: string;
  freeShipping?: boolean;
}

const popularProducts: ProductData[] = [
  {
    id: 'p1',
    images: ['https://picsum.photos/seed/gpu1/400/400'],
    title: 'NVIDIA GeForce RTX 4070 Ti SUPER 16GB GDDR6X',
    shopName: 'TechPlanet UZ',
    price: 12_500_000,
    originalPrice: 15_000_000,
    discount: '-17%',
    rating: 4.8,
    soldCount: '342',
    installmentPrice: '1 041 667',
    freeShipping: true,
  },
  {
    id: 'p2',
    images: ['https://picsum.photos/seed/cpu1/400/400'],
    title: 'AMD Ryzen 9 7950X3D Processor 128MB Cache',
    shopName: 'CompZone',
    price: 8_990_000,
    originalPrice: 10_500_000,
    discount: '-14%',
    rating: 4.9,
    soldCount: '189',
    installmentPrice: '749 167',
  },
  {
    id: 'p3',
    images: ['https://picsum.photos/seed/mon1/400/400'],
    title: 'Samsung Odyssey G9 49" DQHD 240Hz Monitor',
    shopName: 'Digital Store',
    price: 18_750_000,
    rating: 4.7,
    soldCount: '87',
    installmentPrice: '1 562 500',
    freeShipping: true,
  },
  {
    id: 'p4',
    images: ['https://picsum.photos/seed/kb1/400/400'],
    title: 'Keychron Q1 Pro Mechanical Keyboard 75% Layout',
    shopName: 'GeekKeys UZ',
    price: 2_350_000,
    originalPrice: 2_800_000,
    discount: '-16%',
    rating: 4.6,
    soldCount: '512',
    installmentPrice: '195 833',
  },
  {
    id: 'p5',
    images: ['https://picsum.photos/seed/hs1/400/400'],
    title: 'Sony WH-1000XM5 Wireless Noise Cancelling',
    shopName: 'AudioWorld',
    price: 4_200_000,
    originalPrice: 4_900_000,
    discount: '-14%',
    rating: 4.8,
    soldCount: '673',
    freeShipping: true,
  },
  {
    id: 'p6',
    images: ['https://picsum.photos/seed/ssd1/400/400'],
    title: 'Samsung 990 PRO 2TB NVMe M.2 SSD 7450MB/s',
    shopName: 'Storage Expert',
    price: 3_100_000,
    originalPrice: 3_600_000,
    discount: '-14%',
    rating: 4.9,
    soldCount: '445',
    installmentPrice: '258 333',
  },
  {
    id: 'p7',
    images: ['https://picsum.photos/seed/ram1/400/400'],
    title: 'G.Skill Trident Z5 RGB DDR5 32GB 6400MHz Kit',
    shopName: 'MemoryPro',
    price: 2_800_000,
    rating: 4.5,
    soldCount: '234',
    installmentPrice: '233 333',
  },
  {
    id: 'p8',
    images: ['https://picsum.photos/seed/case1/400/400'],
    title: 'Lian Li O11 Dynamic EVO Full Tower Case',
    shopName: 'CaseKing UZ',
    price: 1_950_000,
    rating: 4.7,
    soldCount: '156',
    freeShipping: true,
  },
  {
    id: 'p9',
    images: ['https://picsum.photos/seed/mouse1/400/400'],
    title: 'Logitech G PRO X SUPERLIGHT 2 Wireless Mouse',
    shopName: 'GeekKeys UZ',
    price: 1_890_000,
    originalPrice: 2_200_000,
    discount: '-14%',
    rating: 4.8,
    soldCount: '891',
    installmentPrice: '157 500',
  },
  {
    id: 'p10',
    images: ['https://picsum.photos/seed/psu1/400/400'],
    title: 'Corsair RM1000x 1000W 80+ Gold Modular PSU',
    shopName: 'PowerSupply UZ',
    price: 2_450_000,
    rating: 4.6,
    soldCount: '178',
    installmentPrice: '204 167',
    freeShipping: true,
  },
  {
    id: 'p11',
    images: ['https://picsum.photos/seed/gpu2/400/400'],
    title: 'AMD Radeon RX 7900 XTX 24GB GDDR6 Reference',
    shopName: 'TechPlanet UZ',
    price: 14_200_000,
    originalPrice: 16_800_000,
    discount: '-15%',
    rating: 4.7,
    soldCount: '123',
    installmentPrice: '1 183 333',
    freeShipping: true,
  },
  {
    id: 'p12',
    images: ['https://picsum.photos/seed/cool1/400/400'],
    title: 'Noctua NH-D15 chromax.black CPU Tower Cooler',
    shopName: 'CoolTech',
    price: 1_350_000,
    rating: 4.9,
    soldCount: '367',
    freeShipping: true,
  },
  {
    id: 'p13',
    images: ['https://picsum.photos/seed/lap1/400/400'],
    title: 'ASUS ROG Zephyrus G16 RTX 4080 i9-14900HX',
    shopName: 'Digital Store',
    price: 25_000_000,
    originalPrice: 28_500_000,
    discount: '-12%',
    rating: 4.8,
    soldCount: '67',
    installmentPrice: '2 083 333',
    freeShipping: true,
  },
  {
    id: 'p14',
    images: ['https://picsum.photos/seed/mb1/400/400'],
    title: 'ASUS ROG STRIX Z790-E Gaming WiFi II DDR5',
    shopName: 'CompZone',
    price: 5_800_000,
    originalPrice: 6_500_000,
    discount: '-11%',
    rating: 4.6,
    soldCount: '98',
    installmentPrice: '483 333',
  },
  {
    id: 'p15',
    images: ['https://picsum.photos/seed/tab1/400/400'],
    title: 'Apple iPad Pro M4 11" 256GB WiFi Space Black',
    shopName: 'iShop Tashkent',
    price: 13_900_000,
    originalPrice: 15_200_000,
    discount: '-9%',
    rating: 4.9,
    soldCount: '234',
    installmentPrice: '1 158 333',
    freeShipping: true,
  },
];

const recommendedProducts: ProductData[] = [
  {
    id: 'r1',
    images: ['https://picsum.photos/seed/watch1/400/400'],
    title: 'Apple Watch Ultra 2 49mm Titanium Orange Alpine',
    shopName: 'iShop Tashkent',
    price: 11_500_000,
    originalPrice: 13_000_000,
    discount: '-12%',
    rating: 4.9,
    soldCount: '156',
    freeShipping: true,
  },
  {
    id: 'r2',
    images: ['https://picsum.photos/seed/earbuds1/400/400'],
    title: 'Samsung Galaxy Buds3 Pro TWS ANC Earbuds',
    shopName: 'AudioWorld',
    price: 2_950_000,
    originalPrice: 3_400_000,
    discount: '-13%',
    rating: 4.7,
    soldCount: '445',
    installmentPrice: '245 833',
  },
  {
    id: 'r3',
    images: ['https://picsum.photos/seed/chair1/400/400'],
    title: 'Secretlab TITAN Evo 2024 Gaming Chair XL',
    shopName: 'GameZone UZ',
    price: 7_200_000,
    rating: 4.6,
    soldCount: '89',
    installmentPrice: '600 000',
    freeShipping: true,
  },
  {
    id: 'r4',
    images: ['https://picsum.photos/seed/webcam1/400/400'],
    title: 'Elgato Facecam Pro 4K60 Webcam USB-C HDR',
    shopName: 'StreamPro UZ',
    price: 3_800_000,
    rating: 4.5,
    soldCount: '67',
  },
  {
    id: 'r5',
    images: ['https://picsum.photos/seed/desk1/400/400'],
    title: 'FlexiSpot E7 Electric Standing Desk 180x80cm',
    shopName: 'OfficePro',
    price: 5_500_000,
    originalPrice: 6_200_000,
    discount: '-11%',
    rating: 4.8,
    soldCount: '112',
    installmentPrice: '458 333',
    freeShipping: true,
  },
  {
    id: 'r6',
    images: ['https://picsum.photos/seed/hub1/400/400'],
    title: 'CalDigit TS4 Thunderbolt 4 Dock Station 18 Port',
    shopName: 'TechPlanet UZ',
    price: 4_100_000,
    rating: 4.7,
    soldCount: '78',
    installmentPrice: '341 667',
  },
  {
    id: 'r7',
    images: ['https://picsum.photos/seed/stream1/400/400'],
    title: 'Elgato Stream Deck MK.2 15 LCD Keys USB-C',
    shopName: 'StreamPro UZ',
    price: 2_400_000,
    originalPrice: 2_800_000,
    discount: '-14%',
    rating: 4.6,
    soldCount: '198',
    installmentPrice: '200 000',
  },
];

const showcaseCategories = [
  { name: 'Videokartalar', count: 1240, image: 'https://picsum.photos/seed/cat-gpu/400/300' },
  { name: 'Protsessorlar', count: 890, image: 'https://picsum.photos/seed/cat-cpu/400/300' },
  { name: 'Monitorlar', count: 345, image: 'https://picsum.photos/seed/cat-monitor/400/300' },
  { name: 'Noutbuklar', count: 567, image: 'https://picsum.photos/seed/cat-laptop/400/300' },
  { name: 'Klaviaturalar', count: 432, image: 'https://picsum.photos/seed/cat-kb/400/300' },
  { name: 'Quloqchinlar', count: 765, image: 'https://picsum.photos/seed/cat-headset/400/300' },
  { name: 'Xotira modullari', count: 234, image: 'https://picsum.photos/seed/cat-ram/400/300' },
  { name: 'SSD disklar', count: 456, image: 'https://picsum.photos/seed/cat-ssd/400/300' },
];

const footerColumns = [
  {
    title: 'Biz haqimizda',
    links: [
      { label: 'Topshirish punktlari', href: '#' },
      { label: 'Vakansiyalar', href: '#' },
      { label: 'Yangiliklar', href: '#' },
    ],
  },
  {
    title: 'Foydalanuvchilarga',
    links: [
      { label: "Biz bilan bog'lanish", href: '#' },
      { label: 'Savol-Javob', href: '#' },
      { label: 'Qaytarish siyosati', href: '#' },
    ],
  },
  {
    title: 'Tadbirkorlarga',
    links: [
      { label: 'GeekShopda soting', href: '#' },
      { label: 'Sotuvchi kabinetiga kirish', href: '#' },
      { label: 'Hamkorlik', href: '#' },
    ],
  },
];

const footerSocials = [
  { icon: <InstagramIcon />, label: 'Instagram', href: '#' },
  { icon: <TelegramIcon />, label: 'Telegram', href: '#' },
  { icon: <FacebookIcon />, label: 'Facebook', href: '#' },
  { icon: <YouTubeIcon />, label: 'YouTube', href: '#' },
];

// ─── Component ───────────────────────────────────────────────────────────────

export const DesktopHomePageA = () => {
  const [searchValue, setSearchValue] = useState('');
  const recommendedRef = useRef<HTMLDivElement>(null);

  const scrollRecommended = useCallback((direction: 'left' | 'right') => {
    const el = recommendedRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  }, []);

  // ─── TopBar ──────────────────────────────────────────────────────────────

  const topBar = (
    <TopBar
      leftItems={[
        <span key="city" style={{ cursor: 'pointer' }}>Toshkent ▼</span>,
        <a key="points" href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Topshirish punktlari</a>,
      ]}
      rightItems={[
        <a key="seller" href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Sotuvchi bo&apos;lish</a>,
        <a key="faq" href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Savol-javob</a>,
        <a key="orders" href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Buyurtmalarim</a>,
        <DesktopLanguageSwitcher key="lang" />,
      ]}
    />
  );

  // ─── Header ──────────────────────────────────────────────────────────────

  const header = (
    <DesktopHeader
      searchPlaceholder="Mahsulotlarni qidirish..."
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      cartCount={3}
      wishlistCount={7}
    />
  );

  // ─── Footer ──────────────────────────────────────────────────────────────

  const footer = (
    <Footer
      columns={footerColumns}
      socialLinks={footerSocials}
      showNewsletter={false}
      copyrightText="2026 © GeekShop. Barcha huquqlar himoyalangan"
      bottomLinks={[
        { label: 'Maxfiylik siyosati', href: '#' },
        { label: 'Foydalanish shartlari', href: '#' },
      ]}
    />
  );

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <DesktopShell
      topBar={topBar}
      header={header}
      footer={footer}
      className={styles.page}
    >
      <div className={styles.content}>
        {/* 1. Category Quick Links */}
        <section className={styles.sectionSmall}>
          <div className={styles.categoryBar}>
            {categoryChips.map((chip) => (
              <button
                key={chip.label}
                type="button"
                className={styles.categoryChip}
              >
                <span className={styles.categoryChipIcon}>{chip.emoji}</span>
                {chip.label}
              </button>
            ))}
            <button type="button" className={styles.moreChip}>
              Yana ▼
            </button>
          </div>
        </section>

        {/* 2. Hero Banner Carousel */}
        <section className={styles.section}>
          <DesktopBannerCarousel
            slides={bannerSlides}
            height={400}
            interval={5000}
          />
        </section>

        {/* 3. Promo Quick Cards */}
        <section className={styles.sectionSmall}>
          <div className={styles.promoRow}>
            <button type="button" className={styles.promoCard}>
              <span className={`${styles.promoIcon} ${styles.promoIconBlue}`}>
                <BabyIcon />
              </span>
              <span className={styles.promoText}>Onalar va bolalar uchun</span>
            </button>
            <button type="button" className={styles.promoCard}>
              <span className={`${styles.promoIcon} ${styles.promoIconGreen}`}>
                <CheckIcon />
              </span>
              <span className={styles.promoText}>Arzon narxlar kafolati</span>
            </button>
            <button type="button" className={styles.promoCard}>
              <span className={`${styles.promoIcon} ${styles.promoIconPurple}`}>
                <TrendingIcon />
              </span>
              <span className={styles.promoText}>Zamonaviy bozor</span>
            </button>
            <button type="button" className={styles.promoCard}>
              <span className={`${styles.promoIcon} ${styles.promoIconOrange}`}>
                <GiftIcon />
              </span>
              <span className={styles.promoText}>Ramazon Hayiti</span>
            </button>
          </div>
        </section>

        {/* 4. "Mashhur" (Popular) Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Mashhur <ChevronRightIcon />
          </h2>
          <div className={styles.productGrid}>
            {popularProducts.map((product) => (
              <DesktopProductCard
                key={product.id}
                images={product.images}
                title={product.title}
                shopName={product.shopName}
                price={product.price}
                originalPrice={product.originalPrice}
                discount={product.discount}
                rating={product.rating}
                soldCount={product.soldCount}
                installmentPrice={product.installmentPrice}
                freeShipping={product.freeShipping}
              />
            ))}
          </div>
          <button type="button" className={styles.showMoreBtn}>
            Yana ko&apos;rsatish 10
          </button>
        </section>

        {/* 5. Promo Banner */}
        <section className={styles.section}>
          <div className={`${styles.promoBanner} ${styles.promoBannerGradient}`}>
            <div className={styles.promoBannerContent}>
              <div className={styles.promoBannerTitle}>
                Arzon narxlar kafolati
              </div>
              <div className={styles.promoBannerSubtitle}>
                Eng yaxshi narxlar — biz bilan ishonchli xarid qiling
              </div>
            </div>
            <div className={styles.promoBannerImages}>
              <img
                src="https://picsum.photos/seed/promo-a/120/120"
                alt=""
                className={styles.promoBannerImg}
                loading="lazy"
              />
              <img
                src="https://picsum.photos/seed/promo-b/120/120"
                alt=""
                className={styles.promoBannerImg}
                loading="lazy"
              />
              <img
                src="https://picsum.photos/seed/promo-c/120/120"
                alt=""
                className={styles.promoBannerImg}
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* 6. "Sizga tavsiya" (Recommended) — Carousel */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Sizga tavsiya <ChevronRightIcon />
          </h2>
          <div className={styles.recommendedWrapper}>
            <button
              type="button"
              className={`${styles.carouselArrow} ${styles.carouselArrowLeft}`}
              onClick={() => scrollRecommended('left')}
              aria-label="Oldingi"
            >
              <CarouselLeftIcon />
            </button>
            <div ref={recommendedRef} className={styles.recommendedScroll}>
              {recommendedProducts.map((product) => (
                <div key={product.id} className={styles.recommendedCard}>
                  <DesktopProductCard
                    images={product.images}
                    title={product.title}
                    shopName={product.shopName}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    discount={product.discount}
                    rating={product.rating}
                    soldCount={product.soldCount}
                    installmentPrice={product.installmentPrice}
                    freeShipping={product.freeShipping}
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              className={`${styles.carouselArrow} ${styles.carouselArrowRight}`}
              onClick={() => scrollRecommended('right')}
              aria-label="Keyingi"
            >
              <CarouselRightIcon />
            </button>
          </div>
        </section>

        {/* 7. Category Showcase */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Turkumlar <ChevronRightIcon />
          </h2>
          <div className={styles.categoryGrid}>
            {showcaseCategories.map((cat) => (
              <button key={cat.name} type="button" className={styles.categoryCard}>
                <img
                  src={cat.image}
                  alt={cat.name}
                  className={styles.categoryCardImage}
                  loading="lazy"
                />
                <div className={styles.categoryCardBody}>
                  <div className={styles.categoryCardName}>{cat.name}</div>
                  <div className={styles.categoryCardCount}>{cat.count} ta mahsulot</div>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </DesktopShell>
  );
};

DesktopHomePageA.displayName = 'DesktopHomePageA';
