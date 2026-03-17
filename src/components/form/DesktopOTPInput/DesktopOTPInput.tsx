import { forwardRef, useRef, useImperativeHandle, useCallback, useEffect } from 'react';
import type { InputHTMLAttributes } from 'react';
import { useControllableState } from '../../../hooks/useControllableState';
import styles from './DesktopOTPInput.module.scss';

export interface DesktopOTPInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange' | 'type' | 'maxLength'> {
  /** Number of OTP digits */
  length?: 4 | 6;
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

export const DesktopOTPInput = forwardRef<HTMLInputElement, DesktopOTPInputProps>(
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
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const compositeRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => compositeRef.current!, []);

    const [value, setValue] = useControllableState<string>({
      value: controlledValue,
      defaultValue: defaultValue ?? '',
      onChange,
    });

    const focusInput = useCallback((index: number) => {
      const clamped = Math.max(0, Math.min(index, length - 1));
      inputRefs.current[clamped]?.focus();
    }, [length]);

    const handleInputChange = useCallback(
      (index: number, inputValue: string) => {
        const digit = inputValue.replace(/\D/g, '').slice(-1);
        if (!digit) return;

        const chars = value.split('');
        while (chars.length < length) chars.push('');
        chars[index] = digit;
        const newValue = chars.join('').slice(0, length);
        setValue(newValue);

        if (index < length - 1) {
          focusInput(index + 1);
        }

        const trimmed = newValue.replace(/\s/g, '');
        if (trimmed.length === length) {
          onComplete?.(trimmed);
        }
      },
      [value, length, setValue, focusInput, onComplete],
    );

    const handleKeyDown = useCallback(
      (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
          e.preventDefault();
          const chars = value.split('');
          if (chars[index]) {
            chars[index] = '';
            setValue(chars.join(''));
          } else if (index > 0) {
            chars[index - 1] = '';
            setValue(chars.join(''));
            focusInput(index - 1);
          }
        } else if (e.key === 'ArrowLeft' && index > 0) {
          e.preventDefault();
          focusInput(index - 1);
        } else if (e.key === 'ArrowRight' && index < length - 1) {
          e.preventDefault();
          focusInput(index + 1);
        }
      },
      [value, length, setValue, focusInput],
    );

    const handlePaste = useCallback(
      (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
        if (pasted) {
          setValue(pasted);
          focusInput(Math.min(pasted.length, length - 1));
          if (pasted.length === length) {
            onComplete?.(pasted);
          }
        }
      },
      [length, setValue, focusInput, onComplete],
    );

    const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      e.target.select();
    }, []);

    useEffect(() => {
      if (autoFocus) {
        focusInput(0);
      }
    }, [autoFocus, focusInput]);

    const rootClass = [styles.root, className].filter(Boolean).join(' ');

    return (
      <div className={rootClass}>
        <div className={styles.boxes} role="group" aria-label={rest['aria-label'] ?? 'OTP code input'}>
          {Array.from({ length }, (_, i) => {
            const char = value[i] ?? '';
            const isFilled = char !== '';
            const isActive = i === value.length && !disabled;

            const boxClass = [
              styles.box,
              isFilled && styles.filled,
              isActive && styles.active,
              error && styles.error,
              disabled && styles.disabled,
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                className={boxClass}
                type="text"
                inputMode="numeric"
                autoComplete={i === 0 ? 'one-time-code' : 'off'}
                maxLength={1}
                value={isFilled ? (mask ? '\u2022' : char) : ''}
                disabled={disabled}
                aria-label={`Digit ${i + 1} of ${length}`}
                onChange={(e) => handleInputChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={handlePaste}
                onFocus={handleFocus}
              />
            );
          })}
        </div>

        {/* Hidden input to allow form submission and ref forwarding */}
        <input
          ref={compositeRef}
          type="hidden"
          value={value}
          {...rest}
        />

        {error && errorMessage && (
          <span className={styles.errorMessage} role="alert">
            {errorMessage}
          </span>
        )}
      </div>
    );
  },
);

DesktopOTPInput.displayName = 'DesktopOTPInput';
