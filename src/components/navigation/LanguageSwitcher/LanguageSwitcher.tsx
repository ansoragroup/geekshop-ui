import { cn } from '../../../utils/cn';
'use client';
import { forwardRef, useState, useCallback, useEffect, useRef, type HTMLAttributes, type KeyboardEvent } from 'react';
import { useControllableState } from '../../../hooks/useControllableState';
import type { Locale } from '../../../i18n/types';
import styles from './LanguageSwitcher.module.scss';

const LOCALES: Locale[] = ['uz', 'ru', 'en'];

const LOCALE_LABELS: Record<Locale, string> = {
  uz: "O'zbek",
  ru: 'Русский',
  en: 'English',
};

const LOCALE_SHORT: Record<Locale, string> = {
  uz: 'UZ',
  ru: 'RU',
  en: 'EN',
};

export interface LanguageSwitcherProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Currently selected locale (controlled) */
  value?: Locale;
  /** Default locale (uncontrolled) */
  defaultValue?: Locale;
  /** Callback when locale changes */
  onChange?: (locale: Locale) => void;
  /** Display variant */
  variant?: 'inline' | 'dropdown';
  /** Size */
  size?: 'sm' | 'md';
}

export const LanguageSwitcher = forwardRef<HTMLDivElement, LanguageSwitcherProps>(
  ({ value: valueProp, defaultValue = 'uz', onChange, variant = 'inline', size = 'md', className, ...rest }, ref) => {
    const [selected, setSelected] = useControllableState<Locale>({
      value: valueProp,
      defaultValue,
      onChange,
    });

    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
      if (!isOpen) return;
      const handleClick = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }, [isOpen]);

    // Close dropdown on Escape
    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        if (variant === 'dropdown' && e.key === 'Escape') {
          setIsOpen(false);
        }
      },
      [variant],
    );

    const handleInlineKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        const currentIndex = LOCALES.indexOf(selected);
        let nextIndex = currentIndex;

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          nextIndex = (currentIndex + 1) % LOCALES.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          nextIndex = (currentIndex - 1 + LOCALES.length) % LOCALES.length;
        }

        if (nextIndex !== currentIndex) {
          setSelected(LOCALES[nextIndex]);
        }
      },
      [selected, setSelected],
    );

    const handleDropdownOptionKeyDown = useCallback(
      (locale: Locale, e: KeyboardEvent<HTMLDivElement>) => {
        const currentIndex = LOCALES.indexOf(locale);

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const nextIndex = (currentIndex + 1) % LOCALES.length;
          const options = containerRef.current?.querySelectorAll('[role="radio"]');
          (options?.[nextIndex] as HTMLElement)?.focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prevIndex = (currentIndex - 1 + LOCALES.length) % LOCALES.length;
          const options = containerRef.current?.querySelectorAll('[role="radio"]');
          (options?.[prevIndex] as HTMLElement)?.focus();
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setSelected(locale);
          setIsOpen(false);
        }
      },
      [setSelected],
    );

    const sizeClass = size === 'sm' ? styles.sm : styles.md;

    if (variant === 'inline') {
      return (
        <div
          ref={ref}
          className={cn(styles.root, styles.inline, sizeClass, className ?? '')}
          role="radiogroup"
          aria-label="Language"
          tabIndex={0}
          onKeyDown={handleInlineKeyDown}
          {...rest}
        >
          {LOCALES.map((locale) => {
            const isActive = locale === selected;
            return (
              <button
                key={locale}
                role="radio"
                aria-checked={isActive}
                aria-label={LOCALE_LABELS[locale]}
                className={cn(styles.option, isActive ? styles.active : '')}
                onClick={() => setSelected(locale)}
                tabIndex={isActive ? 0 : -1}
              >
                {LOCALE_SHORT[locale]}
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
        className={cn(styles.root, styles.dropdown, sizeClass, className ?? '')}
        role="toolbar"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        <button
          className={styles.trigger}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label={`Language: ${LOCALE_LABELS[selected]}`}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className={styles.triggerIcon}>🌐</span>
          <span className={styles.triggerLabel}>{LOCALE_LABELS[selected]}</span>
          <span className={cn(styles.triggerArrow, isOpen ? styles.open : '')}>▾</span>
        </button>
        {isOpen && (
          <div className={styles.dropdownList} role="radiogroup" aria-label="Language">
            {LOCALES.map((locale) => {
              const isActive = locale === selected;
              return (
                <div
                  key={locale}
                  role="radio"
                  aria-checked={isActive}
                  tabIndex={0}
                  className={cn(styles.dropdownOption, isActive ? styles.active : '')}
                  onClick={() => {
                    setSelected(locale);
                    setIsOpen(false);
                  }}
                  onKeyDown={(e) => handleDropdownOptionKeyDown(locale, e)}
                >
                  <span className={styles.dropdownLabel}>{LOCALE_LABELS[locale]}</span>
                  <span className={styles.dropdownCode}>{LOCALE_SHORT[locale]}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  },
);

LanguageSwitcher.displayName = 'LanguageSwitcher';
