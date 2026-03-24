'use client';
import { cn } from '../../../utils/cn';
import { formatNumber } from '../../../utils/formatPrice';
import { forwardRef, useCallback } from 'react';
import styles from './DesktopDeliverySelector.module.scss';

export interface DesktopDeliveryOption {
  id: string;
  title: string;
  /** Price in UZS, 0 for free */
  price: number;
  /** Estimated delivery days */
  estimatedDays: string;
  /** Optional icon type */
  icon?: 'standard' | 'express' | 'pickup';
}

export interface DesktopDeliverySelectorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Delivery options */
  options: DesktopDeliveryOption[];
  /** Currently selected option ID */
  selected?: string;
  /** Callback when selection changes */
  onChange?: (id: string) => void;
  /** Label text */
  label?: string;
}

// ─── Icons ───────────────────────────────────────────────────────────────────

const TruckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const ZapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const MapPinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ICONS: Record<string, React.FC> = {
  standard: TruckIcon,
  express: ZapIcon,
  pickup: MapPinIcon,
};

function DesktopDeliverySelectorInner(
  {
    options,
    selected,
    onChange,
    label = 'Yetkazib berish usuli',
    className,
    ...rest
  }: DesktopDeliverySelectorProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const handleSelect = useCallback(
    (id: string) => {
      onChange?.(id);
    },
    [onChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const next = Math.min(index + 1, options.length - 1);
        handleSelect(options[next].id);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = Math.max(index - 1, 0);
        handleSelect(options[prev].id);
      }
    },
    [options, handleSelect],
  );

  return (
    <div ref={ref} className={cn(styles.root, className)} {...rest}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.options} role="radiogroup" aria-label={label}>
        {options.map((option, i) => {
          const isSelected = option.id === selected;
          const Icon = ICONS[option.icon ?? 'standard'] ?? TruckIcon;
          const isFree = option.price === 0;
          const selectedIndex = options.findIndex((o) => o.id === selected);

          return (
            <button
              key={option.id}
              type="button"
              className={cn(styles.card, isSelected ? styles.cardSelected : '')}
              onClick={() => handleSelect(option.id)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              role="radio"
              aria-checked={isSelected}
              tabIndex={i === (selectedIndex >= 0 ? selectedIndex : 0) ? 0 : -1}
            >
              <div className={styles.cardIcon}>
                <Icon />
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardTitle}>{option.title}</span>
                <span className={styles.cardEstimate}>{option.estimatedDays}</span>
              </div>
              <span className={cn(styles.cardPrice, isFree ? styles.cardPriceFree : '')}>
                {isFree ? 'Bepul' : `${formatNumber(option.price)} so'm`}
              </span>
              <span className={cn(styles.radio, isSelected ? styles.radioChecked : '')} aria-hidden="true">
                {isSelected && <span className={styles.radioDot} />}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export const DesktopDeliverySelector = forwardRef(DesktopDeliverySelectorInner);
DesktopDeliverySelector.displayName = 'DesktopDeliverySelector';
