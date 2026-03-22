'use client';
import { useGeekShop } from '../../../i18n';
import { cn } from '../../../utils/cn';
import { forwardRef, useState, useRef, useCallback, useEffect, type ReactNode, type HTMLAttributes } from 'react';
import styles from './MegaMenu.module.scss';

export interface MegaMenuSubcategory {
  /** Display label */
  label: string;
  /** Link URL */
  href?: string;
}

export interface MegaMenuCategory {
  /** Display label */
  label: string;
  /** Optional icon */
  icon?: ReactNode;
  /** Link URL */
  href?: string;
  /** Subcategories shown in the right panel */
  subcategories?: MegaMenuSubcategory[];
}

export interface MegaMenuProps extends HTMLAttributes<HTMLElement> {
  /** Category list for the dropdown panel */
  categories: MegaMenuCategory[];
  /** Additional navigation items shown inline (e.g. Deals, New Arrivals) */
  navItems?: { label: string; href?: string; onClick?: () => void }[];
  /** Callback when a category is clicked */
  onCategoryClick?: (category: MegaMenuCategory) => void;
}

/* ---------- Inline SVG Icons ---------- */

const MenuIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export const MegaMenu = forwardRef<HTMLElement, MegaMenuProps>(
  ({ categories, navItems, onCategoryClick, className, ...rest }, ref) => {
  const { t } = useGeekShop();
    const rootClass = cn(styles.megaMenu, className);
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const clearCloseTimer = useCallback(() => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    }, []);

    const handleTriggerEnter = useCallback(() => {
      clearCloseTimer();
      setIsOpen(true);
    }, [clearCloseTimer]);

    const handleTriggerLeave = useCallback(() => {
      closeTimerRef.current = setTimeout(() => {
        setIsOpen(false);
        setActiveIndex(0);
      }, 150);
    }, []);

    const handleDropdownEnter = useCallback(() => {
      clearCloseTimer();
    }, [clearCloseTimer]);

    const handleDropdownLeave = useCallback(() => {
      closeTimerRef.current = setTimeout(() => {
        setIsOpen(false);
        setActiveIndex(0);
      }, 150);
    }, []);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (!isOpen) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(true);
          }
          return;
        }

        switch (e.key) {
          case 'Escape':
            setIsOpen(false);
            break;
          case 'ArrowDown':
            e.preventDefault();
            setActiveIndex((prev) => Math.min(prev + 1, categories.length - 1));
            break;
          case 'ArrowUp':
            e.preventDefault();
            setActiveIndex((prev) => Math.max(prev - 1, 0));
            break;
          case 'Enter': {
            e.preventDefault();
            const cat = categories[activeIndex];
            if (cat) onCategoryClick?.(cat);
            break;
          }
        }
      },
      [isOpen, categories, activeIndex, onCategoryClick],
    );

    // Cleanup timer on unmount
    useEffect(() => {
      return () => {
        if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      };
    }, []);

    const activeCategory = categories[activeIndex];

    return (
      <nav ref={ref} className={rootClass} aria-label={t('aria.categoryNavigation')} {...rest}>
        <div className={styles.content}>
          {/* All Categories trigger */}
          <div
            className={styles.triggerWrapper}
            onMouseEnter={handleTriggerEnter}
            onMouseLeave={handleTriggerLeave}
          >
            <button
              className={styles.trigger}
              aria-expanded={isOpen}
              aria-haspopup="true"
              onKeyDown={handleKeyDown}
            >
              <MenuIcon />
              <span>All Categories</span>
            </button>
          </div>

          {/* Nav items */}
          {navItems && navItems.length > 0 && (
            <ul className={styles.navList}>
              {navItems.map((item, i) => (
                <li key={i}>
                  {item.href ? (
                    <a className={styles.navLink} href={item.href}>
                      {item.label}
                    </a>
                  ) : (
                    <button className={styles.navLink} onClick={item.onClick} type="button">
                      {item.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Dropdown panel */}
        {isOpen && categories.length > 0 && (
          <div
            ref={dropdownRef}
            className={styles.dropdown}
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
            role="menu"
            aria-label={t('aria.categories')}
            tabIndex={-1}
          >
            <div className={styles.dropdownContent}>
              {/* Left sidebar - category list */}
              <ul className={styles.categoryList}>
                {categories.map((cat, i) => (
                  <li
                    key={i}
                    className={cn(styles.categoryItem, i === activeIndex ? styles.categoryItemActive : '')}
                    onMouseEnter={() => setActiveIndex(i)}
                    role="menuitem"
                  >
                    <a
                      className={styles.categoryLink}
                      href={cat.href}
                      onClick={(e) => {
                        if (!cat.href) e.preventDefault();
                        onCategoryClick?.(cat);
                      }}
                    >
                      {cat.icon && <span className={styles.categoryIcon}>{cat.icon}</span>}
                      <span className={styles.categoryLabel}>{cat.label}</span>
                      {cat.subcategories && cat.subcategories.length > 0 && (
                        <span className={styles.chevron}>
                          <ChevronRightIcon />
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Right panel - subcategories */}
              {activeCategory?.subcategories && activeCategory.subcategories.length > 0 && (
                <div className={styles.subcategoryPanel}>
                  <h3 className={styles.subcategoryTitle}>{activeCategory.label}</h3>
                  <ul className={styles.subcategoryGrid}>
                    {activeCategory.subcategories.map((sub, i) => (
                      <li key={i}>
                        <a
                          className={styles.subcategoryLink}
                          href={sub.href}
                          onClick={(e) => {
                            if (!sub.href) e.preventDefault();
                          }}
                        >
                          {sub.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    );
  },
);

MegaMenu.displayName = 'MegaMenu';
