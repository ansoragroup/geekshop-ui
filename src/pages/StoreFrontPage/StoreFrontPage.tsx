import { useState, useCallback } from 'react';
import {
  NavBar,
  ShopCard,
  HeroBanner,
  TabFilter,
  ProductGrid,
  FloatingBubble,
  InfiniteScroll,
  useGeekShop,
} from '../../components';
import type { ProductCardFlatProps } from '../../components/product/ProductCard';
import { mockProducts } from '../_shared';
import styles from './StoreFrontPage.module.scss';

/* ---------- Static data ---------- */

const shopInfo = {
  name: 'TechZone Electronics',
  logo: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=64&h=64&fit=crop',
  rating: 4.8,
  followersCount: 12500,
  productsCount: 856,
  responseRate: 98,
};

const filterTabs = [
  { key: 'all', labelKey: 'storeFront.allProducts' },
  { key: 'new', labelKey: 'storeFront.newProducts' },
  { key: 'popular', labelKey: 'storeFront.popularProducts' },
  { key: 'discount', labelKey: 'storeFront.discountProducts' },
];

const allProducts: ProductCardFlatProps[] = mockProducts.map((p) => ({
  image: p.image,
  title: p.name,
  price: p.price,
  originalPrice: p.originalPrice,
  soldCount: `${Math.floor(Math.random() * 300 + 50)} dona sotilgan`,
  badge: p.badge as ProductCardFlatProps['badge'],
}));

const PRODUCTS_PER_PAGE = 6;

/* ---------- Icons ---------- */

const ChatIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);

/* ---------- Component ---------- */

export interface StoreFrontPageProps {
  /** Shop identifier (demo) */
  shopId?: string;
}

export const StoreFrontPage: React.FC<StoreFrontPageProps> = () => {
  const { t } = useGeekShop();
  const [activeTab, setActiveTab] = useState('all');
  const [isFollowed, setIsFollowed] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);
  const [loading, setLoading] = useState(false);

  const tabs = filterTabs.map((f) => ({
    key: f.key,
    label: t(f.labelKey),
  }));

  const visibleProducts = allProducts.slice(0, visibleCount);
  const hasMore = visibleCount < allProducts.length;

  const handleLoadMore = useCallback(() => {
    setLoading(true);
    // Simulate async load
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + PRODUCTS_PER_PAGE, allProducts.length));
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className={styles.page}>
      {/* NavBar */}
      <NavBar title={t('page.storeFront')} showBack onBack={() => {}} />

      {/* Shop Card */}
      <div className={styles.shopSection}>
        <ShopCard
          name={shopInfo.name}
          logo={shopInfo.logo}
          rating={shopInfo.rating}
          followersCount={shopInfo.followersCount}
          productsCount={shopInfo.productsCount}
          responseRate={shopInfo.responseRate}
          isFollowed={isFollowed}
          onFollow={() => setIsFollowed((prev) => !prev)}
        />
      </div>

      {/* HeroBanner */}
      <div className={styles.bannerSection}>
        <HeroBanner
          title={t('storeFront.discount', { percent: 50 })}
          subtitle="TechZone Electronics"
          bgGradient="linear-gradient(135deg, #FF5000 0%, #FF8A33 50%, #FFB366 100%)"
        />
      </div>

      {/* Tab Filter */}
      <div className={styles.tabsWrap}>
        <TabFilter tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      {/* Product Grid with InfiniteScroll */}
      <div className={styles.content}>
        <InfiniteScroll onLoadMore={handleLoadMore} hasMore={hasMore} loading={loading}>
          <ProductGrid products={visibleProducts} layout="grid" columns={2} gap={8} />
        </InfiniteScroll>
      </div>

      {/* Floating bubble for chat */}
      <FloatingBubble
        icon={<ChatIcon />}
        onClick={() => {}}
        position={{ right: 16, bottom: 24 }}
        aria-label={t('storeFront.messageToSeller')}
      />
    </div>
  );
};
