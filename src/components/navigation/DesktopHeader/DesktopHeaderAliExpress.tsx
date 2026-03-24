'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, useCallback, type ReactNode, type HTMLAttributes } from 'react';
import { DesktopSearchAutocomplete } from '../DesktopSearchAutocomplete';
import type {
  DesktopSearchSuggestedProduct,
  DesktopSearchTrendingItem,
  DesktopSearchCategoryItem,
  DesktopPhotoSearchSource,
} from '../DesktopSearchAutocomplete';
import { MegaMenu } from '../MegaMenu';
import type { MegaMenuCategory } from '../MegaMenu';
import styles from './DesktopHeaderAliExpress.module.scss';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface DesktopHeaderPromoTag {
  label: string;
  bgColor?: string;
  textColor?: string;
  onClick?: () => void;
}

export interface DesktopHeaderQuickLink {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface DesktopHeaderAliExpressProps extends HTMLAttributes<HTMLElement> {
  /** Logo content (defaults to "GeekShop" text) */
  logo?: ReactNode;
  /** Search input placeholder */
  searchPlaceholder?: string;
  /** Controlled search value */
  searchValue?: string;
  /** Cart badge count */
  cartCount?: number;
  /** Callback when search form is submitted */
  onSearch?: (query: string) => void;
  /** Callback when search input value changes */
  onSearchChange?: (value: string) => void;
  /** Callback when cart icon is clicked */
  onCartClick?: () => void;
  /** Callback when orders icon is clicked */
  onOrdersClick?: () => void;
  /** Callback when user/login icon is clicked */
  onUserClick?: () => void;
  /** Callback when logo is clicked */
  onLogoClick?: () => void;

  // ── MegaMenu / Catalog ──
  /** Categories for the MegaMenu dropdown. When provided, renders MegaMenu instead of plain button */
  categories?: MegaMenuCategory[];
  /** Callback when a MegaMenu category is clicked */
  onCategoryClick?: (category: MegaMenuCategory) => void;
  /** Fallback callback when catalog button is clicked (only used when no categories) */
  onCatalogClick?: () => void;

  // ── Search Autocomplete ──
  /** Recent search terms for autocomplete dropdown */
  recentSearches?: string[];
  /** Trending search terms */
  trendingSearches?: DesktopSearchTrendingItem[];
  /** Suggested products in search dropdown */
  suggestedProducts?: DesktopSearchSuggestedProduct[];
  /** Category suggestions in search dropdown */
  searchCategorySuggestions?: DesktopSearchCategoryItem[];
  /** Callback to clear recent searches */
  onClearRecentSearches?: () => void;
  /** Callback when a search suggestion is clicked */
  onSearchSuggestionClick?: (text: string) => void;
  /** Callback when a search product is clicked */
  onSearchProductClick?: (product: { id: string }) => void;
  /** Callback when a search category is clicked */
  onSearchCategoryClick?: (category: { id: string; name: string }) => void;
  /** Callback for photo/image search */
  onPhotoSearch?: (source: DesktopPhotoSearchSource) => void;

  // ── Promo Row ──
  /** Promo tags in the bottom row (e.g. "ВЕЛИКАЯ РАСПРОДАЖА") */
  promoTags?: DesktopHeaderPromoTag[];
  /** Quick links in the bottom row (e.g. "Горящие товары") */
  quickLinks?: DesktopHeaderQuickLink[];
  /** Location text */
  location?: string;
  /** Callback when location is clicked */
  onLocationClick?: () => void;
  /** Language code (e.g. "RU") */
  language?: string;
  /** Currency code (e.g. "UZS") */
  currency?: string;
}

// ─── SVG Icons ───────────────────────────────────────────────────────────────

const GridIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

const PackageIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
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

const PinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// ─── Component ───────────────────────────────────────────────────────────────

export const DesktopHeaderAliExpress = forwardRef<HTMLElement, DesktopHeaderAliExpressProps>(
  (
    {
      logo,
      searchPlaceholder = 'Поиск товаров...',
      searchValue,
      cartCount,
      onSearch,
      onSearchChange,
      onCartClick,
      onOrdersClick,
      onUserClick,
      onLogoClick,
      // MegaMenu
      categories,
      onCategoryClick,
      onCatalogClick,
      // Search autocomplete
      recentSearches,
      trendingSearches,
      suggestedProducts,
      searchCategorySuggestions,
      onClearRecentSearches,
      onSearchSuggestionClick,
      onSearchProductClick,
      onSearchCategoryClick,
      onPhotoSearch,
      // Promo row
      promoTags = [],
      quickLinks = [],
      location,
      onLocationClick,
      language = 'RU',
      currency = 'UZS',
      className,
      ...rest
    },
    ref,
  ) => {
    const handleLogoKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onLogoClick?.();
        }
      },
      [onLogoClick],
    );

    const hasCategories = categories && categories.length > 0;
    const hasPromoRow = promoTags.length > 0 || quickLinks.length > 0 || location;

    return (
      <header ref={ref} className={cn(styles.header, className)} {...rest}>
        {/* ─── Main Row (primary color background) ─── */}
        <div className={styles.mainRow}>
          <div className={styles.mainContent}>
            {/* Logo */}
            <div
              className={styles.logo}
              onClick={onLogoClick}
              onKeyDown={onLogoClick ? handleLogoKeyDown : undefined}
              role={onLogoClick ? 'button' : undefined}
              tabIndex={onLogoClick ? 0 : undefined}
            >
              {logo ?? <span className={styles.logoText}>GeekShop</span>}
            </div>

            {/* Catalog — MegaMenu when categories provided, plain button fallback */}
            {hasCategories ? (
              <MegaMenu
                className={styles.catalogMenu}
                categories={categories}
                onCategoryClick={onCategoryClick}
                triggerLabel="Каталог"
                triggerIcon={<GridIcon />}
              />
            ) : (
              <button
                type="button"
                className={styles.catalogBtnFallback}
                onClick={onCatalogClick}
                aria-label="Открыть каталог"
              >
                <GridIcon />
                <span>Каталог</span>
              </button>
            )}

            {/* Search — DesktopSearchAutocomplete with full suggestions */}
            <DesktopSearchAutocomplete
              className={styles.searchArea}
              value={searchValue}
              onChange={onSearchChange}
              onSearch={onSearch}
              onPhotoSearch={onPhotoSearch}
              placeholder={searchPlaceholder}
              recentSearches={recentSearches}
              trendingSearches={trendingSearches}
              suggestedProducts={suggestedProducts}
              categorySuggestions={searchCategorySuggestions}
              onClearRecent={onClearRecentSearches}
              onSuggestionClick={onSearchSuggestionClick}
              onProductClick={onSearchProductClick}
              onCategoryClick={onSearchCategoryClick}
              submitLabel="Найти"
            />

            {/* Action icons */}
            <nav className={styles.actions} aria-label="Действия пользователя">
              <button
                type="button"
                className={styles.actionBtn}
                onClick={onOrdersClick}
                aria-label="Заказы"
              >
                <PackageIcon />
                <span className={styles.actionLabel}>Заказы</span>
              </button>

              <button
                type="button"
                className={styles.actionBtn}
                onClick={onCartClick}
                aria-label={cartCount ? `Корзина (${cartCount})` : 'Корзина'}
              >
                <CartIcon />
                <span className={styles.actionLabel}>Корзина</span>
                {cartCount != null && cartCount > 0 && (
                  <span className={styles.cartBadge}>
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                className={styles.actionBtn}
                onClick={onUserClick}
                aria-label="Войти"
              >
                <UserIcon />
                <span className={styles.actionLabel}>Войти</span>
              </button>
            </nav>
          </div>
        </div>

        {/* ─── Promo Row (white background) ─── */}
        {hasPromoRow && (
          <div className={styles.promoRow}>
            <div className={styles.promoContent}>
              <div className={styles.promoLeft}>
                {promoTags.map((tag, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={styles.promoTag}
                    style={{
                      background: tag.bgColor || '#FF3B30',
                      color: tag.textColor || '#FFFFFF',
                    }}
                    onClick={tag.onClick}
                  >
                    {tag.label}
                  </button>
                ))}
                {quickLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href || '#'}
                    className={styles.quickLink}
                    onClick={(e) => {
                      if (link.onClick) {
                        e.preventDefault();
                        link.onClick();
                      }
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className={styles.promoRight}>
                {location && (
                  <button
                    type="button"
                    className={styles.locationBtn}
                    onClick={onLocationClick}
                    aria-label={`Местоположение: ${location}`}
                  >
                    <PinIcon />
                    <span>{location}</span>
                  </button>
                )}
                <span className={styles.metaItem}>{language}</span>
                <span className={styles.metaItem}>{currency}</span>
              </div>
            </div>
          </div>
        )}
      </header>
    );
  },
);

DesktopHeaderAliExpress.displayName = 'DesktopHeaderAliExpress';
