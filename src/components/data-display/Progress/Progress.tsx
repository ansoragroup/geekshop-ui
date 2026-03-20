import { cn } from '../../../utils/cn';
import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';
import styles from './Progress.module.scss';

export type ProgressVariant = 'linear' | 'circular';
export type ProgressSize = 'sm' | 'md' | 'lg';

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  /** Progress value between 0 and 100 */
  value: number;
  /** Visual variant */
  variant?: ProgressVariant;
  /** Size of the progress indicator */
  size?: ProgressSize;
  /** Show percentage label */
  showLabel?: boolean;
  /** Custom progress bar color */
  color?: string;
  /** Custom track color */
  trackColor?: string;
  /** Stroke width for circular variant (px) */
  strokeWidth?: number;
  /** Custom label content */
  label?: string | ReactNode;
}

const SIZE_MAP = {
  sm: { diameter: 40, stroke: 3 },
  md: { diameter: 64, stroke: 4 },
  lg: { diameter: 96, stroke: 6 },
} as const;

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value,
      variant = 'linear',
      size = 'md',
      showLabel = false,
      color,
      trackColor,
      strokeWidth,
      label,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const clampedValue = Math.min(100, Math.max(0, value));
    const displayLabel = label ?? `${Math.round(clampedValue)}%`;

    if (variant === 'circular') {
      const sizeConfig = SIZE_MAP[size];
      const stroke = strokeWidth ?? sizeConfig.stroke;
      const diameter = sizeConfig.diameter;
      const radius = (diameter - stroke) / 2;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (clampedValue / 100) * circumference;

      return (
        <div
          ref={ref}
          className={cn(styles.circularRoot, styles[`size-${size}`], className)}
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={typeof displayLabel === 'string' ? displayLabel : undefined}
          {...rest}
        >
          <svg
            className={styles.circularSvg}
            width={diameter}
            height={diameter}
            viewBox={`0 0 ${diameter} ${diameter}`}
          >
            <circle
              className={styles.circularTrack}
              cx={diameter / 2}
              cy={diameter / 2}
              r={radius}
              strokeWidth={stroke}
              style={trackColor ? { stroke: trackColor } : undefined}
            />
            <circle
              className={styles.circularBar}
              cx={diameter / 2}
              cy={diameter / 2}
              r={radius}
              strokeWidth={stroke}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={color ? { stroke: color } : undefined}
            />
          </svg>
          {showLabel && (
            <span className={styles.circularLabel}>{displayLabel}</span>
          )}
        </div>
      );
    }

    // Linear variant
    return (
      <div
        ref={ref}
        className={cn(styles.linearRoot, styles[`size-${size}`], className)}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={typeof displayLabel === 'string' ? displayLabel : undefined}
        {...rest}
      >
        <div className={styles.linearWrapper}>
          <div
            className={styles.linearTrack}
            style={trackColor ? { backgroundColor: trackColor } : undefined}
          >
            <div
              className={styles.linearBar}
              style={{
                width: `${clampedValue}%`,
                ...(color ? { backgroundColor: color } : {}),
              }}
            />
          </div>
          {showLabel && (
            <span className={styles.linearLabel}>{displayLabel}</span>
          )}
        </div>
      </div>
    );
  }
);

Progress.displayName = 'Progress';
