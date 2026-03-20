import { cn } from '../../../utils/cn';
'use client';
import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import styles from './Checkbox.module.scss';

export interface CheckboxProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'type'> {
  /** Whether the checkbox is checked */
  checked?: boolean;
  /** Label text */
  label?: string;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Change handler */
  onChange?: (checked: boolean) => void;
}

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      checked = false,
      label,
      disabled = false,
      onChange,
      className,
      ...rest
    },
    ref,
  ) => {
    const handleClick = () => {
      if (disabled) return;
      onChange?.(!checked);
    };

    const rootClass = cn(styles.root,
      disabled && styles.disabled,
      className,);

    return (
      <button
        ref={ref}
        className={rootClass}
        onClick={handleClick}
        type="button"
        role="checkbox"
        aria-checked={checked}
        aria-disabled={disabled}
        {...rest}
      >
        <span className={cn(styles.circle, checked ? styles.checked : styles.unchecked)}>
          {checked && (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3.5 7l2.5 2.5 4.5-4.5"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
        {label && <span className={styles.label}>{label}</span>}
      </button>
    );
  },
);

Checkbox.displayName = 'Checkbox';
