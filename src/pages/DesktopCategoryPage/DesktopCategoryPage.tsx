import { useState } from 'react';
import {
  DesktopShell,
  TopBar,
  DesktopHeader,
  MegaMenu,
  Footer,
  Breadcrumbs,
  DesktopSidebar,
  ProductGrid,
  ProductListItem,
  Pagination,
  Segmented,
} from '../../components';
import type { MegaMenuCategory, SidebarCategory, SidebarBrand } from '../../components';
import type { ProductCardFlatProps } from '../../components/product/ProductCard';
import styles from './DesktopCategoryPage.module.scss';

// ─── Icons ────────────────────────────────────────────────────────────────────

const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <rect x="0" y="0" width="7" height="7" rx="1" />
    <rect x="9" y="0" width="7" height="7" rx="1" />
    <rect x="0" y="9" width="7" height="7" rx="1" />
    <rect x="9" y="9" width="7" height="7" rx="1" />
  </svg>
);

const ListIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <rect x="0" y="0" width="16" height="3" rx="1" />
    <rect x="0" y="4.5" width="16" height="3" rx="1" />
    <rect x="0" y="9" width="16" height="3" rx="1" />
    <rect x="0" y="13" width="16" height="3" rx="1" />
  </svg>
);

// ─── Static data ──────────────────────────────────────────────────────────────

const megaMenuCategories: MegaMenuCategory[] = [
  { label: 'Graphics Cards', subcategories: [{ label: 'NVIDIA RTX 40' }, { label: 'AMD Radeon RX' }] },
  { label: 'Processors', subcategories: [{ label: 'AMD Ryzen 7000' }, { label: 'Intel 14th Gen' }] },
  { label: 'Monitors' },
  { label: 'Laptops' },
  { label: 'Memory (RAM)' },
  { label: 'Storage' },
  { label: 'Peripherals' },
  { label: 'Cases & Cooling' },
];

const footerColumns = [
  { title: 'Customer Service', links: [{ label: 'Help Center' }, { label: 'Returns & Refunds' }, { label: 'Shipping Info' }] },
  { title: 'About GeekShop', links: [{ label: 'About Us' }, { label: 'Careers' }, { label: 'Press' }] },
  { title: 'Policies', links: [{ label: 'Privacy Policy' }, { label: 'Terms of Service' }] },
];

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

const gridProducts: ProductCardFlatProps[] = [
  { image: 'https://picsum.photos/seed/cat-gpu1/400/400', title: 'MSI GeForce RTX 4070 Super Gaming X Slim 12GB', price: 8900000, originalPrice: 9800000, soldCount: '234 sold', badge: 'top' },
  { image: 'https://picsum.photos/seed/cat-gpu2/400/400', title: 'ASUS ROG Strix RTX 4060 Ti OC 8GB GDDR6', price: 5200000, originalPrice: 6500000, soldCount: '187 sold', badge: 'hot' },
  { image: 'https://picsum.photos/seed/cat-gpu3/400/400', title: 'Gigabyte RTX 4060 Eagle OC 8GB GDDR6', price: 4200000, soldCount: '312 sold', badge: 'new' },
  { image: 'https://picsum.photos/seed/cat-gpu4/400/400', title: 'MSI RTX 4080 Super Ventus 3X OC 16GB', price: 14500000, originalPrice: 16200000, soldCount: '56 sold', badge: 'top' },
  { image: 'https://picsum.photos/seed/cat-gpu5/400/400', title: 'ASUS Dual RTX 4060 OC 8GB GDDR6', price: 3900000, soldCount: '278 sold' },
  { image: 'https://picsum.photos/seed/cat-gpu6/400/400', title: 'Zotac RTX 4070 Twin Edge 12GB GDDR6X', price: 7800000, originalPrice: 8500000, soldCount: '123 sold' },
  { image: 'https://picsum.photos/seed/cat-gpu7/400/400', title: 'Sapphire RX 7800 XT Pulse 16GB', price: 6200000, soldCount: '98 sold', badge: 'hot' },
  { image: 'https://picsum.photos/seed/cat-gpu8/400/400', title: 'MSI RTX 4060 Ti Ventus 2X 8GB GDDR6', price: 4800000, originalPrice: 5600000, soldCount: '201 sold' },
  { image: 'https://picsum.photos/seed/cat-gpu9/400/400', title: 'ASUS TUF RTX 4070 OC 12GB GDDR6X', price: 7500000, soldCount: '145 sold', badge: 'top' },
  { image: 'https://picsum.photos/seed/cat-gpu10/400/400', title: 'Gigabyte RX 7600 Gaming OC 8GB', price: 3200000, soldCount: '367 sold', badge: 'new' },
  { image: 'https://picsum.photos/seed/cat-gpu11/400/400', title: 'EVGA RTX 4060 XC Gaming 8GB GDDR6', price: 3800000, soldCount: '89 sold' },
  { image: 'https://picsum.photos/seed/cat-gpu12/400/400', title: 'MSI RTX 4090 Suprim X 24GB GDDR6X', price: 22000000, originalPrice: 24500000, soldCount: '34 sold', badge: 'top' },
];

const listProducts = gridProducts.map((p) => ({
  image: p.image,
  title: p.title,
  price: p.price,
  originalPrice: p.originalPrice,
  rating: 4.0 + Math.random(),
  reviewCount: Math.floor(Math.random() * 200) + 10,
  inStock: true,
  freeShipping: p.price > 5000000,
}));

// ─── Shared shell slots ──────────────────────────────────────────────────────

const DesktopTopBar = () => (
  <TopBar
    leftItems={[<span key="w">Welcome to GeekShop!</span>, <span key="s">Seller Center</span>, <span key="h">Help</span>]}
    rightItems={[
      <button key="l" type="button" style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: 'inherit' }}>EN</button>,
      <button key="c" type="button" style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: 'inherit' }}>USD</button>,
    ]}
  />
);

const DesktopHeaderBar = () => (
  <DesktopHeader
    logo={<span style={{ fontWeight: 700, fontSize: 20, color: '#FF5000' }}>GeekShop</span>}
    searchPlaceholder="Search products..."
    cartCount={3}
    wishlistCount={5}
  />
);

const DesktopMegaMenuBar = () => (
  <MegaMenu categories={megaMenuCategories} navItems={[{ label: 'Flash Deals' }, { label: 'New Arrivals' }, { label: 'Top Brands' }]} />
);

const DesktopFooterSection = () => (
  <Footer columns={footerColumns} copyrightText="\u00A9 2026 GeekShop. All rights reserved." />
);

// ─── Component ────────────────────────────────────────────────────────────────

export const DesktopCategoryPage: React.FC = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);

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
      topBar={<DesktopTopBar />}
      header={
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <DesktopHeaderBar />
          <DesktopMegaMenuBar />
        </div>
      }
      footer={<DesktopFooterSection />}
      sidebar={sidebar}
    >
      {/* Breadcrumbs */}
      <div className={styles.breadcrumbs}>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '#' },
            { label: 'Graphics Cards' },
          ]}
        />
      </div>

      {/* Page header */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Graphics Cards <span className={styles.productCount}>(42 products)</span></h1>
        <div className={styles.viewToggle}>
          <Segmented
            options={[
              { value: 'grid', label: 'Grid', icon: <GridIcon /> },
              { value: 'list', label: 'List', icon: <ListIcon /> },
            ]}
            value={viewMode}
            onChange={setViewMode}
          />
        </div>
      </div>

      {/* Product grid or list */}
      <div className={styles.productsArea}>
        {viewMode === 'grid' ? (
          <ProductGrid
            products={gridProducts}
            layout="grid"
            columns={4}
            gap={16}
          />
        ) : (
          <div className={styles.listView}>
            {listProducts.map((product, i) => (
              <ProductListItem key={i} {...product} />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className={styles.paginationWrap}>
        <Pagination
          currentPage={currentPage}
          totalPages={12}
          onPageChange={setCurrentPage}
          siblingCount={2}
        />
      </div>
    </DesktopShell>
  );
};
