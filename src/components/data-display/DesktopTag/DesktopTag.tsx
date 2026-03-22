'use client';
import { useGeekShop } from '../../../i18n';
import { cn } from '../../../utils/cn';
import { forwardRef, useCallback, type HTMLAttributes, type ReactNode } from 'react';
import styles from './DesktopTag.module.scss';

export type DesktopTagColor = 'primary' | 'success' | 'warning' | 'error' | 'default';
export type DesktopTagVariant = 'solid' | 'outline';
export type DesktopTagSize = 'sm' | 'md' | 'lg';

export interface DesktopTagProps extends HTMLAttributes<HTMLSpanElement> {
  /** Tag content */
  children: ReactNode;
  /** Color theme */
  color?: DesktopTagColor;
  /** Visual variant */
  variant?: DesktopTagVariant;
  /** Whether the close button is shown (visible on hover) */
  closable?: boolean;
  /** Callback when close button is clicked */
  onClose?: () => void;
  /** Size */
  size?: DesktopTagSize;
}

const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M3 3l6 6M9 3l-6 6" />
  </svg>
);

export const DesktopTag = forwardRef<HTMLSpanElement, DesktopTagProps>(
  (
    {
      children,
      color = 'default',
      variant = 'solid',
      closable = false,
      onClose,
      onClick,
      size = 'md',
      className = '',
      ...rest
    },
    ref,
  ) => {
  const { t } = useGeekShop();
    const handleClose = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onClose?.();
      },
      [onClose],
    );

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLSpanElement>) => {
        onClick?.(e);
      },
      [onClick],
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLSpanElement>) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick(e as unknown as React.MouseEvent<HTMLSpanElement>);
        }
      },
      [onClick],
    );

    const isClickable = !!onClick;

    return (
      <span
        ref={ref}
        className={cn(styles.tag, styles[`color_${color}`], styles[`variant_${variant}`], styles[`size_${size}`], isClickable ? styles.clickable : '', closable ? styles.closableTag : '', className)}
        onClick={handleClick}
        onKeyDown={isClickable ? handleKeyDown : undefined}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        {...rest}
      >
        <span className={styles.text}>{children}</span>
        {closable && (
          <button
            type="button"
            className={styles.closeBtn}
            onClick={handleClose}
            aria-label={t('aria.removeTag')}
            tabIndex={-1}
          >
            <CloseIcon />
          </button>
        )}
      </span>
    );
  },
);

DesktopTag.displayName = 'DesktopTag';
