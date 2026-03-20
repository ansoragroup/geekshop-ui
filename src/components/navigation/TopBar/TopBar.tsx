import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';
import styles from './TopBar.module.scss';

export interface TopBarProps extends HTMLAttributes<HTMLElement> {
  /** Items rendered on the left side (e.g. welcome text, links) */
  leftItems?: ReactNode[];
  /** Items rendered on the right side (e.g. language, currency) */
  rightItems?: ReactNode[];
}

export const TopBar = forwardRef<HTMLElement, TopBarProps>(
  ({ leftItems, rightItems, className, ...rest }, ref) => {
    const rootClass = [styles.topBar, className].filter(Boolean).join(' ');

    return (
      <nav ref={ref} className={rootClass} aria-label="Utility navigation" {...rest}>
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
  },
);

TopBar.displayName = 'TopBar';
