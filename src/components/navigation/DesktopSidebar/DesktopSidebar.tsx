import { cn } from '../../../utils/cn';
'use client';
import { forwardRef, useState, useCallback, type HTMLAttributes } from 'react';
import styles from './DesktopSidebar.module.scss';

export interface SidebarCategory {
  label: string;
  count?: number;
  active?: boolean;
  href?: string;
  onClick?: () => void;
}

export interface SidebarBrand {
  label: string;
  value: string;
  checked?: boolean;
}

export interface DesktopSidebarProps extends HTMLAttributes<HTMLDivElement> {
  /** Category list */
  categories?: SidebarCategorycn(];
  /** Brand filter options */
  brands?: SidebarBrand[];
  /** Available price range (min/max) */
  priceRange?: { min: number; max: number };
  /** Currently selected price range */
  selectedPriceRange?: { min: number; max: number };
  /** Currently selected rating filter (1-5) */
  ratingFilter?: number;
  /** Category select handler */
  onCategorySelect?: (category: SidebarCategory) => void;
  /** Brand toggle handler */
  onBrandToggle?: (value: string, checked: boolean) => void;
  /** Price range change handler */
  onPriceChange?: (range: { min: number; max: number }) => void;
  /** Rating filter change handler */
  onRatingChange?: (rating: number) => void;
}

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export const DesktopSidebar = forwardRef<HTMLDivElement, DesktopSidebarProps>(
  (
    {
      categories = [],
      brands = [],
      priceRange,
      selectedPriceRange,
      ratingFilter,
      onCategorySelect,
      onBrandToggle,
      onPriceChange,
      onRatingChange,
      className,
      ...rest
    },
    ref,
  ) => {
    const [localMinPrice, setLocalMinPrice] = useState<string>(
      selectedPriceRange?.min?.toString() ?? '',
    );
    const [localMaxPrice, setLocalMaxPrice] = useState<string>(
      selectedPriceRange?.max?.toString() ?? '',
    );

    const handlePriceMinChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setLocalMinPrice(val);
        const num = parseInt(val, 10);
        if (!isNaN(num)) {
          onPriceChange?.({
            min: num,
            max: selectedPriceRange?.max ?? priceRange?.max ?? 0,
          });
        }
      },
      [onPriceChange, selectedPriceRange, priceRange],
    );

    const handlePriceMaxChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setLocalMaxPrice(val);
        const num = parseInt(val, 10);
        if (!isNaN(num)) {
          onPriceChange?.({
            min: selectedPriceRange?.min ?? priceRange?.min ?? 0,
            max: num,
          });
        }
      },
      [onPriceChange, selectedPriceRange, priceRange],
    );

    const handleBrandToggle = useCallback(
      (value: string, currentChecked: boolean) => {
        onBrandToggle?.(value, !currentChecked);
      },
      [onBrandToggle],
    );

    const handleRatingSelect = useCallback(
      (rating: number) => {
        onRatingChange?.(rating);
      },
      [onRatingChange],
    );

    const handleCategorySelect = useCallback(
      (category: SidebarCategory) => {
        category.onClick?.();
        onCategorySelect?.(category);
      },
      [onCategorySelect],
    );

    const wrapperClass = [styles.sidebar, className);

    const hasSections = categories.length > 0 || brands.length > 0 || priceRange || onRatingChange;

    return (
      <div ref={ref} className={wrapperClass} role="navigation" aria-label="Filters" {...rest}>
        {/* Categories */}
        {categories.length > 0 && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Categories</h3>
            <ul className={styles.categoryList}>
              {categories.map((category, index) => (
                <li key={index}>
                  <button
                    type="button"
                    className={cn(styles.categoryItem, category.active ? styles.categoryActive : '')}
                    onClick={() => handleCategorySelect(category)}
                    aria-current={category.active ? 'page' : undefined}
                  >
                    <span className={styles.categoryLabel}>{category.label}</span>
                    {category.count !== undefined && (
                      <span className={styles.categoryCount}>({category.count})</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Price Range */}
        {priceRange && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Price Range</h3>
            <div className={styles.priceInputs}>
              <input
                type="number"
                className={styles.priceInput}
                placeholder="Min"
                value={localMinPrice}
                onChange={handlePriceMinChange}
                min={priceRange.min}
                max={priceRange.max}
                aria-label="Minimum price"
              />
              <span className={styles.priceSeparator}>&mdash;</span>
              <input
                type="number"
                className={styles.priceInput}
                placeholder="Max"
                value={localMaxPrice}
                onChange={handlePriceMaxChange}
                min={priceRange.min}
                max={priceRange.max}
                aria-label="Maximum price"
              />
            </div>
          </div>
        )}

        {/* Brands */}
        {brands.length > 0 && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Brands</h3>
            <div className={styles.brandList}>
              {brands.map((brand) => (
                <label key={brand.value} className={styles.brandItem}>
                  <input
                    type="checkbox"
                    className={styles.brandCheckbox}
                    checked={brand.checked ?? false}
                    onChange={() => handleBrandToggle(brand.value, brand.checked ?? false)}
                  />
                  <span className={styles.brandLabel}>{brand.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Rating */}
        {onRatingChange && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Rating</h3>
            <div className={styles.ratingList} role="radiogroup" aria-label="Filter by rating">
              {[5, 4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  className={cn(styles.ratingItem, ratingFilter === rating ? styles.ratingActive : '')}
                  onClick={() => handleRatingSelect(rating)}
                  role="radio"
                  aria-checked={ratingFilter === rating}
                  aria-label={`${rating} stars and up`}
                >
                  <span className={styles.ratingStars}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={star <= rating ? styles.starFilled : styles.starEmpty}
                      >
                        <StarIcon filled={star <= rating} />
                      </span>
                    ))}
                  </span>
                  <span className={styles.ratingLabel}>& up</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {!hasSections && (
          <div className={styles.emptyState}>No filters available</div>
        )}
      </div>
    );
  },
);

DesktopSidebar.displayName = 'DesktopSidebar';
