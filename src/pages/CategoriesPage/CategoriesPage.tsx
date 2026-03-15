import { useState } from 'react';
import {
  NavBar,
  SearchBar,
  CategorySidebar,
  TabBar,
} from '../../components';
import type { ProductCardFlatProps } from '../../components/product/ProductCard/ProductCard';
import { ProductCard } from '../../components';
import styles from './CategoriesPage.module.scss';

/* ---------- Subcategory data ---------- */

interface SubcategoryItem {
  key: string;
  label: string;
  color: string;
  icon: React.ReactNode;
}

const categorySubcategories: Record<string, SubcategoryItem[]> = {
  gpu: [
    {
      key: 'nvidia',
      label: 'NVIDIA',
      color: '#76B900',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#76B900" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12l5-5v3h8V7l5 5-5 5v-3H7v3z" />
        </svg>
      ),
    },
    {
      key: 'amd-radeon',
      label: 'AMD Radeon',
      color: '#ED1C24',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ED1C24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 22 20 2 20" />
        </svg>
      ),
    },
    {
      key: 'intel-arc',
      label: 'Intel Arc',
      color: '#0071C5',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0071C5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="3" />
          <path d="M9 12h6M12 9v6" />
        </svg>
      ),
    },
    {
      key: 'workstation',
      label: 'Workstation',
      color: '#8B5CF6',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      ),
    },
  ],
  cpu: [
    {
      key: 'amd-ryzen',
      label: 'AMD Ryzen',
      color: '#ED1C24',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ED1C24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 22 20 2 20" />
        </svg>
      ),
    },
    {
      key: 'intel-core',
      label: 'Intel Core',
      color: '#0071C5',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0071C5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="3" />
          <path d="M9 12h6M12 9v6" />
        </svg>
      ),
    },
    {
      key: 'server',
      label: 'Server CPU',
      color: '#059669',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="6" rx="1" />
          <rect x="2" y="15" width="20" height="6" rx="1" />
          <path d="M6 9v6M12 9v6M18 9v6" />
        </svg>
      ),
    },
  ],
  monitor: [
    {
      key: 'gaming',
      label: 'Gaming',
      color: '#EF4444',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      ),
    },
    {
      key: 'office',
      label: 'Ofis',
      color: '#3B82F6',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      ),
    },
    {
      key: 'ultrawide',
      label: 'Ultrawide',
      color: '#8B5CF6',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="5" width="22" height="12" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      ),
    },
  ],
};

/* ---------- Category banner config ---------- */

interface CategoryBannerConfig {
  title: string;
  gradient: string;
  productCount: number;
  icon: React.ReactNode;
}

const categoryBannerConfig: Record<string, CategoryBannerConfig> = {
  gpu: {
    title: 'Videokartalar',
    gradient: 'linear-gradient(135deg, #059669 0%, #34D399 100%)',
    productCount: 4,
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <circle cx="12" cy="12" r="3" />
        <path d="M6 6V4M10 6V4M14 6V4M18 6V4" />
      </svg>
    ),
  },
  cpu: {
    title: 'Protsessorlar',
    gradient: 'linear-gradient(135deg, #2563EB 0%, #60A5FA 100%)',
    productCount: 4,
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" rx="1" />
        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
      </svg>
    ),
  },
  monitor: {
    title: 'Monitorlar',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
    productCount: 3,
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  laptop: {
    title: 'Noutbuklar',
    gradient: 'linear-gradient(135deg, #DC2626 0%, #F87171 100%)',
    productCount: 5,
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v8H4V6z" />
        <path d="M2 18h20" />
      </svg>
    ),
  },
  ram: {
    title: 'Operativ xotira',
    gradient: 'linear-gradient(135deg, #D97706 0%, #FBBF24 100%)',
    productCount: 6,
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="8" width="20" height="8" rx="1" />
        <path d="M6 8V6M10 8V6M14 8V6M18 8V6" />
        <path d="M6 16v2M10 16v2M14 16v2M18 16v2" />
      </svg>
    ),
  },
  storage: {
    title: 'SSD/HDD',
    gradient: 'linear-gradient(135deg, #0891B2 0%, #67E8F9 100%)',
    productCount: 8,
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M7 10h4M7 14h2" />
      </svg>
    ),
  },
  motherboard: {
    title: 'Ona platalar',
    gradient: 'linear-gradient(135deg, #4338CA 0%, #818CF8 100%)',
    productCount: 3,
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <rect x="7" y="7" width="4" height="4" rx="0.5" />
        <rect x="14" y="7" width="3" height="3" rx="0.5" />
        <path d="M7 15h10M7 18h6" />
      </svg>
    ),
  },
  periphery: {
    title: 'Periferiya',
    gradient: 'linear-gradient(135deg, #BE185D 0%, #F472B6 100%)',
    productCount: 12,
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 17a2 2 0 01-2-2V7a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2" />
        <path d="M8 21h8" />
        <rect x="9" y="17" width="6" height="4" rx="1" />
      </svg>
    ),
  },
};

/* ---------- Product data ---------- */

const categoryProducts: Record<string, ProductCardFlatProps[]> = {
  gpu: [
    {
      image: 'https://picsum.photos/seed/cat-rtx4090/300/400',
      title: 'RTX 4090 Founders Edition 24GB',
      price: 19800000,
      soldCount: '120+ sotilgan',
      badge: 'hot' as const,
    },
    {
      image: 'https://picsum.photos/seed/cat-rtx4080/300/340',
      title: 'RTX 4080 Super ASUS TUF 16GB',
      price: 13500000,
      originalPrice: 15000000,
      discount: '-10%',
    },
    {
      image: 'https://picsum.photos/seed/cat-rtx4070ti/300/360',
      title: 'RTX 4070 Ti MSI Gaming X 12GB',
      price: 9200000,
      badge: 'top' as const,
      soldCount: '340+ sotilgan',
    },
    {
      image: 'https://picsum.photos/seed/cat-rx7900xtx/300/320',
      title: 'RX 7900 XTX Sapphire Nitro+ 24GB',
      price: 12800000,
    },
    {
      image: 'https://picsum.photos/seed/cat-rtx4060/300/380',
      title: 'RTX 4060 Ti MSI Ventus 2X 8GB',
      price: 5200000,
      badge: 'new' as const,
    },
    {
      image: 'https://picsum.photos/seed/cat-rx7800xt/300/350',
      title: 'RX 7800 XT PowerColor Red Devil 16GB',
      price: 7400000,
      soldCount: '90+ sotilgan',
    },
  ],
  cpu: [
    {
      image: 'https://picsum.photos/seed/cat-r9-7950x/300/360',
      title: 'AMD Ryzen 9 7950X 16 yadro',
      price: 7490000,
      badge: 'hot' as const,
    },
    {
      image: 'https://picsum.photos/seed/cat-i9-14900k/300/340',
      title: 'Intel Core i9-14900K',
      price: 8200000,
    },
    {
      image: 'https://picsum.photos/seed/cat-r7-7800x3d/300/380',
      title: 'AMD Ryzen 7 7800X3D',
      price: 4100000,
      badge: 'top' as const,
      soldCount: '250+ sotilgan',
    },
    {
      image: 'https://picsum.photos/seed/cat-i7-14700k/300/320',
      title: 'Intel Core i7-14700K',
      price: 5800000,
      originalPrice: 6200000,
      discount: '-6%',
    },
  ],
};

export interface CategoriesPageProps {
  showSearch?: boolean;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({
  showSearch = false,
}) => {
  const [activeCategory, setActiveCategory] = useState('gpu');
  const [searchValue, setSearchValue] = useState('');

  const products = categoryProducts[activeCategory] ?? categoryProducts.gpu;
  const banner = categoryBannerConfig[activeCategory] ?? categoryBannerConfig.gpu;
  const subcategories = categorySubcategories[activeCategory] ?? [];

  const filteredProducts = searchValue
    ? products.filter((p) =>
        p.title.toLowerCase().includes(searchValue.toLowerCase()),
      )
    : products;

  // Split products into two rows for display
  const popularProducts = filteredProducts.slice(0, 4);
  const moreProducts = filteredProducts.slice(4);

  return (
    <div className={styles.page}>
      <NavBar title="Kategoriyalar" showBack={false} />

      {showSearch && (
        <div className={styles.searchWrap}>
          <SearchBar
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Kategoriyada qidirish..."
            variant="filled"
          />
        </div>
      )}

      <div className={styles.body}>
        <CategorySidebar
          activeKey={activeCategory}
          onChange={setActiveCategory}
        />

        <main className={styles.content}>
          {/* Category Banner */}
          <div
            className={styles.banner}
            style={{ background: banner.gradient }}
          >
            <div className={styles.bannerText}>
              <h2 className={styles.bannerTitle}>{banner.title}</h2>
              <span className={styles.bannerCount}>
                {banner.productCount} ta mahsulot
              </span>
            </div>
            <div className={styles.bannerIcon}>{banner.icon}</div>
          </div>

          {/* Subcategories */}
          {subcategories.length > 0 && (
            <div className={styles.subcategoriesSection}>
              <h3 className={styles.sectionTitle}>Turkumlar</h3>
              <div className={styles.subcategoriesRow}>
                {subcategories.map((sub) => (
                  <button
                    key={sub.key}
                    type="button"
                    className={styles.subcategoryItem}
                  >
                    <div
                      className={styles.subcategoryIcon}
                      style={{ background: `${sub.color}15` }}
                    >
                      {sub.icon}
                    </div>
                    <span className={styles.subcategoryLabel}>{sub.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Popular Products - Horizontal Scroll */}
          {popularProducts.length > 0 && (
            <div className={styles.productsSection}>
              <h3 className={styles.sectionTitle}>Ommabop</h3>
              <div className={styles.horizontalScroll}>
                {popularProducts.map((product, i) => (
                  <div key={i} className={styles.scrollCard}>
                    <ProductCard
                      {...product}
                      imageAspectRatio="1/1"
                      className={styles.miniCard}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* More Products Row */}
          {moreProducts.length > 0 && (
            <div className={styles.productsSection}>
              <div className={styles.horizontalScroll}>
                {moreProducts.map((product, i) => (
                  <div key={i} className={styles.scrollCard}>
                    <ProductCard
                      {...product}
                      imageAspectRatio="1/1"
                      className={styles.miniCard}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* View All Button */}
          <button type="button" className={styles.viewAllBtn}>
            Barchasini ko'rish
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </main>
      </div>

      <TabBar activeKey="categories" onChange={() => {}} />
    </div>
  );
};

export default CategoriesPage;
