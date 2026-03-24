'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';
import styles from './Grid.module.scss';

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of grid columns */
  columns?: number;
  /** Gap between items (CSS value) */
  gap?: string;
  /** Grid content */
  children?: ReactNode;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      columns = 2,
      gap = '8px',
      children,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
  const rootClass = cn(styles.grid, className);

  return (
    <div
      ref={ref}
      className={rootClass}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
  },
);

Grid.displayName = 'Grid';
