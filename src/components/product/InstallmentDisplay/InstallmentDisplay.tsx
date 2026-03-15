import { forwardRef, type HTMLAttributes } from 'react';
import { useGeekShop } from '../../../i18n';
import styles from './InstallmentDisplay.module.scss';

export interface InstallmentDisplayProps extends HTMLAttributes<HTMLDivElement> {
  /** Total product price */
  totalPrice: number;
  /** Number of installment months */
  months: number;
  /** Whether the installment is interest-free */
  interestFree?: boolean;
}

function CreditCardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1.5" y="3" width="13" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1.5 6.5h13" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4 9.5h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export const InstallmentDisplay = forwardRef<HTMLDivElement, InstallmentDisplayProps>(
  (
    {
      totalPrice,
      months,
      interestFree = false,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const { t, formatPrice } = useGeekShop();

    const monthlyPayment = Math.ceil(totalPrice / months);
    const formattedMonthly = formatPrice(monthlyPayment, { showCurrency: false });

    return (
      <div
        ref={ref}
        className={`${styles.root} ${className}`}
        {...rest}
      >
        <span className={styles.icon} aria-hidden="true">
          <CreditCardIcon />
        </span>
        <span className={styles.text}>
          <span className={styles.price}>
            {t('installment.perMonth', { price: formattedMonthly })}
          </span>
          <span className={styles.sep} aria-hidden="true">&times;</span>
          <span className={styles.months}>
            {t('installment.months', { count: months })}
          </span>
          {interestFree && (
            <>
              <span className={styles.sep} aria-hidden="true">&middot;</span>
              <span className={styles.interestFree}>
                {t('installment.interestFree')}
              </span>
            </>
          )}
        </span>
      </div>
    );
  },
);

InstallmentDisplay.displayName = 'InstallmentDisplay';
