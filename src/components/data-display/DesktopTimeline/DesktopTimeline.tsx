import { cn } from '../../../utils/cn';
import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';
import styles from './DesktopTimeline.module.scss';
import { useGeekShop } from '../../../i18n';

export interface DesktopTimelineItem {
  /** Event title */
  title: string;
  /** Event content / description */
  content?: string;
  /** Date or time label */
  date?: string;
  /** Custom icon replacing the default dot */
  icon?: ReactNode;
  /** Dot / icon color variant */
  color?: 'primary' | 'success' | 'warning' | 'error' | 'default';
}

export interface DesktopTimelineProps extends HTMLAttributes<HTMLDivElement> {
  /** Timeline events to display */
  items: DesktopTimelineItem[];
  /** Layout mode: left-aligned or alternating left/right */
  mode?: 'left' | 'alternate';
}

export const DesktopTimeline = forwardRef<HTMLDivElement, DesktopTimelineProps>(
  ({ items, mode = 'left', className = '', ...rest }, ref) => {
  const { t } = useGeekShop();
    return (
      <div
        ref={ref}
        className={cn(styles.root, styles[`mode_${mode}`], className)}
        role="list"
        aria-label={t('aria.timeline')}
        {...rest}
      >
        {items.map((item, index) => {
          const colorClass = styles[`color_${item.color ?? 'default'}`] || '';
          const isRight = mode === 'alternate' && index % 2 === 1;
          const isLast = index === items.length - 1;

          return (
            <div
              key={index}
              className={cn(styles.item, colorClass, isRight ? styles.itemRight : styles.itemLeft)}
              role="listitem"
            >
              {/* Rail (dot + line) */}
              <div className={styles.rail} aria-hidden="true">
                <span className={styles.dot}>
                  {item.icon ?? null}
                </span>
                {!isLast && <span className={styles.line} />}
              </div>

              {/* Content card */}
              <div className={styles.card}>
                {item.date && <span className={styles.date}>{item.date}</span>}
                <span className={styles.title}>{item.title}</span>
                {item.content && (
                  <span className={styles.content}>{item.content}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  },
);

DesktopTimeline.displayName = 'DesktopTimeline';
