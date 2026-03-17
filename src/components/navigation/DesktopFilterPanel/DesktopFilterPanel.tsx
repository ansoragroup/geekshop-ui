import { forwardRef, useState, type HTMLAttributes } from 'react';
import styles from './DesktopFilterPanel.module.scss';

export interface DesktopFilterOption {
  /** Unique value */
  value: string;
  /** Display label */
  label: string;
  /** Count of matching products */
  count?: number;
}

export interface DesktopFilterGroup {
  /** Unique key */
  key: string;
  /** Group title */
  title: string;
  /** Filter type */
  type: 'checkbox' | 'priceRange';
  /** Options for checkbox type */
  options?: DesktopFilterOption[];
}

export interface DesktopFilterValues {
  [groupKey: string]: string[] | { min: string; max: string };
}

export interface DesktopFilterPanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Filter configuration groups */
  groups: DesktopFilterGroup[];
  /** Current filter values */
  values?: DesktopFilterValues;
  /** Callback when Apply button is pressed */
  onApply?: (values: DesktopFilterValues) => void;
  /** Callback when Clear button is pressed */
  onClear?: () => void;
}

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12l5 5L20 7" />
  </svg>
);

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const DesktopFilterPanel = forwardRef<HTMLDivElement, DesktopFilterPanelProps>(
  (
    {
      groups,
      values: externalValues = {},
      onApply,
      onClear,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const [localValues, setLocalValues] = useState<DesktopFilterValues>(externalValues);
    const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());

    const toggleGroup = (key: string) => {
      setCollapsedGroups((prev) => {
        const next = new Set(prev);
        if (next.has(key)) {
          next.delete(key);
        } else {
          next.add(key);
        }
        return next;
      });
    };

    const toggleCheckbox = (groupKey: string, optionValue: string) => {
      setLocalValues((prev) => {
        const current = (prev[groupKey] as string[]) || [];
        const updated = current.includes(optionValue)
          ? current.filter((v) => v !== optionValue)
          : [...current, optionValue];
        return { ...prev, [groupKey]: updated };
      });
    };

    const setPriceRange = (groupKey: string, field: 'min' | 'max', value: string) => {
      setLocalValues((prev) => {
        const current = (prev[groupKey] as { min: string; max: string }) || { min: '', max: '' };
        return { ...prev, [groupKey]: { ...current, [field]: value } };
      });
    };

    const handleClear = () => {
      setLocalValues({});
      onClear?.();
    };

    const handleApply = () => {
      onApply?.(localValues);
    };

    const isChecked = (groupKey: string, optionValue: string): boolean => {
      const vals = localValues[groupKey];
      return Array.isArray(vals) && vals.includes(optionValue);
    };

    const getPriceValue = (groupKey: string, field: 'min' | 'max'): string => {
      const vals = localValues[groupKey];
      if (vals && typeof vals === 'object' && !Array.isArray(vals)) {
        return vals[field] || '';
      }
      return '';
    };

    const activeCount = Object.values(localValues).reduce((count, val) => {
      if (Array.isArray(val)) return count + val.length;
      if (val && typeof val === 'object' && (val.min || val.max)) return count + 1;
      return count;
    }, 0);

    return (
      <div ref={ref} className={`${styles.panel} ${className}`} {...rest}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.headerTitle}>
            Filters
            {activeCount > 0 && <span className={styles.badge}>{activeCount}</span>}
          </span>
          {activeCount > 0 && (
            <button className={styles.clearAllBtn} onClick={handleClear} type="button">
              Clear all
            </button>
          )}
        </div>

        {/* Filter groups */}
        <div className={styles.body}>
          {groups.map((group) => {
            const isCollapsed = collapsedGroups.has(group.key);

            return (
              <div key={group.key} className={styles.group}>
                <button
                  className={styles.groupHeader}
                  onClick={() => toggleGroup(group.key)}
                  aria-expanded={!isCollapsed}
                  type="button"
                >
                  <span className={styles.groupTitle}>{group.title}</span>
                  <ChevronIcon open={!isCollapsed} />
                </button>

                {!isCollapsed && (
                  <div className={styles.groupContent}>
                    {group.type === 'checkbox' && group.options && (
                      <div className={styles.checkboxList}>
                        {group.options.map((option) => {
                          const checked = isChecked(group.key, option.value);
                          return (
                            <button
                              key={option.value}
                              className={`${styles.checkboxItem} ${checked ? styles.checked : ''}`}
                              onClick={() => toggleCheckbox(group.key, option.value)}
                              type="button"
                            >
                              <span className={`${styles.checkbox} ${checked ? styles.checkboxChecked : ''}`}>
                                {checked && <CheckIcon />}
                              </span>
                              <span className={styles.optionLabel}>{option.label}</span>
                              {option.count != null && (
                                <span className={styles.optionCount}>({option.count})</span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {group.type === 'priceRange' && (
                      <div className={styles.priceRange}>
                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder="Min"
                          value={getPriceValue(group.key, 'min')}
                          onChange={(e) => setPriceRange(group.key, 'min', e.target.value)}
                          className={styles.priceInput}
                        />
                        <span className={styles.rangeSeparator}>—</span>
                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder="Max"
                          value={getPriceValue(group.key, 'max')}
                          onChange={(e) => setPriceRange(group.key, 'max', e.target.value)}
                          className={styles.priceInput}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button className={styles.clearBtn} onClick={handleClear} type="button">
            Clear
          </button>
          <button className={styles.applyBtn} onClick={handleApply} type="button">
            Apply
          </button>
        </div>
      </div>
    );
  },
);

DesktopFilterPanel.displayName = 'DesktopFilterPanel';
