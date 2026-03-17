import { useRef, useCallback } from 'react';
import { DesktopBannerCarousel } from '../../components/content/DesktopBannerCarousel';
import styles from './DesktopHomePageB.module.scss';

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatUZS(value: number): string {
  return value.toLocaleString('uz-UZ').replace(/,/g, ' ');
}

function installmentPerMonth(price: number, months: number = 12): string {
  return formatUZS(Math.round(price / months));
}

// ─── SVG Icons ──────────────────────────────────────────────────────────────

const GridIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

const UserIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const HeartIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

const CartIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
  </svg>
);

const HeartSmall = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

const CartSmall = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const ChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

// ─── Data ───────────────────────────────────────────────────────────────────

const categories = [
  { label: 'Smartfonlar va gadjetlar', image: 'https://picsum.photos/seed/cat-phone/64/64' },
  { label: 'Audiotexnika', image: 'https://picsum.photos/seed/cat-audio/64/64' },
  { label: 'Noutbuklar va kompyuterlar', image: 'https://picsum.photos/seed/cat-laptop/64/64' },
  { label: 'TV va proyektorlar', image: 'https://picsum.photos/seed/cat-tv/64/64' },
  { label: 'Uy texnikasi', image: 'https://picsum.photos/seed/cat-home/64/64' },
  { label: 'Oshxona texnikasi', image: 'https://picsum.photos/seed/cat-kitchen/64/64' },
  { label: "Go'zallik va parvarish", image: 'https://picsum.photos/seed/cat-beauty/64/64' },
  { label: "O'yin konsollari", image: 'https://picsum.photos/seed/cat-gaming/64/64' },
];

const bannerSlides = [
  {
    title: "GeekShop Mega Sale — Chegirmalar 40% gacha",
    subtitle: "Eng yaxshi texnika narxlari faqat shu yerda",
    ctaText: "Xarid qilish",
    bgGradient: 'linear-gradient(135deg, #FFC845 0%, #FFB81F 50%, #FF9500 100%)',
    textColor: '#1A1A1A',
  },
  {
    title: "Yangi iPhone 16 Pro",
    subtitle: "Nasiyaga 137 521 so'm/oy dan boshlab",
    ctaText: "Batafsil",
    bgGradient: 'linear-gradient(135deg, #1890FF 0%, #40A9FF 50%, #0050B3 100%)',
  },
  {
    title: "Gaming Festival",
    subtitle: "PlayStation, Xbox, Nintendo — barcha konsollar aksiyada",
    ctaText: "Ko'rish",
    bgGradient: 'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 50%, #4A4A4A 100%)',
  },
];

interface ProductData {
  id: string;
  image: string;
  title: string;
  price: number;
  oldPrice?: number;
  discount?: string;
}

const bestSellers: ProductData[] = [
  { id: 'bs1', image: 'https://picsum.photos/seed/alif-tv1/400/400', title: 'Samsung 55" QLED 4K Smart TV QE55Q60C', price: 8_490_000, oldPrice: 10_200_000, discount: '-17%' },
  { id: 'bs2', image: 'https://picsum.photos/seed/alif-phone1/400/400', title: 'iPhone 15 Pro Max 256GB Natural Titanium', price: 16_990_000, oldPrice: 18_500_000, discount: '-8%' },
  { id: 'bs3', image: 'https://picsum.photos/seed/alif-laptop1/400/400', title: 'MacBook Air M3 15" 512GB Space Gray', price: 19_490_000, oldPrice: 21_000_000, discount: '-7%' },
  { id: 'bs4', image: 'https://picsum.photos/seed/alif-wash1/400/400', title: "Samsung Kir yuvish mashinasi WW80T534", price: 5_290_000, oldPrice: 6_100_000, discount: '-13%' },
  { id: 'bs5', image: 'https://picsum.photos/seed/alif-ac1/400/400', title: 'Midea Konditsioner 12000 BTU Inverter', price: 4_890_000, oldPrice: 5_900_000, discount: '-17%' },
  { id: 'bs6', image: 'https://picsum.photos/seed/alif-tab1/400/400', title: 'iPad Air M2 11" 128GB Wi-Fi Space Gray', price: 8_990_000, oldPrice: 10_500_000, discount: '-14%' },
  { id: 'bs7', image: 'https://picsum.photos/seed/alif-ear1/400/400', title: 'AirPods Pro 2 USB-C MagSafe zaryadlash', price: 3_490_000, oldPrice: 4_200_000, discount: '-17%' },
];

const smartphones: ProductData[] = [
  { id: 'sp1', image: 'https://picsum.photos/seed/alif-ip16/400/400', title: 'iPhone 16 Pro 256GB Desert Titanium', price: 18_490_000, oldPrice: 20_000_000, discount: '-8%' },
  { id: 'sp2', image: 'https://picsum.photos/seed/alif-s24/400/400', title: 'Samsung Galaxy S24 Ultra 256GB Titanium Gray', price: 17_290_000, oldPrice: 19_000_000, discount: '-9%' },
  { id: 'sp3', image: 'https://picsum.photos/seed/alif-x14/400/400', title: 'Xiaomi 14 Ultra 512GB Black', price: 12_990_000, oldPrice: 14_500_000, discount: '-10%' },
  { id: 'sp4', image: 'https://picsum.photos/seed/alif-ip15/400/400', title: 'iPhone 15 128GB Blue', price: 12_490_000, oldPrice: 13_800_000, discount: '-9%' },
  { id: 'sp5', image: 'https://picsum.photos/seed/alif-sam-a/400/400', title: 'Samsung Galaxy A55 5G 128GB Awesome Navy', price: 4_290_000, oldPrice: 4_800_000, discount: '-11%' },
  { id: 'sp6', image: 'https://picsum.photos/seed/alif-redmi/400/400', title: 'Xiaomi Redmi Note 13 Pro 5G 256GB Black', price: 3_890_000, oldPrice: 4_500_000, discount: '-14%' },
  { id: 'sp7', image: 'https://picsum.photos/seed/alif-pixel/400/400', title: 'Google Pixel 8 Pro 256GB Obsidian', price: 11_990_000, oldPrice: 13_200_000, discount: '-9%' },
  { id: 'sp8', image: 'https://picsum.photos/seed/alif-one/400/400', title: 'OnePlus 12 256GB Flowy Emerald', price: 10_490_000, oldPrice: 11_800_000, discount: '-11%' },
  { id: 'sp9', image: 'https://picsum.photos/seed/alif-poco/400/400', title: 'POCO X6 Pro 5G 256GB Black', price: 3_490_000, oldPrice: 3_900_000, discount: '-11%' },
  { id: 'sp10', image: 'https://picsum.photos/seed/alif-noth/400/400', title: 'Nothing Phone (2) 256GB Dark Grey', price: 6_290_000, oldPrice: 7_200_000, discount: '-13%' },
];

const laptops: ProductData[] = [
  { id: 'lp1', image: 'https://picsum.photos/seed/alif-mbp/400/400', title: 'MacBook Pro 14" M3 Pro 18GB/512GB Space Black', price: 29_490_000, oldPrice: 32_000_000, discount: '-8%' },
  { id: 'lp2', image: 'https://picsum.photos/seed/alif-mba/400/400', title: 'MacBook Air 13" M3 8GB/256GB Midnight', price: 15_990_000, oldPrice: 17_500_000, discount: '-9%' },
  { id: 'lp3', image: 'https://picsum.photos/seed/alif-think/400/400', title: 'Lenovo ThinkPad X1 Carbon Gen 11 i7/16GB/512GB', price: 22_490_000, oldPrice: 25_000_000, discount: '-10%' },
  { id: 'lp4', image: 'https://picsum.photos/seed/alif-rog/400/400', title: 'ASUS ROG Strix G16 RTX 4060 i7/16GB/512GB', price: 18_990_000, oldPrice: 21_500_000, discount: '-12%' },
  { id: 'lp5', image: 'https://picsum.photos/seed/alif-hp/400/400', title: 'HP Pavilion 15 Ryzen 7/16GB/512GB', price: 9_490_000, oldPrice: 10_800_000, discount: '-12%' },
  { id: 'lp6', image: 'https://picsum.photos/seed/alif-dell/400/400', title: 'Dell XPS 15 i7-13700H/16GB/512GB OLED', price: 24_990_000, oldPrice: 27_000_000, discount: '-7%' },
  { id: 'lp7', image: 'https://picsum.photos/seed/alif-acer/400/400', title: 'Acer Nitro 5 RTX 4050 i5/16GB/512GB', price: 12_490_000, oldPrice: 14_000_000, discount: '-11%' },
];

const appliances: ProductData[] = [
  { id: 'ap1', image: 'https://picsum.photos/seed/alif-washer/400/400', title: "Samsung Kir yuvish mashinasi 8kg AddWash", price: 5_490_000, oldPrice: 6_500_000, discount: '-16%' },
  { id: 'ap2', image: 'https://picsum.photos/seed/alif-fridge/400/400', title: "LG Muzlatgich GN-B422SMCL 393L No Frost", price: 7_290_000, oldPrice: 8_200_000, discount: '-11%' },
  { id: 'ap3', image: 'https://picsum.photos/seed/alif-vacuum/400/400', title: 'Dyson V15 Detect Absolute Changyutgich', price: 8_990_000, oldPrice: 10_500_000, discount: '-14%' },
  { id: 'ap4', image: 'https://picsum.photos/seed/alif-micro/400/400', title: "Samsung Mikroto'lqinli pech MS23T5018AP 23L", price: 1_890_000, oldPrice: 2_300_000, discount: '-18%' },
  { id: 'ap5', image: 'https://picsum.photos/seed/alif-iron/400/400', title: "Philips Dazmol GC4909/60 Azur", price: 1_290_000, oldPrice: 1_500_000, discount: '-14%' },
  { id: 'ap6', image: 'https://picsum.photos/seed/alif-ac2/400/400', title: "Haier Konditsioner 18000 BTU HSU-18HPL", price: 6_490_000, oldPrice: 7_800_000, discount: '-17%' },
  { id: 'ap7', image: 'https://picsum.photos/seed/alif-dish/400/400', title: "Bosch Idish yuvish mashinasi SMS4HVI33E", price: 6_990_000, oldPrice: 8_100_000, discount: '-14%' },
  { id: 'ap8', image: 'https://picsum.photos/seed/alif-blend/400/400', title: 'Philips Blender HR3573/90 1000W', price: 890_000, oldPrice: 1_100_000, discount: '-19%' },
  { id: 'ap9', image: 'https://picsum.photos/seed/alif-oven/400/400', title: "Artel Gazli plita Apetito 01-E 4 ko'zli", price: 2_490_000, oldPrice: 2_900_000, discount: '-14%' },
  { id: 'ap10', image: 'https://picsum.photos/seed/alif-air/400/400', title: "Xiaomi Smart Air Purifier 4 Pro havo tozalagich", price: 3_290_000, oldPrice: 3_800_000, discount: '-13%' },
];

// ─── Product Card ───────────────────────────────────────────────────────────

interface ProductCardProps {
  product: ProductData;
  wide?: boolean;
}

const ProductCard = ({ product, wide }: ProductCardProps) => {
  const cardClass = [styles.productCard, wide && styles.productCardWide].filter(Boolean).join(' ');

  return (
    <div className={cardClass} role="button" tabIndex={0}>
      <div className={styles.productImageWrap}>
        <img
          src={product.image}
          alt={product.title}
          className={styles.productImage}
          loading="lazy"
        />
        {product.discount && (
          <span className={styles.discountBadge}>{product.discount}</span>
        )}
        <button
          type="button"
          className={styles.heartBtn}
          aria-label="Sevimlilar"
        >
          <HeartSmall />
        </button>
      </div>
      <div className={styles.productBody}>
        <p className={styles.productTitle}>{product.title}</p>
        <div className={styles.productPriceRow}>
          <span className={styles.productPrice}>{formatUZS(product.price)} so'm</span>
          {product.oldPrice && (
            <span className={styles.productOldPrice}>{formatUZS(product.oldPrice)}</span>
          )}
        </div>
        <p className={styles.installmentText}>
          dan {installmentPerMonth(product.price)} so'm/oy
        </p>
        <button type="button" className={styles.addToCartBtn}>
          <CartSmall />
          Savatga
        </button>
      </div>
    </div>
  );
};

// ─── Scrollable Carousel ────────────────────────────────────────────────────

interface CarouselSectionProps {
  title: string;
  products: ProductData[];
}

const CarouselSection = ({ title, products }: CarouselSectionProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = direction === 'left' ? -480 : 480;
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.contentWrap}>
        <div
          className={styles.sectionTitle}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
            }
          }}
        >
          {title} <span className={styles.sectionTitleArrow}>&rsaquo;</span>
        </div>
        <div className={styles.carouselWrap}>
          <button
            type="button"
            className={`${styles.carouselArrow} ${styles.carouselArrowLeft}`}
            onClick={() => scroll('left')}
            aria-label="Oldingi"
          >
            <ChevronLeft />
          </button>
          <div className={styles.carousel} ref={scrollRef}>
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <button
            type="button"
            className={`${styles.carouselArrow} ${styles.carouselArrowRight}`}
            onClick={() => scroll('right')}
            aria-label="Keyingi"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

// ─── Main Component ─────────────────────────────────────────────────────────

export const DesktopHomePageB: React.FC = () => {
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  const scrollCategories = useCallback(() => {
    if (!categoryScrollRef.current) return;
    categoryScrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  }, []);

  return (
    <div className={styles.page}>
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>GeekShop</div>

          <button type="button" className={styles.catalogBtn}>
            <GridIcon />
            Katalog
          </button>

          <div className={styles.searchWrapper}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="GeekShop da qidirish"
              aria-label="Qidirish"
            />
            <span className={styles.searchIcon}>
              <SearchIcon />
            </span>
          </div>

          <div className={styles.headerActions}>
            <button type="button" className={styles.headerAction} aria-label="Kirish">
              <span className={styles.headerActionIcon}>
                <UserIcon />
              </span>
              <span className={styles.headerActionLabel}>Kirish</span>
            </button>

            <button type="button" className={styles.headerAction} aria-label="Sevimlilar">
              <span className={styles.headerActionIcon}>
                <HeartIcon />
              </span>
              <span className={styles.headerActionLabel}>Sevimlilar</span>
            </button>

            <button type="button" className={styles.headerAction} aria-label="Savat">
              <span className={styles.headerActionIcon}>
                <CartIcon />
                <span className={styles.headerActionBadge}>3</span>
              </span>
              <span className={styles.headerActionLabel}>Savat</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Category Bar ────────────────────────────────────────────────── */}
      <nav className={styles.categoryBar} aria-label="Kategoriyalar">
        <div className={styles.categoryBarInner} ref={categoryScrollRef}>
          {categories.map((cat) => (
            <button key={cat.label} type="button" className={styles.categoryItem}>
              <img
                src={cat.image}
                alt=""
                className={styles.categoryItemIcon}
                loading="lazy"
              />
              {cat.label}
            </button>
          ))}
          <button
            type="button"
            className={styles.categoryArrow}
            onClick={scrollCategories}
            aria-label="Ko'proq kategoriyalar"
          >
            <ChevronRight />
          </button>
        </div>
      </nav>

      {/* ── Hero Banner Carousel ────────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.contentWrap}>
          <div className={styles.heroBanner}>
            <DesktopBannerCarousel
              slides={bannerSlides}
              height={360}
              interval={6000}
            />
          </div>
        </div>
      </section>

      {/* ── Best Sellers Carousel ───────────────────────────────────────── */}
      <CarouselSection title="Eng ko'p sotilganlar" products={bestSellers} />

      {/* ── Promo Banner: Installment ──────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.contentWrap}>
          <div
            className={styles.promoBannerFull}
            style={{ background: 'linear-gradient(135deg, #FFC845 0%, #FFB81F 50%, #FF9500 100%)' }}
          >
            <div className={styles.promoBannerContent}>
              <h2 className={styles.promoBannerTitle} style={{ color: '#1A1A1A' }}>
                Nasiya bilan xarid — 0% ustama
              </h2>
              <p className={styles.promoBannerSubtitle} style={{ color: '#333' }}>
                12 oygacha bo'lib to'lang, qo'shimcha to'lovsiz.
                Istalgan tovarni hozir oling — keyinroq to'lang.
              </p>
            </div>
            <img
              src="https://picsum.photos/seed/alif-promo-inst/300/200"
              alt=""
              className={styles.promoBannerImage}
              aria-hidden="true"
            />
          </div>
        </div>
      </section>

      {/* ── Smartphones Grid ────────────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.contentWrap}>
          <div
            className={styles.sectionTitle}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') e.preventDefault();
            }}
          >
            Smartfonlar <span className={styles.sectionTitleArrow}>&rsaquo;</span>
          </div>
          <div className={styles.productGrid}>
            {smartphones.map((p) => (
              <ProductCard key={p.id} product={p} wide />
            ))}
          </div>
        </div>
      </section>

      {/* ── Mini Banner Row ─────────────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.contentWrap}>
          <div className={styles.miniBannerRow}>
            <div
              className={styles.miniBanner}
              style={{ background: 'linear-gradient(135deg, #1890FF 0%, #40A9FF 50%, #0050B3 100%)' }}
            >
              <h3 className={styles.miniBannerTitle}>Texnika uchun chegirmalar</h3>
              <p className={styles.miniBannerSubtitle}>50 dan ortiq tovar turlarida maxsus narxlar</p>
            </div>
            <div
              className={styles.miniBanner}
              style={{ background: 'linear-gradient(135deg, #1A1A1A 0%, #333333 50%, #4A4A4A 100%)' }}
            >
              <h3 className={styles.miniBannerTitle}>Gaming aksessuarlar</h3>
              <p className={styles.miniBannerSubtitle}>PlayStation, Xbox, Nintendo — barcha aksessuarlar</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Laptops Carousel ────────────────────────────────────────────── */}
      <CarouselSection title="Noutbuklar" products={laptops} />

      {/* ── Appliances Grid ─────────────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.contentWrap}>
          <div
            className={styles.sectionTitle}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') e.preventDefault();
            }}
          >
            Maishiy texnika <span className={styles.sectionTitleArrow}>&rsaquo;</span>
          </div>
          <div className={styles.productGrid}>
            {appliances.map((p) => (
              <ProductCard key={p.id} product={p} wide />
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerTop}>
            {/* Brand column */}
            <div className={styles.footerBrand}>
              <div className={styles.footerLogo}>GeekShop</div>
              <p className={styles.footerDesc}>
                O'zbekistonning eng ishonchli onlayn do'koni. Nasiya va bo'lib to'lash imkoniyati.
              </p>
              <div className={styles.footerSocials}>
                <button type="button" className={styles.footerSocialBtn} aria-label="Telegram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                  </svg>
                </button>
                <button type="button" className={styles.footerSocialBtn} aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </button>
                <button type="button" className={styles.footerSocialBtn} aria-label="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>
                <button type="button" className={styles.footerSocialBtn} aria-label="YouTube">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Link columns */}
            <div className={styles.footerColumn}>
              <h4 className={styles.footerColumnTitle}>Xaridorlarga</h4>
              <button type="button" className={styles.footerLink}>Qanday xarid qilish</button>
              <button type="button" className={styles.footerLink}>Yetkazib berish</button>
              <button type="button" className={styles.footerLink}>Qaytarish va almashtirish</button>
              <button type="button" className={styles.footerLink}>To'lov usullari</button>
              <button type="button" className={styles.footerLink}>Bonus dasturi</button>
            </div>

            <div className={styles.footerColumn}>
              <h4 className={styles.footerColumnTitle}>Sotuvchilarga</h4>
              <button type="button" className={styles.footerLink}>Sotuvchi bo'lish</button>
              <button type="button" className={styles.footerLink}>Sotuvchi kabineti</button>
              <button type="button" className={styles.footerLink}>Qoidalar</button>
              <button type="button" className={styles.footerLink}>Marketing vositalari</button>
            </div>

            <div className={styles.footerColumn}>
              <h4 className={styles.footerColumnTitle}>Kompaniya haqida</h4>
              <button type="button" className={styles.footerLink}>Biz haqimizda</button>
              <button type="button" className={styles.footerLink}>Vakansiyalar</button>
              <button type="button" className={styles.footerLink}>Aloqa</button>
              <button type="button" className={styles.footerLink}>Foydalanish shartlari</button>
              <button type="button" className={styles.footerLink}>Maxfiylik siyosati</button>
            </div>

            {/* App download */}
            <div className={styles.footerAppSection}>
              <h4 className={styles.footerAppTitle}>Ilovani yuklab oling</h4>
              <div className={styles.footerQR}>
                <img
                  src="https://picsum.photos/seed/alif-qr/100/100"
                  alt="QR kod"
                  className={styles.footerQRImage}
                />
              </div>
              <div className={styles.footerAppBadges}>
                <img
                  src="https://picsum.photos/seed/alif-appstore/120/36"
                  alt="App Store"
                  className={styles.footerAppBadge}
                />
                <img
                  src="https://picsum.photos/seed/alif-gplay/120/36"
                  alt="Google Play"
                  className={styles.footerAppBadge}
                />
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className={styles.footerBottom}>
            <span>&copy; 2026 GeekShop. Barcha huquqlar himoyalangan.</span>
            <div className={styles.footerPayments}>
              <div className={styles.paymentIcon}>Visa</div>
              <div className={styles.paymentIcon}>MC</div>
              <div className={styles.paymentIcon}>Uzcard</div>
              <div className={styles.paymentIcon}>Humo</div>
              <div className={styles.paymentIcon}>Payme</div>
              <div className={styles.paymentIcon}>Click</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
