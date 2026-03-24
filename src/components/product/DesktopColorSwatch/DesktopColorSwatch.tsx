'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, useCallback } from 'react';
import styles from './DesktopColorSwatch.module.scss';

export interface DesktopColorSwatchOption {
  /** Unique value identifier */
  value: string;
  /** CSS color string */
  color?: string;
  /** Image URL for pattern/material swatches */
  image?: string;
  /** Label shown below the swatch */
  label?: string;
}

export interface DesktopColorSwatchProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Swatch options */
  options: DesktopColorSwatchOption[];
  /** Currently selected value */
  selected?: string;
  /** Callback when selection changes */
  onChange?: (value: string) => void;
  /** Label text shown above swatches */
  label?: string;
}

function DesktopColorSwatchInner(
  {
    options,
    selected,
    onChange,
    label,
    className,
    ...rest
  }: DesktopColorSwatchProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const handleSelect = useCallback(
    (value: string) => {
      onChange?.(value);
    },
    [onChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      let nextIndex = index;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextIndex = Math.min(index + 1, options.length - 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        nextIndex = Math.max(index - 1, 0);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleSelect(options[index].value);
        return;
      } else {
        return;
      }
      handleSelect(options[nextIndex].value);
    },
    [options, handleSelect],
  );

  return (
    <div ref={ref} className={cn(styles.root, className)} {...rest}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.swatches} role="listbox" aria-label={label ?? 'Color selection'}>
        {options.map((option, i) => {
          const isSelected = option.value === selected;
          const isImage = !!option.image;
          const selectedIndex = options.findIndex((o) => o.value === selected);

          return (
            <div key={option.value} className={styles.swatchItem}>
              <button
                type="button"
                className={cn(
                  styles.swatch,
                  isSelected ? styles.selected : '',
                  isImage ? styles.imageSwatch : '',
                )}
                onClick={() => handleSelect(option.value)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                role="option"
                aria-selected={isSelected}
                aria-label={option.label ?? option.value}
                tabIndex={i === (selectedIndex >= 0 ? selectedIndex : 0) ? 0 : -1}
              >
                {isImage ? (
                  <img
                    src={option.image}
                    alt={option.label ?? option.value}
                    className={styles.swatchImage}
                  />
                ) : (
                  <span
                    className={styles.swatchColor}
                    style={{ backgroundColor: option.color ?? '#ccc' }}
                  />
                )}
                {isSelected && (
                  <span className={styles.checkmark} aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                )}
              </button>
              {option.label && (
                <span className={cn(styles.swatchLabel, isSelected ? styles.swatchLabelActive : '')}>
                  {option.label}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const DesktopColorSwatch = forwardRef(DesktopColorSwatchInner);
DesktopColorSwatch.displayName = 'DesktopColorSwatch';
