'use client';
import { useGeekShop } from '../../../i18n';
import { cn } from '../../../utils/cn';
import { forwardRef, useState, useCallback, useEffect, useRef, type HTMLAttributes, type KeyboardEvent } from 'react';
import { useControllableState } from '../../../hooks/useControllableState';
import type { Locale } from '../../../i18n/types';
import styles from './DesktopLanguageSwitcher.module.scss';

export interface LanguageOption {
  code: Locale;
  name: string;
  flag?: string;
}

const DEFAULT_LANGUAGES: LanguageOption[] = [
  { code: 'uz', name: "O'zbekcha", flag: '🇺🇿' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
];

export interface DesktopLanguageSwitcherProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Currently selected language (controlled) */
  value?: Locale;
  /** Default language (uncontrolled) */
  defaultValue?: Locale;
  /** Callback when language changes */
  onChange?: (locale: Locale) => void;
  /** Language options */
  languages?: LanguageOption[];
  /** Disabled state */
  disabled?: boolean;
}

const GlobeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
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

export const DesktopLanguageSwitcher = forwardRef<HTMLDivElement, DesktopLanguageSwitcherProps>(
  (
    {
      value: valueProp,
      defaultValue = 'uz',
      onChange,
      languages = DEFAULT_LANGUAGES,
      disabled = false,
      className = '',
      ...rest
    },
    ref,
  ) => {
  const { t } = useGeekShop();
    const [selected, setSelected] = useControllableState<Locale>({
      value: valueProp,
      defaultValue,
      onChange,
    });

    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [focusedIndex, setFocusedIndex] = useState(-1);

    const currentLang = languages.find((l) => l.code === selected) ?? languages[0];

    // Close on outside click
    useEffect(() => {
      if (!isOpen) return;
      const handleClick = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
          setFocusedIndex(-1);
        }
      };
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }, [isOpen]);

    const handleSelect = useCallback(
      (code: Locale) => {
        setSelected(code);
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
          const next = (index + 1) % languages.length;
          setFocusedIndex(next);
          const options = containerRef.current?.querySelectorAll('[role="option"]');
          (options?.[next] as HTMLElement)?.focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prev = (index - 1 + languages.length) % languages.length;
          setFocusedIndex(prev);
          const options = containerRef.current?.querySelectorAll('[role="option"]');
          (options?.[prev] as HTMLElement)?.focus();
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSelect(languages[index].code);
        } else if (e.key === 'Escape') {
          setIsOpen(false);
          setFocusedIndex(-1);
        }
      },
      [languages, handleSelect],
    );

    return (
      <div
        ref={(node) => {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={cn(styles.root, disabled ? styles.disabled : '', className)}
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
          aria-label={`Language: ${currentLang?.name ?? selected}`}
          disabled={disabled}
        >
          <span className={styles.triggerIcon}>
            {currentLang?.flag ?? <GlobeIcon />}
          </span>
          <span className={styles.triggerLabel}>{currentLang?.name}</span>
          <span className={styles.triggerCode}>{selected.toUpperCase()}</span>
          <span className={cn(styles.chevron, isOpen ? styles.chevronOpen : '')}>
            <ChevronIcon />
          </span>
        </button>

        {isOpen && (
          <div className={styles.dropdown} role="listbox" aria-label={t('aria.selectLanguage')}>
            {languages.map((lang, index) => {
              const isActive = lang.code === selected;
              return (
                <div
                  key={lang.code}
                  role="option"
                  aria-selected={isActive}
                  tabIndex={0}
                  className={cn(styles.option, isActive ? styles.optionActive : '', focusedIndex === index ? styles.optionFocused : '')}
                  onClick={() => handleSelect(lang.code)}
                  onKeyDown={(e) => handleOptionKeyDown(e, index)}
                >
                  {lang.flag && (
                    <span className={styles.optionFlag}>{lang.flag}</span>
                  )}
                  <span className={styles.optionName}>{lang.name}</span>
                  <span className={styles.optionCode}>{lang.code.toUpperCase()}</span>
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

DesktopLanguageSwitcher.displayName = 'DesktopLanguageSwitcher';
