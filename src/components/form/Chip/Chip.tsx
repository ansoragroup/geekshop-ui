import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { useGeekShop } from '../../../i18n';
import styles from './Chip.module.scss';

export interface ChipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Text label of the chip */
  label: string;
  /** Whether the chip is selected */
  selected?: boolean;
  /** Callback when the chip is selected/tapped */
  onSelect?: () => void;
  /** Callback when the delete button is clicked */
  onDelete?: () => void;
  /** Whether the chip shows a delete button */
  deletable?: boolean;
  /** Whether the chip is disabled */
  disabled?: boolean;
  /** Optional icon shown before the label */
  icon?: ReactNode;
  /** Visual variant */
  variant?: 'outlined' | 'filled';
  /** Size */
  size?: 'sm' | 'md';
}

const DeleteIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M4 4l6 6M10 4l-6 6" />
  </svg>
);

export const Chip = forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      label,
      selected = false,
      onSelect,
      onDelete,
      deletable = false,
      disabled = false,
      icon,
      variant = 'outlined',
      size = 'md',
      className,
      ...rest
    },
    ref,
  ) => {
    const { t } = useGeekShop();

    const handleClick = () => {
      if (disabled) return;
      onSelect?.();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect?.();
      }
    };

    const handleDelete = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (disabled) return;
      onDelete?.();
    };

    const handleDeleteKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        onDelete?.();
      }
    };

    const rootClass = [
      styles.chip,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      selected && styles.selected,
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={rootClass}
        role={onSelect ? 'option' : undefined}
        aria-selected={onSelect ? selected : undefined}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {icon && <span className={styles.icon}>{icon}</span>}
        <span className={styles.label}>{label}</span>
        {deletable && (
          <button
            type="button"
            className={styles.deleteBtn}
            onClick={handleDelete}
            onKeyDown={handleDeleteKeyDown}
            aria-label={t('chip.delete', { label })}
            tabIndex={disabled ? -1 : 0}
            disabled={disabled}
          >
            <DeleteIcon />
          </button>
        )}
      </div>
    );
  },
);

Chip.displayName = 'Chip';
