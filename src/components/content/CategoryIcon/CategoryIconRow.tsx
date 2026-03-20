import { type FC } from 'react';
import { CategoryIcon, type CategoryIconProps } from './CategoryIcon';
import { cn } from '../../../utils/cn';
import styles from './CategoryIcon.module.scss';

export interface CategoryIconRowProps {
  /** Array of category icon items */
  items: CategoryIconProps[];
  /** Additional class name */
  className?: string;
}

export const CategoryIconRow: FC<CategoryIconRowProps> = ({ items, className }) => {
  return (
    <div className={cn(styles.categoryRow, className)}>
      {items.map((item, index) => (
        <CategoryIcon key={index} {...item} />
      ))}
    </div>
  );
};
