import { cn } from '../../../utils/cn';
'use client';
import { forwardRef, useState, useCallback, useEffect, useRef, type HTMLAttributes, type KeyboardEvent } from 'react';
import { useControllableState } from '../../../hooks/useControllableState';
import type { CurrencyCode } from '../../../i18n/types';
import styles from './CurrencySwitcher.module.scss';

const CURRENCIES: CurrencyCode[] = ['UZS', 'USD', 'RUB', 'EUR'];

const CURRENCY_LABELS: Record<CurrencyCode, string> = {
  UZS: "UZS (so'm)",
  USD: 'USD ($)',
  RUB: 'RUB (₽)',
  EUR: 'EUR (€)',
};

export interface CurrencySwitcherProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Currently selected currency (controlled) */
  value?: CurrencyCode;
  /** Default currency (uncontrolled) */
  defaultValue?: CurrencyCode;
  /** Callback when currency changes */
  onChange?: (currency: CurrencyCode) => void;
  /** Display variant */
  variant?: 'inline' | 'dropdown';
  /** Size */
  size?: 'sm' | 'md';
}

export const CurrencySwitcher = forwardRef<HTMLDivElement, CurrencySwitcherProps>(
  ({ value: valueProp, defaultValue = 'UZS', onChange, variant = 'inline', size = 'md', className, ...rest }, ref) => {
    const [selected, setSelected] = useControllableState<CurrencyCode>({
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
        const currentIndex = CURRENCIES.indexOf(selected);
        let nextIndex = currentIndex;

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          nextIndex = (currentIndex + 1) % CURRENCIES.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          nextIndex = (currentIndex - 1 + CURRENCIES.length) % CURRENCIES.length;
        }

        if (nextIndex !== currentIndex) {
          setSelected(CURRENCIES[nextIndex]);
        }
      },
      [selected, setSelected],
    );

    const handleDropdownOptionKeyDown = useCallback(
      (currency: CurrencyCode, e: KeyboardEvent<HTMLDivElement>) => {
        const currentIndex = CURRENCIES.indexOf(currency);

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const nextIndex = (currentIndex + 1) % CURRENCIES.length;
          const options = containerRef.current?.querySelectorAll('[role="radio"]');
          (options?.[nextIndex] as HTMLElement)?.focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prevIndex = (currentIndex - 1 + CURRENCIES.length) % CURRENCIES.length;
          const options = containerRef.current?.querySelectorAll('[role="radio"]');
          (options?.[prevIndex] as HTMLElement)?.focus();
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setSelected(currency);
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
          aria-label="Currency"
          tabIndex={0}
          onKeyDown={handleInlineKeyDown}
          {...rest}
        >
          {CURRENCIES.map((currency) => {
            const isActive = currency === selected;
            return (
              <button
                key={currency}
                role="radio"
                aria-checked={isActive}
                aria-label={CURRENCY_LABELS[currency]}
                className={cn(styles.option, isActive ? styles.active : '')}
                onClick={() => setSelected(currency)}
                tabIndex={isActive ? 0 : -1}
              >
                {currency}
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
          aria-label={`Currency: ${CURRENCY_LABELS[selected]}`}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className={styles.triggerIcon}>💰</span>
          <span className={styles.triggerLabel}>{CURRENCY_LABELS[selected]}</span>
          <span className={cn(styles.triggerArrow, isOpen ? styles.open : '')}>▾</span>
        </button>
        {isOpen && (
          <div className={styles.dropdownList} role="radiogroup" aria-label="Currency">
            {CURRENCIES.map((currency) => {
              const isActive = currency === selected;
              return (
                <div
                  key={currency}
                  role="radio"
                  aria-checked={isActive}
                  tabIndex={0}
                  className={cn(styles.dropdownOption, isActive ? styles.active : '')}
                  onClick={() => {
                    setSelected(currency);
                    setIsOpen(false);
                  }}
                  onKeyDown={(e) => handleDropdownOptionKeyDown(currency, e)}
                >
                  <span className={styles.dropdownLabel}>{CURRENCY_LABELS[currency]}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  },
);

CurrencySwitcher.displayName = 'CurrencySwitcher';
