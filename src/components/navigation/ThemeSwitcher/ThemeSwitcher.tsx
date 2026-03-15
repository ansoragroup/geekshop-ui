import { forwardRef, useCallback, type HTMLAttributes, type KeyboardEvent } from 'react';
import { useControllableState } from '../../../hooks/useControllableState';
import { THEME_PRESETS, THEME_PRESET_NAMES, type ThemePreset } from '../../../theme/presets';
import { setThemePreset } from '../../../theme';
import styles from './ThemeSwitcher.module.scss';

export interface ThemeSwitcherProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Currently selected theme preset (controlled) */
  value?: ThemePreset;
  /** Default theme preset (uncontrolled) */
  defaultValue?: ThemePreset;
  /** Callback when theme preset changes */
  onChange?: (preset: ThemePreset) => void;
  /** Size of the color circles */
  size?: 'sm' | 'md';
  /** Whether to apply the theme to the document when selected. Default: true */
  applyOnChange?: boolean;
}

export const ThemeSwitcher = forwardRef<HTMLDivElement, ThemeSwitcherProps>(
  (
    {
      value: valueProp,
      defaultValue = 'default',
      onChange,
      size = 'md',
      applyOnChange = true,
      className,
      ...rest
    },
    ref,
  ) => {
    const [selected, setSelected] = useControllableState<ThemePreset>({
      value: valueProp,
      defaultValue,
      onChange,
    });

    const handleSelect = useCallback(
      (preset: ThemePreset) => {
        setSelected(preset);
        if (applyOnChange) {
          setThemePreset(preset);
        }
      },
      [setSelected, applyOnChange],
    );

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        const currentIndex = THEME_PRESET_NAMES.indexOf(selected);
        let nextIndex = currentIndex;

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          nextIndex = (currentIndex + 1) % THEME_PRESET_NAMES.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          nextIndex = (currentIndex - 1 + THEME_PRESET_NAMES.length) % THEME_PRESET_NAMES.length;
        }

        if (nextIndex !== currentIndex) {
          handleSelect(THEME_PRESET_NAMES[nextIndex]);
        }
      },
      [selected, handleSelect],
    );

    const sizeClass = size === 'sm' ? styles.sm : styles.md;

    return (
      <div
        ref={ref}
        className={`${styles.root} ${sizeClass} ${className ?? ''}`}
        role="radiogroup"
        aria-label="Theme preset"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {THEME_PRESET_NAMES.map((presetName) => {
          const config = THEME_PRESETS[presetName];
          const isActive = presetName === selected;

          return (
            <button
              key={presetName}
              role="radio"
              aria-checked={isActive}
              aria-label={config.label}
              className={`${styles.swatch} ${isActive ? styles.active : ''}`}
              style={{ '--swatch-color': config.colors.primary } as React.CSSProperties}
              onClick={() => handleSelect(presetName)}
              tabIndex={isActive ? 0 : -1}
              type="button"
            >
              {isActive && (
                <svg
                  className={styles.check}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M3.5 8.5L6.5 11.5L12.5 4.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    );
  },
);

ThemeSwitcher.displayName = 'ThemeSwitcher';
