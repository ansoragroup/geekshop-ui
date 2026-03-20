import { cn } from '../../../utils/cn';
'use client';
import { forwardRef, useState, useRef, useEffect, useCallback, type HTMLAttributes } from 'react';
import styles from './DesktopFilterBar.module.scss';

export interface DesktopFilterBarOption {
  /** Display label */
  label: string;
  /** Unique value */
  value: string;
}

export interface DesktopFilterBarItem {
  /** Display label */
  label: string;
  /** Unique value identifier */
  value: string;
  /** Whether this filter is active */
  active?: boolean;
  /** Dropdown options (if provided, shows as dropdown chip) */
  options?: DesktopFilterBarOption[];
}

export interface DesktopFilterBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Filter items to display */
  items: DesktopFilterBarItem[];
  /** Callback when a filter chip is clicked */
  onItemClick?: (value: string) => void;
  /** Callback when a dropdown option is selected */
  onOptionSelect?: (filterValue: string, optionValue: string) => void;
}

const ChevronDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const DesktopFilterBar = forwardRef<HTMLDivElement, DesktopFilterBarProps>(
  ({ items, onItemClick, onOptionSelect, className = '', ...rest }, ref) => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = useCallback((e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }, []);

    useEffect(() => {
      if (openDropdown) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [openDropdown, handleClickOutside]);

    const handleChipClick = (item: DesktopFilterBarItem) => {
      if (item.options && item.options.length > 0) {
        setOpenDropdown(openDropdown === item.value ? null : item.value);
      } else {
        onItemClick?.(item.value);
      }
    };

    const handleOptionClick = (filterValue: string, optionValue: string) => {
      onOptionSelect?.(filterValue, optionValue);
      setOpenDropdown(null);
    };

    return (
      <div ref={ref} className={cn(styles.filterBar, className)} role="toolbar" aria-label="Filters" {...rest}>
        {items.map((item) => {
          const hasDropdown = item.options && item.options.length > 0;
          const isOpen = openDropdown === item.value;

          return (
            <div key={item.value} className={styles.chipWrapper} ref={isOpen ? dropdownRef : undefined}>
              <button
                className={cn(styles.chip, item.active ? styles.active : '', isOpen ? styles.open : '')}
                onClick={() => handleChipClick(item)}
                aria-expanded={hasDropdown ? isOpen : undefined}
                aria-haspopup={hasDropdown ? 'listbox' : undefined}
                type="button"
              >
                <span className={styles.chipLabel}>{item.label}</span>
                {hasDropdown && (
                  <span className={cn(styles.chipArrow, isOpen ? styles.chipArrowOpen : '')}>
                    <ChevronDownIcon />
                  </span>
                )}
              </button>

              {hasDropdown && isOpen && item.options && (
                <div className={styles.dropdown} role="listbox">
                  {item.options.map((option) => (
                    <button
                      key={option.value}
                      className={styles.dropdownItem}
                      role="option"
                      aria-selected={false}
                      onClick={() => handleOptionClick(item.value, option.value)}
                      type="button"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  },
);

DesktopFilterBar.displayName = 'DesktopFilterBar';
