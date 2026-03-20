'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, useRef, useImperativeHandle, useCallback, useEffect } from 'react';
import type { InputHTMLAttributes } from 'react';
import { useControllableState } from '../../../hooks/useControllableState';
import styles from './OTPInput.module.scss';

export interface OTPInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange' | 'type' | 'maxLength'> {
  /** Number of OTP digits */
  length?: number;
  /** Controlled value */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Called when value changes */
  onChange?: (value: string) => void;
  /** Called when all digits are entered */
  onComplete?: (code: string) => void;
  /** Show error state */
  error?: boolean;
  /** Error message shown below input */
  errorMessage?: string;
  /** Auto-focus input on mount */
  autoFocus?: boolean;
  /** Disable input */
  disabled?: boolean;
  /** Mask digits with dots for security */
  mask?: boolean;
}

export const OTPInput = forwardRef<HTMLInputElement, OTPInputProps>(
  (
    {
      length = 6,
      value: controlledValue,
      defaultValue,
      onChange,
      onComplete,
      error = false,
      errorMessage,
      autoFocus = false,
      disabled = false,
      mask = false,
      className,
      ...rest
    },
    ref,
  ) => {
    const internalRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => internalRef.current!, []);

    const [value, setValue] = useControllableState<string>({
      value: controlledValue,
      defaultValue: defaultValue ?? '',
      onChange,
    });

    const handleChange = useCallback(
      (newValue: string) => {
        // Only allow digits
        const digits = newValue.replace(/\D/g, '').slice(0, length);
        setValue(digits);

        if (digits.length === length) {
          onComplete?.(digits);
        }
      },
      [length, setValue, onComplete],
    );

    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(e.target.value);
      },
      [handleChange],
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        // Allow: backspace, delete, tab, escape, enter
        if (['Backspace', 'Delete', 'Tab', 'Escape', 'Enter'].includes(e.key)) {
          return;
        }
        // Allow: Ctrl/Cmd+A, Ctrl/Cmd+C, Ctrl/Cmd+V, Ctrl/Cmd+X
        if ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase())) {
          return;
        }
        // Allow arrow keys
        if (e.key.startsWith('Arrow')) {
          return;
        }
        // Block non-digit characters
        if (!/^\d$/.test(e.key)) {
          e.preventDefault();
        }
      },
      [],
    );

    const handlePaste = useCallback(
      (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text');
        handleChange(pasted);
      },
      [handleChange],
    );

    const handleBoxClick = useCallback(() => {
      internalRef.current?.focus();
    }, []);

    useEffect(() => {
      if (autoFocus && internalRef.current) {
        internalRef.current.focus();
      }
    }, [autoFocus]);

    const boxes = Array.from({ length }, (_, i) => {
      const char = value[i] ?? '';
      const isFilled = char !== '';
      const isActive = i === value.length && !disabled;

      return (
        <div
          key={i}
          className={cn(
            styles.box,
            isFilled && styles.filled,
            isActive && styles.active,
            error && styles.error,
            disabled && styles.disabled,)}
          aria-hidden="true"
        >
          {isFilled ? (mask ? '\u2022' : char) : ''}
        </div>
      );
    });

    const rootClass = cn(styles.root, className);

    return (
      <div className={rootClass}>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div className={styles.boxes} onClick={handleBoxClick}>
          {boxes}
          <input
            ref={internalRef}
            className={styles.hiddenInput}
            type="tel"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={length}
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            disabled={disabled}
            aria-label={rest['aria-label'] ?? 'OTP code input'}
            {...rest}
          />
        </div>

        {error && errorMessage && (
          <span className={styles.errorMessage} role="alert">
            {errorMessage}
          </span>
        )}
      </div>
    );
  },
);

OTPInput.displayName = 'OTPInput';
