import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';
import styles from './Steps.module.scss';

export interface StepItem {
  /** Step title */
  title: string;
  /** Optional step description */
  description?: string;
  /** Optional custom icon */
  icon?: ReactNode;
}

export type StepsDirection = 'horizontal' | 'vertical';
export type StepsSize = 'sm' | 'md';

export interface StepsProps extends HTMLAttributes<HTMLDivElement> {
  /** 0-based index of the active step */
  current: number;
  /** Step items to display */
  items: StepItem[];
  /** Layout direction */
  direction?: StepsDirection;
  /** Size variant */
  size?: StepsSize;
}

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path
      d="M2.5 6L5 8.5L9.5 3.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Steps = forwardRef<HTMLDivElement, StepsProps>(
  ({ current, items, direction = 'horizontal', size = 'md', className = '', ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={`${styles.root} ${styles[`direction-${direction}`]} ${styles[`size-${size}`]} ${className}`}
        role="list"
        aria-label="Progress steps"
        {...rest}
      >
        {items.map((item, index) => {
          const status = index < current ? 'completed' : index === current ? 'active' : 'pending';

          return (
            <div
              key={index}
              className={`${styles.step} ${styles[`status-${status}`]}`}
              role="listitem"
              aria-current={status === 'active' ? 'step' : undefined}
            >
              {/* Connector line before (not for first item) */}
              {index > 0 && (
                <div
                  className={`${styles.connector} ${index <= current ? styles.connectorCompleted : ''}`}
                  aria-hidden="true"
                />
              )}

              {/* Step indicator circle */}
              <div className={styles.indicator} aria-hidden="true">
                {status === 'completed' ? (
                  item.icon ?? <CheckIcon />
                ) : (
                  item.icon ?? <span className={styles.dot} />
                )}
              </div>

              {/* Step content */}
              <div className={styles.content}>
                <span className={styles.title}>{item.title}</span>
                {item.description && (
                  <span className={styles.description}>{item.description}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

Steps.displayName = 'Steps';
