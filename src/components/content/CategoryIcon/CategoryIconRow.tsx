import { type FC } from 'react';
import { CategoryIcon, type CategoryIconProps } from './CategoryIcon';
import styles from './CategoryIcon.module.scss';

export interface CategoryIconRowProps {
  /** Array of category icon items */
  items: CategoryIconProps[];
}

export const CategoryIconRow: FC<CategoryIconRowProps> = ({ items }) => {
  return (
    <div className={styles.categoryRow}>
      {items.map((item, index) => (
        <CategoryIcon key={index} {...item} />
      ))}
    </div>
  );
};
