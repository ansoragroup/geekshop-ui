import { cn } from '../../../utils/cn';
import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';
import styles from './Timeline.module.scss';

export interface TimelineItem {
  /** Timestamp or date label */
  time?: string;
  /** Event title */
  title: string;
  /** Optional event description */
  description?: string;
  /** Status determines dot styling */
  status?: 'completed' | 'active' | 'pending';
  /** Optional custom icon replacing the dot */
  icon?: ReactNode;
}

export interface TimelineProps extends HTMLAttributes<HTMLDivElement> {
  /** Timeline events to display */
  items: TimelineItem[];
  /** Reverse the display order */
  reverse?: boolean;
}

export const Timeline = forwardRef<HTMLDivElement, TimelineProps>(
  ({ items, reverse = false, className = '', ...rest }, ref) => {
    const displayItems = reverse ? [...items].reverse() : items;

    return (
      <div
        ref={ref}
        className={cn(styles.root, className)}
        role="list"
        aria-label="Timeline"
        {...rest}
      >
        {displayItems.map((item, index) => {
          const status = item.status ?? 'pending';
          const isLast = index === displayItems.length - 1;

          return (
            <div
              key={index}
              className={cn(styles.item, styles[`status-${status}`])}
              role="listitem"
            >
              <div className={styles.rail} aria-hidden="true">
                <span className={styles.dot}>
                  {item.icon ?? null}
                </span>
                {!isLast && <span className={styles.line} />}
              </div>

              <div className={styles.content}>
                {item.time && (
                  <span className={styles.time}>{item.time}</span>
                )}
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

Timeline.displayName = 'Timeline';
