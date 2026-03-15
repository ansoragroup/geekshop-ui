import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { useGeekShop } from '../../../i18n';
import styles from './NavBar.module.scss';

export interface NavBarAction {
  key: string;
  icon: ReactNode;
  onClick: () => void;
  ariaLabel?: string;
}

export interface NavBarProps extends HTMLAttributes<HTMLElement> {
  /** Title text (ignored if children is provided) */
  title?: string;
  /** Visual variant */
  variant?: 'default' | 'gradient';
  /** Show back arrow button */
  showBack?: boolean;
  /** Back button handler */
  onBack?: () => void;
  /** Right-side action buttons */
  rightActions?: NavBarAction[];
  /** Custom center content (e.g. SearchBar) — overrides title */
  children?: ReactNode;
}

/* ---------- inline SVG icons ---------- */

const BackArrow = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 19l-7-7 7-7" />
  </svg>
);

export const ShareIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12v7a2 2 0 002 2h12a2 2 0 002-2v-7" />
    <polyline points="16 6 12 2 8 6" />
    <line x1="12" y1="2" x2="12" y2="15" />
  </svg>
);

export const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

export const MoreIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="1.5" fill="currentColor" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <circle cx="12" cy="19" r="1.5" fill="currentColor" />
  </svg>
);

export const NavBar = forwardRef<HTMLElement, NavBarProps>(
  (
    {
      title,
      variant = 'default',
      showBack = true,
      onBack,
      rightActions = [],
      children,
      className,
      ...rest
    },
    ref,
  ) => {
    const { t } = useGeekShop();
    const isGradient = variant === 'gradient';

    return (
      <header
        ref={ref}
        className={`${styles.navBar} ${isGradient ? styles.gradient : styles.default} ${className ?? ''}`}
        {...rest}
      >
        {/* Left zone */}
        <div className={styles.left}>
          {showBack && (
            <button className={styles.backBtn} onClick={onBack} aria-label={t('common.back')}>
              <BackArrow />
            </button>
          )}
        </div>

        {/* Center zone */}
        <div className={styles.center}>
          {children ?? (
            <span className={styles.title}>{title}</span>
          )}
        </div>

        {/* Right zone */}
        <div className={styles.right}>
          {rightActions.map((action) => (
            <button
              key={action.key}
              className={styles.actionBtn}
              onClick={action.onClick}
              aria-label={action.ariaLabel ?? action.key}
            >
              {action.icon}
            </button>
          ))}
        </div>
      </header>
    );
  },
);

NavBar.displayName = 'NavBar';
