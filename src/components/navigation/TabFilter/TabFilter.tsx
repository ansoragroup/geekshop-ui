'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, type HTMLAttributes } from 'react';
import { useControllableState } from '../../../hooks/useControllableState';
import styles from './TabFilter.module.scss';

export interface TabFilterItem {
  /** Unique key for the tab */
  key: string;
  /** Display label */
  label: string;
  /** Optional badge count */
  badge?: number;
}

export interface TabFilterProps extends HTMLAttributes<HTMLDivElement> {
  /** Available tab options */
  tabs: TabFilterItem[];
  /** Currently active tab key */
  activeTab?: string;
  /** Default active tab key for uncontrolled usage */
  defaultActiveTab?: string;
  /** Callback when a tab is selected */
  onChange?: (key: string) => void;
  /** Visual variant */
  variant?: 'pill' | 'underline';
}

export const TabFilter = forwardRef<HTMLDivElement, TabFilterProps>(
  ({ tabs, activeTab: activeTabProp, defaultActiveTab = '', onChange, variant = 'pill', className, ...rest }, ref) => {
    const [activeTab, setActiveTab] = useControllableState({
      value: activeTabProp,
      defaultValue: defaultActiveTab,
      onChange,
    });

    return (
      <div ref={ref} className={cn(styles.tabFilter, styles[variant], className ?? '')} role="tablist" {...rest}>
        <div className={styles.track}>
          {tabs.map((tab) => {
            const isActive = tab.key === activeTab;
            return (
              <button
                key={tab.key}
                role="tab"
                aria-selected={isActive}
                className={cn(styles.tab, isActive ? styles.active : '')}
                onClick={() => setActiveTab(tab.key)}
              >
                <span className={styles.label}>{tab.label}</span>
                {tab.badge != null && tab.badge > 0 && (
                  <span className={cn(styles.badge, isActive ? styles.badgeActive : '')}>
                    {tab.badge > 99 ? '99+' : tab.badge}
                  </span>
                )}
                {variant === 'underline' && isActive && (
                  <span className={styles.underline} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  },
);

TabFilter.displayName = 'TabFilter';
