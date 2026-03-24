'use client';
import { cn } from '../../../utils/cn';
import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './DesktopButton.module.scss';

export type DesktopButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type DesktopButtonSize = 'sm' | 'md' | 'lg';

export interface DesktopButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button visual variant */
  variant?: DesktopButtonVariant;
  /** Button size */
  size?: DesktopButtonSize;
  /** Show loading spinner */
  loading?: boolean;
  /** Icon element */
  icon?: ReactNode;
  /** Icon position relative to text */
  iconPosition?: 'left' | 'right';
  /** Full-width button */
  fullWidth?: boolean;
  /** Button content */
  children?: ReactNode;
}

const LoadingSpinner = ({ size }: { size: number }) => (
  <svg
    className={styles.spinner}
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
  >
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" opacity="0.3" />
    <path
      d="M8 2a6 6 0 0 1 6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const DesktopButton = forwardRef<HTMLButtonElement, DesktopButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      children,
      className = '',
      type = 'button',
      ...rest
    },
    ref,
  ) => {
    const spinnerSize = size === 'sm' ? 14 : size === 'lg' ? 18 : 16;

    const classNames = cn(styles.root,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      fullWidth && styles.fullWidth,
      loading && styles.loading,
      disabled && styles.disabled,
      className);

    return (
      <button
        ref={ref}
        className={classNames}
        disabled={disabled || loading}
        type={type}
        {...rest}
      >
        {loading && <LoadingSpinner size={spinnerSize} />}
        <span className={loading ? styles.contentHidden : styles.content}>
          {icon && iconPosition === 'left' && (
            <span className={styles.icon}>{icon}</span>
          )}
          {children && <span>{children}</span>}
          {icon && iconPosition === 'right' && (
            <span className={styles.icon}>{icon}</span>
          )}
        </span>
      </button>
    );
  },
);

DesktopButton.displayName = 'DesktopButton';
