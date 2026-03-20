'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, type ElementType, type MouseEventHandler } from 'react';
import styles from './CategoryIcon.module.scss';

export interface CategoryIconOwnProps {
  /** SVG icon element */
  icon: React.ReactNode;
  /** Label text below the icon */
  label: string;
  /** Background color of the circle */
  color?: string;
  /** Click handler */
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export type CategoryIconProps<C extends ElementType = 'div'> = CategoryIconOwnProps & {
  as?: C;
} & Omit<React.ComponentPropsWithoutRef<C>, keyof CategoryIconOwnProps | 'as'>;

function CategoryIconInner<C extends ElementType = 'div'>(
  {
    as,
    icon,
    label,
    color = '#FF5000',
    onClick,
    className,
    ...rest
  }: CategoryIconProps<C>,
  ref: React.Ref<Element>,
) {
  const Component = as || 'div';
  const rootClass = cn(styles.categoryIcon, className);

  return (
    <Component
      ref={ref}
      className={rootClass}
      onClick={onClick}
      onKeyDown={onClick ? (e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(e as unknown as React.MouseEvent<HTMLDivElement>); } } : undefined}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...rest}
    >
      <div
        className={styles.circle}
        style={{ background: `${color}15` }}
      >
        <div className={styles.iconWrapper} style={{ color }}>
          {icon}
        </div>
      </div>
      <span className={styles.label}>{label}</span>
    </Component>
  );
}

export const CategoryIcon = forwardRef(CategoryIconInner) as <C extends ElementType = 'div'>(
  props: CategoryIconProps<C> & { ref?: React.Ref<Element> }
) => JSX.Element;

(CategoryIcon as { displayName?: string }).displayName = 'CategoryIcon';
