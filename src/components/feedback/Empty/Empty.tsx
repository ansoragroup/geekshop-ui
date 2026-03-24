'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';
import { useGeekShop } from '../../../i18n';
import styles from './Empty.module.scss';

export interface EmptyProps extends HTMLAttributes<HTMLDivElement> {
  /** Custom icon/illustration (renders inline SVG by default) */
  icon?: ReactNode;
  /** Empty state title */
  title?: string;
  /** Description text */
  description?: string;
  /** Action button text */
  actionText?: string;
  /** Callback when action button is clicked */
  onAction?: () => void;
}

const DefaultEmptyIcon = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true">
    <circle cx="60" cy="60" r="50" fill="var(--gs-color-bg-page, #F5F5F5)" />
    <rect x="35" y="40" width="50" height="40" rx="4" fill="var(--gs-color-border, #E8E8E8)" />
    <rect x="42" y="48" width="36" height="3" rx="1.5" fill="var(--gs-color-text-placeholder, #D4D4D4)" />
    <rect x="42" y="55" width="28" height="3" rx="1.5" fill="var(--gs-color-text-placeholder, #D4D4D4)" />
    <rect x="42" y="62" width="20" height="3" rx="1.5" fill="var(--gs-color-text-placeholder, #D4D4D4)" />
    <circle cx="60" cy="56" r="18" fill="none" stroke="var(--gs-color-text-placeholder, #CCCCCC)" strokeWidth="2" strokeDasharray="4 3" />
  </svg>
);

const CartEmptyIcon = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true">
    <circle cx="60" cy="60" r="50" fill="var(--gs-color-primary-bg, #FFF5F0)" />
    <path d="M35 40h8l4 4h26l-3 24H44l-5-24H35" stroke="var(--gs-color-primary, #FF5000)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="50" cy="76" r="3" fill="var(--gs-color-primary, #FF5000)" />
    <circle cx="68" cy="76" r="3" fill="var(--gs-color-primary, #FF5000)" />
    <path d="M52 56h16M60 48v16" stroke="var(--gs-color-primary, #FF5000)" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
  </svg>
);

const SearchEmptyIcon = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true">
    <circle cx="60" cy="60" r="50" fill="var(--gs-color-bg-page, #F5F5F5)" />
    <circle cx="54" cy="54" r="18" stroke="var(--gs-color-text-placeholder, #CCCCCC)" strokeWidth="3" fill="none" />
    <path d="M67 67l12 12" stroke="var(--gs-color-text-placeholder, #CCCCCC)" strokeWidth="3" strokeLinecap="round" />
    <path d="M48 50h12M48 58h8" stroke="var(--gs-color-text-placeholder, #D4D4D4)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/** Built-in icon presets for common empty states */
export const emptyIcons = {
  default: <DefaultEmptyIcon />,
  cart: <CartEmptyIcon />,
  search: <SearchEmptyIcon />,
} as const;

export const Empty = forwardRef<HTMLDivElement, EmptyProps>(
  ({ icon, title, description, actionText, onAction, className = '', ...rest }, ref) => {
    const { t } = useGeekShop();
    const resolvedTitle = title ?? t('empty.default');

    return (
      <div ref={ref} className={cn(styles.root, className)} {...rest}>
        <div className={styles.icon}>
          {icon ?? <DefaultEmptyIcon />}
        </div>

        <h3 className={styles.title}>{resolvedTitle}</h3>

        {description && (
          <p className={styles.description}>{description}</p>
        )}

        {actionText && onAction && (
          <button className={styles.action} onClick={onAction}>
            {actionText}
          </button>
        )}
      </div>
    );
  }
);

Empty.displayName = 'Empty';
