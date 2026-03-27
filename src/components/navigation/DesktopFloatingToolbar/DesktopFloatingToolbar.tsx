'use client';
import { useGeekShop } from '../../../i18n';
import { cn } from '../../../utils/cn';
import { forwardRef, useState, useEffect, type HTMLAttributes, type ReactNode } from 'react';
import styles from './DesktopFloatingToolbar.module.scss';

export interface DesktopFloatingToolbarItem {
  /** Icon element */
  icon: ReactNode;
  /** Label text shown on hover */
  label: string;
  /** Click handler */
  onClick?: () => void;
  /** Badge count (e.g. cart items) */
  badge?: number;
  /** Only show after scrolling past threshold (e.g. back-to-top) */
  showOnScroll?: boolean;
}

export interface DesktopFloatingToolbarProps extends HTMLAttributes<HTMLDivElement> {
  /** Toolbar items */
  items: DesktopFloatingToolbarItem[];
  /** Side position (default: 'right') */
  position?: 'right' | 'left';
  /** Scroll threshold in px for showOnScroll items (default: 300) */
  scrollThreshold?: number;
}

export const DesktopFloatingToolbar = forwardRef<HTMLDivElement, DesktopFloatingToolbarProps>(
  ({ items, position = 'right', scrollThreshold = 300, className, ...rest }, ref) => {
    const { t } = useGeekShop();
    const [scrolledPast, setScrolledPast] = useState(false);

    // SSR-safe scroll detection
    useEffect(() => {
      const handleScroll = () => {
        setScrolledPast(window.scrollY > scrollThreshold);
      };

      handleScroll();
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollThreshold]);

    const rootClass = cn(styles.toolbar, styles[position], className);

    return (
      <div
        ref={ref}
        className={rootClass}
        role="toolbar"
        aria-label={t('aria.quickActions')}
        {...rest}
      >
        {items.map((item, index) => {
          const isHidden = item.showOnScroll && !scrolledPast;

          return (
            <button
              key={index}
              className={cn(styles.item, isHidden ? styles.itemHidden : '')}
              onClick={item.onClick}
              aria-label={item.label}
              type="button"
              tabIndex={isHidden ? -1 : 0}
            >
              <span className={styles.iconArea}>
                {item.icon}
                {item.badge != null && item.badge > 0 && (
                  <span className={styles.badge} aria-label={`${item.badge} items`}>
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </span>
              <span className={styles.label}>{item.label}</span>
            </button>
          );
        })}
      </div>
    );
  }
);

DesktopFloatingToolbar.displayName = 'DesktopFloatingToolbar';
