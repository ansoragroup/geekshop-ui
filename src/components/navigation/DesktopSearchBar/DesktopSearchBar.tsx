'use client';
import { useGeekShop } from '../../../i18n';
import { cn } from '../../../utils/cn';
import { forwardRef, useRef, type HTMLAttributes } from 'react';
import { useControllableState } from '../../../hooks/useControllableState';
import styles from './DesktopSearchBar.module.scss';

export interface DesktopSearchBarCategory {
  /** Unique value */
  value: string;
  /** Display label */
  label: string;
}

export interface DesktopSearchBarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current input value */
  value?: string;
  /** Default value for uncontrolled usage */
  defaultValue?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Submit handler (enter or button click) */
  onSubmit?: (value: string) => void;
  /** Clear handler */
  onClear?: () => void;
  /** Placeholder text */
  placeholder?: string;
  /** Optional category dropdown items */
  categories?: DesktopSearchBarCategory[];
  /** Currently selected category */
  selectedCategory?: string;
  /** Category change handler */
  onCategoryChange?: (value: string) => void;
}

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

const ClearIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M15 9l-6 6" />
    <path d="M9 9l6 6" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const DesktopSearchBar = forwardRef<HTMLDivElement, DesktopSearchBarProps>(
  (
    {
      value: valueProp,
      defaultValue = '',
      onChange,
      onSubmit,
      onClear,
      placeholder = 'Search products...',
      categories,
      selectedCategory,
      onCategoryChange,
      className = '',
      ...rest
    },
    ref,
  ) => {
  const { t } = useGeekShop();
    const inputRef = useRef<HTMLInputElement>(null);

    const [value, setValue] = useControllableState({
      value: valueProp,
      defaultValue,
      onChange,
    });

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onSubmit?.(value);
      }
    };

    const handleClear = () => {
      setValue('');
      onClear?.();
      inputRef.current?.focus();
    };

    const handleSubmit = () => {
      onSubmit?.(value);
    };

    return (
      <div ref={ref} className={cn(styles.searchBar, className)} {...rest}>
        {/* Category selector */}
        {categories && categories.length > 0 && (
          <>
            <div className={styles.categorySelect}>
              <select
                className={styles.select}
                value={selectedCategory}
                onChange={(e) => onCategoryChange?.(e.target.value)}
                aria-label={t('aria.searchCategory')}
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              <span className={styles.selectArrow}>
                <ChevronDownIcon />
              </span>
            </div>
            <span className={styles.separator} />
          </>
        )}

        {/* Search icon */}
        <span className={styles.searchIcon}>
          <SearchIcon />
        </span>

        {/* Input */}
        <input
          ref={inputRef}
          className={styles.input}
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label={t('aria.search')}
        />

        {/* Clear button */}
        {value && (
          <button
            className={styles.clearBtn}
            onClick={handleClear}
            aria-label={t('aria.clearSearch')}
            type="button"
          >
            <ClearIcon />
          </button>
        )}

        {/* Submit button */}
        <button
          className={styles.submitBtn}
          onClick={handleSubmit}
          aria-label={t('aria.search')}
          type="button"
        >
          Search
        </button>
      </div>
    );
  },
);

DesktopSearchBar.displayName = 'DesktopSearchBar';
