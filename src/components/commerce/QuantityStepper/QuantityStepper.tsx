import { useState, useCallback, useEffect } from 'react';
import { useControllableState } from '../../../hooks/useControllableState';
import styles from './QuantityStepper.module.scss';

export interface QuantityStepperProps {
  /** Controlled value */
  value?: number;
  /** Default value for uncontrolled usage */
  defaultValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  size?: 'sm' | 'md';
  disabled?: boolean;
}

export function QuantityStepper({
  value: valueProp,
  defaultValue,
  min = 1,
  max = 99,
  onChange,
  size = 'md',
  disabled = false,
}: QuantityStepperProps) {
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
    []
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

  return (
    <div
      className={`${styles.stepper} ${styles[size]} ${disabled ? styles.disabled : ''}`}
    >
      <button
        type="button"
        className={`${styles.btn} ${styles.btnMinus} ${isMinDisabled ? styles.btnDisabled : ''}`}
        onClick={handleDecrement}
        disabled={isMinDisabled}
        aria-label="Kamaytirish"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M2.5 6H9.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <input
        type="text"
        inputMode="numeric"
        className={styles.input}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        disabled={disabled}
        aria-label="Miqdor"
      />

      <button
        type="button"
        className={`${styles.btn} ${styles.btnPlus} ${isMaxDisabled ? styles.btnDisabled : ''}`}
        onClick={handleIncrement}
        disabled={isMaxDisabled}
        aria-label="Ko'paytirish"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M6 2.5V9.5M2.5 6H9.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
