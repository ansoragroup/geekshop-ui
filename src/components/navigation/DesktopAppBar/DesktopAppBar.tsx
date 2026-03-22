'use client';
import { useGeekShop } from '../../../i18n';
import { cn } from '../../../utils/cn';
import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';
import styles from './DesktopAppBar.module.scss';

export interface DesktopAppBarAction {
  /** Icon element */
  icon: ReactNode;
  /** Click handler */
  onClick: () => void;
  /** Accessible label */
  label: string;
}

export interface DesktopAppBarProps extends HTMLAttributes<HTMLElement> {
  /** Page title */
  title?: string;
  /** Back button handler — if provided, shows back arrow */
  onBack?: () => void;
  /** Action buttons on the right side */
  actions?: DesktopAppBarAction[];
  /** Transparent background (no shadow, no bg) */
  transparent?: boolean;
}

const BackArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5" />
    <path d="M12 19l-7-7 7-7" />
  </svg>
);

export const DesktopAppBar = forwardRef<HTMLElement, DesktopAppBarProps>(
  (
    {
      title,
      onBack,
      actions = [],
      transparent = false,
      className = '',
      ...rest
    },
    ref,
  ) => {
  const { t } = useGeekShop();
    const rootClass = cn(
      styles.appBar,
      transparent ? styles.transparent : styles.solid,
      className);

    return (
      <header ref={ref} className={rootClass} {...rest}>
        <div className={styles.left}>
          {onBack && (
            <button
              className={styles.backBtn}
              onClick={onBack}
              aria-label={t('aria.goBack')}
              type="button"
            >
              <BackArrowIcon />
            </button>
          )}
          {title && <h1 className={styles.title}>{title}</h1>}
        </div>

        {actions.length > 0 && (
          <div className={styles.actions}>
            {actions.map((action, index) => (
              <button
                key={index}
                className={styles.actionBtn}
                onClick={action.onClick}
                aria-label={action.label}
                type="button"
              >
                {action.icon}
              </button>
            ))}
          </div>
        )}
      </header>
    );
  },
);

DesktopAppBar.displayName = 'DesktopAppBar';
