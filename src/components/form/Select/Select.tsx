import { forwardRef, useState, useCallback, useId, useRef, useImperativeHandle } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { useControllableState } from '../../../hooks/useControllableState';
import { useFocusTrap } from '../../../hooks/useFocusTrap';
import { useGeekShop } from '../../../i18n';
import styles from './Select.module.scss';

export interface SelectOption {
  /** Unique value */
  value: string;
  /** Display label */
  label: string;
  /** Whether this option is disabled */
  disabled?: boolean;
  /** Optional icon */
  icon?: ReactNode;
}

export interface SelectProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Selected value (controlled) */
  value?: string | string[];
  /** Default value (uncontrolled) */
  defaultValue?: string | string[];
  /** Change handler */
  onChange?: (value: string | string[]) => void;
  /** Options to display */
  options: SelectOption[];
  /** Whether multiple selection is allowed */
  multiple?: boolean;
  /** Placeholder text for the trigger */
  placeholder?: string;
  /** Label text above the trigger */
  label?: string;
  /** Error message below the trigger */
  error?: string;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Title of the bottom sheet */
  title?: string;
  /** Confirm button text (multiple mode) */
  confirmText?: string;
  /** Cancel button text */
  cancelText?: string;
}

const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 6l4 4 4-4" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3.5 8l3 3 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M5 5l10 10M15 5l-10 10" stroke="#999" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onChange,
      options,
      multiple = false,
      placeholder,
      label,
      error,
      disabled = false,
      title,
      confirmText,
      cancelText,
      id: externalId,
      className,
      ...rest
    },
    ref,
  ) => {
    const { t } = useGeekShop();
    const generatedId = useId();
    const selectId = externalId ?? generatedId;

    const internalRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => internalRef.current!, []);

    const [isOpen, setIsOpen] = useState(false);

    // Normalize value to always be consistent
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

    // For multiple select, we track temporary selection in the sheet
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

    const handleOpen = () => {
      if (disabled) return;
      setIsOpen(true);
      if (multiple) {
        setTempSelection(Array.isArray(selectedValue) ? [...selectedValue] : []);
      }
    };

    const handleClose = () => {
      setIsOpen(false);
    };

    const handleOptionClick = (option: SelectOption) => {
      if (option.disabled) return;

      if (multiple) {
        setTempSelection((prev) =>
          prev.includes(option.value)
            ? prev.filter((v) => v !== option.value)
            : [...prev, option.value],
        );
      } else {
        setSelectedValue(option.value);
        setIsOpen(false);
      }
    };

    const handleConfirm = () => {
      setSelectedValue(tempSelection);
      setIsOpen(false);
    };

    const handleOverlayClick = () => {
      setIsOpen(false);
    };

    const handleContentClick = (e: React.MouseEvent) => {
      e.stopPropagation();
    };

    // Display value
    const getDisplayText = (): string => {
      if (multiple) {
        const vals = Array.isArray(selectedValue) ? selectedValue : [];
        if (vals.length === 0) return '';
        return vals
          .map((v) => options.find((o) => o.value === v)?.label ?? v)
          .join(', ');
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
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const sheetTitle = title || t('select.title');
    const sheetConfirm = confirmText || t('select.confirm');
    const sheetCancel = cancelText || t('select.cancel');
    const placeholderText = placeholder || t('select.placeholder');

    return (
      <div ref={internalRef} className={rootClass} {...rest}>
        {label && (
          <label className={styles.label} htmlFor={selectId} id={`${selectId}-label`}>
            {label}
          </label>
        )}

        <button
          id={selectId}
          type="button"
          className={styles.trigger}
          onClick={handleOpen}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={label ? `${selectId}-label` : undefined}
          aria-describedby={error ? `${selectId}-error` : undefined}
        >
          <span className={isValueSelected ? styles.triggerText : styles.triggerPlaceholder}>
            {displayText || placeholderText}
          </span>
          <span className={styles.triggerChevron}>
            <ChevronIcon />
          </span>
        </button>

        {error && (
          <span className={styles.error} id={`${selectId}-error`} role="alert">
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
                {multiple && (
                  <button
                    type="button"
                    className={styles.headerBtn}
                    onClick={handleClose}
                  >
                    {sheetCancel}
                  </button>
                )}
                <span className={styles.headerTitle}>{sheetTitle}</span>
                {multiple ? (
                  <button
                    type="button"
                    className={`${styles.headerBtn} ${styles.headerConfirm}`}
                    onClick={handleConfirm}
                  >
                    {sheetConfirm}
                  </button>
                ) : (
                  <button
                    type="button"
                    className={styles.closeBtn}
                    onClick={handleClose}
                    aria-label={t('common.close')}
                  >
                    <CloseIcon />
                  </button>
                )}
              </div>

              <div className={styles.optionsList} role="listbox" aria-multiselectable={multiple}>
                {options.map((option) => {
                  const isSelected = multiple
                    ? tempSelection.includes(option.value)
                    : selectedValue === option.value;

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
                      onClick={() => handleOptionClick(option)}
                      disabled={option.disabled}
                    >
                      {option.icon && <span className={styles.optionIcon}>{option.icon}</span>}
                      <span className={styles.optionLabel}>{option.label}</span>
                      {isSelected && (
                        <span className={styles.optionCheck}>
                          <CheckIcon />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';
