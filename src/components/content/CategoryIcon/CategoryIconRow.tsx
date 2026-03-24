'use client';
import { forwardRef, type HTMLAttributes } from 'react';
import { CategoryIcon, type CategoryIconProps } from './CategoryIcon';
import { cn } from '../../../utils/cn';
import styles from './CategoryIcon.module.scss';

export interface CategoryIconRowProps extends HTMLAttributes<HTMLDivElement> {
  /** Array of category icon items */
  items: CategoryIconProps[];
}

export const CategoryIconRow = forwardRef<HTMLDivElement, CategoryIconRowProps>(
  ({ items, className, ...rest }, ref) => {
    return (
      <div ref={ref} className={cn(styles.categoryRow, className)} {...rest}>
        {items.map((item, index) => (
          <CategoryIcon key={index} {...item} />
        ))}
      </div>
    );
  },
);

CategoryIconRow.displayName = 'CategoryIconRow';
