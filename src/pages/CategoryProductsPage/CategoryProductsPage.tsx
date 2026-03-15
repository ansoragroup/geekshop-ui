import { useState, useMemo, useCallback } from 'react';
import {
  NavBar,
  Container,
  TabFilter,
  FilterBar,
  ProductGrid,
  InfiniteScroll,
  FilterPanel,
  Empty,
  useGeekShop,
} from '../../components';
import type { ProductCardFlatProps } from '../../components/product/ProductCard';
import type { FilterGroup, FilterValues } from '../../components';
import { mockProducts } from '../_shared';
import type { Product } from '../_shared';
import styles from './CategoryProductsPage.module.scss';

/* ---------- Icons ---------- */

const FilterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="8" y1="12" x2="20" y2="12" />
    <line x1="12" y1="18" x2="20" y2="18" />
    <circle cx="6" cy="12" r="2" fill="currentColor" />
    <circle cx="14" cy="18" r="2" fill="currentColor" />
  </svg>
);

const EmptySearchIcon = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
    <circle cx="60" cy="60" r="50" fill="#F5F5F5" />
    <circle cx="54" cy="54" r="18" stroke="#CCCCCC" strokeWidth="3" fill="none" />
    <path d="M67 67l12 12" stroke="#CCCCCC" strokeWidth="3" strokeLinecap="round" />
    <path d="M48 50h12M48 58h8" stroke="#D4D4D4" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* ---------- Helpers ---------- */

function toProductCardProps(product: Product): ProductCardFlatProps {
  const props: ProductCardFlatProps = {
    image: product.image,
    title: product.name,
    price: product.price,
  };
  if (product.originalPrice) {
    props.originalPrice = product.originalPrice;
    const discountPct = Math.round((1 - product.price / product.originalPrice) * 100);
    props.discount = `-${discountPct}%`;
  }
  if (product.badge) {
    props.badge = product.badge as ProductCardFlatProps['badge'];
  }
  if (product.reviewCount) {
    props.soldCount = `${product.reviewCount} ta sharh`;
  }
  return props;
}

/* ---------- Filter config ---------- */

const filterGroups: FilterGroup[] = [
  {
    key: 'price',
    title: 'Narx',
    type: 'priceRange',
  },
  {
    key: 'brand',
    title: 'Brend',
    type: 'checkbox',
    options: [
      { value: 'msi', label: 'MSI', count: 3 },
      { value: 'asus', label: 'ASUS', count: 4 },
      { value: 'corsair', label: 'Corsair', count: 2 },
      { value: 'samsung', label: 'Samsung', count: 1 },
      { value: 'nzxt', label: 'NZXT', count: 2 },
      { value: 'amd', label: 'AMD', count: 2 },
    ],
  },
  {
    key: 'rating',
    title: 'Baho',
    type: 'checkbox',
    options: [
      { value: '4.5+', label: '4.5 va yuqori', count: 8 },
      { value: '4.0+', label: '4.0 va yuqori', count: 12 },
      { value: '3.0+', label: '3.0 va yuqori', count: 15 },
    ],
  },
];

/* ---------- Tab/Filter Definitions ---------- */

const tabFilterItems = [
  { key: 'all', label: 'Barchasi' },
  { key: 'cheap', label: 'Arzon' },
  { key: 'expensive', label: 'Qimmat' },
  { key: 'new', label: 'Yangi' },
];

const filterBarItems = [
  { key: 'popular', label: 'Ommabop' },
  { key: 'price', label: 'Narxi', hasDropdown: true },
  { key: 'rating', label: 'Baho' },
];

/* ---------- Props ---------- */

export interface CategoryProductsPageProps {
  /** Category name to display in the header */
  categoryName?: string;
  /** Show filter panel as overlay */
  showFilter?: boolean;
  /** Show loading state */
  loading?: boolean;
  /** Show empty/no results state */
  empty?: boolean;
}

/* ---------- Component ---------- */

export const CategoryProductsPage: React.FC<CategoryProductsPageProps> = ({
  categoryName = 'Elektronika',
  showFilter = false,
  loading = false,
  empty = false,
}) => {
  const { t } = useGeekShop();

  const [activeTab, setActiveTab] = useState('all');
  const [activeFilterChip, setActiveFilterChip] = useState('popular');
  const [filterPanelOpen, setFilterPanelOpen] = useState(showFilter);
  const [filterValues, setFilterValues] = useState<FilterValues>({});

  // Sort and filter products based on active tab and filter values
  const filteredProducts = useMemo(() => {
    if (empty) return [];

    let products = [...mockProducts];

    // Apply filter values (brand filter)
    const selectedBrands = filterValues.brand;
    if (Array.isArray(selectedBrands) && selectedBrands.length > 0) {
      products = products.filter((p) => {
        const nameLower = p.name.toLowerCase();
        return selectedBrands.some((brand) => nameLower.includes(brand.toLowerCase()));
      });
    }

    // Apply price range filter
    const priceRange = filterValues.price;
    if (priceRange && typeof priceRange === 'object' && !Array.isArray(priceRange)) {
      const minPrice = priceRange.min ? parseInt(priceRange.min, 10) : 0;
      const maxPrice = priceRange.max ? parseInt(priceRange.max, 10) : Infinity;
      products = products.filter((p) => p.price >= minPrice && p.price <= maxPrice);
    }

    // Apply rating filter
    const selectedRatings = filterValues.rating;
    if (Array.isArray(selectedRatings) && selectedRatings.length > 0) {
      const minRating = Math.min(
        ...selectedRatings.map((r) => parseFloat(r.replace('+', '')))
      );
      products = products.filter((p) => p.rating >= minRating);
    }

    // Apply sort based on active tab
    switch (activeTab) {
      case 'cheap':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'expensive':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'new':
        // Keep original order (newest first)
        break;
      case 'all':
      default:
        // Default order
        break;
    }

    return products;
  }, [activeTab, filterValues, empty]);

  const productCardData: ProductCardFlatProps[] = useMemo(
    () => filteredProducts.map(toProductCardProps),
    [filteredProducts],
  );

  const handleLoadMore = useCallback(() => {
    // no-op for storybook
  }, []);

  const handleFilterApply = (values: FilterValues) => {
    setFilterValues(values);
    setFilterPanelOpen(false);
  };

  const handleFilterReset = () => {
    setFilterValues({});
  };

  return (
    <div className={styles.page}>
      <NavBar
        title={categoryName}
        showBack
        onBack={() => {}}
        rightActions={[
          {
            key: 'filter',
            icon: <FilterIcon />,
            onClick: () => setFilterPanelOpen(true),
            ariaLabel: t('filter.title'),
          },
        ]}
      />

      <Container hasNavbar>
        {/* Tab Filter (sort tabs) */}
        <TabFilter
          tabs={tabFilterItems}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {/* Filter Bar (chips) */}
        <FilterBar
          filters={filterBarItems}
          activeFilter={activeFilterChip}
          onFilterChange={setActiveFilterChip}
        />

        {/* Results area */}
        {!empty && filteredProducts.length > 0 && (
          <div className={styles.resultsArea}>
            <div className={styles.resultsHeader}>
              <span className={styles.resultsCount}>
                {t('search.results', { count: filteredProducts.length })}
              </span>
            </div>

            <InfiniteScroll
              onLoadMore={handleLoadMore}
              hasMore={!loading}
              loading={loading}
              endContent={<span>{t('search.allLoaded')}</span>}
            >
              <ProductGrid
                products={productCardData}
                columns={2}
                layout="waterfall"
                gap={8}
              />
            </InfiniteScroll>
          </div>
        )}

        {/* No results state */}
        {!empty && filteredProducts.length === 0 && !loading && (
          <div className={styles.emptyWrap}>
            <Empty
              icon={<EmptySearchIcon />}
              title={t('search.noResults')}
              description="Filtr sozlamalarini o'zgartiring yoki boshqa kategoriyani ko'ring."
              actionText={t('common.reset')}
              onAction={() => {
                setFilterValues({});
                setActiveTab('all');
              }}
            />
          </div>
        )}

        {/* Empty category state */}
        {empty && (
          <div className={styles.emptyWrap}>
            <Empty
              icon={<EmptySearchIcon />}
              title={t('search.noResults')}
              description="Bu kategoriyada hali mahsulotlar mavjud emas."
            />
          </div>
        )}
      </Container>

      {/* Filter Panel overlay */}
      <FilterPanel
        filterGroups={filterGroups}
        values={filterValues}
        visible={filterPanelOpen}
        onApply={handleFilterApply}
        onReset={handleFilterReset}
        onClose={() => setFilterPanelOpen(false)}
      />
    </div>
  );
};
