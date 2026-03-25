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
import styles from './DesktopHeaderMarketplace.module.scss';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface DesktopHeaderMarketplaceLabels {
  catalog?: string;
  search?: string;
  orders?: string;
  cart?: string;
  cartWithCount?: string;
  signIn?: string;
  userActions?: string;
  locationPrefix?: string;
}

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

export interface DesktopHeaderMarketplaceProps extends HTMLAttributes<HTMLElement> {
  logo?: ReactNode;
  searchPlaceholder?: string;
  searchValue?: string;
  cartCount?: number;
  labels?: DesktopHeaderMarketplaceLabels;
  searchButtonColor?: string;
  onSearch?: (query: string) => void;
  onSearchChange?: (value: string) => void;
  onCartClick?: () => void;
  onOrdersClick?: () => void;
  onUserClick?: () => void;
  onLogoClick?: () => void;
  categories?: MegaMenuCategory[];
  onCategoryClick?: (category: MegaMenuCategory) => void;
  onCatalogClick?: () => void;
  recentSearches?: string[];
  trendingSearches?: DesktopSearchTrendingItem[];
  suggestedProducts?: DesktopSearchSuggestedProduct[];
  searchCategorySuggestions?: DesktopSearchCategoryItem[];
  onClearRecentSearches?: () => void;
  onSearchSuggestionClick?: (text: string) => void;
  onSearchProductClick?: (product: { id: string }) => void;
  onSearchCategoryClick?: (category: { id: string; name: string }) => void;
  onPhotoSearch?: (source: DesktopPhotoSearchSource) => void;
  promoTags?: DesktopHeaderPromoTag[];
  quickLinks?: DesktopHeaderQuickLink[];
  location?: string;
  onLocationClick?: () => void;
  language?: string;
  currency?: string;
  /** Custom action buttons. Replaces default Orders/Cart/SignIn when provided. */
  actions?: ReactNode;
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

const CartIconSvg = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
  </svg>
);

const UserIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

const PinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);

// ─── Default Labels ──────────────────────────────────────────────────────────

const DEFAULTS: Required<DesktopHeaderMarketplaceLabels> = {
  catalog: 'Catalog',
  search: 'Search',
  orders: 'Orders',
  cart: 'Cart',
  cartWithCount: 'Cart ({count})',
  signIn: 'Sign in',
  userActions: 'User actions',
  locationPrefix: 'Location: {location}',
};

function l(labels: DesktopHeaderMarketplaceLabels | undefined, key: keyof typeof DEFAULTS): string {
  return labels?.[key] ?? DEFAULTS[key];
}

// ─── Component ───────────────────────────────────────────────────────────────

export const DesktopHeaderMarketplace = forwardRef<HTMLElement, DesktopHeaderMarketplaceProps>(
  (
    {
      logo,
      searchPlaceholder = 'Search products...',
      searchValue,
      cartCount,
      labels,
      searchButtonColor,
      onSearch, onSearchChange, onCartClick, onOrdersClick, onUserClick, onLogoClick,
      categories, onCategoryClick, onCatalogClick,
      recentSearches, trendingSearches, suggestedProducts, searchCategorySuggestions,
      onClearRecentSearches, onSearchSuggestionClick, onSearchProductClick, onSearchCategoryClick, onPhotoSearch,
      promoTags = [], quickLinks = [], location, onLocationClick,
      language = 'EN', currency = 'USD',
      actions: customActions,
      className, ...rest
    },
    ref,
  ) => {
    const handleLogoKeyDown = useCallback((e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onLogoClick?.(); }
    }, [onLogoClick]);

    const hasCategories = categories && categories.length > 0;
    const hasPromoRow = promoTags.length > 0 || quickLinks.length > 0 || location;
    const cartAriaLabel = cartCount
      ? l(labels, 'cartWithCount').replace('{count}', String(cartCount))
      : l(labels, 'cart');

    const searchAreaStyle = searchButtonColor
      ? { '--gs-header-marketplace-search-btn-bg': searchButtonColor } as React.CSSProperties
      : undefined;

    return (
      <header ref={ref} className={cn(styles.header, className)} {...rest}>
        <div className={styles.mainRow}>
            {logo && (
              <div
                className={styles.logo}
                onClick={onLogoClick}
                onKeyDown={onLogoClick ? handleLogoKeyDown : undefined}
                role={onLogoClick ? 'button' : undefined}
                tabIndex={onLogoClick ? 0 : undefined}
              >
                {logo}
              </div>
            )}

            {hasCategories ? (
              <MegaMenu
                className={styles.catalogMenu}
                categories={categories}
                onCategoryClick={onCategoryClick}
                triggerLabel={l(labels, 'catalog')}
                triggerIcon={<GridIcon />}
              />
            ) : (
              <button type="button" className={styles.catalogBtnFallback} onClick={onCatalogClick} aria-label={l(labels, 'catalog')}>
                <GridIcon /><span>{l(labels, 'catalog')}</span>
              </button>
            )}

            <DesktopSearchAutocomplete
              className={styles.searchArea}
              style={searchAreaStyle}
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
              submitLabel={l(labels, 'search')}
            />

            {customActions ? (
              <nav className={styles.actions} aria-label={l(labels, 'userActions')}>{customActions}</nav>
            ) : (
              <nav className={styles.actions} aria-label={l(labels, 'userActions')}>
                <button type="button" className={styles.actionBtn} onClick={onOrdersClick} aria-label={l(labels, 'orders')}>
                  <PackageIcon /><span className={styles.actionLabel}>{l(labels, 'orders')}</span>
                </button>
                <button type="button" className={styles.actionBtn} onClick={onCartClick} aria-label={cartAriaLabel}>
                  <CartIconSvg /><span className={styles.actionLabel}>{l(labels, 'cart')}</span>
                  {cartCount != null && cartCount > 0 && (
                    <span className={styles.cartBadge}>{cartCount > 99 ? '99+' : cartCount}</span>
                  )}
                </button>
                <button type="button" className={styles.actionBtn} onClick={onUserClick} aria-label={l(labels, 'signIn')}>
                  <UserIcon /><span className={styles.actionLabel}>{l(labels, 'signIn')}</span>
                </button>
              </nav>
            )}
          </div>

        {hasPromoRow && (
          <div className={styles.promoRow}>
              <div className={styles.promoLeft}>
                {promoTags.map((tag, idx) => (
                  <button key={idx} type="button" className={styles.promoTag}
                    style={{ background: tag.bgColor || 'var(--gs-color-sale)', color: tag.textColor || 'var(--gs-text-white)' }}
                    onClick={tag.onClick}>{tag.label}</button>
                ))}
                {quickLinks.map((link, idx) => (
                  <a key={idx} href={link.href || '#'} className={styles.quickLink}
                    onClick={(e) => { if (link.onClick) { e.preventDefault(); link.onClick(); } }}>{link.label}</a>
                ))}
              </div>
              <div className={styles.promoRight}>
                {location && (
                  <button type="button" className={styles.locationBtn} onClick={onLocationClick}
                    aria-label={l(labels, 'locationPrefix').replace('{location}', location)}>
                    <PinIcon /><span>{location}</span>
                  </button>
                )}
                <span className={styles.metaItem}>{language}</span>
                <span className={styles.metaItem}>{currency}</span>
              </div>
          </div>
        )}
      </header>
    );
  },
);

DesktopHeaderMarketplace.displayName = 'DesktopHeaderMarketplace';

/** @deprecated Use DesktopHeaderMarketplace instead */
export const DesktopHeaderAliExpress = DesktopHeaderMarketplace;
/** @deprecated Use DesktopHeaderMarketplaceProps instead */
export type DesktopHeaderAliExpressProps = DesktopHeaderMarketplaceProps;
