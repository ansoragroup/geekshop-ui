'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, type HTMLAttributes } from 'react';
import styles from './DesktopProgress.module.scss';

export type DesktopProgressVariant = 'default' | 'success' | 'warning' | 'error';
export type DesktopProgressSize = 'sm' | 'md' | 'lg';

export interface DesktopProgressProps extends HTMLAttributes<HTMLDivElement> {
  /** Progress value between 0 and 100 */
  value: number;
  /** Color variant */
  variant?: DesktopProgressVariant;
  /** Size of the progress bar */
  size?: DesktopProgressSize;
  /** Show percentage label on the right */
  showLabel?: boolean;
  /** Custom label text (overrides percentage) */
  label?: string;
  /** Show striped animation */
  striped?: boolean;
}

export const DesktopProgress = forwardRef<HTMLDivElement, DesktopProgressProps>(
  (
    {
      value,
      variant = 'default',
      size = 'md',
      showLabel = false,
      label,
      striped = false,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const clampedValue = Math.min(100, Math.max(0, value));
    const displayLabel = label ?? `${Math.round(clampedValue)}%`;

    return (
      <div
        ref={ref}
        className={cn(styles.root, styles[`size_${size}`], styles[`variant_${variant}`], className)}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={displayLabel}
        {...rest}
      >
        {showLabel && (
          <div className={styles.header}>
            <span className={styles.labelText}>{label ?? 'Progress'}</span>
            <span className={styles.percentage}>{Math.round(clampedValue)}%</span>
          </div>
        )}

        <div className={styles.track}>
          <div
            className={cn(styles.bar, striped ? styles.striped : '')}
            style={{ width: `${clampedValue}%` }}
          />
        </div>
      </div>
    );
  },
);

DesktopProgress.displayName = 'DesktopProgress';
