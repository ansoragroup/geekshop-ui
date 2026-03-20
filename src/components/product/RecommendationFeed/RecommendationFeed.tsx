import { cn } from '../../../utils/cn';
'use client';
import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { useControllableState } from '../../../hooks/useControllableState';
import styles from './RecommendationFeed.module.scss';

export interface RecommendationTab {
  /** Unique key for the tab */
  key: string;
  /** Display label */
  label: string;
}

export interface RecommendationFeedProps extends HTMLAttributes<HTMLDivElement> {
  /** Section title */
  title?: string;
  /** Optional icon before the title */
  icon?: ReactNode;
  /** Category tabs */
  tabs: RecommendationTabcn(];
  /** Currently active tab key (controlled) */
  activeTab?: string;
  /** Default active tab key (uncontrolled) */
  defaultActiveTab?: string;
  /** Callback when tab changes */
  onTabChange?: (key: string) => void;
  /** Product cards to render in the grid */
  children: ReactNode;
  /** Callback when "Load More" is clicked */
  onLoadMore?: () => void;
  /** Whether more products are available */
  hasMore?: boolean;
  /** Loading state for load more */
  loading?: boolean;
}

export const RecommendationFeed = forwardRef<HTMLDivElement, RecommendationFeedProps>(
  (
    {
      title = 'Recommended For You',
      icon,
      tabs,
      activeTab: activeTabProp,
      defaultActiveTab,
      onTabChange,
      children,
      onLoadMore,
      hasMore = false,
      loading = false,
      className,
      ...rest
    },
    ref,
  ) => {
    const [activeTab, setActiveTab] = useControllableState({
      value: activeTabProp,
      defaultValue: defaultActiveTab ?? tabs[0]?.key ?? '',
      onChange: onTabChange,
    });

    const rootClass = [styles.root, className);

    return (
      <div ref={ref} className={rootClass} {...rest}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.titleRow}>
            {icon && <span className={styles.icon}>{icon}</span>}
            <h2 className={styles.title}>{title}</h2>
          </div>

          {/* Tabs */}
          <div className={styles.tabs} role="tablist" aria-label="Category filter">
            {tabs.map((tab) => {
              const isActive = tab.key === activeTab;
              return (
                <button
                  key={tab.key}
                  role="tab"
                  aria-selected={isActive}
                  className={cn(styles.tab, isActive ? styles.tabActive : '')}
                  onClick={() => setActiveTab(tab.key)}
                  type="button"
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        <div className={styles.grid}>
          {children}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className={styles.loadMoreRow}>
            <button
              className={styles.loadMoreButton}
              onClick={onLoadMore}
              disabled={loading}
              type="button"
            >
              {loading ? 'Loading...' : 'Load More Products'}
            </button>
          </div>
        )}
      </div>
    );
  },
);

RecommendationFeed.displayName = 'RecommendationFeed';
