import { useState, useMemo, useCallback } from 'react';
import {
  SearchBar,
  PopularSearches,
  SearchSuggestions,
  TabFilter,
  ProductGrid,
  Empty,
  FilterBar,
  InfiniteScroll,
  useGeekShop,
} from '../../components';
import type { ProductCardFlatProps } from '../../components/product/ProductCard';
import styles from './SearchPage.module.scss';

/* ---------- Data ---------- */

const popularSearchData = [
  { rank: 1, text: 'RTX 4090' },
  { rank: 2, text: 'Ryzen 9 7950X' },
  { rank: 3, text: 'DDR5 RAM' },
  { rank: 4, text: 'NVMe SSD 2TB' },
  { rank: 5, text: 'Gaming Monitor 165Hz' },
  { rank: 6, text: 'RTX 4060 Ti' },
  { rank: 7, text: 'Mechanical Keyboard' },
  { rank: 8, text: 'Intel i9 14900K' },
];

const historyTags = [
  'RTX 4070 Super',
  'AMD Ryzen 7',
  'Monitor 27 dyuym',
  'SSD Samsung',
  'DDR5 32GB',
];

const suggestionsData = [
  { id: 'sug-1', text: 'RTX 4090 Founders Edition' },
  { id: 'sug-2', text: 'RTX 4090 ASUS ROG Strix' },
  { id: 'sug-3', text: 'RTX 4090 MSI Suprim X' },
  { id: 'sug-4', text: 'RTX 4090 Gigabyte Aorus' },
  { id: 'sug-5', text: 'RTX 4090 sovutgich' },
];

const searchResultProducts: ProductCardFlatProps[] = [
  {
    image: 'https://picsum.photos/seed/search-rtx4090/400/400',
    title: 'NVIDIA GeForce RTX 4090 Founders Edition 24GB',
    price: 19800000,
    originalPrice: 21000000,
    discount: '-6%',
    badge: 'hot',
    soldCount: '45 dona sotilgan',
  },
  {
    image: 'https://picsum.photos/seed/search-asus4090/400/400',
    title: 'ASUS ROG Strix RTX 4090 OC 24GB',
    price: 22500000,
    badge: 'top',
    soldCount: '32 dona sotilgan',
  },
  {
    image: 'https://picsum.photos/seed/search-msi4090/400/400',
    title: 'MSI Suprim X RTX 4090 24GB GDDR6X',
    price: 21200000,
    originalPrice: 23000000,
    discount: '-8%',
    soldCount: '28 dona sotilgan',
  },
  {
    image: 'https://picsum.photos/seed/search-giga4090/400/400',
    title: 'Gigabyte Aorus RTX 4090 Master 24GB',
    price: 23100000,
    badge: 'new',
    soldCount: '19 dona sotilgan',
  },
  {
    image: 'https://picsum.photos/seed/search-evga4090/400/500',
    title: 'EVGA GeForce RTX 4090 FTW3 Ultra Gaming 24GB',
    price: 24500000,
    soldCount: '12 dona sotilgan',
  },
  {
    image: 'https://picsum.photos/seed/search-zotac4090/400/350',
    title: 'Zotac Gaming RTX 4090 Trinity OC 24GB',
    price: 20900000,
    originalPrice: 22000000,
    discount: '-5%',
    soldCount: '22 dona sotilgan',
  },
];

/* ---------- Sold count parser (for "popular" sort) ---------- */

function parseSoldCount(text?: string): number {
  if (!text) return 0;
  const match = text.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

/* ---------- SVG Icons ---------- */

const BackArrow = () => (
  <svg className={styles.backIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const TrashIcon = () => (
  <svg className={styles.historyClearIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const SearchEmptyIcon = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
    <circle cx="60" cy="60" r="50" fill="#F5F5F5" />
    <circle cx="54" cy="54" r="18" stroke="#CCCCCC" strokeWidth="3" fill="none" />
    <path d="M67 67l12 12" stroke="#CCCCCC" strokeWidth="3" strokeLinecap="round" />
    <path d="M48 50h12M48 58h8" stroke="#D4D4D4" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* ---------- Props ---------- */

export type SearchPageState = 'empty' | 'withResults' | 'noResults';

export interface SearchPageProps {
  /** Which visual state to render */
  state?: SearchPageState;
}

/* ---------- Component ---------- */

export const SearchPage: React.FC<SearchPageProps> = ({
  state = 'empty',
}) => {
  const { t } = useGeekShop();

  const [activeTab, setActiveTab] = useState('all');
  const [activeFilter, setActiveFilter] = useState('popular');
  const [searchValue, setSearchValue] = useState(state !== 'empty' ? 'RTX 4090' : '');

  /* --- Tab / filter definitions (i18n) --- */

  const tabFilterItems = useMemo(() => [
    { key: 'all', label: t('common.all') },
    { key: 'cheap', label: t('common.cheap') },
    { key: 'expensive', label: t('common.expensive') },
    { key: 'new', label: t('common.new') },
    { key: 'popular', label: t('common.popular') },
  ], [t]);

  const filterBarItems = useMemo(() => [
    { key: 'popular', label: t('common.popular') },
    { key: 'price', label: t('common.price'), hasDropdown: true },
    { key: 'new', label: t('common.new') },
    { key: 'rating', label: t('common.rating') },
  ], [t]);

  /* --- Sorting --- */

  const sortedProducts = useMemo(() => {
    const products = [...searchResultProducts];
    switch (activeTab) {
      case 'cheap':
        return products.sort((a, b) => a.price - b.price);
      case 'expensive':
        return products.sort((a, b) => b.price - a.price);
      case 'new':
        // "new" badge items first, then reverse order (newest = last added)
        return products.sort((a, b) => {
          const aNew = a.badge === 'new' ? 1 : 0;
          const bNew = b.badge === 'new' ? 1 : 0;
          return bNew - aNew;
        });
      case 'popular':
        // Sort by sold count descending (most popular first)
        return products.sort(
          (a, b) => parseSoldCount(b.soldCount) - parseSoldCount(a.soldCount),
        );
      default:
        return products;
    }
  }, [activeTab]);

  /* --- Filtering by search query --- */

  const filteredProducts = useMemo(() => {
    if (!searchValue.trim()) return sortedProducts;
    const query = searchValue.toLowerCase();
    return sortedProducts.filter((p) =>
      p.title.toLowerCase().includes(query),
    );
  }, [searchValue, sortedProducts]);

  /* --- State derivation --- */

  const hasQuery = searchValue.trim().length > 0;
  const showEmpty = state === 'empty' && !hasQuery;
  const showSuggestions = state === 'empty' && hasQuery;
  const showResults = state === 'withResults';
  const showNoResults = state === 'noResults';

  const handleLoadMore = useCallback(() => {
    // no-op for storybook
  }, []);

  return (
    <div className={styles.page}>
      {/* Search Bar Area */}
      <div className={styles.searchBarWrapper}>
        <button
          className={styles.backBtn}
          onClick={() => {}}
          aria-label={t('common.back')}
        >
          <BackArrow />
        </button>
        <SearchBar
          value={searchValue}
          onChange={setSearchValue}
          onSearch={() => {}}
          onCamera={() => {}}
          placeholder={t('search.placeholder')}
          variant="filled"
        />
      </div>

      {/* Empty State: Popular Searches + History */}
      {showEmpty && (
        <>
          <PopularSearches
            searches={popularSearchData}
            onSelect={() => {}}
          />

          <div className={styles.historySection}>
            <div className={styles.historyHeader}>
              <h3 className={styles.historyTitle}>{t('search.history')}</h3>
              <button
                className={styles.historyClear}
                onClick={() => {}}
                aria-label={t('common.delete')}
              >
                <TrashIcon />
              </button>
            </div>
            <div className={styles.historyTags}>
              {historyTags.map((tag) => (
                <button key={tag} className={styles.historyTag} onClick={() => {}}>
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Typing State: Suggestions (when empty state + user types) */}
      {showSuggestions && (
        <SearchSuggestions
          query={searchValue}
          suggestions={suggestionsData}
          onSelect={() => {}}
        />
      )}

      {/* Results State */}
      {showResults && (
        <>
          <TabFilter
            tabs={tabFilterItems}
            activeTab={activeTab}
            onChange={setActiveTab}
          />

          <FilterBar
            filters={filterBarItems}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          <div className={styles.resultsArea}>
            <div className={styles.resultsHeader}>
              <span className={styles.resultsCount}>
                {t('search.results', { count: filteredProducts.length })}
              </span>
            </div>

            <InfiniteScroll
              onLoadMore={handleLoadMore}
              hasMore={true}
              loading={false}
              endContent={<span>{t('search.allLoaded')}</span>}
            >
              <ProductGrid
                products={filteredProducts}
                columns={2}
                layout="waterfall"
                gap={8}
              />
            </InfiniteScroll>
          </div>
        </>
      )}

      {/* No Results State */}
      {showNoResults && (
        <div className={styles.noResults}>
          <Empty
            icon={<SearchEmptyIcon />}
            title={t('search.noResults')}
            description={t('search.noResultsDescription', { query: searchValue })}
            actionText={t('common.popular')}
            onAction={() => {}}
          />
        </div>
      )}
    </div>
  );
};
