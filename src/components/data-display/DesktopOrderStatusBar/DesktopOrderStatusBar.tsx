import { forwardRef, useCallback, type ReactNode, type HTMLAttributes } from 'react';
import styles from './DesktopOrderStatusBar.module.scss';

export type DesktopOrderStepStatus = 'completed' | 'active' | 'pending';

export interface DesktopOrderStep {
  /** Step label text */
  label: string;
  /** Step status */
  status: DesktopOrderStepStatus;
  /** Optional date/time string */
  date?: string;
  /** Optional custom icon */
  icon?: ReactNode;
}

export interface DesktopOrderStatusBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Array of order progress steps */
  steps: DesktopOrderStep[];
  /** Index of the current active step (0-based) */
  currentStep: number;
}

// ─── Default Icons ──────────────────────────────────────────────────────────

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M3.5 8L6.5 11L12.5 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PendingIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="3" fill="currentColor" />
  </svg>
);

export const DesktopOrderStatusBar = forwardRef<HTMLDivElement, DesktopOrderStatusBarProps>(
  ({ steps, currentStep, className = '', ...rest }, ref) => {
    const getStatus = useCallback(
      (index: number): DesktopOrderStepStatus => {
        if (index < currentStep) return 'completed';
        if (index === currentStep) return 'active';
        return 'pending';
      },
      [currentStep],
    );

    return (
      <div
        ref={ref}
        className={`${styles.root} ${className}`}
        role="navigation"
        aria-label="Order progress"
        {...rest}
      >
        {steps.map((step, index) => {
          const status = step.status || getStatus(index);
          const isLast = index === steps.length - 1;

          return (
            <div
              key={index}
              className={`${styles.step} ${styles[`status_${status}`]}`}
              aria-current={status === 'active' ? 'step' : undefined}
            >
              {/* Step indicator */}
              <div className={styles.indicator}>
                <span className={styles.circle} aria-hidden="true">
                  {status === 'completed' ? (
                    step.icon ?? <CheckIcon />
                  ) : status === 'active' ? (
                    step.icon ?? <PendingIcon />
                  ) : (
                    <span className={styles.stepNumber}>{index + 1}</span>
                  )}
                </span>
              </div>

              {/* Connector line */}
              {!isLast && (
                <div
                  className={`${styles.connector} ${
                    index < currentStep ? styles.connectorCompleted : ''
                  }`}
                  aria-hidden="true"
                />
              )}

              {/* Label + date below */}
              <div className={styles.labelGroup}>
                <span className={styles.label}>{step.label}</span>
                {step.date && <span className={styles.date}>{step.date}</span>}
              </div>
            </div>
          );
        })}
      </div>
    );
  },
);

DesktopOrderStatusBar.displayName = 'DesktopOrderStatusBar';
