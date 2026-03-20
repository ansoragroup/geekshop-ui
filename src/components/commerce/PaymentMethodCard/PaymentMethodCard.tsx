import { cn } from '../../../utils/cn';
'use client';
import { forwardRef, useCallback } from 'react';
import { useGeekShop } from '../../../i18n';
import styles from './PaymentMethodCard.module.scss';

export type PaymentType = 'visa' | 'mastercard' | 'uzcard' | 'humo' | 'click' | 'payme' | 'cash';

export interface PaymentMethod {
  id: string;
  type: PaymentType;
  label: string;
  lastFour?: string;
  expiryDate?: string;
  isDefault?: boolean;
}

export interface PaymentMethodCardProps {
  method: PaymentMethod;
  /** Whether this card is currently selected */
  selected?: boolean;
  /** Show radio/checkmark for selection */
  selectable?: boolean;
  onSelect?: (method: PaymentMethod) => void;
  onDelete?: (method: PaymentMethod) => void;
  /** Additional CSS class */
  className?: string;
}

const PAYMENT_ICONS: Record<PaymentType, { bg: string; text: string; label: string }> = {
  visa: { bg: '#1A1F71', text: '#FFFFFF', label: 'VISA' },
  mastercard: { bg: '#EB001B', text: '#FFFFFF', label: 'MC' },
  uzcard: { bg: '#00A651', text: '#FFFFFF', label: 'UzCard' },
  humo: { bg: '#5B2D8E', text: '#FFFFFF', label: 'Humo' },
  click: { bg: '#00AEEF', text: '#FFFFFF', label: 'Click' },
  payme: { bg: '#33CCCC', text: '#FFFFFF', label: 'Payme' },
  cash: { bg: '#F5F5F5', text: '#1A1A1A', label: '' },
};

function PaymentIcon({ type, cashLabel }: { type: PaymentType; cashLabel?: string }) {
  const config = PAYMENT_ICONS[type];
  const displayLabel = type === 'cash' && cashLabel ? cashLabel : config.label;
  return (
    <svg
      className={styles.icon}
      width="40"
      height="28"
      viewBox="0 0 40 28"
      fill="none"
    >
      <rect width="40" height="28" rx="4" fill={config.bg} />
      <text
        x="20"
        y="16"
        textAnchor="middle"
        dominantBaseline="central"
        fill={config.text}
        fontSize={displayLabel.length > 4 ? '7' : '9'}
        fontWeight="700"
        fontFamily="sans-serif"
      >
        {displayLabel}
      </text>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M3 7L6 10L11 4"
        stroke="#FFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M4 5H12M6.5 5V3.5C6.5 3.22386 6.72386 3 7 3H9C9.27614 3 9.5 3.22386 9.5 3.5V5M5 5V12.5C5 13.0523 5.44772 13.5 6 13.5H10C10.5523 13.5 11 13.0523 11 12.5V5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function maskCard(lastFour?: string): string {
  if (!lastFour) return '';
  return `•••• ${lastFour}`;
}

export const PaymentMethodCard = forwardRef<HTMLDivElement, PaymentMethodCardProps>(
  function PaymentMethodCard(
    {
      method,
      selected = false,
      selectable = false,
      onSelect,
      onDelete,
      className = '',
    },
    ref,
  ) {
    const { t } = useGeekShop();

    const handleSelect = useCallback(() => {
      onSelect?.(method);
    }, [onSelect, method]);

    const handleDelete = useCallback(() => {
      onDelete?.(method);
    }, [onDelete, method]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (selectable && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleSelect();
        }
      },
      [selectable, handleSelect],
    );

    return (
      <div
        ref={ref}
        className={cn(styles.root, selected && styles.selected, styles[`type-${method.type}`] ?? '', className)}
        role={selectable ? 'option' : undefined}
        aria-selected={selectable ? selected : undefined}
        tabIndex={selectable ? 0 : undefined}
        onClick={selectable ? handleSelect : undefined}
        onKeyDown={selectable ? handleKeyDown : undefined}
      >
        <PaymentIcon type={method.type} cashLabel={t('commerce.cash')} />

        <div className={styles.details}>
          <span className={styles.label}>
            {method.label}
            {method.isDefault && (
              <span className={styles.defaultBadge}>{t('common.default')}</span>
            )}
          </span>
          <span className={styles.meta}>
            {method.lastFour && (
              <span className={styles.masked}>{maskCard(method.lastFour)}</span>
            )}
            {method.expiryDate && (
              <span className={styles.expiry}>{method.expiryDate}</span>
            )}
          </span>
        </div>

        <div className={styles.trailing}>
          {onDelete && (
            <button
              type="button"
              className={styles.deleteBtn}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              aria-label={t('common.delete')}
            >
              <DeleteIcon />
            </button>
          )}
          {selectable && (
            <span
              className={cn(styles.radio, selected ? styles.radioSelected : '')}
            >
              {selected && <CheckIcon />}
            </span>
          )}
        </div>
      </div>
    );
  },
);
