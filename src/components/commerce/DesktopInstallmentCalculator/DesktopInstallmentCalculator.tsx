'use client';
import { cn } from '../../../utils/cn';
import { formatNumber } from '../../../utils/formatPrice';
import { forwardRef, useState, useCallback, type ReactNode } from 'react';
import styles from './DesktopInstallmentCalculator.module.scss';

export interface DesktopInstallmentOption {
  /** Number of months */
  months: number;
  /** Interest rate (0 for 0%) */
  rate: number;
  /** Minimum monthly payment override */
  minPayment?: number;
}

export interface DesktopInstallmentCalculatorLabels {
  title?: string;
  zeroBadge?: string;
  monthsAriaLabel?: string;
  monthSuffix?: string;
  monthlyPayment?: string;
  totalAmount?: string;
  markup?: string;
  acceptedPayments?: string;
  currencySuffix?: string;
}

export interface DesktopInstallmentCalculatorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Product price */
  price: number;
  /** Available installment plans */
  options: DesktopInstallmentOption[];
  /** Initially selected months */
  defaultMonths?: number;
  /** Callback when plan is selected */
  onChange?: (option: DesktopInstallmentOption) => void;
  /** All UI string overrides for i18n */
  labels?: DesktopInstallmentCalculatorLabels;
  /** Custom payment logos. Replaces default bank logos when provided. */
  paymentLogos?: ReactNode;
}

// ─── Default Labels ──────────────────────────────────────────────────────────

const DEFAULTS: Required<DesktopInstallmentCalculatorLabels> = {
  title: 'Installment plan',
  zeroBadge: '0% markup',
  monthsAriaLabel: 'Payment term',
  monthSuffix: 'mo',
  monthlyPayment: 'Monthly payment',
  totalAmount: 'Total amount',
  markup: 'Markup',
  acceptedPayments: 'Accepted:',
  currencySuffix: '',
};

function l(labels: DesktopInstallmentCalculatorLabels | undefined, key: keyof typeof DEFAULTS): string {
  return labels?.[key] ?? DEFAULTS[key];
}

// ─── Default Bank Logos ──────────────────────────────────────────────────────

const DefaultPaymentLogos = () => (
  <>
    <span className={styles.bankLogo} style={{ background: '#003DA5', color: '#fff' }}>UzCard</span>
    <span className={styles.bankLogo} style={{ background: '#00A651', color: '#fff' }}>Humo</span>
    <span className={styles.bankLogo} style={{ background: '#1A1F71', color: '#fff' }}>Visa</span>
  </>
);

function DesktopInstallmentCalculatorInner(
  {
    price,
    options,
    defaultMonths,
    onChange,
    labels,
    paymentLogos,
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

  const currSuffix = l(labels, 'currencySuffix');
  const formatValue = (v: number) => {
    const num = formatNumber(Math.round(v));
    return currSuffix ? `${num} ${currSuffix}` : num;
  };

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
        handleSelect(options[Math.min(index + 1, options.length - 1)]);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        handleSelect(options[Math.max(index - 1, 0)]);
      }
    },
    [options, handleSelect],
  );

  return (
    <div ref={ref} className={cn(styles.root, className)} {...rest}>
      <div className={styles.header}>
        <span className={styles.title}>{l(labels, 'title')}</span>
        {isZeroPercent && (
          <span className={styles.zeroBadge}>{l(labels, 'zeroBadge')}</span>
        )}
      </div>

      <div className={styles.monthSelector} role="listbox" aria-label={l(labels, 'monthsAriaLabel')}>
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
              {option.months} {l(labels, 'monthSuffix')}
            </button>
          );
        })}
      </div>

      <div className={styles.paymentInfo}>
        <div className={styles.paymentRow}>
          <span className={styles.paymentLabel}>{l(labels, 'monthlyPayment')}</span>
          <span className={styles.paymentValue}>{formatValue(monthlyPayment)}</span>
        </div>
        <div className={styles.paymentRow}>
          <span className={styles.paymentLabel}>{l(labels, 'totalAmount')}</span>
          <span className={styles.paymentTotal}>{formatValue(totalPayment)}</span>
        </div>
        {!isZeroPercent && currentOption && (
          <div className={styles.paymentRow}>
            <span className={styles.paymentLabel}>{l(labels, 'markup')}</span>
            <span className={styles.paymentExtra}>{currentOption.rate}%</span>
          </div>
        )}
      </div>

      <div className={styles.banks}>
        <span className={styles.banksLabel}>{l(labels, 'acceptedPayments')}</span>
        <div className={styles.bankLogos}>
          {paymentLogos ?? <DefaultPaymentLogos />}
        </div>
      </div>
    </div>
  );
}

export const DesktopInstallmentCalculator = forwardRef(DesktopInstallmentCalculatorInner);
DesktopInstallmentCalculator.displayName = 'DesktopInstallmentCalculator';
