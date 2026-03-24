'use client';
import { useState, useCallback, useRef, useEffect } from 'react';
import { DesktopShell } from '../../components/layout/DesktopShell';
import { DesktopHeaderMarketplace } from '../../components/navigation/DesktopHeader';
import { DesktopSaleHits } from '../../components/content/DesktopSaleHits';
import type { SaleHitItem } from '../../components/content/DesktopSaleHits';
import { DesktopSectionHeader } from '../../components/content/DesktopSectionHeader';
import { DesktopProductCard } from '../../components/product/DesktopProductCard';
import { DesktopTabFilter } from '../../components/navigation/DesktopTabFilter';
import type { DesktopTabFilterItem } from '../../components/navigation/DesktopTabFilter';
import { DesktopFooter } from '../../components/layout/DesktopFooter';
import type { DesktopFooterColumn } from '../../components/layout/DesktopFooter';
import type { MegaMenuCategory } from '../../components/navigation/MegaMenu';
import type { DesktopHeaderMarketplaceLabels } from '../../components/navigation/DesktopHeader';
import styles from './DesktopHomePage.module.scss';

// ─── Types ───────────────────────────────────────────────────────────────────

interface ProductItem {
  id: string;
  image: string;
  images?: string[];
  title: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  currency?: string;
  rating?: number;
  purchaseCount?: number;
  badges?: { label: string; variant?: 'sale' | 'top' | 'hot' }[];
  recommended?: boolean;
  deliveryText?: string;
  freeShipping?: boolean;
}

export interface DesktopHomePageProps {
  /** Logo for the header */
  logo?: React.ReactNode;
  /** Header labels for i18n */
  headerLabels?: DesktopHeaderMarketplaceLabels;
  /** MegaMenu categories */
  categories?: MegaMenuCategory[];
  /** Sale hits section items */
  saleHits?: SaleHitItem[];
  /** Product items for the grid */
  products?: ProductItem[];
  /** Product filter tabs (default: Sales, Recommended, Recently Added) */
  filterTabs?: DesktopTabFilterItem[];
  /** Footer columns */
  footerColumns?: DesktopFooterColumn[];
  /** Footer copyright */
  copyright?: string;
  /** Callback to load more products (infinite scroll) */
  onLoadMore?: () => void;
  /** Whether more products are being loaded */
  isLoading?: boolean;
  /** Whether there are more products to load */
  hasMore?: boolean;
  /** Callback when search is submitted */
  onSearch?: (query: string) => void;
  /** Callback when product is clicked */
  onProductClick?: (product: ProductItem) => void;
  /** Callback when filter tab changes */
  onFilterChange?: (key: string) => void;
  /** Search placeholder */
  searchPlaceholder?: string;
}

// ─── Defaults ────────────────────────────────────────────────────────────────

const defaultCategories: MegaMenuCategory[] = [
  { label: 'Electronics', subcategories: [{ label: 'Smartphones' }, { label: 'Laptops' }, { label: 'Headphones' }] },
  { label: 'Clothing', subcategories: [{ label: 'Men' }, { label: 'Women' }, { label: 'Kids' }] },
  { label: 'Home & Garden', subcategories: [{ label: 'Furniture' }, { label: 'Kitchen' }] },
  { label: 'Beauty', subcategories: [{ label: 'Skincare' }, { label: 'Makeup' }] },
  { label: 'Sports', subcategories: [{ label: 'Fitness' }, { label: 'Outdoor' }] },
];

const defaultFooterColumns: DesktopFooterColumn[] = [
  { title: 'CUSTOMERS', links: [{ label: 'Support' }, { label: 'Sale Calendar' }, { label: 'Help Center' }] },
  { title: 'PARTNERS', links: [{ label: 'Sell on Platform' }, { label: 'Affiliate Program' }] },
  { title: 'ABOUT', links: [{ label: 'Careers' }, { label: 'Press' }] },
  { title: 'SOCIAL', links: [{ label: 'Instagram' }, { label: 'Telegram' }] },
];

const defaultFilterTabs: DesktopTabFilterItem[] = [
  { key: 'sales', label: 'Sales' },
  { key: 'recommended', label: 'Recommended' },
  { key: 'recently', label: 'Recently Added' },
];

// ─── Component ───────────────────────────────────────────────────────────────

export function DesktopHomePage({
  logo,
  headerLabels,
  categories = defaultCategories,
  saleHits = [],
  products = [],
  filterTabs = defaultFilterTabs,
  footerColumns = defaultFooterColumns,
  copyright = '© MyShop 2026',
  onLoadMore,
  isLoading,
  hasMore = false,
  onSearch,
  onProductClick,
  onFilterChange,
  searchPlaceholder = 'Search products...',
}: DesktopHomePageProps) {
  const [searchValue, setSearchValue] = useState('');
  const [activeTab, setActiveTab] = useState(filterTabs[0]?.key ?? 'sales');
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Infinite scroll
  useEffect(() => {
    if (!onLoadMore || !hasMore || isLoading) return;
    const el = loadMoreRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) onLoadMore(); },
      { rootMargin: '200px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [onLoadMore, hasMore, isLoading]);

  const handleTabChange = useCallback((key: string) => {
    setActiveTab(key);
    onFilterChange?.(key);
  }, [onFilterChange]);

  const header = (
    <DesktopHeaderMarketplace
      logo={logo}
      labels={headerLabels}
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      onSearch={onSearch}
      categories={categories}
      searchPlaceholder={searchPlaceholder}
    />
  );

  const footer = (
    <DesktopFooter
      columns={footerColumns}
      copyright={copyright}
      policyLinks={[
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
      ]}
    />
  );

  return (
    <DesktopShell header={header} footer={footer}>
      <div className={styles.content}>
        {/* ─── Sale Hits ─── */}
        {saleHits.length > 0 && (
          <section className={styles.section}>
            <DesktopSaleHits items={saleHits} />
          </section>
        )}

        {/* ─── Products with Filter + Infinite Scroll ─── */}
        {products.length > 0 && (
          <section className={styles.section}>
            <div className={styles.productsHeader}>
              <DesktopSectionHeader title="Products" />
              <DesktopTabFilter
                tabs={filterTabs}
                activeTab={activeTab}
                onChange={handleTabChange}
                variant="pill"
                size="sm"
              />
            </div>

            <div className={styles.productGrid}>
              {products.map((product) => (
                <DesktopProductCard
                  key={product.id}
                  image={product.image}
                  images={product.images}
                  title={product.title}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  discount={product.discount}
                  currency={product.currency}
                  rating={product.rating}
                  purchaseCount={product.purchaseCount}
                  badges={product.badges}
                  recommended={product.recommended}
                  deliveryText={product.deliveryText}
                  freeShipping={product.freeShipping}
                  onClick={() => onProductClick?.(product)}
                />
              ))}
            </div>

            {hasMore && (
              <div ref={loadMoreRef} className={styles.loadMore}>
                {isLoading && <span className={styles.loadingText}>Loading...</span>}
              </div>
            )}
          </section>
        )}
      </div>
    </DesktopShell>
  );
}
