'use client';
import { useGeekShop } from '../../../i18n';
import { cn } from '../../../utils/cn';
import { forwardRef, useState, useEffect, useCallback, type ReactNode, type HTMLAttributes } from 'react';
import { DesktopSearchAutocomplete } from '../DesktopSearchAutocomplete';
import type { DesktopSearchSuggestedProduct, DesktopSearchTrendingItem, DesktopSearchCategoryItem, DesktopPhotoSearchSource } from '../DesktopSearchAutocomplete';
import styles from './DesktopHeaderRich.module.scss';

export interface CategoryItem {
  id: string;
  label: string;
  icon?: string;
  href?: string;
}

export interface PromoLink {
  id: string;
  label: string;
  href?: string;
  highlight?: boolean;
}

export interface DesktopHeaderRichProps extends HTMLAttributes<HTMLElement> {
  /** Logo content */
  logo?: ReactNode;
  /** Search placeholder */
  searchPlaceholder?: string;
  /** Controlled search value */
  searchValue?: string;
  /** Wishlist badge count */
  wishlistCount?: number;
  /** Cart badge count */
  cartCount?: number;
  /** Category items for bottom bar */
  categories?: CategoryItem[];
  /** Promo links shown in second row */
  promoLinks?: PromoLink[];
  /** Location label shown in top bar */
  location?: string;
  /** Search submit */
  onSearch?: (query: string) => void;
  /** Search input change */
  onSearchChange?: (value: string) => void;
  /** Wishlist click */
  onWishlistClick?: () => void;
  /** Cart click */
  onCartClick?: () => void;
  /** User click */
  onUserClick?: () => void;
  /** Logo click */
  onLogoClick?: () => void;
  /** Katalog button click */
  onCatalogClick?: () => void;
  /** Category click */
  onCategoryClick?: (category: CategoryItem) => void;
  /** Promo link click */
  onPromoLinkClick?: (link: PromoLink) => void;
  /** Orders click */
  onOrdersClick?: () => void;
  /** Location click */
  onLocationClick?: () => void;
  /** Callback when user uploads an image for visual search */
  onImageSearch?: (file: File) => void;
  /** Photo/image search handler (new autocomplete) */
  onPhotoSearch?: (source: DesktopPhotoSearchSource) => void;
  /** Recent searches shown in autocomplete dropdown */
  recentSearches?: string[];
  /** Trending searches shown in autocomplete dropdown */
  trendingSearches?: DesktopSearchTrendingItem[];
  /** Suggested products shown in autocomplete dropdown */
  suggestedProducts?: DesktopSearchSuggestedProduct[];
  /** Category suggestions in autocomplete dropdown */
  searchCategorySuggestions?: DesktopSearchCategoryItem[];
  /** Clear recent searches callback */
  onClearRecentSearches?: () => void;
  /** Callback when a search suggestion is clicked */
  onSearchSuggestionClick?: (text: string) => void;
  /** Callback when a product is clicked in search */
  onSearchProductClick?: (product: { id: string }) => void;
  /** Callback when a category is clicked in search */
  onSearchCategoryClick?: (category: { id: string; name: string }) => void;
}

/* ---------- Inline SVG Icons ---------- */

const HeartIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

const CartIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
  </svg>
);

const UserIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const PackageIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const GridIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
  </svg>
);

const MapPinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export const DesktopHeaderRich = forwardRef<HTMLElement, DesktopHeaderRichProps>(
  (
    {
      logo,
      searchPlaceholder = 'Search products...',
      searchValue,
      wishlistCount,
      cartCount,
      categories = [],
      promoLinks = [],
      location = 'Tashkent',
      onSearch,
      onSearchChange,
      onWishlistClick,
      onCartClick,
      onUserClick,
      onLogoClick,
      onCatalogClick,
      onCategoryClick,
      onPromoLinkClick,
      onOrdersClick,
      onLocationClick,
      onImageSearch,
      onPhotoSearch,
      recentSearches,
      trendingSearches,
      suggestedProducts,
      searchCategorySuggestions,
      onClearRecentSearches,
      onSearchSuggestionClick,
      onSearchProductClick,
      onSearchCategoryClick,
      className,
      ...rest
    },
    ref,
  ) => {
  const { t } = useGeekShop();
    const [scrolled, setScrolled] = useState(false);
    const [catScrollPos, setCatScrollPos] = useState<'start' | 'middle' | 'end'>('start');

    useEffect(() => {
      const handleScroll = () => setScrolled(window.scrollY > 10);
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleCatScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      const atStart = el.scrollLeft <= 0;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
      if (atStart) setCatScrollPos('start');
      else if (atEnd) setCatScrollPos('end');
      else setCatScrollPos('middle');
    }, []);

    const scrollCategories = useCallback((direction: 'left' | 'right') => {
      const el = document.getElementById('rich-cat-scroll');
      if (el) {
        const amount = direction === 'left' ? -200 : 200;
        el.scrollBy({ left: amount, behavior: 'smooth' });
      }
    }, []);

    const handleLogoKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onLogoClick?.();
      }
    };

    // Adapter: bridge old onImageSearch to new onPhotoSearch
    const resolvedPhotoSearch = onPhotoSearch ?? (onImageSearch ? (source: DesktopPhotoSearchSource) => {
      if (source.type === 'file' && source.file) onImageSearch(source.file);
    } : undefined);

    const rootClass = cn(
      styles.header,
      scrolled ? styles.scrolled : '',
      className);

    const formatBadge = (count: number) => (count > 99 ? '99+' : String(count));

    return (
      <header ref={ref} className={rootClass} {...rest}>
        {/* Top row: location + promo links */}
        <div className={styles.topBar}>
          <div className={styles.topContent}>
            <button
              type="button"
              className={styles.locationBtn}
              onClick={onLocationClick}
              aria-label={`Delivery to ${location}`}
            >
              <MapPinIcon />
              <span>{location}</span>
            </button>
            {promoLinks.length > 0 && (
              <nav className={styles.promoNav} aria-label={t('aria.promotions')}>
                {promoLinks.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    className={cn(styles.promoLink, link.highlight ? styles.promoHighlight : '')}
                    onClick={() => onPromoLinkClick?.(link)}
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            )}
          </div>
        </div>

        {/* Main row: logo + katalog + search + actions */}
        <div className={styles.mainRow}>
          <div className={styles.content}>
            <div
              className={styles.logo}
              onClick={onLogoClick}
              onKeyDown={onLogoClick ? handleLogoKeyDown : undefined}
              role={onLogoClick ? 'button' : undefined}
              tabIndex={onLogoClick ? 0 : undefined}
            >
              {logo ?? <span className={styles.logoText}>GeekShop</span>}
            </div>

            <button
              type="button"
              className={styles.catalogBtn}
              onClick={onCatalogClick}
              aria-label={t('aria.openCatalog')}
            >
              <GridIcon />
              <span>Katalog</span>
            </button>

            <DesktopSearchAutocomplete
              value={searchValue}
              onChange={onSearchChange}
              onSearch={onSearch}
              onPhotoSearch={resolvedPhotoSearch}
              placeholder={searchPlaceholder}
              recentSearches={recentSearches}
              trendingSearches={trendingSearches}
              suggestedProducts={suggestedProducts}
              categorySuggestions={searchCategorySuggestions}
              onClearRecent={onClearRecentSearches}
              onSuggestionClick={onSearchSuggestionClick}
              onProductClick={onSearchProductClick}
              onCategoryClick={onSearchCategoryClick}
            />

            <nav className={styles.actions} aria-label={t('aria.userActions')}>
              <button className={styles.actionBtn} onClick={onWishlistClick} aria-label={wishlistCount ? `Wishlist (${wishlistCount} items)` : 'Wishlist'}>
                <HeartIcon />
                <span className={styles.actionLabel}>Wishlist</span>
                {wishlistCount != null && wishlistCount > 0 && (
                  <span className={styles.badge}>{formatBadge(wishlistCount)}</span>
                )}
              </button>

              <button className={styles.actionBtn} onClick={onOrdersClick} aria-label={t('aria.orders')}>
                <PackageIcon />
                <span className={styles.actionLabel}>Orders</span>
              </button>

              <button className={styles.actionBtn} onClick={onCartClick} aria-label={cartCount ? `Cart (${cartCount} items)` : 'Cart'}>
                <CartIcon />
                <span className={styles.actionLabel}>Cart</span>
                {cartCount != null && cartCount > 0 && (
                  <span className={styles.badge}>{formatBadge(cartCount)}</span>
                )}
              </button>

              <button className={styles.actionBtn} onClick={onUserClick} aria-label={t('aria.userAccount')}>
                <UserIcon />
                <span className={styles.actionLabel}>Sign in</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Category bar */}
        {categories.length > 0 && (
          <div className={styles.categoryBar}>
            <div className={styles.categoryContent}>
              {catScrollPos !== 'start' && (
                <button
                  className={cn(styles.catArrow, styles.catArrowLeft)}
                  onClick={() => scrollCategories('left')}
                  aria-label={t('aria.scrollCategoriesLeft')}
                  type="button"
                >
                  <ChevronLeftIcon />
                </button>
              )}
              <div
                id="rich-cat-scroll"
                className={styles.categoryScroll}
                onScroll={handleCatScroll}
              >
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    className={styles.categoryItem}
                    onClick={() => onCategoryClick?.(cat)}
                    aria-label={cat.label}
                  >
                    {cat.icon && (
                      <img className={styles.categoryIcon} src={cat.icon} alt="" loading="lazy" />
                    )}
                    <span className={styles.categoryLabel}>{cat.label}</span>
                  </button>
                ))}
              </div>
              {catScrollPos !== 'end' && categories.length > 8 && (
                <button
                  className={cn(styles.catArrow, styles.catArrowRight)}
                  onClick={() => scrollCategories('right')}
                  aria-label={t('aria.scrollCategoriesRight')}
                  type="button"
                >
                  <ChevronRightIcon />
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    );
  },
);

DesktopHeaderRich.displayName = 'DesktopHeaderRich';
