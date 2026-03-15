import React, { useState, useCallback } from 'react';
import {
  SearchBar,
  PopularSearches,
  SearchSuggestions,
  TabFilter,
  ProductGrid,
  Empty,
  FilterBar,
  InfiniteScroll,
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

/* ---------- Filter/Tab Definitions ---------- */

const tabFilterItems = [
  { key: 'all', label: 'Barchasi' },
  { key: 'cheap', label: 'Arzon' },
  { key: 'expensive', label: 'Qimmat' },
  { key: 'new', label: 'Yangi' },
  { key: 'popular', label: 'Mashhur' },
];

const filterBarItems = [
  { key: 'popular', label: 'Ommabop' },
  { key: 'price', label: 'Narxi', hasDropdown: true },
  { key: 'new', label: 'Yangi' },
  { key: 'rating', label: 'Baho' },
];

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
  const [activeTab, setActiveTab] = useState('all');
  const [activeFilter, setActiveFilter] = useState('popular');
  const [searchValue, setSearchValue] = useState(state !== 'empty' ? 'RTX 4090' : '');

  const isTyping = state !== 'empty' && searchValue.length > 0;
  const showResults = state === 'withResults';
  const showNoResults = state === 'noResults';
  const showEmpty = state === 'empty';

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
          aria-label="Orqaga"
        >
          <BackArrow />
        </button>
        <SearchBar
          value={searchValue}
          onChange={setSearchValue}
          onSearch={() => {}}
          onCamera={() => {}}
          placeholder="Qidirish..."
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
              <h3 className={styles.historyTitle}>Qidiruv tarixi</h3>
              <button
                className={styles.historyClear}
                onClick={() => {}}
                aria-label="Tarixni tozalash"
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

      {/* Typing State: Suggestions */}
      {isTyping && !showResults && !showNoResults && (
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
              <span className={styles.resultsCount}>124 ta natija</span>
            </div>

            <InfiniteScroll
              onLoadMore={handleLoadMore}
              hasMore={true}
              loading={false}
              endContent={<span>Barchasi yuklandi</span>}
            >
              <ProductGrid
                products={searchResultProducts}
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
            title="Natija topilmadi"
            description={`"${searchValue}" bo'yicha hech narsa topilmadi. Boshqa kalit so'zlarni sinab ko'ring.`}
            actionText="Ommabop mahsulotlar"
            onAction={() => {}}
          />
        </div>
      )}
    </div>
  );
};

export default SearchPage;
