import type { ReactNode } from 'react';
import { useRef } from 'react';
import styles from './Input.module.scss';

export interface InputProps {
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
  type?: string;
  /** Change handler */
  onChange?: (value: string) => void;
}

const ClearIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7" fill="#CCCCCC" />
    <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export function Input({
  value = '',
  label,
  placeholder,
  error,
  leftIcon,
  clearable = false,
  disabled = false,
  type = 'text',
  onChange,
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange?.('');
    inputRef.current?.focus();
  };

  const rootClass = [
    styles.root,
    error && styles.hasError,
    disabled && styles.disabled,
  ].filter(Boolean).join(' ');

  return (
    <div className={rootClass}>
      {label && <label className={styles.label}>{label}</label>}

      <div className={styles.inputWrap}>
        {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}

        <input
          ref={inputRef}
          className={styles.input}
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.value)}
        />

        {clearable && value && !disabled && (
          <button className={styles.clearBtn} onClick={handleClear} type="button" aria-label="Tozalash">
            <ClearIcon />
          </button>
        )}
      </div>

      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

export default Input;
