import { forwardRef, type HTMLAttributes } from 'react';
import styles from './AppBar.module.scss';

export interface AppBarProps extends HTMLAttributes<HTMLElement> {
  /** Location text (e.g. "Toshkent") */
  location?: string;
  /** Search placeholder */
  searchPlaceholder?: string;
  /** Search value */
  searchValue?: string;
  /** Variant: with colored background or transparent */
  variant?: 'colored' | 'transparent';
  /** Background color for colored variant (CSS value) */
  backgroundColor?: string;
  /** Whether to show location button */
  showLocation?: boolean;
  /** Whether to show scan/camera button */
  showScan?: boolean;
  /** Whether to show dark mode toggle */
  showDarkMode?: boolean;
  /** Callback when location is clicked */
  onLocationClick?: () => void;
  /** Callback when search is focused/clicked */
  onSearchClick?: () => void;
  /** Callback when search value changes */
  onSearchChange?: (value: string) => void;
  /** Callback when scan button is clicked */
  onScanClick?: () => void;
  /** Callback when dark mode is toggled */
  onDarkModeClick?: () => void;
}

/* ---------- Inline SVG Icons ---------- */

const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

const ScanIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const MoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

export const AppBar = forwardRef<HTMLElement, AppBarProps>(
  (
    {
      location = 'Toshkent',
      searchPlaceholder = 'Mahsulot qidirish...',
      searchValue,
      variant = 'colored',
      backgroundColor,
      showLocation = false,
      showScan = false,
      showDarkMode = false,
      onLocationClick,
      onSearchClick,
      onSearchChange,
      onScanClick,
      onDarkModeClick,
      className = '',
      style,
      ...rest
    },
    ref,
  ) => {
    const isReadOnly = !onSearchChange;
    const backgroundStyle = backgroundColor
      ? { ...style, background: backgroundColor }
      : style;

    return (
      <header
        ref={ref}
        className={`${styles.appBar} ${styles[variant]} ${className}`}
        style={backgroundStyle}
        {...rest}
      >
        {/* Location button */}
        {showLocation && (
          <button
            className={styles.locationBtn}
            onClick={onLocationClick}
            aria-label={`Joylashuv: ${location}`}
          >
            <LocationIcon />
            <span>{location}</span>
          </button>
        )}

        {/* Search bar */}
        <div
          className={styles.searchWrapper}
          onClick={isReadOnly ? onSearchClick : undefined}
          role={isReadOnly ? 'button' : undefined}
          tabIndex={isReadOnly ? 0 : undefined}
        >
          <span className={styles.searchIcon}>
            <SearchIcon />
          </span>

          {isReadOnly ? (
            <span className={styles.placeholderText}>{searchPlaceholder}</span>
          ) : (
            <input
              className={styles.searchInput}
              type="text"
              value={searchValue ?? ''}
              placeholder={searchPlaceholder}
              onChange={(e) => onSearchChange?.(e.target.value)}
              onClick={onSearchClick}
            />
          )}
        </div>

        {/* Scan / camera button */}
        {showScan && (
          <button
            className={styles.iconBtn}
            onClick={onScanClick}
            aria-label="Kamera bilan qidirish"
          >
            <ScanIcon />
          </button>
        )}

        {/* Dark mode toggle */}
        {showDarkMode && (
          <button
            className={styles.iconBtn}
            onClick={onDarkModeClick}
            aria-label="Tungi rejim"
          >
            <MoonIcon />
          </button>
        )}
      </header>
    );
  },
);

AppBar.displayName = 'AppBar';
