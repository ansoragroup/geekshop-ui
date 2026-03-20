'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, useRef, useImperativeHandle, useEffect, useId, useState } from 'react';
import type { InputHTMLAttributes } from 'react';
import styles from './DesktopCheckbox.module.scss';

export interface DesktopCheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  /** Whether the checkbox is checked (controlled) */
  checked?: boolean;
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Change handler */
  onChange?: (checked: boolean) => void;
  /** Label text */
  label?: string;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Indeterminate state (partially checked) */
  indeterminate?: boolean;
}

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path
      d="M2.5 6l2.5 2.5 4.5-4.5"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IndeterminateIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path
      d="M3 6h6"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const DesktopCheckbox = forwardRef<HTMLInputElement, DesktopCheckboxProps>(
  (
    {
      checked,
      defaultChecked,
      onChange,
      label,
      disabled = false,
      indeterminate = false,
      className = '',
      id: externalId,
      ...rest
    },
    ref,
  ) => {
    const internalRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => internalRef.current!, []);

    const generatedId = useId();
    const inputId = externalId ?? generatedId;

    // Track internal checked state for uncontrolled mode
    const isControlled = checked !== undefined;
    const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);

    // Set indeterminate state (can only be done via JS)
    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalChecked(e.target.checked);
      }
      onChange?.(e.target.checked);
    };

    const isChecked = isControlled ? checked : internalChecked;

    const rootClass = cn(
      styles.root,
      disabled && styles.disabled,
      className);

    const boxClass = cn(styles.box,
      (isChecked || indeterminate) ? styles.checked : styles.unchecked,);

    return (
      <label className={rootClass} htmlFor={inputId}>
        <input
          ref={internalRef}
          id={inputId}
          type="checkbox"
          className={styles.input}
          checked={isControlled ? checked : undefined}
          defaultChecked={!isControlled ? defaultChecked : undefined}
          disabled={disabled}
          onChange={handleChange}
          aria-checked={indeterminate ? 'mixed' : isChecked}
          {...rest}
        />
        <span className={boxClass}>
          {indeterminate ? (
            <IndeterminateIcon />
          ) : isChecked ? (
            <CheckIcon />
          ) : null}
        </span>
        {label && <span className={styles.label}>{label}</span>}
      </label>
    );
  },
);

DesktopCheckbox.displayName = 'DesktopCheckbox';
