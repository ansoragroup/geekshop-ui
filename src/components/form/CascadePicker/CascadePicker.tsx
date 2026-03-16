import { forwardRef, useState, useCallback, useId, useRef, useImperativeHandle, useEffect } from 'react';
import type { HTMLAttributes } from 'react';
import { useControllableState } from '../../../hooks/useControllableState';
import { useFocusTrap } from '../../../hooks/useFocusTrap';
import { useGeekShop } from '../../../i18n';
import styles from './CascadePicker.module.scss';

export interface CascadeOption {
  /** Unique value for this option */
  value: string;
  /** Display label */
  label: string;
  /** Child options (next column) */
  children?: CascadeOption[];
  /** Whether this option is disabled */
  disabled?: boolean;
}

export interface CascadePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Selected values array (controlled) — one per column, e.g. ['tashkent', 'chilonzor', 'mahalla-5'] */
  value?: string[];
  /** Default value (uncontrolled) */
  defaultValue?: string[];
  /** Change handler — receives selected values and their labels */
  onChange?: (value: string[], labels: string[]) => void;
  /** Tree of cascade options */
  options: CascadeOption[];
  /** Placeholder text for the trigger */
  placeholder?: string;
  /** Label above the trigger */
  label?: string;
  /** Error message below the trigger */
  error?: string;
  /** Whether the picker is disabled */
  disabled?: boolean;
  /** Title of the bottom sheet */
  title?: string;
  /** Maximum depth of columns (default 3) */
  level?: number;
  /** Width of each column (CSS value) */
  columnWidth?: number | string;
}

const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 6l4 4 4-4" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M5 5l10 10M15 5l-10 10" stroke="#999" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

function getOptionsAtDepth(
  options: CascadeOption[],
  selectedValues: string[],
  depth: number,
): CascadeOption[] {
  if (depth === 0) return options;
  const parentValue = selectedValues[depth - 1];
  if (!parentValue) return [];
  const parent = findOption(options, selectedValues, depth - 1);
  return parent?.children ?? [];
}

function findOption(
  options: CascadeOption[],
  selectedValues: string[],
  targetDepth: number,
): CascadeOption | undefined {
  let current = options;
  for (let i = 0; i <= targetDepth; i++) {
    const found = current.find((o) => o.value === selectedValues[i]);
    if (!found) return undefined;
    if (i === targetDepth) return found;
    current = found.children ?? [];
  }
  return undefined;
}

function getLabelsForValues(options: CascadeOption[], values: string[]): string[] {
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

export const CascadePicker = forwardRef<HTMLDivElement, CascadePickerProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onChange,
      options,
      placeholder,
      label,
      error,
      disabled = false,
      title,
      level = 3,
      columnWidth,
      id: externalId,
      className,
      ...rest
    },
    ref,
  ) => {
    const { t } = useGeekShop();
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

    // Temp selection while the sheet is open
    const [tempSelection, setTempSelection] = useState<string[]>([]);

    const sheetRef = useFocusTrap<HTMLDivElement>(isOpen, {
      onEscape: () => setIsOpen(false),
    });

    const mergedSheetRef = useCallback(
      (node: HTMLDivElement | null) => {
        sheetRef.current = node;
      },
      [sheetRef],
    );

    // Column refs for scrolling selected items into view
    const columnRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handleOpen = () => {
      if (disabled) return;
      setIsOpen(true);
      setTempSelection([...selectedValue]);
    };

    const handleClose = () => {
      setIsOpen(false);
    };

    const handleConfirm = () => {
      setSelectedValue(tempSelection);
      setIsOpen(false);
    };

    const handleOptionClick = (depth: number, option: CascadeOption) => {
      if (option.disabled) return;
      setTempSelection((prev) => {
        const next = [...prev.slice(0, depth), option.value];
        return next;
      });
    };

    const handleOverlayClick = () => {
      setIsOpen(false);
    };

    const handleContentClick = (e: React.MouseEvent) => {
      e.stopPropagation();
    };

    // Scroll selected item into view when column content changes
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
    const columns: { depth: number; options: CascadeOption[] }[] = [];
    for (let d = 0; d < level; d++) {
      const opts = getOptionsAtDepth(options, tempSelection, d);
      if (d === 0 || opts.length > 0) {
        columns.push({ depth: d, options: opts });
      } else {
        break;
      }
    }

    // Display text
    const displayText = selectedValue.length > 0
      ? getLabelsForValues(options, selectedValue).join(' / ')
      : '';

    const isValueSelected = selectedValue.length > 0;

    const rootClass = [
      styles.root,
      error && styles.hasError,
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const sheetTitle = title || t('cascadePicker.title');
    const placeholderText = placeholder || t('cascadePicker.placeholder');

    const colStyle = columnWidth
      ? { width: typeof columnWidth === 'number' ? `${columnWidth}px` : columnWidth }
      : undefined;

    return (
      <div ref={internalRef} className={rootClass} {...rest}>
        {label && (
          <label className={styles.label} htmlFor={pickerId} id={`${pickerId}-label`}>
            {label}
          </label>
        )}

        <button
          id={pickerId}
          type="button"
          className={styles.trigger}
          onClick={handleOpen}
          disabled={disabled}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-labelledby={label ? `${pickerId}-label` : undefined}
          aria-describedby={error ? `${pickerId}-error` : undefined}
        >
          <span className={isValueSelected ? styles.triggerText : styles.triggerPlaceholder}>
            {displayText || placeholderText}
          </span>
          <span className={styles.triggerChevron}>
            <ChevronIcon />
          </span>
        </button>

        {error && (
          <span className={styles.error} id={`${pickerId}-error`} role="alert">
            {error}
          </span>
        )}

        {isOpen && (
          <div className={styles.overlay} onClick={handleOverlayClick} role="presentation">
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <div
              ref={mergedSheetRef}
              className={styles.sheet}
              onClick={handleContentClick}
              onKeyDown={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={sheetTitle}
              tabIndex={-1}
            >
              <div className={styles.dragHandle}>
                <span className={styles.dragBar} />
              </div>

              <div className={styles.header}>
                <span className={styles.headerTitle}>{sheetTitle}</span>
                <button
                  type="button"
                  className={styles.closeBtn}
                  onClick={handleClose}
                  aria-label={t('common.close')}
                >
                  <CloseIcon />
                </button>
              </div>

              <div className={styles.columnsContainer}>
                {columns.map(({ depth, options: colOpts }) => (
                  <div
                    key={depth}
                    className={styles.column}
                    style={colStyle}
                    ref={(el) => { columnRefs.current[depth] = el; }}
                    role="listbox"
                    aria-label={`${t('cascadePicker.column')} ${depth + 1}`}
                  >
                    {colOpts.map((option) => {
                      const isSelected = tempSelection[depth] === option.value;
                      const optionClass = [
                        styles.option,
                        isSelected && styles.optionSelected,
                        option.disabled && styles.optionDisabled,
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
                          data-selected={isSelected}
                          onClick={() => handleOptionClick(depth, option)}
                          disabled={option.disabled}
                        >
                          <span className={styles.optionLabel}>{option.label}</span>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className={styles.footer}>
                <button
                  type="button"
                  className={styles.confirmBtn}
                  onClick={handleConfirm}
                >
                  {t('common.confirm')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },
);

CascadePicker.displayName = 'CascadePicker';
