import styles from './TabFilter.module.scss';

export interface TabFilterItem {
  /** Unique key for the tab */
  key: string;
  /** Display label */
  label: string;
  /** Optional badge count */
  badge?: number;
}

export interface TabFilterProps {
  /** Available tab options */
  tabs: TabFilterItem[];
  /** Currently active tab key */
  activeTab: string;
  /** Callback when a tab is selected */
  onChange?: (key: string) => void;
  /** Visual variant */
  variant?: 'pill' | 'underline';
}

export function TabFilter({
  tabs,
  activeTab,
  onChange,
  variant = 'pill',
}: TabFilterProps) {
  return (
    <div className={`${styles.tabFilter} ${styles[variant]}`} role="tablist">
      <div className={styles.track}>
        {tabs.map((tab) => {
          const isActive = tab.key === activeTab;
          return (
            <button
              key={tab.key}
              role="tab"
              aria-selected={isActive}
              className={`${styles.tab} ${isActive ? styles.active : ''}`}
              onClick={() => onChange?.(tab.key)}
            >
              <span className={styles.label}>{tab.label}</span>
              {tab.badge != null && tab.badge > 0 && (
                <span className={`${styles.badge} ${isActive ? styles.badgeActive : ''}`}>
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
}

export default TabFilter;
