'use client';
import { useGeekShop } from '../../../i18n';
import { cn } from '../../../utils/cn';
import { forwardRef, useState, useCallback, useEffect, useRef, type HTMLAttributes, type KeyboardEvent } from 'react';
import { useControllableState } from '../../../hooks/useControllableState';
import type { CurrencyCode } from '../../../i18n/types';
import styles from './DesktopCurrencySwitcher.module.scss';

export interface CurrencyOption {
  code: CurrencyCode;
  symbol: string;
  name: string;
  flag?: string;
}

const DEFAULT_CURRENCIES: CurrencyOption[] = [
  { code: 'UZS', symbol: "so'm", name: "O'zbek so'mi", flag: '🇺🇿' },
  { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'RUB', symbol: '₽', name: 'Российский рубль', flag: '🇷🇺' },
  { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺' },
];

export interface DesktopCurrencySwitcherProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Currently selected currency code (controlled) */
  value?: CurrencyCode;
  /** Default currency code (uncontrolled) */
  defaultValue?: CurrencyCode;
  /** Callback when currency changes */
  onChange?: (code: CurrencyCode) => void;
  /** Currency options */
  currencies?: CurrencyOption[];
  /** Disabled state */
  disabled?: boolean;
}

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

const CurrencyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12h8M12 8v8" />
  </svg>
);

export const DesktopCurrencySwitcher = forwardRef<HTMLDivElement, DesktopCurrencySwitcherProps>(
  (
    {
      value: valueProp,
      defaultValue = 'UZS',
      onChange,
      currencies = DEFAULT_CURRENCIES,
      disabled = false,
      className = '',
      ...rest
    },
    ref,
  ) => {
  const { t } = useGeekShop();
    const [selected, setSelected] = useControllableState<CurrencyCode>({
      value: valueProp,
      defaultValue,
      onChange,
    });

    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [focusedIndex, setFocusedIndex] = useState(-1);

    const currentCurrency = currencies.find((c) => c.code === selected) ?? currencies[0];

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
      (code: CurrencyCode) => {
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
          const next = (index + 1) % currencies.length;
          setFocusedIndex(next);
          const options = containerRef.current?.querySelectorAll('[role="option"]');
          (options?.[next] as HTMLElement)?.focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prev = (index - 1 + currencies.length) % currencies.length;
          setFocusedIndex(prev);
          const options = containerRef.current?.querySelectorAll('[role="option"]');
          (options?.[prev] as HTMLElement)?.focus();
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSelect(currencies[index].code);
        } else if (e.key === 'Escape') {
          setIsOpen(false);
          setFocusedIndex(-1);
        }
      },
      [currencies, handleSelect],
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
          aria-label={`Currency: ${currentCurrency?.name ?? selected}`}
          disabled={disabled}
        >
          <span className={styles.triggerIcon}>
            {currentCurrency?.flag ?? <CurrencyIcon />}
          </span>
          <span className={styles.triggerLabel}>{selected}</span>
          <span className={styles.triggerSymbol}>({currentCurrency?.symbol})</span>
          <span className={cn(styles.chevron, isOpen ? styles.chevronOpen : '')}>
            <ChevronIcon />
          </span>
        </button>

        {isOpen && (
          <div className={styles.dropdown} role="listbox" aria-label={t('aria.selectCurrency')}>
            {currencies.map((currency, index) => {
              const isActive = currency.code === selected;
              return (
                <div
                  key={currency.code}
                  role="option"
                  aria-selected={isActive}
                  tabIndex={0}
                  className={cn(styles.option, isActive ? styles.optionActive : '', focusedIndex === index ? styles.optionFocused : '')}
                  onClick={() => handleSelect(currency.code)}
                  onKeyDown={(e) => handleOptionKeyDown(e, index)}
                >
                  {currency.flag && (
                    <span className={styles.optionFlag}>{currency.flag}</span>
                  )}
                  <span className={styles.optionInfo}>
                    <span className={styles.optionCode}>{currency.code}</span>
                    <span className={styles.optionName}>{currency.name}</span>
                  </span>
                  <span className={styles.optionSymbol}>{currency.symbol}</span>
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

DesktopCurrencySwitcher.displayName = 'DesktopCurrencySwitcher';
