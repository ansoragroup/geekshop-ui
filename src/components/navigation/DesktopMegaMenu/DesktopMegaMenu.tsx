'use client';
import { useGeekShop } from '../../../i18n';
import { cn } from '../../../utils/cn';
import {
  forwardRef,
  useState,
  useRef,
  useCallback,
  useEffect,
  type ReactNode,
  type HTMLAttributes,
} from 'react';
import styles from './DesktopMegaMenu.module.scss';

export interface MegaMenuSubcategory {
  label: string;
  href?: string;
}

export interface MegaMenuCategory {
  label: string;
  icon?: ReactNode;
  href?: string;
  subcategories?: MegaMenuSubcategory[];
}

export interface DesktopMegaMenuProps extends HTMLAttributes<HTMLElement> {
  categories: MegaMenuCategory[];
  navItems?: { label: string; href?: string; onClick?: () => void }[];
  onCategoryClick?: (category: MegaMenuCategory) => void;
  triggerLabel?: string;
  triggerIcon?: ReactNode;
  /** Label for "View all" link in subcategory panel */
  viewAllLabel?: string;
  /** Callback when subcategory is clicked */
  onSubcategoryClick?: (category: MegaMenuCategory, subcategory: MegaMenuSubcategory) => void;
}

const MenuIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export const DesktopMegaMenu = forwardRef<HTMLElement, DesktopMegaMenuProps>(
  (
    {
      categories,
      navItems: _navItems,
      onCategoryClick,
      onSubcategoryClick,
      triggerLabel,
      triggerIcon,
      viewAllLabel = 'View all',
      className,
      ...rest
    },
    ref
  ) => {
    const { t } = useGeekShop();
    const rootClass = cn(styles.megaMenu, className);
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const panelRef = useRef<HTMLDivElement>(null);

    const toggle = useCallback(() => {
      setIsOpen((prev) => !prev);
      setActiveIndex(0);
    }, []);

    const close = useCallback(() => {
      setIsOpen(false);
      setActiveIndex(0);
    }, []);

    // Close on Escape
    useEffect(() => {
      if (!isOpen) return;
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') close();
      };
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }, [isOpen, close]);

    // Close on click outside
    useEffect(() => {
      if (!isOpen) return;
      const handleClick = (e: MouseEvent) => {
        if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
          close();
        }
      };
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }, [isOpen, close]);

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
      [isOpen, categories, activeIndex, onCategoryClick]
    );

    const activeCategory = categories[activeIndex];

    return (
      <nav ref={ref} className={rootClass} aria-label={t('aria.categoryNavigation')} {...rest}>
        {/* Trigger button */}
        <button
          className={styles.trigger}
          onClick={toggle}
          aria-expanded={isOpen}
          aria-haspopup="true"
          onKeyDown={handleKeyDown}
        >
          {isOpen ? <CloseIcon /> : triggerIcon ?? <MenuIcon />}
          <span>{triggerLabel ?? 'All Categories'}</span>
        </button>

        {/* Sidebar panel — renders below trigger, inline with page content */}
        {isOpen && categories.length > 0 && (
          <div
            ref={panelRef}
            className={styles.panel}
            role="menu"
            aria-label={t('aria.categories')}
            tabIndex={-1}
          >
            {/* Category list (left) */}
            <ul className={styles.categoryList}>
              {categories.map((cat, i) => (
                <li
                  key={i}
                  className={cn(
                    styles.categoryItem,
                    i === activeIndex && styles.categoryItemActive
                  )}
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
                        <ArrowRightIcon />
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>

            {/* Subcategory panel (right) */}
            {activeCategory?.subcategories && activeCategory.subcategories.length > 0 && (
              <div className={styles.subcategoryPanel}>
                <div className={styles.subcategoryHeader}>
                  <h3 className={styles.subcategoryTitle}>{activeCategory.label}</h3>
                  <a
                    href={activeCategory.href || '#'}
                    className={styles.viewAllLink}
                    onClick={(e) => {
                      if (!activeCategory.href) e.preventDefault();
                      onCategoryClick?.(activeCategory);
                    }}
                  >
                    {viewAllLabel}
                  </a>
                </div>
                <ul className={styles.subcategoryList}>
                  {activeCategory.subcategories.map((sub, i) => (
                    <li key={i}>
                      <a
                        className={styles.subcategoryLink}
                        href={sub.href}
                        onClick={(e) => {
                          if (!sub.href) e.preventDefault();
                          onSubcategoryClick?.(activeCategory, sub);
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
        )}
      </nav>
    );
  }
);

DesktopMegaMenu.displayName = 'DesktopMegaMenu';
