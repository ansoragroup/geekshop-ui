import styles from './FilterBar.module.scss';

export interface FilterBarItem {
  /** Unique key for the filter */
  key: string;
  /** Display label */
  label: string;
  /** Whether this filter has a dropdown indicator */
  hasDropdown?: boolean;
}

export interface FilterBarProps {
  /** Available filter options */
  filters: FilterBarItem[];
  /** Currently active filter key */
  activeFilter: string;
  /** Callback when a filter is selected */
  onFilterChange?: (key: string) => void;
}

const ChevronDownIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export function FilterBar({
  filters,
  activeFilter,
  onFilterChange,
}: FilterBarProps) {
  return (
    <div className={styles.filterBar} role="tablist">
      {filters.map((filter) => {
        const isActive = filter.key === activeFilter;
        return (
          <button
            key={filter.key}
            role="tab"
            aria-selected={isActive}
            className={`${styles.tab} ${isActive ? styles.active : ''}`}
            onClick={() => onFilterChange?.(filter.key)}
          >
            <span className={styles.label}>{filter.label}</span>
            {filter.hasDropdown && (
              <span className={`${styles.arrow} ${isActive ? styles.arrowActive : ''}`}>
                <ChevronDownIcon />
              </span>
            )}
            {isActive && <span className={styles.indicator} />}
          </button>
        );
      })}
    </div>
  );
}

export default FilterBar;
