'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, type HTMLAttributes } from 'react';
import { useControllableState } from '../../../hooks/useControllableState';
import styles from './FilterBar.module.scss';

export interface FilterBarItem {
  /** Unique key for the filter */
  key: string;
  /** Display label */
  label: string;
  /** Whether this filter has a dropdown indicator */
  hasDropdown?: boolean;
}

export interface FilterBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Available filter options */
  filters: FilterBarItem[];
  /** Currently active filter key */
  activeFilter?: string;
  /** Default active filter key for uncontrolled usage */
  defaultActiveFilter?: string;
  /** Callback when a filter is selected */
  onFilterChange?: (key: string) => void;
}

const ChevronDownIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const FilterBar = forwardRef<HTMLDivElement, FilterBarProps>(
  ({ filters, activeFilter: activeFilterProp, defaultActiveFilter = '', onFilterChange, className, ...rest }, ref) => {
    const [activeFilter, setActiveFilter] = useControllableState({
      value: activeFilterProp,
      defaultValue: defaultActiveFilter,
      onChange: onFilterChange,
    });

    return (
      <div ref={ref} className={cn(styles.filterBar, className ?? '')} role="tablist" {...rest}>
        {filters.map((filter) => {
          const isActive = filter.key === activeFilter;
          return (
            <button
              key={filter.key}
              role="tab"
              aria-selected={isActive}
              className={cn(styles.tab, isActive ? styles.active : '')}
              onClick={() => setActiveFilter(filter.key)}
            >
              <span className={styles.label}>{filter.label}</span>
              {filter.hasDropdown && (
                <span className={cn(styles.arrow, isActive ? styles.arrowActive : '')}>
                  <ChevronDownIcon />
                </span>
              )}
              {isActive && <span className={styles.indicator} />}
            </button>
          );
        })}
      </div>
    );
  },
);

FilterBar.displayName = 'FilterBar';
