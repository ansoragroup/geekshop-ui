import type { ReactNode } from 'react';
import styles from './Button.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'text';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'full';

export interface ButtonProps {
  /** Button variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Show loading spinner */
  loading?: boolean;
  /** Disable the button */
  disabled?: boolean;
  /** Full-width block button */
  block?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Button content */
  children?: ReactNode;
}

const LoadingSpinner = () => (
  <svg className={styles.spinner} width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" opacity="0.3" />
    <path d="M8 2a6 6 0 0 1 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  block = false,
  onClick,
  children,
}: ButtonProps) {
  const classNames = [
    styles.button,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    block && styles.block,
    loading && styles.loading,
    disabled && styles.disabled,
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classNames}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && <LoadingSpinner />}
      <span className={loading ? styles.contentHidden : styles.content}>
        {children}
      </span>
    </button>
  );
}

export default Button;
