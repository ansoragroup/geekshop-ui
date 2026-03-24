'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, type HTMLAttributes } from 'react';
import styles from './DesktopLoading.module.scss';
import { useGeekShop } from '../../../i18n';

export type DesktopLoadingSize = 'sm' | 'md' | 'lg';

export interface DesktopLoadingProps extends HTMLAttributes<HTMLDivElement> {
  /** Spinner size */
  size?: DesktopLoadingSize;
  /** Optional text below the spinner */
  text?: string;
  /** Overlay mode: covers parent with semi-transparent backdrop */
  overlay?: boolean;
  /** Fullscreen overlay mode */
  fullscreen?: boolean;
}

const SPINNER_SIZES: Record<DesktopLoadingSize, number> = {
  sm: 24,
  md: 40,
  lg: 56,
};

export const DesktopLoading = forwardRef<HTMLDivElement, DesktopLoadingProps>(
  (
    {
      size = 'md',
      text,
      overlay = false,
      fullscreen = false,
      className = '',
      ...rest
    },
    ref,
  ) => {
  const { t } = useGeekShop();
    const spinnerSize = SPINNER_SIZES[size];
    const strokeWidth = size === 'sm' ? 2.5 : 3;

    const spinner = (
      <div className={styles.spinnerWrap}>
        <svg
          className={styles.spinner}
          width={spinnerSize}
          height={spinnerSize}
          viewBox="0 0 32 32"
          fill="none"
          role="img"
          aria-label={t('aria.loading')}
        >
          <circle cx="16" cy="16" r="13" stroke="var(--gs-color-border, #F0F0F0)" strokeWidth={strokeWidth} />
          <path
            d="M16 3a13 13 0 0 1 13 13"
            stroke="var(--gs-color-primary, #FF5000)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </svg>
        {text && <span className={cn(styles.text, styles[`text-${size}`])}>{text}</span>}
      </div>
    );

    if (fullscreen) {
      return (
        <div ref={ref} className={cn(styles.fullscreen, className)} {...rest}>
          {spinner}
        </div>
      );
    }

    if (overlay) {
      return (
        <div ref={ref} className={cn(styles.overlay, className)} {...rest}>
          {spinner}
        </div>
      );
    }

    return (
      <div ref={ref} className={cn(styles.inline, className)} {...rest}>
        {spinner}
      </div>
    );
  },
);

DesktopLoading.displayName = 'DesktopLoading';
