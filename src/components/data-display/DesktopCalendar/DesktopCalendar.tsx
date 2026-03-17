import { forwardRef, useState, useMemo, useCallback, type HTMLAttributes } from 'react';
import styles from './DesktopCalendar.module.scss';

export interface DesktopCalendarMarkedDate {
  /** Dot color below the date */
  color?: string;
  /** Whether to show a dot indicator */
  dot?: boolean;
  /** Optional label (e.g., 'Sale') */
  label?: string;
}

export interface DesktopCalendarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Selected date (controlled) */
  value?: Date;
  /** Change handler */
  onChange?: (date: Date) => void;
  /** Dates with special marks (dots, labels) keyed by YYYY-MM-DD */
  markedDates?: Record<string, DesktopCalendarMarkedDate>;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Locale for month/day names */
  locale?: 'uz' | 'ru' | 'en';
}

const MONTH_NAMES: Record<string, string[]> = {
  uz: ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'],
  ru: ['\u042F\u043D\u0432\u0430\u0440\u044C', '\u0424\u0435\u0432\u0440\u0430\u043B\u044C', '\u041C\u0430\u0440\u0442', '\u0410\u043F\u0440\u0435\u043B\u044C', '\u041C\u0430\u0439', '\u0418\u044E\u043D\u044C', '\u0418\u044E\u043B\u044C', '\u0410\u0432\u0433\u0443\u0441\u0442', '\u0421\u0435\u043D\u0442\u044F\u0431\u0440\u044C', '\u041E\u043A\u0442\u044F\u0431\u0440\u044C', '\u041D\u043E\u044F\u0431\u0440\u044C', '\u0414\u0435\u043A\u0430\u0431\u0440\u044C'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
};

const DAY_NAMES: Record<string, string[]> = {
  uz: ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'],
  ru: ['\u041F\u043D', '\u0412\u0442', '\u0421\u0440', '\u0427\u0442', '\u041F\u0442', '\u0421\u0431', '\u0412\u0441'],
  en: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
};

const ChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M12 15l-5-5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function dateToKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getStartDayOfWeek(year: number, month: number): number {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Monday first
}

export const DesktopCalendar = forwardRef<HTMLDivElement, DesktopCalendarProps>(
  (
    {
      value,
      onChange,
      markedDates = {},
      minDate,
      maxDate,
      locale = 'en',
      className = '',
      ...rest
    },
    ref,
  ) => {
    const today = useMemo(() => new Date(), []);

    const [viewYear, setViewYear] = useState(() =>
      value?.getFullYear() ?? today.getFullYear(),
    );
    const [viewMonth, setViewMonth] = useState(() =>
      value?.getMonth() ?? today.getMonth(),
    );

    const handlePrevMonth = useCallback(() => {
      if (viewMonth === 0) {
        setViewMonth(11);
        setViewYear((y) => y - 1);
      } else {
        setViewMonth((m) => m - 1);
      }
    }, [viewMonth]);

    const handleNextMonth = useCallback(() => {
      if (viewMonth === 11) {
        setViewMonth(0);
        setViewYear((y) => y + 1);
      } else {
        setViewMonth((m) => m + 1);
      }
    }, [viewMonth]);

    const isDateDisabled = useCallback((date: Date): boolean => {
      if (minDate) {
        const minStart = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
        if (date < minStart) return true;
      }
      if (maxDate) {
        const maxEnd = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
        if (date > maxEnd) return true;
      }
      return false;
    }, [minDate, maxDate]);

    const handleDayClick = useCallback((day: number) => {
      const date = new Date(viewYear, viewMonth, day);
      if (isDateDisabled(date)) return;
      onChange?.(date);
    }, [viewYear, viewMonth, isDateDisabled, onChange]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
      const currentDate = value ?? today;
      let newDate: Date | undefined;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          newDate = new Date(currentDate);
          newDate.setDate(newDate.getDate() - 1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          newDate = new Date(currentDate);
          newDate.setDate(newDate.getDate() + 1);
          break;
        case 'ArrowUp':
          e.preventDefault();
          newDate = new Date(currentDate);
          newDate.setDate(newDate.getDate() - 7);
          break;
        case 'ArrowDown':
          e.preventDefault();
          newDate = new Date(currentDate);
          newDate.setDate(newDate.getDate() + 7);
          break;
      }

      if (newDate && !isDateDisabled(newDate)) {
        setViewYear(newDate.getFullYear());
        setViewMonth(newDate.getMonth());
        onChange?.(newDate);
      }
    }, [value, today, isDateDisabled, onChange]);

    // Build calendar grid
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const startDay = getStartDayOfWeek(viewYear, viewMonth);
    const calendarDays: (number | null)[] = [];

    for (let i = 0; i < startDay; i++) {
      calendarDays.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      calendarDays.push(d);
    }

    // Pad to full rows
    while (calendarDays.length % 7 !== 0) {
      calendarDays.push(null);
    }

    const weeks: (number | null)[][] = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      weeks.push(calendarDays.slice(i, i + 7));
    }

    const monthNames = MONTH_NAMES[locale] ?? MONTH_NAMES.en;
    const dayNames = DAY_NAMES[locale] ?? DAY_NAMES.en;

    return (
      <div ref={ref} className={`${styles.root} ${className}`} {...rest}>
        <div className={styles.header}>
          <button
            type="button"
            className={styles.navBtn}
            onClick={handlePrevMonth}
            aria-label="Previous month"
          >
            <ChevronLeft />
          </button>
          <span className={styles.monthLabel}>
            {monthNames[viewMonth]} {viewYear}
          </span>
          <button
            type="button"
            className={styles.navBtn}
            onClick={handleNextMonth}
            aria-label="Next month"
          >
            <ChevronRight />
          </button>
        </div>

        <div className={styles.dayHeaders}>
          {dayNames.map((name) => (
            <span key={name} className={styles.dayHeader}>{name}</span>
          ))}
        </div>

        <div
          className={styles.grid}
          role="grid"
          aria-label={`${monthNames[viewMonth]} ${viewYear}`}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {weeks.map((week, weekIdx) => (
            <div key={weekIdx} className={styles.weekRow}>
              {week.map((day, dayIdx) => {
                if (day === null) {
                  return <span key={`empty-${dayIdx}`} className={styles.dayEmpty} />;
                }

                const date = new Date(viewYear, viewMonth, day);
                const dateKey = dateToKey(date);
                const isDisabled = isDateDisabled(date);
                const isToday = isSameDay(date, today);
                const isSelected = value ? isSameDay(date, value) : false;
                const marked = markedDates[dateKey];

                const dayClass = [
                  styles.day,
                  isToday && styles.dayToday,
                  isSelected && styles.daySelected,
                  isDisabled && styles.dayDisabled,
                ].filter(Boolean).join(' ');

                return (
                  <button
                    key={day}
                    type="button"
                    className={dayClass}
                    onClick={() => handleDayClick(day)}
                    disabled={isDisabled}
                    aria-label={`${day} ${monthNames[viewMonth]} ${viewYear}`}
                    aria-selected={isSelected}
                    aria-disabled={isDisabled}
                    aria-current={isToday ? 'date' : undefined}
                    role="gridcell"
                  >
                    <span className={styles.dayNumber}>{day}</span>
                    {marked?.dot && (
                      <span
                        className={styles.dayDot}
                        style={marked.color ? { background: marked.color } : undefined}
                      />
                    )}
                    {marked?.label && (
                      <span
                        className={styles.dayLabel}
                        style={marked.color ? { color: marked.color } : undefined}
                      >
                        {marked.label}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  },
);

DesktopCalendar.displayName = 'DesktopCalendar';
