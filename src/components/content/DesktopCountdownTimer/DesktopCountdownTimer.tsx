import { cn } from '../../../utils/cn';
'use client';
import { forwardRef, useEffect, useRef, type HTMLAttributes } from 'react';
import { useCountdown } from '../../../hooks/useCountdown';
import styles from './DesktopCountdownTimer.module.scss';

export interface DesktopCountdownTimerProps extends HTMLAttributes<HTMLDivElement> {
  /** Target end time (Date object or ISO string) */
  endTime: Date | string;
  /** Label text shown before the timer */
  label?: string;
  /** Callback fired when countdown reaches zero */
  onEnd?: () => void;
  /** Whether to show days as a separate segment */
  showDays?: boolean;
}

export const DesktopCountdownTimer = forwardRef<HTMLDivElement, DesktopCountdownTimerProps>(
  (
    {
      endTime,
      label = 'Flash Sale Ends In',
      onEnd,
      showDays = true,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const { days, hours, minutes, seconds, isExpired } = useCountdown(endTime);
    const endedRef = useRef(false);

    const tick = seconds % 2 === 1;

    useEffect(() => {
      if (isExpired && !endedRef.current) {
        endedRef.current = true;
        onEnd?.();
      }
    }, [isExpired, onEnd]);

    const displayDays = String(days).padStart(2, '0');
    const displayHours = showDays
      ? String(hours).padStart(2, '0')
      : String(days * 24 + hours).padStart(2, '0');
    const displayMinutes = String(minutes).padStart(2, '0');
    const displaySeconds = String(seconds).padStart(2, '0');

    return (
      <div ref={ref} className={cn(styles.root, className)} {...rest}>
        <div className={styles.labelArea}>
          <svg
            className={styles.icon}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <polyline points="12 6 12 12 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className={styles.label}>{label}</span>
        </div>

        <div className={styles.timerArea} aria-label={`${showDays ? `${days} days ` : ''}${displayHours} hours ${displayMinutes} minutes ${displaySeconds} seconds remaining`}>
          {showDays && (
            <>
              <div className={styles.segment}>
                <span className={cn(styles.digit, tick ? styles.tick : '')}>
                  {displayDays}
                </span>
                <span className={styles.segmentLabel}>Days</span>
              </div>
              <span className={styles.colon}>:</span>
            </>
          )}

          <div className={styles.segment}>
            <span className={cn(styles.digit, tick ? styles.tick : '')}>
              {displayHours}
            </span>
            <span className={styles.segmentLabel}>Hours</span>
          </div>
          <span className={styles.colon}>:</span>

          <div className={styles.segment}>
            <span className={cn(styles.digit, tick ? styles.tick : '')}>
              {displayMinutes}
            </span>
            <span className={styles.segmentLabel}>Min</span>
          </div>
          <span className={styles.colon}>:</span>

          <div className={styles.segment}>
            <span className={cn(styles.digit, tick ? styles.tick : '')}>
              {displaySeconds}
            </span>
            <span className={styles.segmentLabel}>Sec</span>
          </div>
        </div>
      </div>
    );
  },
);

DesktopCountdownTimer.displayName = 'DesktopCountdownTimer';
