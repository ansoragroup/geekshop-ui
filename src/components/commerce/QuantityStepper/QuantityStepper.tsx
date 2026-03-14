import { useState, useCallback } from 'react';
import styles from './QuantityStepper.module.scss';

export interface QuantityStepperProps {
  value: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  size?: 'sm' | 'md';
  disabled?: boolean;
}

export function QuantityStepper({
  value,
  min = 1,
  max = 99,
  onChange,
  size = 'md',
  disabled = false,
}: QuantityStepperProps) {
  const [inputValue, setInputValue] = useState(String(value));

  const isMinDisabled = disabled || value <= min;
  const isMaxDisabled = disabled || value >= max;

  const handleDecrement = useCallback(() => {
    if (value > min) {
      const next = value - 1;
      setInputValue(String(next));
      onChange?.(next);
    }
  }, [value, min, onChange]);

  const handleIncrement = useCallback(() => {
    if (value < max) {
      const next = value + 1;
      setInputValue(String(next));
      onChange?.(next);
    }
  }, [value, max, onChange]);

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
      onChange?.(num);
    }
  }, [inputValue, min, max, value, onChange]);

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
