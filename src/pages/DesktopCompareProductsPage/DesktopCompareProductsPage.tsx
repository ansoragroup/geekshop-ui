import { useState } from 'react';
import {
  DesktopShell,
  DesktopBreadcrumbs,
  DesktopComparisonTable,
  DesktopEmpty,
} from '../../components';
import type { DesktopComparisonProduct, DesktopComparisonSpec } from '../../components';
import { DefaultTopBar, DefaultHeaderRich, DefaultMegaMenu, DefaultFooter } from '../_shared';
import styles from './DesktopCompareProductsPage.module.scss';

const initialProducts: DesktopComparisonProduct[] = [
  {
    id: 'gpu1',
    name: 'MSI RTX 4060 Ventus 2X 8GB',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=300&h=300&fit=crop',
    price: 5200000,
  },
  {
    id: 'gpu2',
    name: 'ASUS Dual RTX 4060 OC 8GB',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&h=300&fit=crop',
    price: 4800000,
  },
  {
    id: 'gpu3',
    name: 'Gigabyte RTX 4060 Eagle OC 8GB',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=300&h=300&fit=crop',
    price: 4500000,
  },
];

const specs: DesktopComparisonSpec[] = [
  { key: 'gpu', label: 'GPU Chip', values: { gpu1: 'AD107', gpu2: 'AD107', gpu3: 'AD107' } },
  {
    key: 'memory',
    label: 'Memory',
    values: { gpu1: '8 GB GDDR6', gpu2: '8 GB GDDR6', gpu3: '8 GB GDDR6' },
  },
  {
    key: 'bus',
    label: 'Memory Bus',
    values: { gpu1: '128-bit', gpu2: '128-bit', gpu3: '128-bit' },
  },
  {
    key: 'base',
    label: 'Base Clock',
    values: { gpu1: '1830 MHz', gpu2: '1830 MHz', gpu3: '1830 MHz' },
    unit: 'MHz',
  },
  {
    key: 'boost',
    label: 'Boost Clock',
    values: { gpu1: '2475 MHz', gpu2: '2535 MHz', gpu3: '2460 MHz' },
    unit: 'MHz',
  },
  { key: 'cuda', label: 'CUDA Cores', values: { gpu1: 3072, gpu2: 3072, gpu3: 3072 } },
  { key: 'tdp', label: 'TDP', values: { gpu1: '115W', gpu2: '115W', gpu3: '115W' } },
  {
    key: 'length',
    label: 'Card Length',
    values: { gpu1: '247 mm', gpu2: '228 mm', gpu3: '261 mm' },
    unit: 'mm',
  },
  { key: 'fans', label: 'Fans', values: { gpu1: 2, gpu2: 2, gpu3: 2 } },
  {
    key: 'outputs',
    label: 'Display Outputs',
    values: { gpu1: '3x DP, 1x HDMI', gpu2: '3x DP, 1x HDMI', gpu3: '2x DP, 2x HDMI' },
  },
  {
    key: 'warranty',
    label: 'Warranty',
    values: { gpu1: '3 years', gpu2: '3 years', gpu3: '3 years' },
  },
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
      <DefaultHeaderRich searchValue={searchValue} onSearchChange={setSearchValue} />
      <DefaultMegaMenu />
    </div>
  );

  return (
    <DesktopShell topBar={<DefaultTopBar />} header={header} footer={<DefaultFooter />}>
      <div className={styles.breadcrumbs}>
        <DesktopBreadcrumbs
          items={[
            { label: 'Home', href: '#' },
            { label: 'Graphics Cards', href: '#' },
            { label: 'Compare Products' },
          ]}
        />
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
