'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';
import styles from './DesktopTopBar.module.scss';
import { useGeekShop } from '../../../i18n';

export interface DesktopTopBarProps extends HTMLAttributes<HTMLElement> {
  /** Items rendered on the left side (e.g. welcome text, links) */
  leftItems?: ReactNode[];
  /** Items rendered on the right side (e.g. language, currency) */
  rightItems?: ReactNode[];
}

export const DesktopTopBar = forwardRef<HTMLElement, DesktopTopBarProps>(
  ({ leftItems, rightItems, className, ...rest }, ref) => {
    const { t } = useGeekShop();
    const rootClass = cn(styles.topBar, className);

    return (
      <nav ref={ref} className={rootClass} aria-label={t('aria.utilityNavigation')} {...rest}>
        <div className={styles.content}>
          {leftItems && leftItems.length > 0 && (
            <div className={styles.left}>
              {leftItems.map((item, index) => (
                <span key={index} className={styles.item}>
                  {item}
                </span>
              ))}
            </div>
          )}
          {rightItems && rightItems.length > 0 && (
            <div className={styles.right}>
              {rightItems.map((item, index) => (
                <span key={index} className={styles.item}>
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      </nav>
    );
  }
);

DesktopTopBar.displayName = 'DesktopTopBar';
