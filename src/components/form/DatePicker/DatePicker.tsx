'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, useState, useCallback, useId, useRef, useImperativeHandle, useMemo } from 'react';
import type { HTMLAttributes } from 'react';
import { useFocusTrap } from '../../../hooks/useFocusTrap';
import { useGeekShop } from '../../../i18n';
import styles from './DatePicker.module.scss';

export interface DatePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Selected date (controlled) */
  value?: Date | string;
  /** Default date (uncontrolled) */
  defaultValue?: Date | string;
  /** Change handler */
  onChange?: (date: Date) => void;
  /** Minimum selectable date */
  min?: Date | string;
  /** Maximum selectable date */
  max?: Date | string;
  /** Placeholder text for the trigger */
  placeholder?: string;
  /** Label above the trigger */
  label?: string;
  /** Error message below the trigger */
  error?: string;
  /** Whether the picker is disabled */
  disabled?: boolean;
  /** Display format (default 'dd.MM.yyyy') */
  format?: string;
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

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="3" width="12" height="11" rx="2" stroke="#999" strokeWidth="1.3" />
    <path d="M2 6.5h12" stroke="#999" strokeWidth="1.3" />
    <path d="M5 1.5v3M11 1.5v3" stroke="#999" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M5 5l10 10M15 5l-10 10" stroke="#999" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

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

function parseDate(d: Date | string | undefined): Date | undefined {
  if (!d) return undefined;
  if (d instanceof Date) return d;
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

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/** Monday=0, ..., Sunday=6 */
function getStartDayOfWeek(year: number, month: number): number {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onChange,
      min,
      max,
      placeholder,
      label,
      error,
      disabled = false,
      format = 'dd.MM.yyyy',
      locale: localeProp,
      id: externalId,
      className,
      ...rest
    },
    ref,
  ) => {
    const { t, locale: ctxLocale } = useGeekShop();
    const locale = localeProp ?? ctxLocale;
    const generatedId = useId();
    const pickerId = externalId ?? generatedId;

    const internalRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => internalRef.current!, []);

    const [isOpen, setIsOpen] = useState(false);

    // Internal state
    const parsedControlled = parseDate(controlledValue);
    const parsedDefault = parseDate(defaultValue);
    const isControlled = controlledValue !== undefined;

    const [internalDate, setInternalDate] = useState<Date | undefined>(parsedDefault);
    const selectedDate = isControlled ? parsedControlled : internalDate;

    // Calendar view state
    const today = useMemo(() => new Date(), []);
    const [viewYear, setViewYear] = useState(() =>
      selectedDate?.getFullYear() ?? today.getFullYear(),
    );
    const [viewMonth, setViewMonth] = useState(() =>
      selectedDate?.getMonth() ?? today.getMonth(),
    );

    // Temp selection in the sheet
    const [tempDate, setTempDate] = useState<Date | undefined>(undefined);

    const parsedMin = parseDate(min);
    const parsedMax = parseDate(max);

    const sheetRef = useFocusTrap<HTMLDivElement>(isOpen, {
      onEscape: () => setIsOpen(false),
    });

    const mergedSheetRef = useCallback(
      (node: HTMLDivElement | null) => {
        sheetRef.current = node;
      },
      [sheetRef],
    );

    const handleOpen = () => {
      if (disabled) return;
      setIsOpen(true);
      setTempDate(selectedDate);
      if (selectedDate) {
        setViewYear(selectedDate.getFullYear());
        setViewMonth(selectedDate.getMonth());
      } else {
        setViewYear(today.getFullYear());
        setViewMonth(today.getMonth());
      }
    };

    const handleClose = () => {
      setIsOpen(false);
    };

    const handleConfirm = () => {
      if (tempDate) {
        if (!isControlled) {
          setInternalDate(tempDate);
        }
        onChange?.(tempDate);
      }
      setIsOpen(false);
    };

    const handleDayClick = (day: number) => {
      const newDate = new Date(viewYear, viewMonth, day);
      setTempDate(newDate);
    };

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

    const handleOverlayClick = () => {
      setIsOpen(false);
    };

    const handleContentClick = (e: React.MouseEvent) => {
      e.stopPropagation();
    };

    const handleCalendarKeyDown = (e: React.KeyboardEvent) => {
      if (!tempDate && !selectedDate) return;
      const currentDate = tempDate ?? selectedDate ?? today;
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
        case 'Enter':
        case ' ':
          e.preventDefault();
          handleConfirm();
          return;
      }

      if (newDate) {
        if (isDateDisabled(newDate)) return;
        setTempDate(newDate);
        setViewYear(newDate.getFullYear());
        setViewMonth(newDate.getMonth());
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

    const monthNames = MONTH_NAMES[locale] ?? MONTH_NAMES.uz;
    const dayNames = DAY_NAMES[locale] ?? DAY_NAMES.uz;

    const displayText = selectedDate ? formatDateDisplay(selectedDate, format) : '';
    const isValueSelected = !!selectedDate;

    const rootClass = cn(
      styles.root,
      error && styles.hasError,
      disabled && styles.disabled,
      className);

    const sheetTitle = t('datePicker.title');
    const placeholderText = placeholder || t('datePicker.placeholder');

    return (
      <div ref={internalRef} className={rootClass} {...rest}>
        {label && (
          <label className={styles.label} htmlFor={pickerId} id={`${pickerId}-label`}>
            {label}
          </label>
        )}

        <button
          id={pickerId}
          type="button"
          className={styles.trigger}
          onClick={handleOpen}
          disabled={disabled}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-labelledby={label ? `${pickerId}-label` : undefined}
          aria-describedby={error ? `${pickerId}-error` : undefined}
        >
          <span className={isValueSelected ? styles.triggerText : styles.triggerPlaceholder}>
            {displayText || placeholderText}
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
          <div className={styles.overlay} onClick={handleOverlayClick} role="presentation">
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <div
              ref={mergedSheetRef}
              className={styles.sheet}
              onClick={handleContentClick}
              onKeyDown={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={sheetTitle}
              tabIndex={-1}
            >
              <div className={styles.dragHandle}>
                <span className={styles.dragBar} />
              </div>

              <div className={styles.header}>
                <span className={styles.headerTitle}>{sheetTitle}</span>
                <button
                  type="button"
                  className={styles.closeBtn}
                  onClick={handleClose}
                  aria-label={t('common.close')}
                >
                  <CloseIcon />
                </button>
              </div>

              <div className={styles.calendarContainer}>
                <div className={styles.monthNav}>
                  <button
                    type="button"
                    className={styles.navBtn}
                    onClick={handlePrevMonth}
                    aria-label={t('datePicker.prevMonth')}
                  >
                    <ChevronLeft />
                  </button>
                  <span className={styles.monthLabel}>
                    {monthNamescn(viewMonth)} {viewYear}
                  </span>
                  <button
                    type="button"
                    className={styles.navBtn}
                    onClick={handleNextMonth}
                    aria-label={t('datePicker.nextMonth')}
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
                  className={styles.daysGrid}
                  role="grid"
                  aria-label={`${monthNames[viewMonth]} ${viewYear}`}
                  onKeyDown={handleCalendarKeyDown}
                  tabIndex={0}
                >
                  {calendarDays.map((day, i) => {
                    if (day === null) {
                      return <span key={`empty-${i}`} className={styles.dayEmpty} />;
                    }

                    const date = new Date(viewYear, viewMonth, day);
                    const isDisabled = isDateDisabled(date);
                    const isToday = isSameDay(date, today);
                    const isSelected = tempDate ? isSameDay(date, tempDate) : false;

                    const dayClass = [
                      styles.day,
                      isToday && styles.dayToday,
                      isSelected && styles.daySelected,
                      isDisabled && styles.dayDisabled];

                    return (
                      <button
                        key={day}
                        type="button"
                        className={dayClass}
                        onClick={() => !isDisabled && handleDayClick(day)}
                        disabled={isDisabled}
                        aria-label={`${day} ${monthNames[viewMonth]} ${viewYear}`}
                        aria-selected={isSelected}
                        aria-disabled={isDisabled}
                        aria-current={isToday ? 'date' : undefined}
                        role="gridcell"
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className={styles.footer}>
                <button
                  type="button"
                  className={styles.confirmBtn}
                  onClick={handleConfirm}
                  disabled={!tempDate}
                >
                  {t('common.select')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },
);

DatePicker.displayName = 'DatePicker';
