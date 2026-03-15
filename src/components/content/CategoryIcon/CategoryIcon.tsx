import { forwardRef, type MouseEventHandler, type HTMLAttributes } from 'react';
import styles from './CategoryIcon.module.scss';

export interface CategoryIconProps extends HTMLAttributes<HTMLDivElement> {
  /** SVG icon element */
  icon: React.ReactNode;
  /** Label text below the icon */
  label: string;
  /** Background color of the circle */
  color?: string;
  /** Click handler */
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const CategoryIcon = forwardRef<HTMLDivElement, CategoryIconProps>(
  (
    {
      icon,
      label,
      color = '#FF5000',
      onClick,
      className,
      ...rest
    },
    ref,
  ) => {
  const rootClass = [styles.categoryIcon, className].filter(Boolean).join(' ');

  return (
    <div
      ref={ref}
      className={rootClass}
      onClick={onClick}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(e as unknown as React.MouseEvent<HTMLDivElement>); } } : undefined}
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
    </div>
  );
  },
);

CategoryIcon.displayName = 'CategoryIcon';
