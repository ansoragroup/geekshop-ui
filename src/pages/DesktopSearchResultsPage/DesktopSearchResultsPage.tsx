import { useState } from 'react';
import {
  DesktopShell,
  TopBar,
  DesktopHeaderRich,
  MegaMenu,
  Footer,
  Breadcrumbs,
  DesktopProductGrid,
  DesktopFilterPanel,
  Pagination,
} from '../../components';
import type {
  MegaMenuCategory,
  CategoryItem,
  PromoLink,
  DesktopProductGridItem,
  DesktopFilterGroup,
  DesktopFilterValues,
} from '../../components';
import styles from './DesktopSearchResultsPage.module.scss';

// ─── Static data ──────────────────────────────────────────────────────────────

const footerColumns = [
  { title: 'Customer Service', links: [{ label: 'Help Center' }, { label: 'Returns & Refunds' }, { label: 'Shipping Info' }] },
  { title: 'About GeekShop', links: [{ label: 'About Us' }, { label: 'Careers' }, { label: 'Press' }] },
  { title: 'Policies', links: [{ label: 'Privacy Policy' }, { label: 'Terms of Service' }] },
  { title: 'Connect', links: [{ label: 'Telegram' }, { label: 'Instagram' }] },
];

const megaMenuCategories: MegaMenuCategory[] = [
  { label: 'Graphics Cards', subcategories: [{ label: 'NVIDIA RTX 40' }, { label: 'AMD Radeon RX' }] },
  { label: 'Processors' },
  { label: 'Monitors' },
  { label: 'Laptops' },
];

const headerCategories: CategoryItem[] = [
  { id: '1', label: 'Smartphones', icon: '' },
  { id: '2', label: 'Laptops', icon: '' },
];

const promoLinks: PromoLink[] = [
  { id: '1', label: 'Delivery & Returns' },
  { id: '2', label: 'Premium', highlight: true },
];

const filterGroups: DesktopFilterGroup[] = [
  {
    id: 'price',
    label: 'Price Range',
    type: 'range',
    min: 0,
    max: 30000000,
  },
  {
    id: 'brand',
    label: 'Brand',
    type: 'checkbox',
    options: [
      { id: 'apple', label: 'Apple', count: 12 },
      { id: 'samsung', label: 'Samsung', count: 8 },
      { id: 'asus', label: 'ASUS', count: 15 },
      { id: 'msi', label: 'MSI', count: 10 },
      { id: 'logitech', label: 'Logitech', count: 6 },
    ],
  },
  {
    id: 'rating',
    label: 'Rating',
    type: 'checkbox',
    options: [
      { id: '4up', label: '4 stars & up', count: 38 },
      { id: '3up', label: '3 stars & up', count: 45 },
    ],
  },
  {
    id: 'shipping',
    label: 'Availability',
    type: 'checkbox',
    options: [
      { id: 'free-ship', label: 'Free Shipping', count: 28 },
      { id: 'in-stock', label: 'In Stock', count: 42 },
    ],
  },
];

const searchResults: DesktopProductGridItem[] = [
  { id: 's1', image: 'https://c1.neweggimages.com/ProductImageCompressAll1280/34-346-003-V01.jpg', title: 'Apple MacBook Air M3 15" 16GB RAM 512GB', price: 18900000, originalPrice: 21500000, discount: '-12%', rating: 4.9, reviewCount: 567, freeShipping: true },
  { id: 's2', image: 'https://c1.neweggimages.com/ProductImageCompressAll1280/20-147-874-V01.jpg', title: 'Samsung 990 Pro 2TB NVMe SSD', price: 2400000, rating: 4.8, reviewCount: 1234, freeShipping: true },
  { id: 's3', image: 'https://c1.neweggimages.com/ProductImageCompressAll1280/14-126-678-V01.jpg', title: 'ASUS ROG Strix RTX 4070 Super OC 12GB', price: 8900000, originalPrice: 10200000, discount: '-13%', rating: 4.7, reviewCount: 345, freeShipping: true },
  { id: 's4', image: 'https://c1.neweggimages.com/ProductImageCompressAll1280/26-106-967-V01.jpg', title: 'Sony WH-1000XM5 Wireless Noise Cancelling', price: 3900000, rating: 4.8, reviewCount: 2100, freeShipping: false },
  { id: 's5', image: 'https://c1.neweggimages.com/ProductImageCompressAll1280/23-816-215-V01.jpg', title: 'Keychron Q1 Pro 75% Mechanical Keyboard', price: 1850000, originalPrice: 2200000, discount: '-16%', rating: 4.6, reviewCount: 890, freeShipping: true },
  { id: 's6', image: 'https://c1.neweggimages.com/ProductImageCompressAll1280/24-260-907-V01.jpg', title: 'Dell UltraSharp U2723QE 27" 4K USB-C Monitor', price: 5600000, rating: 4.7, reviewCount: 432, freeShipping: true },
  { id: 's7', image: 'https://c1.neweggimages.com/ProductImageCompressAll1280/19-113-771-V01.jpg', title: 'AMD Ryzen 9 7950X3D Processor', price: 7200000, originalPrice: 8500000, discount: '-15%', rating: 4.9, reviewCount: 234, freeShipping: true },
  { id: 's8', image: 'https://c1.neweggimages.com/ProductImageCompressAll1280/26-153-388-V01.jpg', title: 'Razer DeathAdder V3 HyperSpeed Wireless', price: 1200000, rating: 4.5, reviewCount: 1567, freeShipping: false },
  { id: 's9', image: 'https://c1.neweggimages.com/ProductImageCompressAll1280/AAFBS2209230001IY3G205.jpg', title: 'Samsung Galaxy S24 Ultra 256GB', price: 12500000, originalPrice: 16900000, discount: '-26%', rating: 4.8, reviewCount: 1234, freeShipping: true },
  { id: 's10', image: 'https://c1.neweggimages.com/ProductImageCompressAll1280/36-785-024-V01.jpg', title: 'Apple AirPods Pro 2nd Gen USB-C', price: 2800000, originalPrice: 3500000, discount: '-20%', rating: 4.9, reviewCount: 892, freeShipping: true },
];

// ─── Component ────────────────────────────────────────────────────────────────

export interface DesktopSearchResultsPageProps {
  /** Initial search query */
  query?: string;
  /** Override products. Defaults to hardcoded results. */
  initialProducts?: DesktopProductGridItem[];
  /** Show skeleton loading state */
  loading?: boolean;
}

export const DesktopSearchResultsPage: React.FC<DesktopSearchResultsPageProps> = ({
  query = 'laptop',
  initialProducts,
  loading = false,
}) => {
  const [searchValue, setSearchValue] = useState(query);
  const displayResults = initialProducts ?? searchResults;
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValues, setFilterValues] = useState<DesktopFilterValues>({});

  const header = (
    <div className={styles.headerWrapper}>
      <DesktopHeaderRich
        logo={<span className={styles.logoText}>GeekShop</span>}
        searchPlaceholder="Search products..."
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        cartCount={3}
        wishlistCount={5}
        categories={headerCategories}
        promoLinks={promoLinks}
        location="Tashkent"
      />
      <MegaMenu categories={megaMenuCategories} navItems={[{ label: 'Flash Deals' }, { label: 'New Arrivals' }]} />
    </div>
  );

  return (
    <DesktopShell
      topBar={
        <TopBar
          leftItems={[<span key="w">Welcome to GeekShop!</span>]}
          rightItems={[
            <button key="l" type="button" className={styles.topBarBtn}>EN</button>,
            <button key="c" type="button" className={styles.topBarBtn}>UZS</button>,
          ]}
        />
      }
      header={header}
      footer={<Footer columns={footerColumns} copyrightText="© 2026 GeekShop. All rights reserved." />}
    >
      <div className={styles.breadcrumbs}>
        <Breadcrumbs items={[{ label: 'Home', href: '#' }, { label: `Search: "${searchValue}"` }]} />
      </div>

      <h1 className={styles.pageTitle}>
        {displayResults.length} results for &ldquo;{searchValue}&rdquo;
      </h1>

      <div className={styles.layout}>
        {/* Left: Filters */}
        <aside className={styles.filterSidebar}>
          <DesktopFilterPanel
            groups={filterGroups}
            values={filterValues}
            onChange={setFilterValues}
          />
        </aside>

        {/* Right: Results */}
        <div className={styles.resultsColumn}>
          <div className={styles.sortBar}>
            <span className={styles.sortLabel}>Sort by:</span>
            <select className={styles.sortSelect}>
              <option>Relevance</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Best Rating</option>
              <option>Most Reviews</option>
            </select>
          </div>

          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} style={{ background: '#f5f5f5', borderRadius: 12, height: 320, animation: 'pulse 1.5s ease-in-out infinite' }} />
              ))}
            </div>
          ) : displayResults.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#999' }}>
              <h2 style={{ fontSize: 20, fontWeight: 600, color: '#333', marginBottom: 8 }}>No results found</h2>
              <p style={{ fontSize: 14 }}>Try different keywords or browse our categories.</p>
            </div>
          ) : (
            <>
              <DesktopProductGrid
                products={displayResults}
                columns={4}
                viewMode="grid"
              />
              <div className={styles.paginationWrap}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.max(1, Math.ceil(displayResults.length / 12))}
                  onPageChange={setCurrentPage}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </DesktopShell>
  );
};
