import { useState } from 'react';
import {
  DesktopShell,
  TopBar,
  DesktopHeaderRich,
  MegaMenu,
  Footer,
  Breadcrumbs,
  DesktopComparisonTable,
  DesktopEmpty,
} from '../../components';
import type {
  MegaMenuCategory,
  CategoryItem,
  PromoLink,
  DesktopComparisonProduct,
  DesktopComparisonSpec,
} from '../../components';
import styles from './DesktopCompareProductsPage.module.scss';

const footerColumns = [
  { title: 'Customer Service', links: [{ label: 'Help Center' }, { label: 'Returns & Refunds' }] },
  { title: 'About GeekShop', links: [{ label: 'About Us' }, { label: 'Careers' }] },
  { title: 'Policies', links: [{ label: 'Privacy Policy' }, { label: 'Terms of Service' }] },
];

const megaMenuCategories: MegaMenuCategory[] = [
  { label: 'Graphics Cards', subcategories: [{ label: 'NVIDIA RTX 40' }, { label: 'AMD Radeon RX' }] },
  { label: 'Processors' },
  { label: 'Monitors' },
];

const headerCategories: CategoryItem[] = [
  { id: '1', label: 'Smartphones', icon: '' },
  { id: '2', label: 'Laptops', icon: '' },
];

const promoLinks: PromoLink[] = [
  { id: '1', label: 'Delivery & Returns' },
  { id: '2', label: 'Premium', highlight: true },
];

const initialProducts: DesktopComparisonProduct[] = [
  { id: 'gpu1', name: 'MSI RTX 4060 Ventus 2X 8GB', image: 'https://picsum.photos/seed/cmp-gpu1/300/300', price: 5200000 },
  { id: 'gpu2', name: 'ASUS Dual RTX 4060 OC 8GB', image: 'https://picsum.photos/seed/cmp-gpu2/300/300', price: 4800000 },
  { id: 'gpu3', name: 'Gigabyte RTX 4060 Eagle OC 8GB', image: 'https://picsum.photos/seed/cmp-gpu3/300/300', price: 4500000 },
];

const specs: DesktopComparisonSpec[] = [
  { key: 'gpu', label: 'GPU Chip', values: { gpu1: 'AD107', gpu2: 'AD107', gpu3: 'AD107' } },
  { key: 'memory', label: 'Memory', values: { gpu1: '8 GB GDDR6', gpu2: '8 GB GDDR6', gpu3: '8 GB GDDR6' } },
  { key: 'bus', label: 'Memory Bus', values: { gpu1: '128-bit', gpu2: '128-bit', gpu3: '128-bit' } },
  { key: 'base', label: 'Base Clock', values: { gpu1: '1830 MHz', gpu2: '1830 MHz', gpu3: '1830 MHz' }, unit: 'MHz' },
  { key: 'boost', label: 'Boost Clock', values: { gpu1: '2475 MHz', gpu2: '2535 MHz', gpu3: '2460 MHz' }, unit: 'MHz' },
  { key: 'cuda', label: 'CUDA Cores', values: { gpu1: 3072, gpu2: 3072, gpu3: 3072 } },
  { key: 'tdp', label: 'TDP', values: { gpu1: '115W', gpu2: '115W', gpu3: '115W' } },
  { key: 'length', label: 'Card Length', values: { gpu1: '247 mm', gpu2: '228 mm', gpu3: '261 mm' }, unit: 'mm' },
  { key: 'fans', label: 'Fans', values: { gpu1: 2, gpu2: 2, gpu3: 2 } },
  { key: 'outputs', label: 'Display Outputs', values: { gpu1: '3x DP, 1x HDMI', gpu2: '3x DP, 1x HDMI', gpu3: '2x DP, 2x HDMI' } },
  { key: 'warranty', label: 'Warranty', values: { gpu1: '3 years', gpu2: '3 years', gpu3: '3 years' } },
  { key: 'shipping', label: 'Free Shipping', values: { gpu1: true, gpu2: true, gpu3: false } },
];

export interface DesktopCompareProductsPageProps {
  /** Override products to compare */
  compareProducts?: DesktopComparisonProduct[];
}

export const DesktopCompareProductsPage: React.FC<DesktopCompareProductsPageProps> = ({
  compareProducts,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [products, setProducts] = useState(compareProducts ?? initialProducts);

  const handleRemove = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const filteredSpecs = specs.map((spec) => ({
    ...spec,
    values: Object.fromEntries(
      Object.entries(spec.values).filter(([key]) => products.some((p) => p.id === key))
    ),
  }));

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
        <Breadcrumbs items={[{ label: 'Home', href: '#' }, { label: 'Graphics Cards', href: '#' }, { label: 'Compare Products' }]} />
      </div>

      <h1 className={styles.pageTitle}>Compare Products ({products.length})</h1>

      {products.length === 0 ? (
        <DesktopEmpty
          title="No products to compare"
          description="Add products from category pages to compare them side by side."
        />
      ) : (
        <div className={styles.tableWrap}>
          <DesktopComparisonTable
            products={products}
            specs={filteredSpecs}
            highlightDifferences
            onRemoveProduct={handleRemove}
          />
        </div>
      )}
    </DesktopShell>
  );
};
