'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, useState, useMemo, useCallback } from 'react';
import type { HTMLAttributes } from 'react';
import { useControllableState } from '../../../hooks/useControllableState';
import { useGeekShop } from '../../../i18n';
import styles from './Calendar.module.scss';

export interface CalendarMarkedDate {
  /** Dot color below the date */
  color?: string;
  /** Whether to show a dot indicator */
  dot?: boolean;
  /** Optional label (e.g., 'Sale') */
  label?: string;
}

export interface CalendarProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Selected date(s) (controlled) */
  value?: Date | Date[];
  /** Default selected date(s) (uncontrolled) */
  defaultValue?: Date | Date[];
  /** Change handler */
  onChange?: (dates: Date[]) => void;
  /** Selection mode */
  mode?: 'single' | 'range' | 'multiple';
  /** Minimum selectable date */
  min?: Date;
  /** Maximum selectable date */
  max?: Date;
  /** Dates with special marks (dots, labels) */
  markedDates?: Record<string, CalendarMarkedDate>;
  /** Locale for month/day names */
  locale?: 'uz' | 'ru' | 'en';
  /** Show ISO week numbers */
  showWeekNumber?: boolean;
  /** First day of week: 0=Sunday, 1=Monday (default 1) */
  firstDayOfWeek?: 0 | 1;
}

const MONTH_NAMES: Record<string, string[]> = {
  uz: [
    'Yanvar',
    'Fevral',
    'Mart',
    'Aprel',
    'May',
    'Iyun',
    'Iyul',
    'Avgust',
    'Sentyabr',
    'Oktyabr',
    'Noyabr',
    'Dekabr',
  ],
  ru: [
    '\u042F\u043D\u0432\u0430\u0440\u044C',
    '\u0424\u0435\u0432\u0440\u0430\u043B\u044C',
    '\u041C\u0430\u0440\u0442',
    '\u0410\u043F\u0440\u0435\u043B\u044C',
    '\u041C\u0430\u0439',
    '\u0418\u044E\u043D\u044C',
    '\u0418\u044E\u043B\u044C',
    '\u0410\u0432\u0433\u0443\u0441\u0442',
    '\u0421\u0435\u043D\u0442\u044F\u0431\u0440\u044C',
    '\u041E\u043A\u0442\u044F\u0431\u0440\u044C',
    '\u041D\u043E\u044F\u0431\u0440\u044C',
    '\u0414\u0435\u043A\u0430\u0431\u0440\u044C',
  ],
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
};

const DAY_NAMES_MON: Record<string, string[]> = {
  uz: ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'],
  ru: [
    '\u041F\u043D',
    '\u0412\u0442',
    '\u0421\u0440',
    '\u0427\u0442',
    '\u041F\u0442',
    '\u0421\u0431',
    '\u0412\u0441',
  ],
  en: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
};

const DAY_NAMES_SUN: Record<string, string[]> = {
  uz: ['Ya', 'Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh'],
  ru: [
    '\u0412\u0441',
    '\u041F\u043D',
    '\u0412\u0442',
    '\u0421\u0440',
    '\u0427\u0442',
    '\u041F\u0442',
    '\u0421\u0431',
  ],
  en: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
};

const ChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M12 15l-5-5 5-5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M8 5l5 5-5 5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
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

function getStartDayOfWeek(year: number, month: number, firstDay: 0 | 1): number {
  const day = new Date(year, month, 1).getDay();
  if (firstDay === 1) {
    return day === 0 ? 6 : day - 1;
  }
  return day;
}

function getISOWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

function normalizeDates(value: Date | Date[] | undefined): Date[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return [value];
}

function isInRange(date: Date, rangeStart: Date, rangeEnd: Date): boolean {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  const s = new Date(
    rangeStart.getFullYear(),
    rangeStart.getMonth(),
    rangeStart.getDate()
  ).getTime();
  const e = new Date(rangeEnd.getFullYear(), rangeEnd.getMonth(), rangeEnd.getDate()).getTime();
  const start = Math.min(s, e);
  const end = Math.max(s, e);
  return d >= start && d <= end;
}

function isRangeStart(date: Date, dates: Date[]): boolean {
  if (dates.length < 1) return false;
  return isSameDay(date, dates[0]);
}

function isRangeEnd(date: Date, dates: Date[]): boolean {
  if (dates.length < 2) return false;
  return isSameDay(date, dates[1]);
}

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onChange,
      mode = 'single',
      min,
      max,
      markedDates = {},
      locale: localeProp,
      showWeekNumber = false,
      firstDayOfWeek = 1,
      className,
      ...rest
    },
    ref
  ) => {
    const { t, locale: ctxLocale } = useGeekShop();
    const locale = localeProp ?? ctxLocale;

    const today = useMemo(() => new Date(), []);

    const [selectedDates, setSelectedDates] = useControllableState<Date[]>({
      value: controlledValue !== undefined ? normalizeDates(controlledValue) : undefined,
      defaultValue: normalizeDates(defaultValue),
      onChange,
    });

    const [viewYear, setViewYear] = useState(
      () => selectedDates[0]?.getFullYear() ?? today.getFullYear()
    );
    const [viewMonth, setViewMonth] = useState(
      () => selectedDates[0]?.getMonth() ?? today.getMonth()
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

    const isDateDisabled = useCallback(
      (date: Date): boolean => {
        if (min) {
          const minStart = new Date(min.getFullYear(), min.getMonth(), min.getDate());
          if (date < minStart) return true;
        }
        if (max) {
          const maxEnd = new Date(max.getFullYear(), max.getMonth(), max.getDate());
          if (date > maxEnd) return true;
        }
        return false;
      },
      [min, max]
    );

    const handleDayClick = (day: number) => {
      const date = new Date(viewYear, viewMonth, day);
      if (isDateDisabled(date)) return;

      if (mode === 'single') {
        setSelectedDates([date]);
      } else if (mode === 'multiple') {
        setSelectedDates((prev) => {
          const existing = prev.findIndex((d) => isSameDay(d, date));
          if (existing >= 0) {
            return prev.filter((_, i) => i !== existing);
          }
          return [...prev, date];
        });
      } else if (mode === 'range') {
        setSelectedDates((prev) => {
          if (prev.length === 0 || prev.length === 2) {
            return [date];
          }
          // Second click completes the range
          const start = prev[0];
          if (date < start) {
            return [date, start];
          }
          return [start, date];
        });
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      const currentDate = selectedDates[selectedDates.length - 1] ?? today;
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
        handleDayClick(newDate.getDate());
      }
    };

    // Build calendar grid
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const startDay = getStartDayOfWeek(viewYear, viewMonth, firstDayOfWeek);
    const calendarDays: (number | null)[] = [];

    for (let i = 0; i < startDay; i++) {
      calendarDays.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      calendarDays.push(d);
    }

    // Week rows for week numbers
    const weeks: (number | null)[][] = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      weeks.push(calendarDays.slice(i, i + 7));
    }
    // Pad the last week
    const lastWeek = weeks[weeks.length - 1];
    while (lastWeek && lastWeek.length < 7) {
      lastWeek.push(null);
    }

    const monthNames = MONTH_NAMES[locale] ?? MONTH_NAMES.uz;
    const dayNames =
      firstDayOfWeek === 1
        ? DAY_NAMES_MON[locale] ?? DAY_NAMES_MON.uz
        : DAY_NAMES_SUN[locale] ?? DAY_NAMES_SUN.uz;

    const gridColumns = showWeekNumber ? 8 : 7;

    const rootClass = cn(styles.root, className);

    return (
      <div ref={ref} className={rootClass} {...rest}>
        <div className={styles.monthNav}>
          <button
            type="button"
            className={styles.navBtn}
            onClick={handlePrevMonth}
            aria-label={t('aria.previousMonth')}
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
            aria-label={t('aria.nextMonth')}
          >
            <ChevronRight />
          </button>
        </div>

        <div
          className={styles.dayHeaders}
          style={{ gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }}
        >
          {showWeekNumber && <span className={styles.weekHeader}>#</span>}
          {dayNames.map((name) => (
            <span key={name} className={styles.dayHeader}>
              {name}
            </span>
          ))}
        </div>

        {}
        <div
          className={styles.weeksContainer}
          role="grid"
          aria-label={`${monthNames[viewMonth]} ${viewYear}`}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {weeks.map((week, weekIdx) => {
            // Find first non-null day in week for week number
            const firstDay = week.find((d) => d !== null);
            const weekDate = firstDay
              ? new Date(viewYear, viewMonth, firstDay)
              : new Date(viewYear, viewMonth, 1);
            const weekNum = getISOWeekNumber(weekDate);

            return (
              <div
                key={weekIdx}
                className={styles.weekRow}
                style={{ gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }}
              >
                {showWeekNumber && <span className={styles.weekNumber}>{weekNum}</span>}
                {week.map((day, dayIdx) => {
                  if (day === null) {
                    return <span key={`empty-${dayIdx}`} className={styles.dayEmpty} />;
                  }

                  const date = new Date(viewYear, viewMonth, day);
                  const dateKey = dateToKey(date);
                  const isDisabled = isDateDisabled(date);
                  const isToday = isSameDay(date, today);
                  const isSelected = selectedDates.some((d) => isSameDay(d, date));
                  const marked = markedDates[dateKey];

                  // Range mode styling
                  const inRange =
                    mode === 'range' &&
                    selectedDates.length === 2 &&
                    isInRange(date, selectedDates[0], selectedDates[1]);
                  const rangeStart = mode === 'range' && isRangeStart(date, selectedDates);
                  const rangeEnd = mode === 'range' && isRangeEnd(date, selectedDates);

                  const dayClass = cn(
                    styles.day,
                    isToday && styles.dayToday,
                    isSelected && styles.daySelected,
                    isDisabled && styles.dayDisabled,
                    inRange && !isSelected && styles.dayInRange,
                    rangeStart && styles.dayRangeStart,
                    rangeEnd && styles.dayRangeEnd
                  );

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
            );
          })}
        </div>
      </div>
    );
  }
);

Calendar.displayName = 'Calendar';
