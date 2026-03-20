import { cn } from '../../../utils/cn';
'use client';
import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import styles from './DesktopChip.module.scss';

export type DesktopChipColor = 'default' | 'primary' | 'success' | 'warning' | 'error';

export interface DesktopChipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect' | 'color'> {
  /** Whether the chip is selected */
  selected?: boolean;
  /** Selection callback */
  onSelect?: () => void;
  /** Chip content/label */
  children: ReactNode;
  /** Whether the chip can be closed */
  closable?: boolean;
  /** Close callback */
  onClose?: () => void;
  /** Color variant */
  color?: DesktopChipColor;
  /** Whether the chip is disabled */
  disabled?: boolean;
  /** Optional leading icon */
  icon?: ReactNode;
}

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M4 4l6 6M10 4l-6 6" />
  </svg>
);

export const DesktopChip = forwardRef<HTMLDivElement, DesktopChipProps>(
  (
    {
      selected = false,
      onSelect,
      children,
      closable = false,
      onClose,
      color = 'default',
      disabled = false,
      icon,
      className = '',
      ...rest
    },
    ref,
  ) => {
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

    const handleClose = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (disabled) return;
      onClose?.();
    };

    const handleCloseKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        onClose?.();
      }
    };

    const rootClass = cn(styles.root,
      styles[`color-${color}`],
      selected && styles.selected,
      disabled && styles.disabled,
      closable && styles.closable,
      className,);

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
        <span className={styles.label}>{children}</span>
        {closable && (
          <button
            type="button"
            className={styles.closeBtn}
            onClick={handleClose}
            onKeyDown={handleCloseKeyDown}
            aria-label="Remove"
            tabIndex={disabled ? -1 : 0}
            disabled={disabled}
          >
            <CloseIcon />
          </button>
        )}
      </div>
    );
  },
);

DesktopChip.displayName = 'DesktopChip';
