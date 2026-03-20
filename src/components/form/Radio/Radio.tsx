import { cn } from '../../../utils/cn';
'use client';
import { forwardRef, createContext, useContext, useCallback, useId } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { useControllableState } from '../../../hooks/useControllableState';
import styles from './Radio.module.scss';

// ---- RadioGroup Context ----

interface RadioGroupContextValue {
  name: string;
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

// ---- RadioGroup ----

export interface RadioGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Currently selected value (controlled) */
  value?: string;
  /** Default selected value (uncontrolled) */
  defaultValue?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** HTML name attribute for the radio inputs */
  name?: string;
  /** Layout direction */
  direction?: 'vertical' | 'horizontal';
  /** Whether all radios in the group are disabled */
  disabled?: boolean;
  /** RadioGroup content (Radio items) */
  children: ReactNode;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onChange,
      name: nameProp,
      direction = 'vertical',
      disabled = false,
      children,
      className,
      ...rest
    },
    ref,
  ) => {
    const generatedName = useId();
    const name = nameProp ?? generatedName;

    const cn(value, setValue] = useControllableState<string>({
      value: controlledValue,
      defaultValue: defaultValue ?? '',
      onChange,
    });

    const handleChange = useCallback(
      (nextValue: string) => {
        setValue(nextValue);
      },
      [setValue],
    );

    const rootClass = [
      styles.group,
      styles[`direction-${direction}`],
      className,);

    return (
      <RadioGroupContext value={{ name, value, disabled, onChange: handleChange }}>
        <div
          ref={ref}
          className={rootClass}
          role="radiogroup"
          {...rest}
        >
          {children}
        </div>
      </RadioGroupContext>
    );
  },
);

RadioGroup.displayName = 'RadioGroup';

// ---- Radio ----

export interface RadioProps extends Omit<HTMLAttributes<HTMLLabelElement>, 'onChange'> {
  /** Value of this radio option */
  value: string;
  /** Whether this radio is disabled */
  disabled?: boolean;
  /** Label content */
  children?: ReactNode;
}

export const Radio = forwardRef<HTMLLabelElement, RadioProps>(
  ({ value, disabled: disabledProp = false, children, className, ...rest }, ref) => {
    const group = useContext(RadioGroupContext);
    const isChecked = group ? group.value === value : false;
    const isDisabled = group ? group.disabled || disabledProp : disabledProp;
    const name = group?.name ?? '';

    const handleChange = () => {
      if (isDisabled || !group) return;
      group.onChange(value);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
        handleChange();
      }
    };

    const rootClass = cn(styles.radio,
      isDisabled && styles.disabled,
      className,);

    return (
      <label
        ref={ref}
        className={rootClass}
        {...rest}
      >
        <input
          type="radio"
          className={styles.input}
          name={name}
          value={value}
          checked={isChecked}
          disabled={isDisabled}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          aria-checked={isChecked}
        />
        <span className={cn(styles.circle, isChecked ? styles.checked : styles.unchecked)}>
          {isChecked && <span className={styles.dot} />}
        </span>
        {children && <span className={styles.label}>{children}</span>}
      </label>
    );
  },
);

Radio.displayName = 'Radio';
