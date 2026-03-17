import { useState, useEffect, useCallback, useRef } from 'react';
import styles from './DesktopHomePageC.module.scss';

// ─── Inline SVG Icons ────────────────────────────────────────────────────────

const HamburgerIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const LocationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PersonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const BoxIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

const CartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 6 15 12 9 18" />
  </svg>
);

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

// ─── Helpers ─────────────────────────────────────────────────────────────────

const formatPrice = (price: number): string => {
  return price.toLocaleString('ru-RU').replace(/\s/g, ' ') + ' UZS';
};

// ─── Data Types ──────────────────────────────────────────────────────────────

interface Product {
  id: string;
  image: string;
  title: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  rating: number;
  reviewCount: number;
  delivery: string;
}

interface HeroSlide {
  title: string;
  subtitle: string;
  cta: string;
  gradient: string;
}

interface PromoItem {
  title: string;
  subtitle: string;
  bg: string;
}

interface CategoryItem {
  name: string;
  image: string;
}

// ─── Static Data ─────────────────────────────────────────────────────────────

const heroSlides: HeroSlide[] = [
  {
    title: 'Электроника со скидками до 50%',
    subtitle: 'Ноутбуки, смартфоны, наушники и аксессуары по лучшим ценам',
    cta: 'Перейти к акциям',
    gradient: 'linear-gradient(135deg, #005BFF 0%, #0040B0 50%, #002870 100%)',
  },
  {
    title: 'GeekShop Premium — бесплатная доставка',
    subtitle: 'Подключите Premium и получайте бесплатную доставку на все заказы',
    cta: 'Попробовать бесплатно',
    gradient: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)',
  },
  {
    title: 'Весенняя распродажа техники',
    subtitle: 'Тысячи товаров со скидками. Успей купить по выгодной цене!',
    cta: 'Смотреть все',
    gradient: 'linear-gradient(135deg, #00A86B 0%, #007A4D 50%, #005535 100%)',
  },
];

const bestSellers: Product[] = [
  { id: 'bs1', image: 'https://picsum.photos/seed/ozon-rtx4090/400/400', title: 'NVIDIA GeForce RTX 4090 24GB GDDR6X Founders Edition', price: 24500000, oldPrice: 28000000, discount: '-12%', rating: 4.9, reviewCount: 1247, delivery: 'Доставка завтра' },
  { id: 'bs2', image: 'https://picsum.photos/seed/ozon-macbook/400/400', title: 'Apple MacBook Pro 16" M3 Max 48GB 1TB Space Black', price: 52000000, rating: 4.8, reviewCount: 856, delivery: 'Доставка завтра' },
  { id: 'bs3', image: 'https://picsum.photos/seed/ozon-sony-xm5/400/400', title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones', price: 4200000, oldPrice: 5500000, discount: '-24%', rating: 4.7, reviewCount: 3421, delivery: 'Доставка завтра' },
  { id: 'bs4', image: 'https://picsum.photos/seed/ozon-odyssey/400/400', title: 'Samsung Odyssey G9 49" DQHD 240Hz Curved Gaming Monitor', price: 18500000, oldPrice: 22000000, discount: '-16%', rating: 4.6, reviewCount: 312, delivery: 'Послезавтра' },
  { id: 'bs5', image: 'https://picsum.photos/seed/ozon-corsair-k/400/400', title: 'Corsair K100 RGB Optical-Mechanical Gaming Keyboard', price: 3200000, rating: 4.5, reviewCount: 1834, delivery: 'Доставка завтра' },
  { id: 'bs6', image: 'https://picsum.photos/seed/ozon-airpods/400/400', title: 'Apple AirPods Pro 2nd Gen USB-C with MagSafe Case', price: 3800000, oldPrice: 4500000, discount: '-16%', rating: 4.8, reviewCount: 5621, delivery: 'Доставка завтра' },
  { id: 'bs7', image: 'https://picsum.photos/seed/ozon-logitech/400/400', title: 'Logitech G Pro X 2 Lightspeed Wireless Gaming Headset', price: 3100000, oldPrice: 3800000, discount: '-18%', rating: 4.6, reviewCount: 789, delivery: 'Послезавтра' },
];

const promos: PromoItem[] = [
  { title: 'Скидки на ноутбуки', subtitle: 'До -40% на популярные модели', bg: 'linear-gradient(135deg, #005BFF 0%, #003DB5 100%)' },
  { title: 'Игровые аксессуары', subtitle: 'Клавиатуры, мыши, гарнитуры', bg: 'linear-gradient(135deg, #1A1A2E 0%, #333355 100%)' },
  { title: 'Умный дом', subtitle: 'Колонки, лампы, датчики', bg: 'linear-gradient(135deg, #00897B 0%, #004D40 100%)' },
];

const saleProducts: Product[] = [
  { id: 'sp1', image: 'https://picsum.photos/seed/ozon-monitor27/400/400', title: 'LG 27GP950 4K Nano IPS 144Hz HDR 600 Monitor', price: 6300000, oldPrice: 9000000, discount: '-30%', rating: 4.6, reviewCount: 189, delivery: 'Доставка завтра' },
  { id: 'sp2', image: 'https://picsum.photos/seed/ozon-headphones2/400/400', title: 'Bose QuietComfort Ultra Wireless Headphones', price: 5600000, oldPrice: 8200000, discount: '-32%', rating: 4.8, reviewCount: 2134, delivery: 'Доставка завтра' },
  { id: 'sp3', image: 'https://picsum.photos/seed/ozon-keyboard2/400/400', title: 'Razer BlackWidow V4 Pro Mechanical Gaming Keyboard', price: 4100000, oldPrice: 6500000, discount: '-37%', rating: 4.5, reviewCount: 623, delivery: 'Послезавтра' },
  { id: 'sp4', image: 'https://picsum.photos/seed/ozon-mouse2/400/400', title: 'Logitech G Pro X Superlight 2 Wireless Gaming Mouse', price: 1800000, oldPrice: 2900000, discount: '-38%', rating: 4.7, reviewCount: 4521, delivery: 'Доставка завтра' },
  { id: 'sp5', image: 'https://picsum.photos/seed/ozon-webcam2/400/400', title: 'Elgato Facecam Pro 4K60 Streaming Webcam', price: 3200000, oldPrice: 5800000, discount: '-45%', rating: 4.4, reviewCount: 312, delivery: 'Доставка завтра' },
  { id: 'sp6', image: 'https://picsum.photos/seed/ozon-speaker2/400/400', title: 'Sonos Era 300 Spatial Audio Smart Speaker', price: 5400000, oldPrice: 7800000, discount: '-31%', rating: 4.6, reviewCount: 187, delivery: 'Послезавтра' },
  { id: 'sp7', image: 'https://picsum.photos/seed/ozon-tablet2/400/400', title: 'Apple iPad Pro 12.9" M2 256GB Wi-Fi Space Gray', price: 14500000, oldPrice: 18000000, discount: '-19%', rating: 4.9, reviewCount: 3245, delivery: 'Доставка завтра' },
  { id: 'sp8', image: 'https://picsum.photos/seed/ozon-earbuds2/400/400', title: 'Samsung Galaxy Buds3 Pro ANC Earbuds', price: 2400000, oldPrice: 3800000, discount: '-37%', rating: 4.5, reviewCount: 1876, delivery: 'Доставка завтра' },
  { id: 'sp9', image: 'https://picsum.photos/seed/ozon-charger2/400/400', title: 'Anker 737 GaNPrime 120W USB-C Charger', price: 780000, oldPrice: 1400000, discount: '-44%', rating: 4.7, reviewCount: 5432, delivery: 'Послезавтра' },
  { id: 'sp10', image: 'https://picsum.photos/seed/ozon-powerbank/400/400', title: 'Anker 737 Power Bank 24000mAh 140W', price: 1200000, oldPrice: 1900000, discount: '-37%', rating: 4.6, reviewCount: 2341, delivery: 'Доставка завтра' },
];

const electronicsProducts: Product[] = [
  { id: 'ep1', image: 'https://picsum.photos/seed/ozon-gpu-4080/400/400', title: 'ASUS ROG Strix RTX 4080 Super OC 16GB GDDR6X', price: 12500000, oldPrice: 14000000, discount: '-11%', rating: 4.8, reviewCount: 432, delivery: 'Доставка завтра' },
  { id: 'ep2', image: 'https://picsum.photos/seed/ozon-cpu-9700/400/400', title: 'AMD Ryzen 9 9950X 16-Core 4.3GHz Processor', price: 8400000, rating: 4.9, reviewCount: 287, delivery: 'Послезавтра' },
  { id: 'ep3', image: 'https://picsum.photos/seed/ozon-ram-ddr5/400/400', title: 'Corsair Dominator Platinum DDR5 64GB 6400MHz Kit', price: 3800000, oldPrice: 4500000, discount: '-16%', rating: 4.5, reviewCount: 312, delivery: 'Доставка завтра' },
  { id: 'ep4', image: 'https://picsum.photos/seed/ozon-ssd-990/400/400', title: 'Samsung 990 Pro 4TB NVMe Gen4 SSD 7450MB/s', price: 4500000, oldPrice: 5200000, discount: '-13%', rating: 4.7, reviewCount: 1123, delivery: 'Доставка завтра' },
  { id: 'ep5', image: 'https://picsum.photos/seed/ozon-mobo-z790/400/400', title: 'MSI MEG Z790 GODLIKE DDR5 ATX Motherboard', price: 9200000, oldPrice: 10500000, discount: '-12%', rating: 4.7, reviewCount: 67, delivery: 'Послезавтра' },
  { id: 'ep6', image: 'https://picsum.photos/seed/ozon-gpu-7900/400/400', title: 'AMD Radeon RX 7900 XTX 24GB GDDR6 Graphics Card', price: 15200000, rating: 4.6, reviewCount: 198, delivery: 'Доставка завтра' },
  { id: 'ep7', image: 'https://picsum.photos/seed/ozon-cooler-kraken/400/400', title: 'NZXT Kraken Elite 360 RGB AIO Liquid Cooler', price: 3400000, rating: 4.6, reviewCount: 445, delivery: 'Доставка завтра' },
  { id: 'ep8', image: 'https://picsum.photos/seed/ozon-psu-1000/400/400', title: 'Corsair HX1500i 1500W 80+ Platinum Modular PSU', price: 4100000, oldPrice: 4800000, discount: '-15%', rating: 4.8, reviewCount: 234, delivery: 'Послезавтра' },
  { id: 'ep9', image: 'https://picsum.photos/seed/ozon-case-011/400/400', title: 'Lian Li O11D EVO XL Full Tower PC Case White', price: 3600000, rating: 4.6, reviewCount: 876, delivery: 'Доставка завтра' },
  { id: 'ep10', image: 'https://picsum.photos/seed/ozon-ssd-wd/400/400', title: 'WD Black SN850X 8TB NVMe Gen4 SSD 7300MB/s', price: 8900000, rating: 4.7, reviewCount: 123, delivery: 'Доставка завтра' },
];

const recommendedProducts: Product[] = [
  { id: 'rp1', image: 'https://picsum.photos/seed/ozon-rec1/400/400', title: 'Dyson V15 Detect Absolute Cordless Vacuum', price: 8500000, oldPrice: 10200000, discount: '-17%', rating: 4.8, reviewCount: 1567, delivery: 'Доставка завтра' },
  { id: 'rp2', image: 'https://picsum.photos/seed/ozon-rec2/400/400', title: 'Sony PlayStation 5 Slim Digital Edition 1TB', price: 7200000, rating: 4.9, reviewCount: 8923, delivery: 'Доставка завтра' },
  { id: 'rp3', image: 'https://picsum.photos/seed/ozon-rec3/400/400', title: 'DJI Mini 4 Pro Fly More Combo 4K/60fps Drone', price: 12800000, oldPrice: 15000000, discount: '-15%', rating: 4.7, reviewCount: 456, delivery: 'Послезавтра' },
  { id: 'rp4', image: 'https://picsum.photos/seed/ozon-rec4/400/400', title: 'Apple Watch Ultra 2 49mm Titanium GPS+Cellular', price: 11500000, rating: 4.8, reviewCount: 2345, delivery: 'Доставка завтра' },
  { id: 'rp5', image: 'https://picsum.photos/seed/ozon-rec5/400/400', title: 'Marshall Stanmore III Bluetooth Speaker Black', price: 6800000, oldPrice: 7500000, discount: '-9%', rating: 4.6, reviewCount: 893, delivery: 'Доставка завтра' },
  { id: 'rp6', image: 'https://picsum.photos/seed/ozon-rec6/400/400', title: 'Keychron Q1 Pro QMK/VIA Wireless Mechanical Keyboard', price: 2800000, rating: 4.5, reviewCount: 1234, delivery: 'Послезавтра' },
  { id: 'rp7', image: 'https://picsum.photos/seed/ozon-rec7/400/400', title: 'SteelSeries Arctis Nova Pro Wireless Headset', price: 5200000, oldPrice: 6400000, discount: '-19%', rating: 4.7, reviewCount: 678, delivery: 'Доставка завтра' },
];

const popularCategories: CategoryItem[] = [
  { name: 'Ноутбуки', image: 'https://picsum.photos/seed/cat-laptops/300/200' },
  { name: 'Смартфоны', image: 'https://picsum.photos/seed/cat-phones/300/200' },
  { name: 'Наушники', image: 'https://picsum.photos/seed/cat-headphones/300/200' },
  { name: 'Мониторы', image: 'https://picsum.photos/seed/cat-monitors/300/200' },
  { name: 'Видеокарты', image: 'https://picsum.photos/seed/cat-gpus/300/200' },
  { name: 'Клавиатуры', image: 'https://picsum.photos/seed/cat-keyboards/300/200' },
  { name: 'Колонки', image: 'https://picsum.photos/seed/cat-speakers/300/200' },
  { name: 'Игровые кресла', image: 'https://picsum.photos/seed/cat-chairs/300/200' },
  { name: 'SSD накопители', image: 'https://picsum.photos/seed/cat-ssd/300/200' },
  { name: 'Процессоры', image: 'https://picsum.photos/seed/cat-cpus/300/200' },
];

const footerData = [
  { title: 'Покупателям', links: ['Как сделать заказ', 'Способы оплаты', 'Доставка', 'Возврат товара', 'Контакты'] },
  { title: 'Продавцам', links: ['Продавать на GeekShop', 'Вход для продавцов', 'Правила площадки', 'Тарифы', 'Документация API'] },
  { title: 'О компании', links: ['О нас', 'Пресс-центр', 'Вакансии', 'Реквизиты', 'Sustainability'] },
  { title: 'Помощь', links: ['Центр помощи', 'Частые вопросы', 'Гарантия подлинности', 'Безопасность', 'Программа лояльности'] },
  { title: 'Контакты', links: ['+998 71 200 00 00', 'support@geekshop.uz', 'Telegram бот', 'Чат поддержки', 'Ташкент, Узбекистан'] },
];

// ─── Inline Product Card Component ───────────────────────────────────────────

const OzonProductCard = ({ product }: { product: Product }) => (
  <div className={styles.productCard}>
    <div className={styles.productImageWrapper}>
      <img
        className={styles.productImage}
        src={product.image}
        alt={product.title}
        loading="lazy"
      />
      {product.discount && (
        <span className={styles.discountBadge}>{product.discount}</span>
      )}
    </div>
    <div className={styles.productBody}>
      <div className={styles.productPriceRow}>
        <span className={styles.productPrice}>{formatPrice(product.price)}</span>
      </div>
      {product.oldPrice && (
        <span className={styles.productOldPrice}>{formatPrice(product.oldPrice)}</span>
      )}
      <p className={styles.productTitle}>{product.title}</p>
      <span className={styles.productDelivery}>{product.delivery}</span>
      <div className={styles.productRatingRow}>
        <span className={styles.productStar}><StarIcon /></span>
        <span>{product.rating}</span>
        <span>({product.reviewCount.toLocaleString()})</span>
      </div>
      <button type="button" className={styles.addToCartBtn}>
        В корзину
      </button>
    </div>
  </div>
);

// ─── Hero Carousel (inline) ─────────────────────────────────────────────────

const HeroCarousel = () => {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [paused, setPaused] = useState(false);

  const count = heroSlides.length;

  const goTo = useCallback(
    (idx: number) => setActive(((idx % count) + count) % count),
    [count],
  );

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (paused || count <= 1) return;
    timerRef.current = setInterval(next, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, next, count]);

  return (
    <div
      className={styles.heroCarousel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-label="Banner carousel"
      aria-roledescription="carousel"
    >
      {heroSlides.map((slide, i) => (
        <div
          key={i}
          className={`${styles.heroSlide} ${i === active ? styles.heroSlideActive : ''}`}
          style={{ background: slide.gradient }}
          role="group"
          aria-roledescription="slide"
          aria-label={`Slide ${i + 1} of ${count}`}
          aria-hidden={i !== active}
        >
          <div className={styles.heroSlideContent}>
            <h2 className={styles.heroSlideTitle}>{slide.title}</h2>
            <p className={styles.heroSlideSubtitle}>{slide.subtitle}</p>
            <button type="button" className={styles.heroSlideCta}>{slide.cta}</button>
          </div>
        </div>
      ))}

      {count > 1 && (
        <>
          <button
            type="button"
            className={`${styles.heroArrow} ${styles.heroArrowLeft}`}
            onClick={prev}
            aria-label="Previous slide"
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            className={`${styles.heroArrow} ${styles.heroArrowRight}`}
            onClick={next}
            aria-label="Next slide"
          >
            <ChevronRightIcon />
          </button>
          <div className={styles.heroDots} role="tablist" aria-label="Slide navigation">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.heroDot} ${i === active ? styles.heroDotActive : ''}`}
                onClick={() => goTo(i)}
                role="tab"
                aria-selected={i === active}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// ─── Horizontal Carousel Wrapper ────────────────────────────────────────────

const ProductCarousel = ({ products }: { products: Product[] }) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!trackRef.current) return;
    const amount = dir === 'left' ? -480 : 480;
    trackRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <div className={styles.carouselContainer}>
      <button
        type="button"
        className={`${styles.carouselArrow} ${styles.carouselArrowLeft}`}
        onClick={() => scroll('left')}
        aria-label="Scroll left"
      >
        <ChevronLeftIcon />
      </button>
      <div className={styles.carouselTrack} ref={trackRef}>
        {products.map((product) => (
          <div key={product.id} className={styles.carouselItem}>
            <OzonProductCard product={product} />
          </div>
        ))}
      </div>
      <button
        type="button"
        className={`${styles.carouselArrow} ${styles.carouselArrowRight}`}
        onClick={() => scroll('right')}
        aria-label="Scroll right"
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
};

// ─── Main Page Component ────────────────────────────────────────────────────

export const DesktopHomePageC = () => {
  return (
    <div className={styles.page}>
      {/* ── Sticky Header ── */}
      <header className={styles.header}>
        <div className={styles.headerRow1}>
          <span className={styles.logo}>GeekShop</span>

          <button type="button" className={styles.catalogBtn}>
            <HamburgerIcon />
            Каталог
          </button>

          <div className={styles.searchWrapper}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Искать на GeekShop"
              aria-label="Search products"
            />
            <button type="button" className={styles.searchBtn} aria-label="Search">
              <SearchIcon />
            </button>
          </div>

          <button type="button" className={styles.headerAction}>
            <span className={styles.headerActionIcon}><LocationIcon /></span>
            Toshkent
          </button>

          <div className={styles.headerActions}>
            <button type="button" className={styles.headerAction}>
              <span className={styles.headerActionIcon}><PersonIcon /></span>
              Войти
            </button>
            <button type="button" className={styles.headerAction}>
              <span className={styles.headerActionIcon}><BoxIcon /></span>
              Заказы
            </button>
            <button type="button" className={styles.headerAction}>
              <span className={styles.headerActionIcon}><HeartIcon /></span>
              Избранное
            </button>
            <button type="button" className={styles.headerAction}>
              <span className={styles.headerActionIcon}>
                <CartIcon />
                <span className={styles.headerBadge}>3</span>
              </span>
              Корзина
            </button>
          </div>
        </div>

        <div className={styles.headerRow2}>
          <button type="button" className={`${styles.navLink} ${styles.navLinkBlue}`}>GeekShop Premium</button>
          <button type="button" className={`${styles.navLink} ${styles.navLinkGreen}`}>Рассрочка</button>
          <button type="button" className={`${styles.navLink} ${styles.navLinkRed}`}>Акции</button>
          <button type="button" className={styles.navLink}>Электроника</button>
          <button type="button" className={styles.navLink}>Для дома</button>
          <button type="button" className={styles.navLink}>Одежда</button>
          <button type="button" className={styles.navLink}>Игры</button>
          <button type="button" className={styles.navLink}>Книги</button>
          <button type="button" className={styles.navLink}>Спорт</button>
          <button type="button" className={styles.navLink}>Красота</button>
        </div>
      </header>

      {/* ── Main Content ── */}
      <div className={styles.content}>
        {/* 1. Hero Banner Carousel */}
        <HeroCarousel />

        {/* 2. Best Sellers — Horizontal Carousel */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Хиты продаж</h2>
            <button type="button" className={styles.sectionLink}>Все</button>
          </div>
          <ProductCarousel products={bestSellers} />
        </section>

        {/* 3. Promo Banner Row */}
        <div className={styles.promoRow}>
          {promos.map((promo, i) => (
            <div key={i} className={styles.promoBanner} style={{ background: promo.bg }}>
              <h3 className={styles.promoTitle}>{promo.title}</h3>
              <p className={styles.promoSubtitle}>{promo.subtitle}</p>
            </div>
          ))}
        </div>

        {/* 4. Sales Section — 5-column grid */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Акции и скидки</h2>
            <button type="button" className={styles.sectionLink}>Все акции</button>
          </div>
          <div className={styles.productGrid5}>
            {saleProducts.map((product) => (
              <OzonProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* 5. Electronics Section — 5-column grid (alt bg) */}
        <div className={styles.sectionAlt}>
          <div className={styles.sectionAltInner}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Электроника</h2>
              <button type="button" className={styles.sectionLink}>Все товары</button>
            </div>
            <div className={styles.productGrid5}>
              {electronicsProducts.map((product) => (
                <OzonProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>

        {/* 6. Wide Promo Banner */}
        <div
          className={styles.wideBanner}
          style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 40%, #0F3460 100%)' }}
        >
          <div className={styles.wideBannerContent}>
            <h2 className={styles.wideBannerTitle}>GeekShop Premium — Попробуйте бесплатно</h2>
            <p className={styles.wideBannerSubtitle}>
              Бесплатная доставка, ранний доступ к распродажам и эксклюзивные скидки до 30%
            </p>
            <button type="button" className={styles.wideBannerCta}>Попробовать</button>
          </div>
          <span className={styles.wideBannerDecor} aria-hidden="true">&#9733;</span>
        </div>

        {/* 7. Recommended — Horizontal Carousel */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Рекомендуем вам</h2>
            <button type="button" className={styles.sectionLink}>Все</button>
          </div>
          <ProductCarousel products={recommendedProducts} />
        </section>

        {/* 8. Popular Categories Grid */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Популярные категории</h2>
          </div>
          <div className={styles.categoryGrid}>
            {popularCategories.map((cat, i) => (
              <div key={i} className={styles.categoryCard}>
                <img
                  className={styles.categoryImage}
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                />
                <p className={styles.categoryName}>{cat.name}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── Footer (Dark Blue Ozon-style) ── */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerColumns}>
            {footerData.map((col, i) => (
              <div key={i}>
                <h4 className={styles.footerColumnTitle}>{col.title}</h4>
                <ul className={styles.footerLinks}>
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <button type="button" className={styles.footerLink}>{link}</button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className={styles.footerMiddle}>
            <div className={styles.footerSocial}>
              <button type="button" className={styles.footerSocialBtn} aria-label="Telegram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.329-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141a.506.506 0 01.171.325c.016.093.036.306.02.472z" /></svg>
              </button>
              <button type="button" className={styles.footerSocialBtn} aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </button>
              <button type="button" className={styles.footerSocialBtn} aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </button>
            </div>
            <div className={styles.footerPayments}>
              <span className={styles.footerPaymentBadge}>Visa</span>
              <span className={styles.footerPaymentBadge}>Mastercard</span>
              <span className={styles.footerPaymentBadge}>Uzcard</span>
              <span className={styles.footerPaymentBadge}>Humo</span>
              <span className={styles.footerPaymentBadge}>Payme</span>
              <span className={styles.footerPaymentBadge}>Click</span>
            </div>
          </div>

          <div className={styles.footerBottom}>
            &copy; 2026 GeekShop. Все права защищены
          </div>
        </div>
      </footer>
    </div>
  );
};
