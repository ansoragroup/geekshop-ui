import { cn } from '../../../utils/cn';
'use client';
import { forwardRef, useRef, useEffect, useState, useCallback, type ReactNode, type HTMLAttributes } from 'react';
import { useControllableState } from '../../../hooks/useControllableState';
import styles from './DesktopSegmented.module.scss';

export interface DesktopSegmentedOption {
  /** Display label */
  label: string;
  /** Unique value identifier */
  value: string;
  /** Optional icon */
  icon?: ReactNode;
}

export interface DesktopSegmentedProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Options to display */
  options: DesktopSegmentedOptioncn(];
  /** Currently selected value (controlled) */
  value?: string;
  /** Default selected value (uncontrolled) */
  defaultValue?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Size variant */
  size?: 'sm' | 'md';
  /** Whether to take full width */
  fullWidth?: boolean;
}

export const DesktopSegmented = forwardRef<HTMLDivElement, DesktopSegmentedProps>(
  (
    {
      options,
      value: controlledValue,
      defaultValue,
      onChange,
      size = 'md',
      fullWidth = false,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const [selectedValue, setSelectedValue] = useControllableState<string>({
      value: controlledValue,
      defaultValue: defaultValue ?? (options.length > 0 ? options[0].value : ''),
      onChange,
    });

    const trackRef = useRef<HTMLDivElement>(null);
    const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});

    const updateIndicator = useCallback(() => {
      const track = trackRef.current;
      if (!track) return;

      const selectedIndex = options.findIndex((o) => o.value === selectedValue);
      if (selectedIndex === -1) return;

      const buttons = track.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      const selectedButton = buttons[selectedIndex];
      if (!selectedButton) return;

      setIndicatorStyle({
        width: selectedButton.offsetWidth,
        transform: `translateX(${selectedButton.offsetLeft}px)`,
      });
    }, [options, selectedValue]);

    useEffect(() => {
      updateIndicator();
    }, [updateIndicator]);

    useEffect(() => {
      if (typeof ResizeObserver === 'undefined') return;

      const observer = new ResizeObserver(() => {
        updateIndicator();
      });

      if (trackRef.current) {
        observer.observe(trackRef.current);
      }

      return () => observer.disconnect();
    }, [updateIndicator]);

    const handleSelect = (option: DesktopSegmentedOption) => {
      setSelectedValue(option.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
      let nextIndex: number | null = null;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextIndex = (index + 1) % options.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        nextIndex = (index - 1 + options.length) % options.length;
      }

      if (nextIndex !== null) {
        const track = trackRef.current;
        if (!track) return;
        const buttons = track.querySelectorAll<HTMLButtonElement>('[role="tab"]');
        buttons[nextIndex]?.focus();
        handleSelect(options[nextIndex]);
      }
    };

    const rootClass = [
      styles.segmented,
      styles[`size-${size}`],
      fullWidth && styles.fullWidth,
      className,);

    return (
      <div ref={ref} className={rootClass} {...rest}>
        <div ref={trackRef} className={styles.track} role="tablist">
          <div className={styles.indicator} style={indicatorStyle} />
          {options.map((option, index) => {
            const isSelected = option.value === selectedValue;
            const buttonClass = cn(styles.option,
              isSelected && styles.active,);

            return (
              <button
                key={option.value}
                type="button"
                role="tab"
                className={buttonClass}
                aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => handleSelect(option)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              >
                {option.icon && <span className={styles.icon}>{option.icon}</span>}
                <span className={styles.label}>{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  },
);

DesktopSegmented.displayName = 'DesktopSegmented';
