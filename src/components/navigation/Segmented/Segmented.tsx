import { cn } from '../../../utils/cn';
'use client';
import { forwardRef, useRef, useEffect, useState, useCallback } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { useControllableState } from '../../../hooks/useControllableState';
import styles from './Segmented.module.scss';

export interface SegmentedOption {
  /** Unique value identifier */
  value: string;
  /** Display label */
  label: string;
  /** Optional icon */
  icon?: ReactNode;
  /** Whether this option is disabled */
  disabled?: boolean;
}

export interface SegmentedProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Currently selected value (controlled) */
  value?: string;
  /** Default selected value (uncontrolled) */
  defaultValue?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Options to display */
  options: SegmentedOptioncn(];
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to take full width */
  block?: boolean;
}

export const Segmented = forwardRef<HTMLDivElement, SegmentedProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onChange,
      options,
      size = 'md',
      block = false,
      className,
      ...rest
    },
    ref,
  ) => {
    const [selectedValue, setSelectedValue] = useControllableState<string>({
      value: controlledValue,
      defaultValue: defaultValue ?? (options.length > 0 ? options[0].value : ''),
      onChange,
    });

    const containerRef = useRef<HTMLDivElement>(null);
    const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});

    const updateIndicator = useCallback(() => {
      const container = containerRef.current;
      if (!container) return;

      const selectedIndex = options.findIndex((o) => o.value === selectedValue);
      if (selectedIndex === -1) return;

      const buttons = container.querySelectorAll<HTMLButtonElement>('[role="tab"]');
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

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => observer.disconnect();
    }, [updateIndicator]);

    const handleSelect = (option: SegmentedOption) => {
      if (option.disabled) return;
      setSelectedValue(option.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
      let nextIndex: number | null = null;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextIndex = index + 1;
        while (nextIndex < options.length && options[nextIndex].disabled) {
          nextIndex++;
        }
        if (nextIndex >= options.length) nextIndex = null;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        nextIndex = index - 1;
        while (nextIndex >= 0 && options[nextIndex].disabled) {
          nextIndex--;
        }
        if (nextIndex !== null && nextIndex < 0) nextIndex = null;
      }

      if (nextIndex !== null) {
        const container = containerRef.current;
        if (!container) return;
        const buttons = container.querySelectorAll<HTMLButtonElement>('[role="tab"]');
        buttons[nextIndex]?.focus();
        handleSelect(options[nextIndex]);
      }
    };

    const rootClass = [
      styles.segmented,
      styles[`size-${size}`],
      block && styles.block,
      className,);

    return (
      <div ref={ref} className={rootClass} {...rest}>
        <div ref={containerRef} className={styles.track} role="tablist">
          <div className={styles.indicator} style={indicatorStyle} />
          {options.map((option, index) => {
            const isSelected = option.value === selectedValue;
            const buttonClass = cn(styles.option,
              isSelected && styles.active,
              option.disabled && styles.optionDisabled,);

            return (
              <button
                key={option.value}
                type="button"
                role="tab"
                className={buttonClass}
                aria-selected={isSelected}
                aria-disabled={option.disabled}
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

Segmented.displayName = 'Segmented';
