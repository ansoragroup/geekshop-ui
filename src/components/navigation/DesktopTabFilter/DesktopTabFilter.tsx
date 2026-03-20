import { cn } from '../../../utils/cn';
'use client';
import { forwardRef, type HTMLAttributes } from 'react';
import { useControllableState } from '../../../hooks/useControllableState';
import styles from './DesktopTabFilter.module.scss';

export interface DesktopTabFilterItem {
  /** Unique key for the tab */
  key: string;
  /** Display label */
  label: string;
  /** Optional count displayed as badge */
  count?: number;
}

export interface DesktopTabFilterProps extends HTMLAttributes<HTMLDivElement> {
  /** Filter tab items */
  tabs: DesktopTabFilterItem[];
  /** Currently active tab key (controlled) */
  activeTab?: string;
  /** Default active tab key (uncontrolled) */
  defaultActiveTab?: string;
  /** Callback when a tab is selected */
  onChange?: (key: string) => void;
  /** Visual variant */
  variant?: 'pill' | 'underline' | 'card';
  /** Size */
  size?: 'sm' | 'md';
}

export const DesktopTabFilter = forwardRef<HTMLDivElement, DesktopTabFilterProps>(
  (
    {
      tabs,
      activeTab: activeTabProp,
      defaultActiveTab,
      onChange,
      variant = 'pill',
      size = 'md',
      className = '',
      ...rest
    },
    ref,
  ) => {
    const firstKey = tabs[0]?.key ?? '';

    const [activeTab, setActiveTab] = useControllableState({
      value: activeTabProp,
      defaultValue: defaultActiveTab ?? firstKey,
      onChange,
    });

    return (
      <div
        ref={ref}
        className={cn(styles.root, styles[variant], styles[size], className)}
        role="tablist"
        aria-label="Filter tabs"
        {...rest}
      >
        {tabs.map((tab) => {
          const isActive = tab.key === activeTab;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={cn(styles.tab, isActive ? styles.active : '')}
              onClick={() => setActiveTab(tab.key)}
            >
              <span className={styles.label}>{tab.label}</span>
              {tab.count != null && (
                <span className={cn(styles.count, isActive ? styles.countActive : '')}>
                  {tab.count > 999 ? '999+' : tab.count}
                </span>
              )}
              {variant === 'underline' && isActive && (
                <span className={styles.indicator} aria-hidden="true" />
              )}
            </button>
          );
        })}
      </div>
    );
  },
);

DesktopTabFilter.displayName = 'DesktopTabFilter';
