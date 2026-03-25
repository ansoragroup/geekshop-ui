'use client';
import {
  forwardRef,
  useId,
  useRef,
  useState,
  useEffect,
  useCallback,
  type HTMLAttributes,
} from 'react';
import { cn } from '../../../utils/cn';
import { useControllableState } from '../../../hooks/useControllableState';
import { useFocusTrap } from '../../../hooks/useFocusTrap';
import styles from './DesktopTimePicker.module.scss';

export interface DesktopTimePickerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  format?: '12h' | '24h';
  minuteStep?: number;
  minTime?: string;
  maxTime?: string;
  disabled?: boolean;
  placeholder?: string;
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
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;
  }
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

interface ScrollColumnProps {
  items: Array<{ value: number; label: string; disabled?: boolean }>;
  selected: number;
  onSelect: (val: number) => void;
  label: string;
  columnLabel: string;
}

const ScrollColumn = ({ items, selected, onSelect, label, columnLabel }: ScrollColumnProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemHeight = 36;

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
    <div className={styles.column}>
      <div className={styles.columnHeader}>{columnLabel}</div>
      <div
        ref={containerRef}
        className={styles.columnScroll}
        onScroll={handleScroll}
        aria-label={label}
      >
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
      </div>
    </div>
  );
};

export const DesktopTimePicker = forwardRef<HTMLDivElement, DesktopTimePickerProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onChange,
      format = '24h',
      minuteStep = 1,
      minTime: _minTime,
      maxTime: _maxTime,
      disabled = false,
      placeholder = 'Select time',
      className,
      ...rest
    },
    ref
  ) => {
    const dtPanelId = useId();

    const [timeValue, setTimeValue] = useControllableState<string>({
      value: controlledValue,
      defaultValue: defaultValue ?? (format === '24h' ? '12:00' : '12:00 PM'),
      onChange,
    });

    const [isOpen, setIsOpen] = useState(false);
    const [dropAbove, setDropAbove] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);

    const panelRef = useFocusTrap<HTMLDivElement>(isOpen, {
      onEscape: () => {
        setIsOpen(false);
        triggerRef.current?.focus();
      },
    });

    const parsed = parseTime(timeValue, format);

    const hourMax = format === '24h' ? 23 : 12;
    const hourMin = format === '12h' ? 1 : 0;

    const hourItems = [];
    for (let h = hourMin; h <= hourMax; h++) {
      hourItems.push({ value: h, label: String(h).padStart(2, '0') });
    }

    const minuteItems = [];
    for (let m = 0; m < 60; m += minuteStep) {
      minuteItems.push({ value: m, label: String(m).padStart(2, '0') });
    }

    const periodItems = [
      { value: 0, label: 'AM' },
      { value: 1, label: 'PM' },
    ];

    const handleHourChange = (h: number) => {
      setTimeValue(formatTime(h, parsed.minutes, parsed.period, format));
    };

    const handleMinuteChange = (m: number) => {
      setTimeValue(formatTime(parsed.hours, m, parsed.period, format));
    };

    const handlePeriodChange = (p: number) => {
      const period = p === 0 ? 'AM' : 'PM';
      setTimeValue(formatTime(parsed.hours, parsed.minutes, period, '12h'));
    };

    const handleToggle = () => {
      if (disabled) return;
      if (!isOpen && triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        setDropAbove(spaceBelow < 320);
      }
      setIsOpen((prev) => !prev);
    };

    const handleConfirm = () => {
      setIsOpen(false);
      triggerRef.current?.focus();
    };

    const handleCancel = () => {
      setIsOpen(false);
      triggerRef.current?.focus();
    };

    return (
      <div ref={ref} className={cn(styles.root, className)} {...rest}>
        <button
          ref={triggerRef}
          type="button"
          className={cn(styles.trigger, disabled && styles.triggerDisabled)}
          onClick={handleToggle}
          disabled={disabled}
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={dtPanelId}
          aria-haspopup="dialog"
          aria-label={placeholder}
        >
          <span className={styles.triggerIcon}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
              <path
                d="M8 4.5v3.5l2.5 1.5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className={styles.triggerText}>{timeValue}</span>
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

        {isOpen && (
          <div
            id={dtPanelId}
            ref={panelRef}
            className={cn(styles.panel, dropAbove && styles.panelAbove)}
            role="dialog"
            aria-modal="true"
            aria-label="Select time"
            tabIndex={-1}
          >
            <div className={styles.columns}>
              <ScrollColumn
                items={hourItems}
                selected={parsed.hours}
                onSelect={handleHourChange}
                label="Hours"
                columnLabel="Hour"
              />
              <ScrollColumn
                items={minuteItems}
                selected={parsed.minutes}
                onSelect={handleMinuteChange}
                label="Minutes"
                columnLabel="Minute"
              />
              {format === '12h' && (
                <ScrollColumn
                  items={periodItems}
                  selected={parsed.period === 'AM' ? 0 : 1}
                  onSelect={handlePeriodChange}
                  label="Period"
                  columnLabel="Period"
                />
              )}
            </div>
            <div className={styles.panelFooter}>
              <button type="button" className={styles.cancelBtn} onClick={handleCancel}>
                Cancel
              </button>
              <button type="button" className={styles.confirmBtn} onClick={handleConfirm}>
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
);

DesktopTimePicker.displayName = 'DesktopTimePicker';
