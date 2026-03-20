'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, createContext, useContext, useCallback, useId } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { useControllableState } from '../../../hooks/useControllableState';
import styles from './DesktopRadio.module.scss';

// ---- RadioGroup Context ----

interface DesktopRadioGroupContextValue {
  name: string;
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
}

const DesktopRadioGroupContext = createContext<DesktopRadioGroupContextValue | null>(null);

// ---- DesktopRadioGroup ----

export interface DesktopRadioGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
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
  /** RadioGroup content (DesktopRadio items) */
  children: ReactNode;
}

export const DesktopRadioGroup = forwardRef<HTMLDivElement, DesktopRadioGroupProps>(
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

    const [value, setValue] = useControllableState<string>({
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

    const rootClass = cn(
      styles.group,
      styles[`direction-${direction}`],
      className);

    return (
      <DesktopRadioGroupContext value={{ name, value, disabled, onChange: handleChange }}>
        <div
          ref={ref}
          className={rootClass}
          role="radiogroup"
          {...rest}
        >
          {children}
        </div>
      </DesktopRadioGroupContext>
    );
  },
);

DesktopRadioGroup.displayName = 'DesktopRadioGroup';

// ---- DesktopRadio ----

export interface DesktopRadioProps extends Omit<HTMLAttributes<HTMLLabelElement>, 'onChange'> {
  /** Value of this radio option */
  value: string;
  /** Whether this radio is disabled */
  disabled?: boolean;
  /** Label content */
  children?: ReactNode;
  /** Description text below the label */
  description?: string;
}

export const DesktopRadio = forwardRef<HTMLLabelElement, DesktopRadioProps>(
  ({ value, disabled: disabledProp = false, children, description, className, ...rest }, ref) => {
    const group = useContext(DesktopRadioGroupContext);
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
      isChecked && styles.checked,
      isDisabled && styles.disabled,
      className);

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
        <span className={cn(styles.circle, isChecked ? styles.circleChecked : styles.circleUnchecked)}>
          {isChecked && <span className={styles.dot} />}
        </span>
        <span className={styles.content}>
          {children && <span className={styles.label}>{children}</span>}
          {description && <span className={styles.description}>{description}</span>}
        </span>
      </label>
    );
  },
);

DesktopRadio.displayName = 'DesktopRadio';
