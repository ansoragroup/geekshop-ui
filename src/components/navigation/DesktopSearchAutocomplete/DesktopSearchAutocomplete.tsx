'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, useState, useEffect, useRef, useCallback, type HTMLAttributes } from 'react';
import { useControllableState } from '../../../hooks/useControllableState';
import styles from './DesktopSearchAutocomplete.module.scss';

export interface DesktopSearchSuggestedProduct {
  id: string;
  title: string;
  image: string;
  price: number;
  rating?: number;
}

export interface DesktopSearchTrendingItem {
  text: string;
  count?: number;
}

export interface DesktopSearchCategoryItem {
  id: string;
  name: string;
  count?: number;
}

export interface DesktopPhotoSearchSource {
  type: 'url' | 'file';
  url?: string;
  file?: File;
}

export interface DesktopSearchAutocompleteProps extends HTMLAttributes<HTMLDivElement> {
  /** Current input value (controlled) */
  value?: string;
  /** Default input value (uncontrolled) */
  defaultValue?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Search submit handler */
  onSearch?: (query: string) => void;
  /** Photo/image search handler */
  onPhotoSearch?: (source: DesktopPhotoSearchSource) => void;
  /** Recent search terms */
  recentSearches?: string[];
  /** Trending search terms */
  trendingSearches?: DesktopSearchTrendingItem[];
  /** Suggested products */
  suggestedProducts?: DesktopSearchSuggestedProduct[];
  /** Category suggestions */
  categorySuggestions?: DesktopSearchCategoryItem[];
  /** Callback to clear recent searches */
  onClearRecent?: () => void;
  /** Callback when a suggestion/recent is clicked */
  onSuggestionClick?: (text: string) => void;
  /** Callback when a product is clicked */
  onProductClick?: (product: { id: string }) => void;
  /** Callback when a category is clicked */
  onCategoryClick?: (category: { id: string; name: string }) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Custom submit button label (default: "Search") */
  submitLabel?: string;
}

/* ---------- Inline SVG Icons ---------- */

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const FireIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2c.5 3-2 5.5-2 8a4 4 0 008 0c0-3.5-3-6-3-8" />
    <path d="M12 14a2 2 0 01-2-2c0-1.5 1-2.5 1-4 .5 1.5 3 3 3 4a2 2 0 01-2 2z" />
  </svg>
);

const FolderIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
  </svg>
);

const CameraIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const UploadIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

function formatPrice(price: number): string {
  return price.toLocaleString('en-US').replace(/,/g, ' ');
}

export const DesktopSearchAutocomplete = forwardRef<HTMLDivElement, DesktopSearchAutocompleteProps>(
  (
    {
      value: valueProp,
      defaultValue = '',
      onChange,
      onSearch,
      onPhotoSearch,
      recentSearches = [],
      trendingSearches = [],
      suggestedProducts = [],
      categorySuggestions = [],
      onClearRecent,
      onSuggestionClick,
      onProductClick,
      onCategoryClick,
      placeholder = 'Search products...',
      submitLabel,
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
    const [showPhotoSearch, setShowPhotoSearch] = useState(false);
    const [photoUrl, setPhotoUrl] = useState('');
    const [photoPreview, setPhotoPreview] = useState<{ url: string; name: string } | null>(null);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [isDragOver, setIsDragOver] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout>>();
    const blurTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

    const hasDropdownContent =
      recentSearches.length > 0 ||
      trendingSearches.length > 0 ||
      suggestedProducts.length > 0 ||
      categorySuggestions.length > 0;

    // Build flat list of navigable items for keyboard nav
    const flatItems: Array<{ type: 'recent' | 'trending' | 'product' | 'category'; index: number }> = [];
    recentSearches.forEach((_, i) => flatItems.push({ type: 'recent', index: i }));
    trendingSearches.forEach((_, i) => flatItems.push({ type: 'trending', index: i }));
    suggestedProducts.forEach((_, i) => flatItems.push({ type: 'product', index: i }));
    categorySuggestions.forEach((_, i) => flatItems.push({ type: 'category', index: i }));

    const handleFocus = useCallback(() => {
      if (hasDropdownContent) {
        setIsOpen(true);
      }
      setShowPhotoSearch(false);
    }, [hasDropdownContent]);

    const handleBlur = useCallback(() => {
      blurTimeoutRef.current = setTimeout(() => {
        setIsOpen(false);
        setShowPhotoSearch(false);
        setActiveIndex(-1);
      }, 200);
    }, []);

    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
          setValue(newValue);
        }, 300);
        // Update the input immediately for responsive feel
        // but debounce the onChange callback
        e.target.value = newValue; // keep input responsive
        if (hasDropdownContent) {
          setIsOpen(true);
        }
        setActiveIndex(-1);
      },
      [setValue, hasDropdownContent],
    );

    const handleSubmit = useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();
        const inputValue = inputRef.current?.value ?? value;
        onSearch?.(inputValue);
        setIsOpen(false);
        setActiveIndex(-1);
      },
      [value, onSearch],
    );

    const handleSelectItem = useCallback(
      (item: typeof flatItems[number]) => {
        switch (item.type) {
          case 'recent': {
            const text = recentSearches[item.index];
            setValue(text);
            if (inputRef.current) inputRef.current.value = text;
            onSuggestionClick?.(text);
            break;
          }
          case 'trending': {
            const text = trendingSearches[item.index].text;
            setValue(text);
            if (inputRef.current) inputRef.current.value = text;
            onSuggestionClick?.(text);
            break;
          }
          case 'product':
            onProductClick?.(suggestedProducts[item.index]);
            break;
          case 'category':
            onCategoryClick?.(categorySuggestions[item.index]);
            break;
        }
        setIsOpen(false);
        setActiveIndex(-1);
      },
      [recentSearches, trendingSearches, suggestedProducts, categorySuggestions, setValue, onSuggestionClick, onProductClick, onCategoryClick],
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          if (activeIndex >= 0 && activeIndex < flatItems.length) {
            e.preventDefault();
            handleSelectItem(flatItems[activeIndex]);
          } else {
            handleSubmit(e);
          }
          return;
        }
        if (e.key === 'Escape') {
          setIsOpen(false);
          setShowPhotoSearch(false);
          setActiveIndex(-1);
          inputRef.current?.blur();
          return;
        }
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (!isOpen && hasDropdownContent) {
            setIsOpen(true);
            setActiveIndex(0);
          } else if (isOpen) {
            setActiveIndex((prev) => (prev < flatItems.length - 1 ? prev + 1 : 0));
          }
          return;
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (isOpen) {
            setActiveIndex((prev) => (prev > 0 ? prev - 1 : flatItems.length - 1));
          }
        }
      },
      [activeIndex, flatItems, handleSelectItem, handleSubmit, isOpen, hasDropdownContent],
    );

    const handleClearInput = useCallback(() => {
      setValue('');
      if (inputRef.current) inputRef.current.value = '';
      inputRef.current?.focus();
    }, [setValue]);

    const handleCameraClick = useCallback(() => {
      setShowPhotoSearch((prev) => !prev);
      setIsOpen(false);
    }, []);

    // Photo search handlers
    const handlePhotoUrlSearch = useCallback(() => {
      if (photoUrl.trim()) {
        onPhotoSearch?.({ type: 'url', url: photoUrl.trim() });
        setPhotoPreview({ url: photoUrl.trim(), name: 'URL image' });
      }
    }, [photoUrl, onPhotoSearch]);

    const handleFileSelect = useCallback(
      (file: File) => {
        const previewUrl = URL.createObjectURL(file);
        setPhotoPreview({ url: previewUrl, name: file.name });
        onPhotoSearch?.({ type: 'file', file });
      },
      [onPhotoSearch],
    );

    const handleFileInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFileSelect(file);
        e.target.value = '';
      },
      [handleFileSelect],
    );

    const handleDrop = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
          handleFileSelect(file);
        }
      },
      [handleFileSelect],
    );

    const handleDragOver = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback(() => {
      setIsDragOver(false);
    }, []);

    const handleRemovePhoto = useCallback(() => {
      setPhotoPreview(null);
      setPhotoUrl('');
    }, []);

    const handlePhotoSearchSubmit = useCallback(() => {
      if (photoPreview) {
        // Already submitted via handleFileSelect or handlePhotoUrlSearch
        setShowPhotoSearch(false);
      }
    }, [photoPreview]);

    // Click outside to close
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
          setShowPhotoSearch(false);
          setActiveIndex(-1);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Cleanup timeouts
    useEffect(() => {
      return () => {
        if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
        if (debounceRef.current) clearTimeout(debounceRef.current);
      };
    }, []);

    // Track current flat index offset for each section
    let flatOffset = 0;
    const recentOffset = 0;
    flatOffset += recentSearches.length;
    const trendingOffset = flatOffset;
    flatOffset += trendingSearches.length;
    const productOffset = flatOffset;
    flatOffset += suggestedProducts.length;
    const categoryOffset = flatOffset;

    return (
      <div
        ref={(node) => {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={cn(styles.wrapper, className)}
        {...rest}
      >
        {/* Search form */}
        <form className={styles.searchBar} onSubmit={handleSubmit} role="search">
          <span className={styles.searchIcon}>
            <SearchIcon />
          </span>
          <input
            ref={inputRef}
            className={styles.searchInput}
            type="text"
            defaultValue={value}
            placeholder={placeholder}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            role="combobox"
            aria-label="Search products"
            aria-expanded={isOpen}
            aria-controls={isOpen ? 'desktop-search-listbox' : undefined}
            aria-haspopup="listbox"
            aria-activedescendant={activeIndex >= 0 ? `search-item-${activeIndex}` : undefined}
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
          {onPhotoSearch && (
            <>
              <button
                type="button"
                className={cn(styles.cameraBtn, showPhotoSearch ? styles.cameraBtnActive : '')}
                onClick={handleCameraClick}
                aria-label="Search by photo"
                tabIndex={-1}
              >
                <CameraIcon />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className={styles.fileInput}
                onChange={handleFileInputChange}
                tabIndex={-1}
                aria-hidden="true"
              />
            </>
          )}
          <button type="submit" className={styles.searchSubmit} aria-label="Submit search">
            {submitLabel ?? 'Search'}
          </button>
        </form>

        {/* Autocomplete dropdown */}
        {isOpen && hasDropdownContent && !showPhotoSearch && (
          <div
            className={styles.dropdown}
            role="listbox"
            id="desktop-search-listbox"
            aria-label="Search suggestions"
          >
            {/* Recent searches */}
            {recentSearches.length > 0 && (
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionIcon}><ClockIcon /></span>
                  <span className={styles.sectionTitle}>Recent Searches</span>
                  {onClearRecent && (
                    <button
                      type="button"
                      className={styles.clearAllBtn}
                      onClick={onClearRecent}
                      tabIndex={-1}
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className={styles.chipGroup}>
                  {recentSearches.map((term, index) => (
                    <button
                      key={index}
                      id={`search-item-${recentOffset + index}`}
                      type="button"
                      className={cn(styles.chip, activeIndex === recentOffset + index ? styles.chipActive : '')}
                      onClick={() => handleSelectItem({ type: 'recent', index })}
                      role="option"
                      aria-selected={activeIndex === recentOffset + index}
                      tabIndex={-1}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Trending searches */}
            {trendingSearches.length > 0 && (
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionIcon}><FireIcon /></span>
                  <span className={styles.sectionTitle}>Trending</span>
                </div>
                <div className={styles.trendingList}>
                  {trendingSearches.map((item, index) => (
                    <button
                      key={index}
                      id={`search-item-${trendingOffset + index}`}
                      type="button"
                      className={cn(styles.trendingItem, activeIndex === trendingOffset + index ? styles.trendingItemActive : '')}
                      onClick={() => handleSelectItem({ type: 'trending', index })}
                      role="option"
                      aria-selected={activeIndex === trendingOffset + index}
                      tabIndex={-1}
                    >
                      <span className={styles.trendingRank}>{index + 1}</span>
                      <span className={styles.trendingText}>{item.text}</span>
                      {item.count != null && (
                        <span className={styles.trendingCount}>{item.count.toLocaleString()}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Suggested products */}
            {suggestedProducts.length > 0 && (
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionTitle}>Products</span>
                </div>
                <div className={styles.productList}>
                  {suggestedProducts.map((product, index) => (
                    <button
                      key={product.id}
                      id={`search-item-${productOffset + index}`}
                      type="button"
                      className={cn(styles.productItem, activeIndex === productOffset + index ? styles.productItemActive : '')}
                      onClick={() => handleSelectItem({ type: 'product', index })}
                      role="option"
                      aria-selected={activeIndex === productOffset + index}
                      tabIndex={-1}
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className={styles.productImage}
                        loading="lazy"
                      />
                      <div className={styles.productInfo}>
                        <span className={styles.productTitle}>{product.title}</span>
                        <div className={styles.productMeta}>
                          <span className={styles.productPrice}>{formatPrice(product.price)} sum</span>
                          {product.rating != null && (
                            <span className={styles.productRating}>
                              <StarIcon />
                              {product.rating.toFixed(1)}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className={styles.productArrow}><ArrowRightIcon /></span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Category suggestions */}
            {categorySuggestions.length > 0 && (
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionIcon}><FolderIcon /></span>
                  <span className={styles.sectionTitle}>Categories</span>
                </div>
                <div className={styles.categoryList}>
                  {categorySuggestions.map((cat, index) => (
                    <button
                      key={cat.id}
                      id={`search-item-${categoryOffset + index}`}
                      type="button"
                      className={cn(styles.categoryItem, activeIndex === categoryOffset + index ? styles.categoryItemActive : '')}
                      onClick={() => handleSelectItem({ type: 'category', index })}
                      role="option"
                      aria-selected={activeIndex === categoryOffset + index}
                      tabIndex={-1}
                    >
                      <span className={styles.categoryText}>in {cat.name}</span>
                      {cat.count != null && (
                        <span className={styles.categoryCount}>{cat.count.toLocaleString()} items</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Photo search panel */}
        {showPhotoSearch && (
          <div className={styles.photoPanel}>
            <div className={styles.photoPanelHeader}>
              <span className={styles.photoPanelTitle}>Search by Image</span>
              <button
                type="button"
                className={styles.photoPanelClose}
                onClick={() => setShowPhotoSearch(false)}
                aria-label="Close photo search"
                tabIndex={-1}
              >
                <CloseIcon />
              </button>
            </div>

            {!photoPreview ? (
              <>
                {/* URL input */}
                <div className={styles.photoUrlRow}>
                  <input
                    className={styles.photoUrlInput}
                    type="url"
                    placeholder="Paste image URL"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handlePhotoUrlSearch();
                      }
                    }}
                  />
                  <button
                    type="button"
                    className={styles.photoUrlBtn}
                    onClick={handlePhotoUrlSearch}
                    disabled={!photoUrl.trim()}
                  >
                    Search
                  </button>
                </div>

                <div className={styles.photoDivider}>
                  <span>or</span>
                </div>

                {/* Drop zone */}
                <div
                  className={cn(styles.dropZone, isDragOver ? styles.dropZoneActive : '')}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      fileInputRef.current?.click();
                    }
                  }}
                  aria-label="Drop image here or click to browse"
                >
                  <UploadIcon />
                  <span className={styles.dropZoneText}>
                    Drop image here or click to browse
                  </span>
                  <span className={styles.dropZoneHint}>JPG, PNG, WebP up to 10MB</span>
                </div>
              </>
            ) : (
              /* Preview state */
              <div className={styles.photoPreview}>
                <div className={styles.photoPreviewImageWrap}>
                  <img
                    src={photoPreview.url}
                    alt="Search image preview"
                    className={styles.photoPreviewImage}
                  />
                  <button
                    type="button"
                    className={styles.photoPreviewRemove}
                    onClick={handleRemovePhoto}
                    aria-label="Remove image"
                  >
                    <CloseIcon />
                  </button>
                </div>
                <span className={styles.photoPreviewName}>{photoPreview.name}</span>
                <button
                  type="button"
                  className={styles.photoPreviewCta}
                  onClick={handlePhotoSearchSubmit}
                >
                  Search by this image
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);

DesktopSearchAutocomplete.displayName = 'DesktopSearchAutocomplete';
