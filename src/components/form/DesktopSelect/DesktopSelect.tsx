import { forwardRef, useState, useCallback, useId, useRef, useImperativeHandle, useEffect } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { useControllableState } from '../../../hooks/useControllableState';
import styles from './DesktopSelect.module.scss';

export interface DesktopSelectOption {
  /** Unique value */
  value: string;
  /** Display label */
  label: string;
  /** Whether this option is disabled */
  disabled?: boolean;
  /** Optional icon */
  icon?: ReactNode;
}

export interface DesktopSelectProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Selected value (controlled) */
  value?: string | string[];
  /** Default value (uncontrolled) */
  defaultValue?: string | string[];
  /** Change handler */
  onChange?: (value: string | string[]) => void;
  /** Options to display */
  options: DesktopSelectOption[];
  /** Whether multiple selection is allowed */
  multiple?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Label text above the select */
  label?: string;
  /** Error message below the select */
  error?: string;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Enable search/filter within dropdown */
  searchable?: boolean;
  /** Search placeholder text */
  searchPlaceholder?: string;
}

const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3.5 8l3 3 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10.5 10.5L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const DesktopSelect = forwardRef<HTMLDivElement, DesktopSelectProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onChange,
      options,
      multiple = false,
      placeholder = 'Select...',
      label,
      error,
      disabled = false,
      searchable = false,
      searchPlaceholder = 'Search...',
      id: externalId,
      className,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const selectId = externalId ?? generatedId;

    const internalRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => internalRef.current!, []);

    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const listboxRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Normalize value
    const normalizeValue = (val?: string | string[]): string | string[] => {
      if (multiple) {
        if (Array.isArray(val)) return val;
        if (val !== undefined && val !== '') return [val];
        return [];
      }
      if (Array.isArray(val)) return val[0] ?? '';
      return val ?? '';
    };

    const [selectedValue, setSelectedValue] = useControllableState<string | string[]>({
      value: controlledValue !== undefined ? normalizeValue(controlledValue) : undefined,
      defaultValue: normalizeValue(defaultValue),
      onChange,
    });

    // Filter options by search query
    const filteredOptions = searchable && searchQuery
      ? options.filter((o) => o.label.toLowerCase().includes(searchQuery.toLowerCase()))
      : options;

    const handleOpen = useCallback(() => {
      if (disabled) return;
      setIsOpen(true);
      setSearchQuery('');
      setHighlightedIndex(-1);
    }, [disabled]);

    const handleClose = useCallback(() => {
      setIsOpen(false);
      setSearchQuery('');
      setHighlightedIndex(-1);
    }, []);

    const handleToggle = useCallback(() => {
      if (isOpen) {
        handleClose();
      } else {
        handleOpen();
      }
    }, [isOpen, handleOpen, handleClose]);

    const handleOptionClick = useCallback((option: DesktopSelectOption) => {
      if (option.disabled) return;

      if (multiple) {
        setSelectedValue((prev) => {
          const arr = Array.isArray(prev) ? prev : [];
          return arr.includes(option.value)
            ? arr.filter((v) => v !== option.value)
            : [...arr, option.value];
        });
      } else {
        setSelectedValue(option.value);
        handleClose();
      }
    }, [multiple, setSelectedValue, handleClose]);

    // Close on outside click
    useEffect(() => {
      if (!isOpen) return;
      const handleClickOutside = (e: MouseEvent) => {
        if (internalRef.current && !internalRef.current.contains(e.target as Node)) {
          handleClose();
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, handleClose]);

    // Focus search input when dropdown opens
    useEffect(() => {
      if (isOpen && searchable && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, [isOpen, searchable]);

    // Keyboard navigation
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
          e.preventDefault();
          handleOpen();
        }
        return;
      }

      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          handleClose();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex((prev) => {
            const next = prev + 1;
            return next >= filteredOptions.length ? 0 : next;
          });
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex((prev) => {
            const next = prev - 1;
            return next < 0 ? filteredOptions.length - 1 : next;
          });
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
            handleOptionClick(filteredOptions[highlightedIndex]);
          }
          break;
      }
    }, [isOpen, highlightedIndex, filteredOptions, handleOpen, handleClose, handleOptionClick]);

    // Scroll highlighted option into view
    useEffect(() => {
      if (highlightedIndex >= 0 && listboxRef.current) {
        const items = listboxRef.current.querySelectorAll('[role="option"]');
        items[highlightedIndex]?.scrollIntoView({ block: 'nearest' });
      }
    }, [highlightedIndex]);

    // Display value
    const getDisplayText = (): string => {
      if (multiple) {
        const vals = Array.isArray(selectedValue) ? selectedValue : [];
        if (vals.length === 0) return '';
        if (vals.length === 1) {
          return options.find((o) => o.value === vals[0])?.label ?? vals[0];
        }
        return `${vals.length} selected`;
      }
      const val = typeof selectedValue === 'string' ? selectedValue : '';
      if (!val) return '';
      return options.find((o) => o.value === val)?.label ?? val;
    };

    const displayText = getDisplayText();
    const isValueSelected = multiple
      ? (Array.isArray(selectedValue) ? selectedValue : []).length > 0
      : !!selectedValue;

    const rootClass = [
      styles.root,
      error && styles.hasError,
      disabled && styles.disabled,
      isOpen && styles.open,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={internalRef} className={rootClass} onKeyDown={handleKeyDown} {...rest}>
        {label && (
          <label className={styles.label} htmlFor={selectId} id={`${selectId}-label`}>
            {label}
          </label>
        )}

        <button
          id={selectId}
          type="button"
          className={styles.trigger}
          onClick={handleToggle}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={label ? `${selectId}-label` : undefined}
          aria-describedby={error ? `${selectId}-error` : undefined}
        >
          <span className={isValueSelected ? styles.triggerText : styles.triggerPlaceholder}>
            {displayText || placeholder}
          </span>
          <span className={`${styles.triggerChevron} ${isOpen ? styles.triggerChevronOpen : ''}`}>
            <ChevronIcon />
          </span>
        </button>

        {error && (
          <span className={styles.error} id={`${selectId}-error`} role="alert">
            {error}
          </span>
        )}

        {isOpen && (
          <div className={styles.dropdown}>
            {searchable && (
              <div className={styles.searchWrap}>
                <span className={styles.searchIcon}><SearchIcon /></span>
                <input
                  ref={searchInputRef}
                  className={styles.searchInput}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setHighlightedIndex(-1);
                  }}
                  placeholder={searchPlaceholder}
                  aria-label="Search options"
                />
              </div>
            )}

            <div
              ref={listboxRef}
              className={styles.optionsList}
              role="listbox"
              aria-multiselectable={multiple || undefined}
              aria-label={label ?? 'Options'}
            >
              {filteredOptions.length === 0 && (
                <div className={styles.emptyState}>No options found</div>
              )}
              {filteredOptions.map((option, index) => {
                const isSelected = multiple
                  ? (Array.isArray(selectedValue) ? selectedValue : []).includes(option.value)
                  : selectedValue === option.value;

                const optionClass = [
                  styles.option,
                  isSelected && styles.optionSelected,
                  option.disabled && styles.optionDisabled,
                  index === highlightedIndex && styles.optionHighlighted,
                ]
                  .filter(Boolean)
                  .join(' ');

                return (
                  <button
                    key={option.value}
                    type="button"
                    className={optionClass}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={option.disabled}
                    onClick={() => handleOptionClick(option)}
                    disabled={option.disabled}
                    onMouseEnter={() => setHighlightedIndex(index)}
                  >
                    {multiple && (
                      <span className={`${styles.checkbox} ${isSelected ? styles.checkboxChecked : ''}`}>
                        {isSelected && <CheckIcon />}
                      </span>
                    )}
                    {option.icon && <span className={styles.optionIcon}>{option.icon}</span>}
                    <span className={styles.optionLabel}>{option.label}</span>
                    {!multiple && isSelected && (
                      <span className={styles.optionCheck}>
                        <CheckIcon />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  },
);

DesktopSelect.displayName = 'DesktopSelect';
