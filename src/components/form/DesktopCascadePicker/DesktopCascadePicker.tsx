'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, useState, useCallback, useId, useRef, useImperativeHandle, useEffect } from 'react';
import type { HTMLAttributes } from 'react';
import { useControllableState } from '../../../hooks/useControllableState';
import styles from './DesktopCascadePicker.module.scss';

export interface DesktopCascadeOption {
  /** Unique value for this option */
  value: string;
  /** Display label */
  label: string;
  /** Child options (next column) */
  children?: DesktopCascadeOption[];
  /** Whether this option is disabled */
  disabled?: boolean;
}

export interface DesktopCascadePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Selected values array (controlled) -- one per column */
  value?: string[];
  /** Default value (uncontrolled) */
  defaultValue?: string[];
  /** Change handler -- receives selected values and their labels */
  onChange?: (value: string[], labels: string[]) => void;
  /** Tree of cascade options */
  options: DesktopCascadeOption[];
  /** Placeholder text for the trigger */
  placeholder?: string;
  /** Label above the trigger */
  label?: string;
  /** Error message below the trigger */
  error?: string;
  /** Whether the picker is disabled */
  disabled?: boolean;
  /** Maximum depth of columns (default 3) */
  columns?: number;
}

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M4.5 2.5l3.5 3.5-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function getOptionsAtDepth(
  options: DesktopCascadeOption[],
  selectedValues: string[],
  depth: number,
): DesktopCascadeOption[] {
  if (depth === 0) return options;
  const parentValue = selectedValues[depth - 1];
  if (!parentValue) return [];
  const parent = findOption(options, selectedValues, depth - 1);
  return parent?.children ?? [];
}

function findOption(
  options: DesktopCascadeOption[],
  selectedValues: string[],
  targetDepth: number,
): DesktopCascadeOption | undefined {
  let current = options;
  for (let i = 0; i <= targetDepth; i++) {
    const found = current.find((o) => o.value === selectedValues[i]);
    if (!found) return undefined;
    if (i === targetDepth) return found;
    current = found.children ?? [];
  }
  return undefined;
}

function getLabelsForValues(options: DesktopCascadeOption[], values: string[]): string[] {
  const labels: string[] = [];
  let current = options;
  for (const val of values) {
    const found = current.find((o) => o.value === val);
    if (!found) break;
    labels.push(found.label);
    current = found.children ?? [];
  }
  return labels;
}

export const DesktopCascadePicker = forwardRef<HTMLDivElement, DesktopCascadePickerProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onChange,
      options,
      placeholder = 'Select...',
      label,
      error,
      disabled = false,
      columns = 3,
      id: externalId,
      className,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const pickerId = externalId ?? generatedId;

    const internalRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => internalRef.current!, []);

    const [isOpen, setIsOpen] = useState(false);

    const [selectedValue, setSelectedValue] = useControllableState<string[]>({
      value: controlledValue,
      defaultValue: defaultValue ?? [],
      onChange: (val) => {
        onChange?.(val, getLabelsForValues(options, val));
      },
    });

    // Temp selection while dropdown is open
    const [tempSelection, setTempSelection] = useState<string[]>([]);

    const columnRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handleOpen = useCallback(() => {
      if (disabled) return;
      setIsOpen(true);
      setTempSelection([...selectedValue]);
    }, [disabled, selectedValue]);

    const handleClose = useCallback(() => {
      setIsOpen(false);
    }, []);

    const handleToggle = useCallback(() => {
      if (isOpen) {
        handleClose();
      } else {
        handleOpen();
      }
    }, [isOpen, handleOpen, handleClose]);

    const handleOptionClick = useCallback((depth: number, option: DesktopCascadeOption) => {
      if (option.disabled) return;
      setTempSelection((prev) => {
        const next = [...prev.slice(0, depth), option.value];
        return next;
      });

      // If this option has no children, auto-confirm
      if (!option.children || option.children.length === 0) {
        const nextValue = [...tempSelection.slice(0, depth), option.value];
        setSelectedValue(nextValue);
        setIsOpen(false);
      }
    }, [tempSelection, setSelectedValue]);

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

    // Keyboard: Escape to close
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        handleClose();
      }
      if (!isOpen && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        handleOpen();
      }
    }, [isOpen, handleOpen, handleClose]);

    // Scroll selected item into view
    useEffect(() => {
      if (!isOpen) return;
      const timer = requestAnimationFrame(() => {
        columnRefs.current.forEach((col) => {
          if (!col) return;
          const selected = col.querySelector('[data-selected="true"]');
          if (selected && typeof selected.scrollIntoView === 'function') {
            selected.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
          }
        });
      });
      return () => cancelAnimationFrame(timer);
    }, [isOpen, tempSelection]);

    // Build columns
    const visibleColumns: { depth: number; options: DesktopCascadeOption[] }[] = [];
    for (let d = 0; d < columns; d++) {
      const opts = getOptionsAtDepth(options, tempSelection, d);
      if (d === 0 || opts.length > 0) {
        visibleColumns.push({ depth: d, options: opts });
      } else {
        break;
      }
    }

    // Display text
    const displayText = selectedValue.length > 0
      ? getLabelsForValues(options, selectedValue).join(' / ')
      : '';

    const isValueSelected = selectedValue.length > 0;

    const rootClass = cn(
      styles.root,
      error && styles.hasError,
      disabled && styles.disabled,
      isOpen && styles.open,
      className);

    return (
      <div ref={internalRef} className={rootClass} onKeyDown={handleKeyDown} {...rest}>
        {label && (
          <label className={styles.label} htmlFor={pickerId} id={`${pickerId}-label`}>
            {label}
          </label>
        )}

        <button
          id={pickerId}
          type="button"
          className={styles.trigger}
          onClick={handleToggle}
          disabled={disabled}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-labelledby={label ? `${pickerId}-label` : undefined}
          aria-describedby={error ? `${pickerId}-error` : undefined}
        >
          <span className={isValueSelected ? styles.triggerText : styles.triggerPlaceholder}>
            {displayText || placeholder}
          </span>
          <span className={cn(styles.triggerChevron, isOpen ? styles.triggerChevronOpen : '')}>
            <ChevronDownIcon />
          </span>
        </button>

        {error && (
          <span className={styles.error} id={`${pickerId}-error`} role="alert">
            {error}
          </span>
        )}

        {isOpen && (
          <div className={styles.dropdown} role="dialog" aria-label={label ?? 'Cascade picker'}>
            <div className={styles.columnsContainer}>
              {visibleColumns.map(({ depth, options: colOpts }) => (
                <div
                  key={depth}
                  className={styles.column}
                  ref={(el) => { columnRefs.current[depth] = el; }}
                  role="listbox"
                  aria-label={`Level ${depth + 1}`}
                >
                  {colOpts.map((option) => {
                    const isSelected = tempSelection[depth] === option.value;
                    const hasChildren = !!(option.children && option.children.length > 0);

                    const optionClass = [
                      styles.option,
                      isSelected && styles.optionSelected,
                      option.disabled && styles.optionDisabled];

                    return (
                      <button
                        key={option.value}
                        type="button"
                        className={optionClass}
                        role="option"
                        aria-selected={isSelected}
                        aria-disabled={option.disabled}
                        data-selected={isSelected}
                        onClick={() => handleOptionClick(depth, option)}
                        disabled={option.disabled}
                      >
                        <span className={styles.optionLabel}>{option.label}</span>
                        {hasChildren && (
                          <span className={styles.optionArrow}>
                            <ChevronRightIcon />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
);

DesktopCascadePicker.displayName = 'DesktopCascadePicker';
