'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, useCallback, type ElementType, type MouseEventHandler } from 'react';
import styles from './DesktopCategoryIcon.module.scss';

export interface DesktopCategoryIconOwnProps {
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

export type DesktopCategoryIconProps<C extends ElementType = 'div'> = DesktopCategoryIconOwnProps & {
  as?: C;
} & Omit<React.ComponentPropsWithoutRef<C>, keyof DesktopCategoryIconOwnProps | 'as'>;

function DesktopCategoryIconInner<C extends ElementType = 'div'>(
  {
    as,
    icon,
    label,
    color = '#FF5000',
    badgeCount,
    onClick,
    className = '',
    ...rest
  }: DesktopCategoryIconProps<C>,
  ref: React.Ref<Element>,
) {
  const Component = as || 'div';

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (onClick && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
      }
    },
    [onClick],
  );

  return (
    <Component
      ref={ref}
      className={cn(styles.root, className)}
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
    </Component>
  );
}

export const DesktopCategoryIcon = forwardRef(DesktopCategoryIconInner) as <C extends ElementType = 'div'>(
  props: DesktopCategoryIconProps<C> & { ref?: React.Ref<Element> }
) => JSX.Element;

(DesktopCategoryIcon as { displayName?: string }).displayName = 'DesktopCategoryIcon';
