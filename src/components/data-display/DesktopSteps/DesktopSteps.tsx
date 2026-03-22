import { cn } from '../../../utils/cn';
import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';
import styles from './DesktopSteps.module.scss';
import { useGeekShop } from '../../../i18n';

export type DesktopStepStatus = 'completed' | 'active' | 'error' | 'pending';

export interface DesktopStepItem {
  /** Step title */
  title: string;
  /** Optional description text */
  description?: string;
  /** Optional custom icon (ReactNode) */
  icon?: ReactNode;
  /** Override automatic status */
  status?: DesktopStepStatus;
}

export interface DesktopStepsProps extends HTMLAttributes<HTMLDivElement> {
  /** Step items to display */
  items: DesktopStepItem[];
  /** 0-based index of the current active step */
  current: number;
  /** Layout direction */
  direction?: 'horizontal' | 'vertical';
}

// ─── Icons ──────────────────────────────────────────────────────────────────

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M3 7L5.5 9.5L11 4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ErrorIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M4 4l6 6M10 4l-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DesktopSteps = forwardRef<HTMLDivElement, DesktopStepsProps>(
  ({ items, current, direction = 'horizontal', className = '', ...rest }, ref) => {
  const { t } = useGeekShop();
    return (
      <div
        ref={ref}
        className={cn(styles.root, styles[`direction_${direction}`], className)}
        role="list"
        aria-label={t('aria.progressSteps')}
        {...rest}
      >
        {items.map((item, index) => {
          const status: DesktopStepStatus =
            item.status ?? (index < current ? 'completed' : index === current ? 'active' : 'pending');
          const isLast = index === items.length - 1;

          return (
            <div
              key={index}
              className={cn(styles.step, styles[`status_${status}`])}
              role="listitem"
              aria-current={status === 'active' ? 'step' : undefined}
            >
              {/* Connector (before step, except first) */}
              {index > 0 && (
                <div
                  className={cn(styles.connector, index <= current ? styles.connectorCompleted : '', status === 'error' ? styles.connectorError : '')}
                  aria-hidden="true"
                />
              )}

              {/* Step indicator circle */}
              <div className={styles.indicator} aria-hidden="true">
                {status === 'completed' ? (
                  item.icon ?? <CheckIcon />
                ) : status === 'error' ? (
                  item.icon ?? <ErrorIcon />
                ) : status === 'active' ? (
                  item.icon ?? <span className={styles.activeDot} />
                ) : (
                  <span className={styles.stepNumber}>{index + 1}</span>
                )}
              </div>

              {/* Content */}
              <div className={styles.content}>
                <span className={styles.title}>{item.title}</span>
                {item.description && (
                  <span className={styles.description}>{item.description}</span>
                )}
              </div>

              {/* Spacer after last step for horizontal layout */}
              {isLast && direction === 'horizontal' && (
                <div className={styles.spacer} aria-hidden="true" />
              )}
            </div>
          );
        })}
      </div>
    );
  },
);

DesktopSteps.displayName = 'DesktopSteps';
