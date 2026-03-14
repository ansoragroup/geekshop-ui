import { type FC, useState, useEffect, useRef, useCallback } from 'react';
import styles from './CountdownTimer.module.scss';

export interface CountdownTimerProps {
  /** Target end time (Date object or ISO string) */
  endTime: Date | string;
  /** Label text shown before the timer */
  label?: string;
  /** Callback fired when countdown reaches zero */
  onEnd?: () => void;
}

function getTimeRemaining(endTime: Date): {
  hours: string;
  minutes: string;
  seconds: string;
  total: number;
} {
  const total = Math.max(0, endTime.getTime() - Date.now());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor(total / 1000 / 60 / 60);

  return {
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
    total,
  };
}

const CountdownTimer: FC<CountdownTimerProps> = ({
  endTime,
  label = 'Chegirmalar',
  onEnd,
}) => {
  const end = endTime instanceof Date ? endTime : new Date(endTime);
  const [time, setTime] = useState(() => getTimeRemaining(end));
  const [tick, setTick] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const endedRef = useRef(false);

  const handleEnd = useCallback(() => {
    if (!endedRef.current) {
      endedRef.current = true;
      onEnd?.();
    }
  }, [onEnd]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const remaining = getTimeRemaining(end);
      setTime(remaining);
      setTick((prev) => !prev);

      if (remaining.total <= 0) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        handleEnd();
      }
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [end, handleEnd]);

  return (
    <div className={styles.countdownTimer}>
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
          {time.hours}
        </span>
        <span className={styles.separator}>:</span>
        <span className={`${styles.digit} ${tick ? styles.tick : ''}`}>
          {time.minutes}
        </span>
        <span className={styles.separator}>:</span>
        <span className={`${styles.digit} ${tick ? styles.tick : ''}`}>
          {time.seconds}
        </span>
      </div>
    </div>
  );
};

export default CountdownTimer;
