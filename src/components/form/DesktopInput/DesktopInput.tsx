'use client';
import { useGeekShop } from '../../../i18n';
import { cn } from '../../../utils/cn';
import { forwardRef, useRef, useImperativeHandle, useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import styles from './DesktopInput.module.scss';

export type DesktopInputSize = 'sm' | 'md' | 'lg';

export interface DesktopInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size' | 'prefix'> {
  /** Input value */
  value?: string;
  /** Change handler (receives string value) */
  onChange?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Error message or boolean error state */
  error?: string | boolean;
  /** Success state */
  success?: boolean;
  /** Helper text displayed below the input */
  helperText?: string;
  /** Prefix icon or content */
  prefix?: ReactNode;
  /** Suffix icon or content */
  suffix?: ReactNode;
  /** Show clear button when has value */
  clearable?: boolean;
  /** Input size */
  size?: DesktopInputSize;
  /** Label text above the input */
  label?: string;
}

const ClearIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7" fill="var(--gs-text-placeholder, #CCCCCC)" />
    <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="var(--gs-bg-card, #fff)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const SuccessIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7" fill="var(--gs-color-success, #07C160)" />
    <path d="M5 8l2 2 4-4" stroke="var(--gs-bg-card, #fff)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ErrorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7" fill="var(--gs-color-error, #FF3B30)" />
    <path d="M8 5v3.5" stroke="var(--gs-bg-card, #fff)" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="8" cy="11" r="0.75" fill="var(--gs-bg-card, #fff)" />
  </svg>
);

export const DesktopInput = forwardRef<HTMLInputElement, DesktopInputProps>(
  (
    {
      value = '',
      onChange,
      placeholder,
      disabled = false,
      error,
      success = false,
      helperText,
      prefix,
      suffix,
      clearable = false,
      size = 'md',
      label,
      type = 'text',
      id: externalId,
      className = '',
      ...rest
    },
    ref,
  ) => {
  const { t } = useGeekShop();
    const internalRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => internalRef.current!, []);

    const generatedId = useId();
    const inputId = externalId ?? generatedId;

    const hasError = !!error;
    const errorMessage = typeof error === 'string' ? error : undefined;

    const handleClear = () => {
      onChange?.('');
      internalRef.current?.focus();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    };

    const rootClass = cn(
      styles.root,
      styles[`size-${size}`],
      hasError && styles.hasError,
      success && styles.hasSuccess,
      disabled && styles.disabled,
      className);

    return (
      <div className={rootClass}>
        {label && (
          <label className={styles.label} htmlFor={inputId}>
            {label}
          </label>
        )}

        <div className={styles.inputWrap}>
          {prefix && <span className={styles.prefix}>{prefix}</span>}

          <input
            ref={internalRef}
            id={inputId}
            className={styles.input}
            type={type}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            onChange={handleChange}
            aria-invalid={hasError}
            aria-describedby={
              errorMessage
                ? `${inputId}-error`
                : helperText
                  ? `${inputId}-helper`
                  : undefined
            }
            {...rest}
          />

          {clearable && value && !disabled && (
            <button
              className={styles.clearBtn}
              onClick={handleClear}
              type="button"
              aria-label={t('aria.clearInput')}
              tabIndex={-1}
            >
              <ClearIcon />
            </button>
          )}

          {success && !hasError && (
            <span className={styles.stateIcon}>
              <SuccessIcon />
            </span>
          )}

          {hasError && (
            <span className={styles.stateIcon}>
              <ErrorIcon />
            </span>
          )}

          {suffix && <span className={styles.suffix}>{suffix}</span>}
        </div>

        {errorMessage && (
          <span className={styles.error} id={`${inputId}-error`} role="alert">
            {errorMessage}
          </span>
        )}

        {!errorMessage && helperText && (
          <span className={styles.helperText} id={`${inputId}-helper`}>
            {helperText}
          </span>
        )}
      </div>
    );
  },
);

DesktopInput.displayName = 'DesktopInput';
