import { useState } from 'react';
import styles from './FilterPanel.module.scss';

export interface FilterOption {
  /** Unique value for this option */
  value: string;
  /** Display label */
  label: string;
  /** Number of products matching (optional) */
  count?: number;
}

export interface FilterGroup {
  /** Unique key for the group */
  key: string;
  /** Group title */
  title: string;
  /** Type of filter input */
  type: 'checkbox' | 'priceRange';
  /** Options for checkbox type */
  options?: FilterOption[];
}

export interface FilterValues {
  [groupKey: string]: string[] | { min: string; max: string };
}

export interface FilterPanelProps {
  /** Filter configuration groups */
  filterGroups: FilterGroup[];
  /** Current filter values */
  values?: FilterValues;
  /** Callback when Apply button is pressed */
  onApply?: (values: FilterValues) => void;
  /** Callback when Reset button is pressed */
  onReset?: () => void;
  /** Whether the panel is visible */
  visible?: boolean;
  /** Callback to close the panel */
  onClose?: () => void;
}

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18" />
    <path d="M6 6l12 12" />
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12l5 5L20 7" />
  </svg>
);

export function FilterPanel({
  filterGroups,
  values: externalValues = {},
  onApply,
  onReset,
  visible = true,
  onClose,
}: FilterPanelProps) {
  const [localValues, setLocalValues] = useState<FilterValues>(externalValues);

  if (!visible) return null;

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

  const handleReset = () => {
    setLocalValues({});
    onReset?.();
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

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.headerTitle}>Filtr</span>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Yopish">
            <CloseIcon />
          </button>
        </div>

        {/* Filter groups */}
        <div className={styles.body}>
          {filterGroups.map((group) => (
            <div key={group.key} className={styles.group}>
              <div className={styles.groupTitle}>{group.title}</div>

              {group.type === 'checkbox' && group.options && (
                <div className={styles.checkboxList}>
                  {group.options.map((option) => {
                    const checked = isChecked(group.key, option.value);
                    return (
                      <button
                        key={option.value}
                        className={`${styles.checkboxItem} ${checked ? styles.checked : ''}`}
                        onClick={() => toggleCheckbox(group.key, option.value)}
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
                  <div className={styles.priceInput}>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="Minimal"
                      value={getPriceValue(group.key, 'min')}
                      onChange={(e) => setPriceRange(group.key, 'min', e.target.value)}
                      className={styles.input}
                    />
                    <span className={styles.currency}>so'm</span>
                  </div>
                  <span className={styles.rangeSeparator}>—</span>
                  <div className={styles.priceInput}>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="Maksimal"
                      value={getPriceValue(group.key, 'max')}
                      onChange={(e) => setPriceRange(group.key, 'max', e.target.value)}
                      className={styles.input}
                    />
                    <span className={styles.currency}>so'm</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer actions */}
        <div className={styles.footer}>
          <button className={styles.resetBtn} onClick={handleReset}>
            Tozalash
          </button>
          <button className={styles.applyBtn} onClick={handleApply}>
            Ko'rsatish
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterPanel;
