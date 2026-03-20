'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, useState, useCallback, useEffect, type HTMLAttributes } from 'react';
import { useControllableState } from '../../../hooks/useControllableState';
import styles from './DesktopQuantityStepper.module.scss';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface DesktopQuantityStepperProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Controlled value */
  value?: number;
  /** Default value for uncontrolled usage */
  defaultValue?: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Called when value changes */
  onChange?: (value: number) => void;
  /** Whether the stepper is disabled */
  disabled?: boolean;
  /** Size variant */
  size?: 'sm' | 'md';
}

// ─── Inline SVG Icons ────────────────────────────────────────────────────────

function MinusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M5 12H19" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M12 5V19M5 12H19" />
    </svg>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export const DesktopQuantityStepper = forwardRef<HTMLDivElement, DesktopQuantityStepperProps>(
  (
    {
      value: valueProp,
      defaultValue,
      min = 1,
      max = 99,
      onChange,
      disabled = false,
      size = 'md',
      className = '',
      ...rest
    },
    ref,
  ) => {
    const [value, setValue] = useControllableState<number>({
      value: valueProp,
      defaultValue: defaultValue ?? min,
      onChange,
    });

    const [inputValue, setInputValue] = useState(String(value));

    useEffect(() => {
      setInputValue(String(value));
    }, [value]);

    const isMinDisabled = disabled || value <= min;
    const isMaxDisabled = disabled || value >= max;

    const handleDecrement = useCallback(() => {
      if (value > min) {
        const next = value - 1;
        setInputValue(String(next));
        setValue(next);
      }
    }, [value, min, setValue]);

    const handleIncrement = useCallback(() => {
      if (value < max) {
        const next = value + 1;
        setInputValue(String(next));
        setValue(next);
      }
    }, [value, max, setValue]);

    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/\D/g, '');
        setInputValue(raw);
      },
      [],
    );

    const handleInputBlur = useCallback(() => {
      let num = parseInt(inputValue, 10);
      if (isNaN(num) || num < min) num = min;
      if (num > max) num = max;
      setInputValue(String(num));
      if (num !== value) {
        setValue(num);
      }
    }, [inputValue, min, max, value, setValue]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          (e.target as HTMLInputElement).blur();
        }
      },
      [],
    );

    const rootClass = cn(
      styles.root,
      styles[size],
      disabled && styles.disabled,
      className);

    return (
      <div
        ref={ref}
        className={rootClass}
        {...rest}
      >
        <button
          type="button"
          className={cn(styles.btn, isMinDisabled ? styles.btnDisabled : '')}
          onClick={handleDecrement}
          disabled={isMinDisabled}
          aria-label="Decrease quantity"
        >
          <MinusIcon />
        </button>

        <input
          type="text"
          inputMode="numeric"
          className={styles.input}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-label="Quantity"
        />

        <button
          type="button"
          className={cn(styles.btn, isMaxDisabled ? styles.btnDisabled : '')}
          onClick={handleIncrement}
          disabled={isMaxDisabled}
          aria-label="Increase quantity"
        >
          <PlusIcon />
        </button>
      </div>
    );
  },
);

DesktopQuantityStepper.displayName = 'DesktopQuantityStepper';
