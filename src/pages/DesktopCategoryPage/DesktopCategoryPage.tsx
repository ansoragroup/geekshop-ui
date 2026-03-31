import { useState } from 'react';
import {
  DesktopShell,
  DesktopBreadcrumbs,
  DesktopSidebar,
  DesktopProductGrid,
  DesktopPagination,
} from '../../components';
import type { SidebarCategory, SidebarBrand, DesktopProductGridItem } from '../../components';
import { DefaultTopBar, DefaultHeader, DefaultMegaMenu, DefaultFooter } from '../_shared';
import styles from './DesktopCategoryPage.module.scss';

const sidebarCategories: SidebarCategory[] = [
  { label: 'All Graphics Cards', count: 195, active: true },
  { label: 'NVIDIA RTX 4090', count: 12 },
  { label: 'NVIDIA RTX 4080 Super', count: 18 },
  { label: 'NVIDIA RTX 4070 Super', count: 24 },
  { label: 'NVIDIA RTX 4060 Ti', count: 31 },
  { label: 'NVIDIA RTX 4060', count: 28 },
  { label: 'AMD RX 7900 XTX', count: 8 },
  { label: 'AMD RX 7800 XT', count: 15 },
  { label: 'AMD RX 7600', count: 22 },
];

const sidebarBrands: SidebarBrand[] = [
  { label: 'MSI', value: 'msi', checked: false },
  { label: 'ASUS', value: 'asus', checked: false },
  { label: 'EVGA', value: 'evga', checked: false },
  { label: 'Gigabyte', value: 'gigabyte', checked: false },
  { label: 'Zotac', value: 'zotac', checked: false },
  { label: 'Sapphire', value: 'sapphire', checked: false },
];

const products: DesktopProductGridItem[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&h=400&fit=crop',
    title: 'MSI GeForce RTX 4070 Super Gaming X Slim 12GB',
    price: 8900000,
    originalPrice: 9800000,
    discount: '-10%',
    rating: 4.5,
    reviewCount: 234,
    freeShipping: true,
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=400&fit=crop',
    title: 'ASUS ROG Strix RTX 4060 Ti OC 8GB GDDR6',
    price: 5200000,
    originalPrice: 6500000,
    discount: '-20%',
    rating: 4.3,
    reviewCount: 187,
    freeShipping: true,
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&h=400&fit=crop',
    title: 'Gigabyte RTX 4060 Eagle OC 8GB GDDR6',
    price: 4200000,
    rating: 4.2,
    reviewCount: 312,
    freeShipping: false,
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=400&fit=crop',
    title: 'MSI RTX 4080 Super Ventus 3X OC 16GB',
    price: 14500000,
    originalPrice: 16200000,
    discount: '-10%',
    rating: 4.7,
    reviewCount: 56,
    freeShipping: true,
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&h=400&fit=crop',
    title: 'ASUS Dual RTX 4060 OC 8GB GDDR6',
    price: 3900000,
    rating: 4.1,
    reviewCount: 278,
    freeShipping: false,
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=400&fit=crop',
    title: 'Zotac RTX 4070 Twin Edge 12GB GDDR6X',
    price: 7800000,
    originalPrice: 8500000,
    discount: '-8%',
    rating: 4.4,
    reviewCount: 123,
    freeShipping: true,
  },
  {
    id: '7',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&h=400&fit=crop',
    title: 'Sapphire RX 7800 XT Pulse 16GB',
    price: 6200000,
    rating: 4.6,
    reviewCount: 98,
    freeShipping: true,
  },
  {
    id: '8',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=400&fit=crop',
    title: 'MSI RTX 4060 Ti Ventus 2X 8GB GDDR6',
    price: 4800000,
    originalPrice: 5600000,
    discount: '-14%',
    rating: 4.3,
    reviewCount: 201,
    freeShipping: false,
  },
  {
    id: '9',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&h=400&fit=crop',
    title: 'ASUS TUF RTX 4070 OC 12GB GDDR6X',
    price: 7500000,
    rating: 4.5,
    reviewCount: 145,
    freeShipping: true,
  },
  {
    id: '10',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=400&fit=crop',
    title: 'Gigabyte RX 7600 Gaming OC 8GB',
    price: 3200000,
    rating: 4.0,
    reviewCount: 367,
    freeShipping: false,
  },
  {
    id: '11',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&h=400&fit=crop',
    title: 'EVGA RTX 4060 XC Gaming 8GB GDDR6',
    price: 3800000,
    rating: 4.2,
    reviewCount: 89,
    freeShipping: false,
  },
  {
    id: '12',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=400&fit=crop',
    title: 'MSI RTX 4090 Suprim X 24GB GDDR6X',
    price: 22000000,
    originalPrice: 24500000,
    discount: '-10%',
    rating: 4.9,
    reviewCount: 34,
    freeShipping: true,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export interface DesktopCategoryPageProps {
  /** Override products. Defaults to hardcoded GPU products. */
  initialProducts?: DesktopProductGridItem[];
  /** Category name shown in breadcrumb and title */
  categoryName?: string;
  /** Number of grid columns */
  columns?: number;
}

export const DesktopCategoryPage: React.FC<DesktopCategoryPageProps> = ({
  initialProducts,
  categoryName = 'Graphics Cards',
  columns = 4,
}) => {
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const displayProducts = initialProducts ?? products;

  const sidebar = (
    <DesktopSidebar
      categories={sidebarCategories}
      brands={sidebarBrands}
      priceRange={{ min: 0, max: 25000000 }}
      onCategorySelect={() => {}}
      onBrandToggle={() => {}}
      onPriceChange={() => {}}
      onRatingChange={() => {}}
    />
  );

  return (
    <DesktopShell
      topBar={<DefaultTopBar />}
      header={
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <DefaultHeader />
          <DefaultMegaMenu />
        </div>
      }
      footer={<DefaultFooter />}
      sidebar={sidebar}
    >
      {/* Breadcrumbs */}
      <div className={styles.breadcrumbs}>
        <DesktopBreadcrumbs items={[{ label: 'Home', href: '#' }, { label: categoryName }]} />
      </div>

      {/* Page header */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>{categoryName}</h1>
      </div>

      {/* Product grid with built-in toolbar */}
      <div className={styles.productsArea}>
        {displayProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#999' }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: '#333', marginBottom: 8 }}>
              No products found
            </h2>
            <p style={{ fontSize: 14 }}>Try adjusting your filters or search for something else.</p>
          </div>
        ) : (
          <>
            <DesktopProductGrid
              products={displayProducts}
              totalCount={displayProducts.length}
              viewMode={viewMode as 'grid' | 'list'}
              columns={columns}
              onViewModeChange={setViewMode}
              sortOptions={[
                { id: 'relevance', label: 'Relevance' },
                { id: 'price-asc', label: 'Price: Low to High' },
                { id: 'price-desc', label: 'Price: High to Low' },
                { id: 'rating', label: 'Rating' },
              ]}
              activeSortId="relevance"
            />
            <div className={styles.paginationWrap}>
              <DesktopPagination
                currentPage={currentPage}
                totalPages={Math.max(1, Math.ceil(displayProducts.length / 12))}
                onPageChange={setCurrentPage}
                siblingCount={2}
              />
            </div>
          </>
        )}
      </div>
    </DesktopShell>
  );
};
