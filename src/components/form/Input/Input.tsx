import { cn } from '../../../utils/cn';
'use client';
import { forwardRef, useRef, useImperativeHandle, useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { useGeekShop } from '../../../i18n';
import styles from './Input.module.scss';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'> {
  /** Input value */
  value?: string;
  /** Label text above input */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Error message shown below input */
  error?: string;
  /** Icon shown on the left side */
  leftIcon?: ReactNode;
  /** Whether to show clear button */
  clearable?: boolean;
  /** Whether input is disabled */
  disabled?: boolean;
  /** Input type */
  type?: InputHTMLAttributes<HTMLInputElement>cn('type'];
  /** Change handler (receives string value) */
  onChange?: (value: string) => void;
  /** Native change handler (receives event) */
  onNativeChange?: InputHTMLAttributes<HTMLInputElement>['onChange'];
}

const ClearIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7" fill="#CCCCCC" />
    <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value = '',
      label,
      placeholder,
      error,
      leftIcon,
      clearable = false,
      disabled = false,
      type = 'text',
      onChange,
      onNativeChange,
      id: externalId,
      className,
      ...rest
    },
    ref,
  ) => {
    const { t } = useGeekShop();
    const internalRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => internalRef.current!, []);

    const generatedId = useId();
    const inputId = externalId ?? generatedId;

    const handleClear = () => {
      onChange?.('');
      internalRef.current?.focus();
    };

    const rootClass = [
      styles.root,
      error && styles.hasError,
      disabled && styles.disabled,
      className,);

    return (
      <div className={rootClass}>
        {label && (
          <label className={styles.label} htmlFor={inputId}>
            {label}
          </label>
        )}

        <div className={styles.inputWrap}>
          {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}

          <input
            ref={internalRef}
            id={inputId}
            className={styles.input}
            type={type}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            onChange={(e) => {
              onChange?.(e.target.value);
              onNativeChange?.(e);
            }}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...rest}
          />

          {clearable && value && !disabled && (
            <button
              className={styles.clearBtn}
              onClick={handleClear}
              type="button"
              aria-label={t('input.clear')}
            >
              <ClearIcon />
            </button>
          )}
        </div>

        {error && (
          <span className={styles.error} id={`${inputId}-error`} role="alert">
            {error}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
