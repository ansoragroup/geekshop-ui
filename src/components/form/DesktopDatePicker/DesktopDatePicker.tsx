import { forwardRef, useState, useCallback, useId, useRef, useImperativeHandle, useMemo, useEffect } from 'react';
import type { HTMLAttributes } from 'react';
import styles from './DesktopDatePicker.module.scss';

export interface DesktopDatePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Selected date value as string (e.g., '2025-03-15') */
  value?: string;
  /** Change handler — receives formatted date string */
  onChange?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Date display format */
  format?: string;
  /** Whether the picker is disabled */
  disabled?: boolean;
  /** Minimum selectable date string */
  minDate?: string;
  /** Maximum selectable date string */
  maxDate?: string;
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DAY_NAMES = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.3" />
    <path d="M2 6.5h12" stroke="currentColor" strokeWidth="1.3" />
    <path d="M5 1.5v3M11 1.5v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M10 12l-4-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function parseDate(d: string | undefined): Date | undefined {
  if (!d) return undefined;
  const parsed = new Date(d);
  return isNaN(parsed.getTime()) ? undefined : parsed;
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function formatDateDisplay(date: Date, format: string): string {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = String(date.getFullYear());
  return format
    .replace('dd', dd)
    .replace('MM', mm)
    .replace('yyyy', yyyy);
}

function formatDateISO(date: Date): string {
  const yyyy = String(date.getFullYear());
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/** Monday=0, ..., Sunday=6 */
function getStartDayOfWeek(year: number, month: number): number {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

export const DesktopDatePicker = forwardRef<HTMLDivElement, DesktopDatePickerProps>(
  (
    {
      value,
      onChange,
      placeholder = 'Select date',
      format = 'dd.MM.yyyy',
      disabled = false,
      minDate,
      maxDate,
      label,
      error,
      id: externalId,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const internalRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => internalRef.current!, []);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const generatedId = useId();
    const pickerId = externalId ?? generatedId;

    const [isOpen, setIsOpen] = useState(false);
    const selectedDate = parseDate(value);
    const parsedMin = parseDate(minDate);
    const parsedMax = parseDate(maxDate);
    const today = useMemo(() => new Date(), []);

    const [viewYear, setViewYear] = useState(() =>
      selectedDate?.getFullYear() ?? today.getFullYear(),
    );
    const [viewMonth, setViewMonth] = useState(() =>
      selectedDate?.getMonth() ?? today.getMonth(),
    );

    // Close on outside click
    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (
          internalRef.current &&
          !internalRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
      if (!isOpen) return;

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen]);

    const handleToggle = () => {
      if (disabled) return;
      setIsOpen((prev) => !prev);
      if (!isOpen && selectedDate) {
        setViewYear(selectedDate.getFullYear());
        setViewMonth(selectedDate.getMonth());
      }
    };

    const handleDayClick = useCallback(
      (day: number) => {
        const newDate = new Date(viewYear, viewMonth, day);
        onChange?.(formatDateISO(newDate));
        setIsOpen(false);
      },
      [viewYear, viewMonth, onChange],
    );

    const handlePrevMonth = () => {
      if (viewMonth === 0) {
        setViewMonth(11);
        setViewYear((y) => y - 1);
      } else {
        setViewMonth((m) => m - 1);
      }
    };

    const handleNextMonth = () => {
      if (viewMonth === 11) {
        setViewMonth(0);
        setViewYear((y) => y + 1);
      } else {
        setViewMonth((m) => m + 1);
      }
    };

    const isDateDisabled = (date: Date): boolean => {
      if (parsedMin) {
        const minStart = new Date(parsedMin.getFullYear(), parsedMin.getMonth(), parsedMin.getDate());
        if (date < minStart) return true;
      }
      if (parsedMax) {
        const maxEnd = new Date(parsedMax.getFullYear(), parsedMax.getMonth(), parsedMax.getDate());
        if (date > maxEnd) return true;
      }
      return false;
    };

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

    const displayText = selectedDate ? formatDateDisplay(selectedDate, format) : '';

    const rootClass = [
      styles.root,
      error && styles.hasError,
      disabled && styles.disabled,
      isOpen && styles.open,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={internalRef} className={rootClass} {...rest}>
        {label && (
          <label className={styles.label} htmlFor={pickerId}>
            {label}
          </label>
        )}

        <button
          id={pickerId}
          type="button"
          className={styles.trigger}
          onClick={handleToggle}
          disabled={disabled}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
        >
          <span className={displayText ? styles.triggerText : styles.triggerPlaceholder}>
            {displayText || placeholder}
          </span>
          <span className={styles.triggerIcon}>
            <CalendarIcon />
          </span>
        </button>

        {error && (
          <span className={styles.error} id={`${pickerId}-error`} role="alert">
            {error}
          </span>
        )}

        {isOpen && (
          <div
            ref={dropdownRef}
            className={styles.dropdown}
            role="dialog"
            aria-modal="false"
            aria-label="Calendar"
          >
            <div className={styles.monthNav}>
              <button
                type="button"
                className={styles.navBtn}
                onClick={handlePrevMonth}
                aria-label="Previous month"
              >
                <ChevronLeft />
              </button>
              <span className={styles.monthLabel}>
                {MONTH_NAMES[viewMonth]} {viewYear}
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
              {DAY_NAMES.map((name) => (
                <span key={name} className={styles.dayHeader}>{name}</span>
              ))}
            </div>

            <div className={styles.daysGrid} role="grid" aria-label={`${MONTH_NAMES[viewMonth]} ${viewYear}`}>
              {calendarDays.map((day, i) => {
                if (day === null) {
                  return <span key={`empty-${i}`} className={styles.dayEmpty} />;
                }

                const date = new Date(viewYear, viewMonth, day);
                const isDayDisabled = isDateDisabled(date);
                const isToday = isSameDay(date, today);
                const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;

                const dayClass = [
                  styles.day,
                  isToday && styles.dayToday,
                  isSelected && styles.daySelected,
                  isDayDisabled && styles.dayDisabled,
                ]
                  .filter(Boolean)
                  .join(' ');

                return (
                  <button
                    key={day}
                    type="button"
                    className={dayClass}
                    onClick={() => !isDayDisabled && handleDayClick(day)}
                    disabled={isDayDisabled}
                    aria-label={`${day} ${MONTH_NAMES[viewMonth]} ${viewYear}`}
                    aria-selected={isSelected}
                    role="gridcell"
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  },
);

DesktopDatePicker.displayName = 'DesktopDatePicker';
