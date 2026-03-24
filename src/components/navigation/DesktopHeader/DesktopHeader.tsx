'use client';
import { useGeekShop } from '../../../i18n';
import { cn } from '../../../utils/cn';
import { forwardRef, useRef, useCallback, type ReactNode, type HTMLAttributes } from 'react';
import styles from './DesktopHeader.module.scss';

export interface DesktopHeaderProps extends HTMLAttributes<HTMLElement> {
  /** Logo content (e.g. image or text) */
  logo?: ReactNode;
  /** Search input placeholder */
  searchPlaceholder?: string;
  /** Controlled search value */
  searchValue?: string;
  /** Wishlist badge count */
  wishlistCount?: number;
  /** Cart badge count */
  cartCount?: number;
  /** Callback when search form is submitted */
  onSearch?: (query: string) => void;
  /** Callback when search input value changes */
  onSearchChange?: (value: string) => void;
  /** Callback when wishlist icon is clicked */
  onWishlistClick?: () => void;
  /** Callback when cart icon is clicked */
  onCartClick?: () => void;
  /** Callback when user icon is clicked */
  onUserClick?: () => void;
  /** Callback when logo is clicked */
  onLogoClick?: () => void;
  /** Callback when "Katalog" button is clicked */
  onCatalogClick?: () => void;
  /** Callback when user uploads an image for visual search */
  onImageSearch?: (file: File) => void;
}

/* ---------- Inline SVG Icons ---------- */

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

const HeartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

const PackageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const CartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
  </svg>
);

const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const CameraIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const GridIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
  </svg>
);

export const DesktopHeader = forwardRef<HTMLElement, DesktopHeaderProps>(
  (
    {
      logo,
      searchPlaceholder = 'Search products...',
      searchValue,
      wishlistCount,
      cartCount,
      onSearch,
      onSearchChange,
      onWishlistClick,
      onCartClick,
      onUserClick,
      onLogoClick,
      onCatalogClick,
      onImageSearch,
      className,
      ...rest
    },
    ref,
  ) => {
  const { t } = useGeekShop();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const rootClass = cn(styles.header, className);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (onSearch && searchValue) {
        onSearch(searchValue);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onLogoClick?.();
      }
    };

    const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && onImageSearch) {
        onImageSearch(file);
      }
      e.target.value = '';
    }, [onImageSearch]);

    return (
      <header ref={ref} className={rootClass} {...rest}>
        <div className={styles.content}>
          {/* Logo */}
          <div
            className={styles.logo}
            onClick={onLogoClick}
            onKeyDown={onLogoClick ? handleKeyDown : undefined}
            role={onLogoClick ? 'button' : undefined}
            tabIndex={onLogoClick ? 0 : undefined}
          >
            {logo ?? <span className={styles.logoText}>GeekShop</span>}
          </div>

          {/* Katalog button */}
          <button
            type="button"
            className={styles.catalogBtn}
            onClick={onCatalogClick}
            aria-label={t('aria.openCatalog')}
          >
            <GridIcon />
            Katalog
          </button>

          {/* Search bar */}
          <form className={styles.searchBar} onSubmit={handleSubmit} role="search">
            <span className={styles.searchIcon}>
              <SearchIcon />
            </span>
            <input
              className={styles.searchInput}
              type="text"
              placeholder={searchPlaceholder}
              value={searchValue ?? ''}
              onChange={(e) => onSearchChange?.(e.target.value)}
              aria-label={t('aria.searchProducts')}
            />
            {onImageSearch && (
              <>
                <button
                  type="button"
                  className={styles.imageSearchBtn}
                  onClick={() => fileInputRef.current?.click()}
                  aria-label={t('product.cameraSearch')}
                >
                  <CameraIcon />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className={styles.fileInput}
                  onChange={handleImageUpload}
                  tabIndex={-1}
                  aria-hidden="true"
                />
              </>
            )}
            <button type="submit" className={styles.searchButton} aria-label={t('aria.submitSearch')}>
              <SearchIcon />
            </button>
          </form>

          {/* Action icons with text labels */}
          <div className={styles.actions}>
            <button
              className={styles.actionBtn}
              onClick={onWishlistClick}
              aria-label={wishlistCount ? `Wishlist (${wishlistCount} items)` : 'Wishlist'}
            >
              <HeartIcon />
              <span className={styles.actionLabel}>Wishlist</span>
              {wishlistCount != null && wishlistCount > 0 && (
                <span className={styles.badge}>{wishlistCount > 99 ? '99+' : wishlistCount}</span>
              )}
            </button>

            <button
              className={styles.actionBtn}
              onClick={() => {}}
              aria-label={t('aria.orders')}
            >
              <PackageIcon />
              <span className={styles.actionLabel}>Orders</span>
            </button>

            <button
              className={styles.actionBtn}
              onClick={onCartClick}
              aria-label={cartCount ? `Cart (${cartCount} items)` : 'Cart'}
            >
              <CartIcon />
              <span className={styles.actionLabel}>Cart</span>
              {cartCount != null && cartCount > 0 && (
                <span className={styles.badge}>{cartCount > 99 ? '99+' : cartCount}</span>
              )}
            </button>

            <button
              className={styles.actionBtn}
              onClick={onUserClick}
              aria-label={t('aria.userAccount')}
            >
              <UserIcon />
              <span className={styles.actionLabel}>Sign in</span>
            </button>
          </div>
        </div>
      </header>
    );
  },
);

DesktopHeader.displayName = 'DesktopHeader';
