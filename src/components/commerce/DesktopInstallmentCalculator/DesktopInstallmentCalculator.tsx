'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, useState, useCallback } from 'react';
import styles from './DesktopInstallmentCalculator.module.scss';

export interface DesktopInstallmentOption {
  /** Number of months */
  months: number;
  /** Interest rate (0 for 0%) */
  rate: number;
  /** Minimum monthly payment override */
  minPayment?: number;
}

export interface DesktopInstallmentCalculatorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Product price in UZS */
  price: number;
  /** Available installment plans */
  options: DesktopInstallmentOption[];
  /** Initially selected months */
  defaultMonths?: number;
  /** Callback when plan is selected */
  onChange?: (option: DesktopInstallmentOption) => void;
}

function formatPrice(value: number): string {
  return Math.round(value).toLocaleString('ru-RU').replace(/,/g, ' ');
}

// ─── Bank Logo Placeholders ──────────────────────────────────────────────────

const UzCardLogo = () => (
  <span className={styles.bankLogo} style={{ background: '#003DA5', color: '#fff' }}>UzCard</span>
);

const HumoLogo = () => (
  <span className={styles.bankLogo} style={{ background: '#00A651', color: '#fff' }}>Humo</span>
);

const VisaLogo = () => (
  <span className={styles.bankLogo} style={{ background: '#1A1F71', color: '#fff' }}>Visa</span>
);

function DesktopInstallmentCalculatorInner(
  {
    price,
    options,
    defaultMonths,
    onChange,
    className,
    ...rest
  }: DesktopInstallmentCalculatorProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const initial = defaultMonths ?? options[0]?.months ?? 3;
  const [selectedMonths, setSelectedMonths] = useState(initial);

  const currentOption = options.find((o) => o.months === selectedMonths) ?? options[0];
  const monthlyPayment = currentOption
    ? currentOption.minPayment ?? (price * (1 + currentOption.rate / 100)) / currentOption.months
    : 0;
  const totalPayment = currentOption
    ? currentOption.minPayment
      ? currentOption.minPayment * currentOption.months
      : price * (1 + currentOption.rate / 100)
    : 0;
  const isZeroPercent = currentOption?.rate === 0;

  const handleSelect = useCallback(
    (option: DesktopInstallmentOption) => {
      setSelectedMonths(option.months);
      onChange?.(option);
    },
    [onChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const next = Math.min(index + 1, options.length - 1);
        handleSelect(options[next]);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = Math.max(index - 1, 0);
        handleSelect(options[prev]);
      }
    },
    [options, handleSelect],
  );

  return (
    <div ref={ref} className={cn(styles.root, className)} {...rest}>
      <div className={styles.header}>
        <span className={styles.title}>Muddatli to'lov</span>
        {isZeroPercent && (
          <span className={styles.zeroBadge}>0% ustama</span>
        )}
      </div>

      {/* Month selector */}
      <div className={styles.monthSelector} role="listbox" aria-label="To'lov muddati">
        {options.map((option, i) => {
          const isSelected = option.months === selectedMonths;
          const selectedIndex = options.findIndex((o) => o.months === selectedMonths);
          return (
            <button
              key={option.months}
              type="button"
              className={cn(styles.monthBtn, isSelected ? styles.monthBtnActive : '')}
              onClick={() => handleSelect(option)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              role="option"
              aria-selected={isSelected}
              tabIndex={i === (selectedIndex >= 0 ? selectedIndex : 0) ? 0 : -1}
            >
              {option.months} oy
            </button>
          );
        })}
      </div>

      {/* Payment info */}
      <div className={styles.paymentInfo}>
        <div className={styles.paymentRow}>
          <span className={styles.paymentLabel}>Oylik to'lov</span>
          <span className={styles.paymentValue}>{formatPrice(monthlyPayment)} so'm</span>
        </div>
        <div className={styles.paymentRow}>
          <span className={styles.paymentLabel}>Umumiy summa</span>
          <span className={styles.paymentTotal}>{formatPrice(totalPayment)} so'm</span>
        </div>
        {!isZeroPercent && currentOption && (
          <div className={styles.paymentRow}>
            <span className={styles.paymentLabel}>Ustama</span>
            <span className={styles.paymentExtra}>{currentOption.rate}%</span>
          </div>
        )}
      </div>

      {/* Bank logos */}
      <div className={styles.banks}>
        <span className={styles.banksLabel}>Qabul qilinadi:</span>
        <div className={styles.bankLogos}>
          <UzCardLogo />
          <HumoLogo />
          <VisaLogo />
        </div>
      </div>
    </div>
  );
}

export const DesktopInstallmentCalculator = forwardRef(DesktopInstallmentCalculatorInner);
DesktopInstallmentCalculator.displayName = 'DesktopInstallmentCalculator';
