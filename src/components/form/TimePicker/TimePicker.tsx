'use client';
import { forwardRef, useId, useRef, useEffect, useCallback, type ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import { useControllableState } from '../../../hooks/useControllableState';
import { BottomSheet } from '../../feedback/BottomSheet';
import styles from './TimePicker.module.scss';

export interface TimePickerProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  format?: '12h' | '24h';
  minuteStep?: number;
  minTime?: string;
  maxTime?: string;
  disabled?: boolean;
  placeholder?: string;
  children?: ReactNode;
  className?: string;
}

function parseTime(
  str: string,
  fmt: '12h' | '24h'
): { hours: number; minutes: number; period: 'AM' | 'PM' } {
  if (fmt === '12h') {
    const match = str.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (match) {
      return {
        hours: parseInt(match[1], 10),
        minutes: parseInt(match[2], 10),
        period: match[3].toUpperCase() as 'AM' | 'PM',
      };
    }
  }
  const parts = str.split(':');
  const h = parseInt(parts[0], 10) || 0;
  const m = parseInt(parts[1], 10) || 0;
  if (fmt === '12h') {
    const period = h >= 12 ? 'PM' : 'AM';
    const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    return { hours: h12, minutes: m, period };
  }
  return { hours: h, minutes: m, period: h >= 12 ? 'PM' : 'AM' };
}

function formatTime(
  hours: number,
  minutes: number,
  period: 'AM' | 'PM',
  fmt: '12h' | '24h'
): string {
  if (fmt === '12h') {
    const h = String(hours).padStart(2, '0');
    const m = String(minutes).padStart(2, '0');
    return `${h}:${m} ${period}`;
  }
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function timeToMinutes(str: string): number {
  const parts = str.split(':');
  return (parseInt(parts[0], 10) || 0) * 60 + (parseInt(parts[1], 10) || 0);
}

interface ScrollColumnProps {
  items: Array<{ value: number; label: string; disabled?: boolean }>;
  selected: number;
  onSelect: (val: number) => void;
  label: string;
}

const ScrollColumn = ({ items, selected, onSelect, label }: ScrollColumnProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemHeight = 44;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const idx = items.findIndex((i) => i.value === selected);
    if (idx >= 0) {
      container.scrollTop = idx * itemHeight;
    }
  }, [selected, items]);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const idx = Math.round(container.scrollTop / itemHeight);
    const clamped = Math.max(0, Math.min(idx, items.length - 1));
    const item = items[clamped];
    if (item && !item.disabled && item.value !== selected) {
      onSelect(item.value);
    }
  }, [items, selected, onSelect]);

  return (
    <div className={styles.column} aria-label={label}>
      <div ref={containerRef} className={styles.columnScroll} onScroll={handleScroll}>
        <div className={styles.columnPadding} />
        {items.map((item) => (
          <button
            key={item.value}
            type="button"
            className={cn(
              styles.columnItem,
              item.value === selected && styles.columnItemSelected,
              item.disabled && styles.columnItemDisabled
            )}
            onClick={() => !item.disabled && onSelect(item.value)}
            aria-disabled={item.disabled}
            aria-pressed={item.value === selected}
            tabIndex={-1}
          >
            {item.label}
          </button>
        ))}
        <div className={styles.columnPadding} />
      </div>
    </div>
  );
};

export const TimePicker = forwardRef<HTMLDivElement, TimePickerProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onChange,
      open: controlledOpen,
      defaultOpen,
      onOpenChange,
      format = '24h',
      minuteStep = 1,
      minTime,
      maxTime,
      disabled = false,
      placeholder = 'Select time',
      children,
      className,
      ...rest
    },
    ref
  ) => {
    const panelId = useId();

    const [timeValue, setTimeValue] = useControllableState<string>({
      value: controlledValue,
      defaultValue: defaultValue ?? (format === '24h' ? '12:00' : '12:00 PM'),
      onChange,
    });

    const [isOpen, setIsOpen] = useControllableState<boolean>({
      value: controlledOpen,
      defaultValue: defaultOpen ?? false,
      onChange: onOpenChange,
    });

    const parsed = parseTime(timeValue, format);

    const _minMinutes = minTime ? timeToMinutes(minTime) : 0;
    const _maxMinutes = maxTime ? timeToMinutes(maxTime) : 24 * 60 - 1;

    const hourMax = format === '24h' ? 23 : 12;
    const hourMin = format === '12h' ? 1 : 0;

    const hourItems = [];
    for (let h = hourMin; h <= hourMax; h++) {
      hourItems.push({
        value: h,
        label: String(h).padStart(2, '0'),
      });
    }

    const minuteItems = [];
    for (let m = 0; m < 60; m += minuteStep) {
      minuteItems.push({
        value: m,
        label: String(m).padStart(2, '0'),
        disabled: false,
      });
    }

    const periodItems = [
      { value: 0, label: 'AM', disabled: false },
      { value: 1, label: 'PM', disabled: false },
    ];

    const handleHourChange = (h: number) => {
      let newVal: string;
      if (format === '24h') {
        newVal = formatTime(h, parsed.minutes, parsed.period, '24h');
      } else {
        newVal = formatTime(h, parsed.minutes, parsed.period, '12h');
      }
      setTimeValue(newVal);
    };

    const handleMinuteChange = (m: number) => {
      if (format === '24h') {
        setTimeValue(formatTime(parsed.hours, m, parsed.period, '24h'));
      } else {
        setTimeValue(formatTime(parsed.hours, m, parsed.period, '12h'));
      }
    };

    const handlePeriodChange = (p: number) => {
      const period = p === 0 ? 'AM' : 'PM';
      setTimeValue(formatTime(parsed.hours, parsed.minutes, period, '12h'));
    };

    const handleConfirm = () => {
      setIsOpen(false);
    };

    const handleOpen = () => {
      if (disabled) return;
      setIsOpen(true);
    };

    const displayValue = timeValue;

    return (
      <div ref={ref} className={cn(styles.root, className)} {...rest}>
        {children ? (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div onClick={handleOpen}>{children}</div>
        ) : (
          <button
            type="button"
            className={cn(styles.trigger, disabled && styles.triggerDisabled)}
            onClick={handleOpen}
            disabled={disabled}
            role="combobox"
            aria-expanded={isOpen}
            aria-controls={panelId}
            aria-haspopup="dialog"
            aria-label={placeholder}
          >
            <span className={styles.triggerIcon}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M9 5v4l3 2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span
              className={cn(
                styles.triggerText,
                !controlledValue && !defaultValue && styles.triggerPlaceholder
              )}
            >
              {displayValue}
            </span>
            <span className={styles.triggerArrow}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M3 4.5l3 3 3-3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </button>
        )}

        <BottomSheet visible={isOpen} title="Select Time" onClose={() => setIsOpen(false)}>
          <div id={panelId} className={styles.wheelContainer}>
            <div className={styles.selectionHighlight} />
            <ScrollColumn
              items={hourItems}
              selected={parsed.hours}
              onSelect={handleHourChange}
              label="Hours"
            />
            <div className={styles.separator}>:</div>
            <ScrollColumn
              items={minuteItems}
              selected={parsed.minutes}
              onSelect={handleMinuteChange}
              label="Minutes"
            />
            {format === '12h' && (
              <>
                <div className={styles.separator} />
                <ScrollColumn
                  items={periodItems}
                  selected={parsed.period === 'AM' ? 0 : 1}
                  onSelect={handlePeriodChange}
                  label="Period"
                />
              </>
            )}
          </div>
          <div className={styles.footer}>
            <button type="button" className={styles.confirmButton} onClick={handleConfirm}>
              Confirm
            </button>
          </div>
        </BottomSheet>
      </div>
    );
  }
);

TimePicker.displayName = 'TimePicker';
