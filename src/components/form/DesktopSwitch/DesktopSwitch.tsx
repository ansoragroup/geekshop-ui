'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, useId } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { useControllableState } from '../../../hooks/useControllableState';
import styles from './DesktopSwitch.module.scss';

export type DesktopSwitchSize = 'sm' | 'md';

export interface DesktopSwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'type'> {
  /** Whether the switch is on (controlled) */
  checked?: boolean;
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Change handler */
  onChange?: (checked: boolean) => void;
  /** Whether the switch is disabled */
  disabled?: boolean;
  /** Switch size */
  size?: DesktopSwitchSize;
  /** Label text */
  label?: string;
  /** Description text below label */
  description?: string;
  /** Label for on state (shown inside track) */
  onLabel?: string;
  /** Label for off state (shown inside track) */
  offLabel?: string;
}

export const DesktopSwitch = forwardRef<HTMLButtonElement, DesktopSwitchProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked,
      onChange,
      disabled = false,
      size = 'md',
      label,
      description,
      onLabel,
      offLabel,
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

    const hasInlineLabels = !!(onLabel || offLabel);

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
          aria-describedby={description ? `${switchId}-desc` : undefined}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          {...rest}
        >
          {hasInlineLabels && (
            <span className={styles.inlineLabel}>
              {checked ? onLabel : offLabel}
            </span>
          )}
          <span className={styles.thumb} />
        </button>
        {(label || description) && (
          <div className={styles.textWrap}>
            {label && (
              <label
                id={`${switchId}-label`}
                className={styles.label}
                htmlFor={switchId}
              >
                {label}
              </label>
            )}
            {description && (
              <span id={`${switchId}-desc`} className={styles.description}>
                {description}
              </span>
            )}
          </div>
        )}
      </div>
    );
  },
);

DesktopSwitch.displayName = 'DesktopSwitch';
