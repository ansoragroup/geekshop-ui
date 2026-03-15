import { forwardRef, useEffect, useRef, type HTMLAttributes } from 'react';
import { useCountdown } from '../../../hooks/useCountdown';
import styles from './CountdownTimer.module.scss';

export interface CountdownTimerProps extends HTMLAttributes<HTMLDivElement> {
  /** Target end time (Date object or ISO string) */
  endTime: Date | string;
  /** Label text shown before the timer */
  label?: string;
  /** Callback fired when countdown reaches zero */
  onEnd?: () => void;
}

export const CountdownTimer = forwardRef<HTMLDivElement, CountdownTimerProps>(
  (
    {
      endTime,
      label = 'Chegirmalar',
      onEnd,
      className,
      ...rest
    },
    ref,
  ) => {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(endTime);
  const endedRef = useRef(false);

  // Derive tick from seconds parity — toggles every second for CSS animation
  const tick = seconds % 2 === 1;

  // Fire onEnd once when countdown expires
  useEffect(() => {
    if (isExpired && !endedRef.current) {
      endedRef.current = true;
      onEnd?.();
    }
  }, [isExpired, onEnd]);

  const totalHours = days * 24 + hours;
  const display = {
    hours: String(totalHours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  };

  const rootClass = [styles.countdownTimer, className].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={rootClass} {...rest}>
      <div className={styles.labelArea}>
        <svg
          className={styles.icon}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 18a8 8 0 100-16 8 8 0 000 16z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M10 6v4.5l3 1.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className={styles.label}>{label}</span>
      </div>

      <div className={styles.timerArea}>
        <span className={`${styles.digit} ${tick ? styles.tick : ''}`}>
          {display.hours}
        </span>
        <span className={styles.separator}>:</span>
        <span className={`${styles.digit} ${tick ? styles.tick : ''}`}>
          {display.minutes}
        </span>
        <span className={styles.separator}>:</span>
        <span className={`${styles.digit} ${tick ? styles.tick : ''}`}>
          {display.seconds}
        </span>
      </div>
    </div>
  );
  },
);

CountdownTimer.displayName = 'CountdownTimer';
