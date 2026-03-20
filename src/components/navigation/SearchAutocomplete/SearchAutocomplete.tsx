import { forwardRef, useState, useEffect, useRef, useCallback, type HTMLAttributes } from 'react';
import { useControllableState } from '../../../hooks/useControllableState';
import styles from './SearchAutocomplete.module.scss';

export interface SearchProduct {
  id?: string | number;
  title: string;
  image: string;
  price: number;
}

export interface SearchAutocompleteProps extends HTMLAttributes<HTMLDivElement> {
  /** Current input value (controlled) */
  value?: string;
  /** Default input value (uncontrolled) */
  defaultValue?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Recent search terms */
  recentSearches?: string[];
  /** Suggested search terms */
  suggestions?: string[];
  /** Product results */
  products?: SearchProduct[];
  /** Callback to clear recent searches */
  onClearRecent?: () => void;
  /** Callback when a suggestion is clicked */
  onSuggestionClick?: (suggestion: string) => void;
  /** Callback when a product is clicked */
  onProductClick?: (product: SearchProduct) => void;
  /** Callback when search is submitted */
  onSearch?: (query: string) => void;
  /** Callback for "View all" link */
  onViewAll?: () => void;
  /** Placeholder text */
  placeholder?: string;
}

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

function formatPrice(price: number): string {
  return price.toLocaleString('en-US').replace(/,/g, ' ');
}

export const SearchAutocomplete = forwardRef<HTMLDivElement, SearchAutocompleteProps>(
  (
    {
      value: valueProp,
      defaultValue = '',
      onChange,
      recentSearches = [],
      suggestions = [],
      products = [],
      onClearRecent,
      onSuggestionClick,
      onProductClick,
      onSearch,
      onViewAll,
      placeholder = 'Search products...',
      className,
      ...rest
    },
    ref,
  ) => {
    const [value, setValue] = useControllableState({
      value: valueProp,
      defaultValue,
      onChange,
    });

    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const blurTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

    const hasContent = recentSearches.length > 0 || suggestions.length > 0 || products.length > 0;

    const handleFocus = useCallback(() => {
      if (hasContent) {
        setIsOpen(true);
      }
    }, [hasContent]);

    const handleBlur = useCallback(() => {
      // Delay to allow click events on dropdown items
      blurTimeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 200);
    }, []);

    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        if (hasContent) {
          setIsOpen(true);
        }
      },
      [setValue, hasContent],
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          onSearch?.(value);
          setIsOpen(false);
        }
        if (e.key === 'Escape') {
          setIsOpen(false);
          inputRef.current?.blur();
        }
      },
      [value, onSearch],
    );

    const handleSuggestionClick = useCallback(
      (suggestion: string) => {
        setValue(suggestion);
        onSuggestionClick?.(suggestion);
        setIsOpen(false);
      },
      [setValue, onSuggestionClick],
    );

    const handleProductClick = useCallback(
      (product: SearchProduct) => {
        onProductClick?.(product);
        setIsOpen(false);
      },
      [onProductClick],
    );

    const handleClearRecent = useCallback(() => {
      onClearRecent?.();
    }, [onClearRecent]);

    const handleClearInput = useCallback(() => {
      setValue('');
      inputRef.current?.focus();
    }, [setValue]);

    // Cleanup timeout on unmount
    useEffect(() => {
      return () => {
        if (blurTimeoutRef.current) {
          clearTimeout(blurTimeoutRef.current);
        }
      };
    }, []);

    const wrapperClass = [styles.wrapper, className].filter(Boolean).join(' ');

    return (
      <div
        ref={(node) => {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={wrapperClass}
        {...rest}
      >
        {/* Search input */}
        <div className={styles.inputWrapper}>
          <span className={styles.searchIcon}>
            <SearchIcon />
          </span>
          <input
            ref={inputRef}
            className={styles.input}
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            role="combobox"
            aria-label="Search"
            aria-expanded={isOpen}
            aria-controls={isOpen ? 'search-listbox' : undefined}
            aria-haspopup="listbox"
            autoComplete="off"
          />
          {value && (
            <button
              type="button"
              className={styles.clearBtn}
              onClick={handleClearInput}
              aria-label="Clear search"
              tabIndex={-1}
            >
              <CloseIcon />
            </button>
          )}
        </div>

        {/* Dropdown */}
        {isOpen && hasContent && (
          <div className={styles.dropdown} role="listbox" id="search-listbox" aria-label="Search suggestions">
            {/* Recent searches */}
            {recentSearches.length > 0 && (
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionTitle}>Recent Searches</span>
                  {onClearRecent && (
                    <button
                      type="button"
                      className={styles.clearAllBtn}
                      onClick={handleClearRecent}
                      tabIndex={-1}
                    >
                      Clear all
                    </button>
                  )}
                </div>
                <div className={styles.recentChips}>
                  {recentSearches.map((term, index) => (
                    <button
                      key={index}
                      type="button"
                      className={styles.chip}
                      onClick={() => handleSuggestionClick(term)}
                      role="option"
                      aria-selected={false}
                      tabIndex={-1}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionTitle}>Suggestions</span>
                </div>
                <div className={styles.suggestionList}>
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      className={styles.suggestionItem}
                      onClick={() => handleSuggestionClick(suggestion)}
                      role="option"
                      aria-selected={false}
                      tabIndex={-1}
                    >
                      <span className={styles.suggestionText}>{suggestion}</span>
                      <span className={styles.suggestionArrow}>
                        <ArrowRightIcon />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Products */}
            {products.length > 0 && (
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionTitle}>Products</span>
                </div>
                <div className={styles.productList}>
                  {products.map((product, index) => (
                    <button
                      key={product.id ?? index}
                      type="button"
                      className={styles.productItem}
                      onClick={() => handleProductClick(product)}
                      role="option"
                      aria-selected={false}
                      tabIndex={-1}
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className={styles.productImage}
                      />
                      <div className={styles.productInfo}>
                        <span className={styles.productTitle}>{product.title}</span>
                        <span className={styles.productPrice}>{formatPrice(product.price)} sum</span>
                      </div>
                    </button>
                  ))}
                </div>
                {onViewAll && (
                  <button
                    type="button"
                    className={styles.viewAllBtn}
                    onClick={() => {
                      onViewAll();
                      setIsOpen(false);
                    }}
                    tabIndex={-1}
                  >
                    View all results
                    <ArrowRightIcon />
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);

SearchAutocomplete.displayName = 'SearchAutocomplete';
