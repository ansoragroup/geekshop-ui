import { forwardRef, useCallback, type MouseEventHandler, type HTMLAttributes } from 'react';
import styles from './DesktopCategoryIcon.module.scss';

export interface DesktopCategoryIconProps extends HTMLAttributes<HTMLDivElement> {
  /** SVG icon element */
  icon: React.ReactNode;
  /** Label text below the icon */
  label: string;
  /** Background color of the circle */
  color?: string;
  /** Optional badge count (e.g. number of items in category) */
  badgeCount?: number;
  /** Click handler */
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const DesktopCategoryIcon = forwardRef<HTMLDivElement, DesktopCategoryIconProps>(
  (
    {
      icon,
      label,
      color = '#FF5000',
      badgeCount,
      onClick,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
        }
      },
      [onClick],
    );

    return (
      <div
        ref={ref}
        className={`${styles.root} ${className}`}
        onClick={onClick}
        onKeyDown={onClick ? handleKeyDown : undefined}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        {...rest}
      >
        <div className={styles.circleWrapper}>
          <div
            className={styles.circle}
            style={{ background: `${color}15` }}
          >
            <div className={styles.iconWrapper} style={{ color }}>
              {icon}
            </div>
          </div>
          {badgeCount !== undefined && badgeCount > 0 && (
            <span className={styles.badge} aria-label={`${badgeCount} items`}>
              {badgeCount > 99 ? '99+' : badgeCount}
            </span>
          )}
        </div>
        <span className={styles.label}>{label}</span>
      </div>
    );
  },
);

DesktopCategoryIcon.displayName = 'DesktopCategoryIcon';
