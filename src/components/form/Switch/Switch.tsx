'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, useId } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { useControllableState } from '../../../hooks/useControllableState';
import styles from './Switch.module.scss';

export type SwitchSize = 'sm' | 'md';

export interface SwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'type'> {
  /** Whether the switch is on (controlled) */
  checked?: boolean;
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Change handler */
  onChange?: (checked: boolean) => void;
  /** Whether the switch is disabled */
  disabled?: boolean;
  /** Switch size */
  size?: SwitchSize;
  /** Label text */
  label?: string;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked,
      onChange,
      disabled = false,
      size = 'md',
      label,
      className,
      id: externalId,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const switchId = externalId ?? generatedId;

    const [checked, setChecked] = useControllableState<boolean>({
      value: controlledChecked,
      defaultValue: defaultChecked ?? false,
      onChange,
    });

    const handleClick = () => {
      if (disabled) return;
      setChecked(!checked);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleClick();
      }
    };

    const rootClass = cn(
      styles.root,
      disabled && styles.disabled,
      className);

    const trackClass = cn(styles.track,
      styles[`size-${size}`],
      checked ? styles.on : styles.off,);

    return (
      <div className={rootClass}>
        <button
          ref={ref}
          id={switchId}
          className={trackClass}
          type="button"
          role="switch"
          aria-checked={checked}
          aria-disabled={disabled}
          aria-labelledby={label ? `${switchId}-label` : undefined}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          {...rest}
        >
          <span className={styles.thumb} />
        </button>
        {label && (
          <label
            id={`${switchId}-label`}
            className={styles.label}
            htmlFor={switchId}
          >
            {label}
          </label>
        )}
      </div>
    );
  },
);

Switch.displayName = 'Switch';
