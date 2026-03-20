'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, useCallback, type HTMLAttributes, type MouseEvent } from 'react';
import { DesktopProductCard } from '../DesktopProductCard';
import { ProductListItem } from '../ProductListItem';
import styles from './DesktopProductGrid.module.scss';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface DesktopProductGridItem {
  id: string;
  image: string;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  rating?: number;
  reviewCount?: number;
  installmentPrice?: number;
  installmentLabel?: string;
  freeShipping?: boolean;
  ctaText?: string;
  ctaColor?: string;
}

export interface SortOption {
  id: string;
  label: string;
}

export interface DesktopProductGridProps extends HTMLAttributes<HTMLDivElement> {
  /** Product data to display */
  products: DesktopProductGridItem[];
  /** Total number of products for "Showing X of Y" text */
  totalCount?: number;
  /** Display mode */
  viewMode?: 'grid' | 'list';
  /** Number of grid columns */
  columns?: 4 | 5;
  /** Callback when view mode changes */
  onViewModeChange?: (mode: 'grid' | 'list') => void;
  /** Callback when column count changes */
  onColumnsChange?: (cols: 4 | 5) => void;
  /** Sort dropdown options */
  sortOptions?: SortOption[];
  /** Currently active sort option ID */
  activeSortId?: string;
  /** Callback when sort changes */
  onSortChange?: (sortId: string) => void;
  /** Callback when a product is clicked */
  onProductClick?: (product: DesktopProductGridItem) => void;
  /** Callback when "add to cart" is clicked for a product */
  onAddToCart?: (product: DesktopProductGridItem) => void;
}

// ─── Inline SVG Icons ────────────────────────────────────────────────────────

function GridIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="5.5" height="5.5" />
      <rect x="10.5" y="2" width="5.5" height="5.5" />
      <rect x="2" y="10.5" width="5.5" height="5.5" />
      <rect x="10.5" y="10.5" width="5.5" height="5.5" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="4" x2="16" y2="4" />
      <line x1="5" y1="9" x2="16" y2="9" />
      <line x1="5" y1="14" x2="16" y2="14" />
      <rect x="2" y="3" width="1.5" height="1.5" />
      <rect x="2" y="8" width="1.5" height="1.5" />
      <rect x="2" y="13" width="1.5" height="1.5" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export const DesktopProductGrid = forwardRef<HTMLDivElement, DesktopProductGridProps>(
  (
    {
      products,
      totalCount,
      viewMode = 'grid',
      columns = 5,
      onViewModeChange,
      onColumnsChange,
      onSortChange,
      sortOptions = [],
      activeSortId,
      onProductClick,
      onAddToCart,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const displayCount = products.length;
    const total = totalCount ?? displayCount;

    const handleSortClick = useCallback(
      (e: MouseEvent<HTMLButtonElement>) => {
        const sortId = e.currentTarget.dataset.sortId;
        if (sortId) {
          onSortChange?.(sortId);
        }
      },
      [onSortChange],
    );

    const handleViewMode = useCallback(
      (mode: 'grid' | 'list') => {
        onViewModeChange?.(mode);
      },
      [onViewModeChange],
    );

    const handleColumns = useCallback(
      (cols: 4 | 5) => {
        onColumnsChange?.(cols);
      },
      [onColumnsChange],
    );

    return (
      <div
        ref={ref}
        className={cn(styles.root, className)}
        {...rest}
      >
        {/* Toolbar */}
        <div className={styles.toolbar}>
          {/* Sort options */}
          <div className={styles.sortGroup}>
            {sortOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                className={cn(styles.sortButton, option.id === activeSortId ? styles.sortButtonActive : '')}
                data-sort-id={option.id}
                onClick={handleSortClick}
                aria-pressed={option.id === activeSortId}
              >
                {option.label}
                <ChevronDownIcon />
              </button>
            ))}
          </div>

          {/* Showing count */}
          <span className={styles.showingCount}>
            Showing 1-{displayCount} of {total}
          </span>

          {/* View controls */}
          <div className={styles.viewControls}>
            {/* View mode toggle */}
            <div className={styles.viewToggle} role="group" aria-label="View mode">
              <button
                type="button"
                className={cn(styles.viewButton, viewMode === 'grid' ? styles.viewButtonActive : '')}
                onClick={() => handleViewMode('grid')}
                aria-label="Grid view"
                aria-pressed={viewMode === 'grid'}
              >
                <GridIcon />
              </button>
              <button
                type="button"
                className={cn(styles.viewButton, viewMode === 'list' ? styles.viewButtonActive : '')}
                onClick={() => handleViewMode('list')}
                aria-label="List view"
                aria-pressed={viewMode === 'list'}
              >
                <ListIcon />
              </button>
            </div>

            {/* Column toggle (grid mode only) */}
            {viewMode === 'grid' && (
              <div className={styles.columnToggle} role="group" aria-label="Grid columns">
                <button
                  type="button"
                  className={cn(styles.columnButton, columns === 4 ? styles.columnButtonActive : '')}
                  onClick={() => handleColumns(4)}
                  aria-label="4 columns"
                  aria-pressed={columns === 4}
                >
                  4
                </button>
                <button
                  type="button"
                  className={cn(styles.columnButton, columns === 5 ? styles.columnButtonActive : '')}
                  onClick={() => handleColumns(5)}
                  aria-label="5 columns"
                  aria-pressed={columns === 5}
                >
                  5
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Product grid / list */}
        {viewMode === 'grid' ? (
          <ul
            role="list"
            className={styles.grid}
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
          >
            {products.map((product) => (
              <li key={product.id} className={styles.gridItem}>
                <DesktopProductCard
                  image={product.image}
                  title={product.title}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  discount={product.discount}
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  installmentPrice={product.installmentPrice}
                  installmentLabel={product.installmentLabel}
                  freeShipping={product.freeShipping}
                  ctaText={product.ctaText}
                  ctaColor={product.ctaColor}
                  onClick={() => onProductClick?.(product)}
                  onAddToCart={() => onAddToCart?.(product)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <ul role="list" className={styles.list}>
            {products.map((product) => (
              <li key={product.id} className={styles.listItem}>
                <ProductListItem
                  image={product.image}
                  title={product.title}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  rating={product.rating}
                  freeShipping={product.freeShipping}
                  onClick={() => onProductClick?.(product)}
                  onAddToCart={() => onAddToCart?.(product)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  },
);

DesktopProductGrid.displayName = 'DesktopProductGrid';
