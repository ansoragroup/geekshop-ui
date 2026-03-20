'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, useState, useCallback, useEffect, useRef, type HTMLAttributes, type KeyboardEvent } from 'react';
import { useControllableState } from '../../../hooks/useControllableState';
import styles from './DesktopThemeSwitcher.module.scss';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface DesktopThemeSwitcherProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Currently selected theme mode (controlled) */
  value?: ThemeMode;
  /** Default theme mode (uncontrolled) */
  defaultValue?: ThemeMode;
  /** Callback when theme mode changes */
  onChange?: (mode: ThemeMode) => void;
  /** Display variant */
  variant?: 'toggle' | 'dropdown';
  /** Disabled state */
  disabled?: boolean;
}

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 0111.21 3 7 7 0 0012 21a9 9 0 009-8.21z" />
  </svg>
);

const MonitorIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12l5 5L20 7" />
  </svg>
);

const THEME_OPTIONS: { mode: ThemeMode; label: string; icon: React.ReactNode }[] = [
  { mode: 'light', label: 'Light', icon: <SunIcon /> },
  { mode: 'dark', label: 'Dark', icon: <MoonIcon /> },
  { mode: 'system', label: 'System', icon: <MonitorIcon /> },
];

const getIconForMode = (mode: ThemeMode): React.ReactNode => {
  switch (mode) {
    case 'light': return <SunIcon />;
    case 'dark': return <MoonIcon />;
    case 'system': return <MonitorIcon />;
  }
};

export const DesktopThemeSwitcher = forwardRef<HTMLDivElement, DesktopThemeSwitcherProps>(
  (
    {
      value: valueProp,
      defaultValue = 'system',
      onChange,
      variant = 'toggle',
      disabled = false,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const [selected, setSelected] = useControllableState<ThemeMode>({
      value: valueProp,
      defaultValue,
      onChange,
    });

    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [focusedIndex, setFocusedIndex] = useState(-1);

    // Close on outside click (dropdown variant)
    useEffect(() => {
      if (!isOpen || variant !== 'dropdown') return;
      const handleClick = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
          setFocusedIndex(-1);
        }
      };
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }, [isOpen, variant]);

    const handleToggleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        const currentIndex = THEME_OPTIONS.findIndex((o) => o.mode === selected);
        let nextIndex = currentIndex;

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          nextIndex = (currentIndex + 1) % THEME_OPTIONS.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          nextIndex = (currentIndex - 1 + THEME_OPTIONS.length) % THEME_OPTIONS.length;
        }

        if (nextIndex !== currentIndex) {
          setSelected(THEME_OPTIONS[nextIndex].mode);
        }
      },
      [selected, setSelected],
    );

    const handleSelect = useCallback(
      (mode: ThemeMode) => {
        setSelected(mode);
        setIsOpen(false);
        setFocusedIndex(-1);
      },
      [setSelected],
    );

    const handleTriggerKeyDown = useCallback(
      (e: KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
          setFocusedIndex(-1);
        } else if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsOpen(true);
          setFocusedIndex(0);
        }
      },
      [],
    );

    const handleOptionKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>, index: number) => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const next = (index + 1) % THEME_OPTIONS.length;
          setFocusedIndex(next);
          const options = containerRef.current?.querySelectorAll('[role="option"]');
          (options?.[next] as HTMLElement)?.focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prev = (index - 1 + THEME_OPTIONS.length) % THEME_OPTIONS.length;
          setFocusedIndex(prev);
          const options = containerRef.current?.querySelectorAll('[role="option"]');
          (options?.[prev] as HTMLElement)?.focus();
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSelect(THEME_OPTIONS[index].mode);
        } else if (e.key === 'Escape') {
          setIsOpen(false);
          setFocusedIndex(-1);
        }
      },
      [handleSelect],
    );

    const currentLabel = THEME_OPTIONS.find((o) => o.mode === selected)?.label ?? 'System';

    // Toggle variant
    if (variant === 'toggle') {
      return (
        <div
          ref={ref}
          className={cn(styles.root, styles.toggleRoot, disabled ? styles.disabled : '', className)}
          role="radiogroup"
          aria-label="Theme mode"
          tabIndex={disabled ? -1 : 0}
          onKeyDown={disabled ? undefined : handleToggleKeyDown}
          {...rest}
        >
          {THEME_OPTIONS.map((option) => {
            const isActive = option.mode === selected;
            return (
              <button
                key={option.mode}
                type="button"
                role="radio"
                aria-checked={isActive}
                aria-label={option.label}
                className={cn(styles.toggleOption, isActive ? styles.toggleActive : '')}
                onClick={() => {
                  if (!disabled) setSelected(option.mode);
                }}
                tabIndex={isActive ? 0 : -1}
                disabled={disabled}
              >
                <span className={styles.toggleIcon}>{option.icon}</span>
                <span className={styles.toggleLabel}>{option.label}</span>
              </button>
            );
          })}
        </div>
      );
    }

    // Dropdown variant
    return (
      <div
        ref={(node) => {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={cn(styles.root, styles.dropdownRoot, disabled ? styles.disabled : '', className)}
        {...rest}
      >
        <button
          type="button"
          className={cn(styles.trigger, isOpen ? styles.open : '')}
          onClick={() => {
            if (!disabled) setIsOpen((prev) => !prev);
          }}
          onKeyDown={handleTriggerKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label={`Theme: ${currentLabel}`}
          disabled={disabled}
        >
          <span className={styles.triggerIcon}>{getIconForMode(selected)}</span>
          <span className={styles.triggerLabel}>{currentLabel}</span>
          <span className={cn(styles.chevron, isOpen ? styles.chevronOpen : '')}>
            <ChevronIcon />
          </span>
        </button>

        {isOpen && (
          <div className={styles.dropdown} role="listbox" aria-label="Select theme">
            {THEME_OPTIONS.map((option, index) => {
              const isActive = option.mode === selected;
              return (
                <div
                  key={option.mode}
                  role="option"
                  aria-selected={isActive}
                  tabIndex={0}
                  className={cn(styles.option, isActive ? styles.optionActive : '', focusedIndex === index ? styles.optionFocused : '')}
                  onClick={() => handleSelect(option.mode)}
                  onKeyDown={(e) => handleOptionKeyDown(e, index)}
                >
                  <span className={styles.optionIcon}>{option.icon}</span>
                  <span className={styles.optionLabel}>{option.label}</span>
                  {isActive && (
                    <span className={styles.checkmark}>
                      <CheckIcon />
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  },
);

DesktopThemeSwitcher.displayName = 'DesktopThemeSwitcher';
