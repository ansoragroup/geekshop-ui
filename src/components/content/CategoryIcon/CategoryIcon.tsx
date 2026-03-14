import { type FC, type MouseEventHandler } from 'react';
import styles from './CategoryIcon.module.scss';

export interface CategoryIconProps {
  /** SVG icon element */
  icon: React.ReactNode;
  /** Label text below the icon */
  label: string;
  /** Background color of the circle */
  color?: string;
  /** Click handler */
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const CategoryIcon: FC<CategoryIconProps> = ({
  icon,
  label,
  color = '#FF5000',
  onClick,
}) => {
  return (
    <div
      className={styles.categoryIcon}
      onClick={onClick}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(e as unknown as React.MouseEvent<HTMLDivElement>); } } : undefined}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
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
};

export default CategoryIcon;
