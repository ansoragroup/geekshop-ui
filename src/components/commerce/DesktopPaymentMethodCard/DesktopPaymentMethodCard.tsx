'use client';
import { cn } from '../../../utils/cn';
import { useCallback } from 'react';
import styles from './DesktopPaymentMethodCard.module.scss';

// ─── Types ───────────────────────────────────────────────────────────────────

export type DesktopPaymentType = 'visa' | 'mastercard' | 'uzcard' | 'humo' | 'payme' | 'cash';

export interface DesktopPaymentMethod {
  id: string;
  type: DesktopPaymentType;
  label: string;
  lastFour?: string;
  expiryDate?: string;
  isDefault?: boolean;
}

export interface DesktopPaymentMethodCardProps {
  /** Payment method data */
  method: DesktopPaymentMethod;
  /** Whether this method is selected */
  selected?: boolean;
  /** Whether the method can be selected */
  selectable?: boolean;
  /** Called when method is selected */
  onSelect?: () => void;
  /** Called when delete is clicked */
  onDelete?: () => void;
  /** Additional CSS class */
  className?: string;
}

// ─── Inline SVG Icons ────────────────────────────────────────────────────────

function VisaIcon() {
  return (
    <svg width="32" height="20" viewBox="0 0 32 20" aria-hidden="true">
      <rect width="32" height="20" rx="3" fill="#1A1F71" />
      <text x="16" y="13" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="Arial, sans-serif">VISA</text>
    </svg>
  );
}

function MastercardIcon() {
  return (
    <svg width="32" height="20" viewBox="0 0 32 20" aria-hidden="true">
      <rect width="32" height="20" rx="3" fill="#252525" />
      <circle cx="12" cy="10" r="6" fill="#EB001B" />
      <circle cx="20" cy="10" r="6" fill="#F79E1B" />
      <path d="M16 5.37a6 6 0 0 1 0 9.26 6 6 0 0 1 0-9.26z" fill="#FF5F00" />
    </svg>
  );
}

function UzcardIcon() {
  return (
    <svg width="32" height="20" viewBox="0 0 32 20" aria-hidden="true">
      <rect width="32" height="20" rx="3" fill="#00A651" />
      <text x="16" y="13" fill="#FFFFFF" fontSize="6" fontWeight="bold" textAnchor="middle" fontFamily="Arial, sans-serif">UZCARD</text>
    </svg>
  );
}

function HumoIcon() {
  return (
    <svg width="32" height="20" viewBox="0 0 32 20" aria-hidden="true">
      <rect width="32" height="20" rx="3" fill="#0071CE" />
      <text x="16" y="13" fill="#FFFFFF" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="Arial, sans-serif">HUMO</text>
    </svg>
  );
}

function PaymeIcon() {
  return (
    <svg width="32" height="20" viewBox="0 0 32 20" aria-hidden="true">
      <rect width="32" height="20" rx="3" fill="#2EBAC1" />
      <text x="16" y="13" fill="#FFFFFF" fontSize="6" fontWeight="bold" textAnchor="middle" fontFamily="Arial, sans-serif">PAYME</text>
    </svg>
  );
}

function CashIcon() {
  return (
    <svg width="32" height="20" viewBox="0 0 32 20" aria-hidden="true">
      <rect width="32" height="20" rx="3" fill="#4CAF50" />
      <text x="16" y="13" fill="#FFFFFF" fontSize="6" fontWeight="bold" textAnchor="middle" fontFamily="Arial, sans-serif">CASH</text>
    </svg>
  );
}

function DeleteSmallIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

const CARD_ICONS: Record<DesktopPaymentType, () => JSX.Element> = {
  visa: VisaIcon,
  mastercard: MastercardIcon,
  uzcard: UzcardIcon,
  humo: HumoIcon,
  payme: PaymeIcon,
  cash: CashIcon,
};

// ─── Component ───────────────────────────────────────────────────────────────

export const DesktopPaymentMethodCard = ({
  method,
  selected = false,
  selectable = true,
  onSelect,
  onDelete,
  className = '',
}: DesktopPaymentMethodCardProps) => {
  const handleSelect = useCallback(() => {
    if (selectable) {
      onSelect?.();
    }
  }, [selectable, onSelect]);

  const handleSelectKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && selectable) {
        e.preventDefault();
        onSelect?.();
      }
    },
    [selectable, onSelect],
  );

  const handleDeleteKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onDelete?.();
      }
    },
    [onDelete],
  );

  const IconComponent = CARD_ICONS[method.type] ?? CashIcon;

  const rootClass = cn(
    styles.root,
    selected && styles.selected,
    className);

  return (
    <div className={rootClass}>
      {/* Radio Button */}
      {selectable && (
        <div
          className={cn(styles.radio, selected ? styles.radioChecked : '')}
          role="radio"
          aria-checked={selected}
          aria-label={`Select payment: ${method.label}`}
          tabIndex={0}
          onClick={handleSelect}
          onKeyDown={handleSelectKeyDown}
        >
          {selected && <div className={styles.radioDot} />}
        </div>
      )}

      {/* Card Icon */}
      <div className={styles.cardIcon}>
        <IconComponent />
      </div>

      {/* Info */}
      <div className={styles.info}>
        <span className={styles.cardLabel}>{method.label}</span>
        {method.lastFour && (
          <>
            <span className={styles.separator} aria-hidden="true">&bull;</span>
            <span className={styles.lastFour} aria-label={`ending in ${method.lastFour}`}>
              &bull;&bull;&bull;&bull; {method.lastFour}
            </span>
          </>
        )}
        {method.expiryDate && (
          <>
            <span className={styles.separator} aria-hidden="true">&bull;</span>
            <span className={styles.expiry}>Expires {method.expiryDate}</span>
          </>
        )}
      </div>

      {/* Default Badge */}
      {method.isDefault && (
        <span className={styles.defaultBadge}>Default</span>
      )}

      {/* Delete */}
      {onDelete && (
        <button
          type="button"
          className={styles.deleteBtn}
          onClick={onDelete}
          onKeyDown={handleDeleteKeyDown}
          aria-label={`Delete payment method: ${method.label}`}
        >
          <DeleteSmallIcon />
        </button>
      )}
    </div>
  );
};

DesktopPaymentMethodCard.displayName = 'DesktopPaymentMethodCard';
