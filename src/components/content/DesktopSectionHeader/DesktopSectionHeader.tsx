'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, useCallback, type ElementType, type MouseEventHandler } from 'react';
import styles from './DesktopSectionHeader.module.scss';

export interface DesktopSectionHeaderTab {
  /** Tab label */
  label: string;
  /** Tab value for identification */
  value: string;
}

export interface DesktopSectionHeaderOwnProps {
  /** Section title */
  title: string;
  /** Optional subtitle text */
  subtitle?: string;
  /** Optional SVG icon displayed before the title */
  icon?: React.ReactNode;
  /** Filter tabs */
  tabs?: DesktopSectionHeaderTab[];
  /** Active tab value */
  activeTab?: string;
  /** Callback when a tab is selected */
  onTabChange?: (value: string) => void;
  /** Click handler for "View All" link */
  onViewAll?: MouseEventHandler<HTMLButtonElement>;
  /** Item count shown next to "View All" */
  count?: number;
}

export type DesktopSectionHeaderProps<C extends ElementType = 'div'> = DesktopSectionHeaderOwnProps & {
  as?: C;
} & Omit<React.ComponentPropsWithoutRef<C>, keyof DesktopSectionHeaderOwnProps | 'as'>;

function DesktopSectionHeaderInner<C extends ElementType = 'div'>(
  {
    as,
    title,
    subtitle,
    icon,
    tabs,
    activeTab,
    onTabChange,
    onViewAll,
    count,
    className = '',
    ...rest
  }: DesktopSectionHeaderProps<C>,
  ref: React.Ref<Element>,
) {
  const Component = as || 'div';

    const handleTabClick = useCallback(
      (value: string) => {
        onTabChange?.(value);
      },
      [onTabChange],
    );

    const handleTabKeyDown = useCallback(
      (e: React.KeyboardEvent, value: string) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onTabChange?.(value);
        }
      },
      [onTabChange],
    );

    return (
      <Component ref={ref} className={cn(styles.root, className)} {...rest}>
        <div className={styles.topRow}>
          <div className={styles.titleArea}>
            {icon && <span className={styles.icon}>{icon}</span>}
            <div className={styles.titles}>
              <h3 className={styles.title}>{title}</h3>
              {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </div>
          </div>

          {onViewAll && (
            <button
              type="button"
              className={styles.viewAll}
              onClick={onViewAll}
            >
              {count !== undefined && (
                <span className={styles.count}>{count} items</span>
              )}
              <span className={styles.viewAllText}>View All</span>
              <svg
                className={styles.arrow}
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 3l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>

        {tabs && tabs.length > 0 && (
          <div className={styles.tabsRow} role="tablist">
            {tabs.map((tab) => {
              const isActive = tab.value === activeTab;
              return (
                <button
                  key={tab.value}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={cn(styles.tab, isActive ? styles.tabActive : '')}
                  onClick={() => handleTabClick(tab.value)}
                  onKeyDown={(e) => handleTabKeyDown(e, tab.value)}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        )}
      </Component>
    );
}

export const DesktopSectionHeader = forwardRef(DesktopSectionHeaderInner) as <C extends ElementType = 'div'>(
  props: DesktopSectionHeaderProps<C> & { ref?: React.Ref<Element> }
) => JSX.Element;

(DesktopSectionHeader as { displayName?: string }).displayName = 'DesktopSectionHeader';
