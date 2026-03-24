'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';
import styles from './DesktopGrid.module.scss';

export interface DesktopGridProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of fixed columns, or 'auto' for auto-fill responsive columns (default 4) */
  columns?: number | 'auto';
  /** Gap between grid items in pixels (default 24) */
  gap?: number;
  /** Minimum column width for auto columns mode (default 240) */
  minColumnWidth?: number;
  /** Grid content */
  children?: ReactNode;
}

export const DesktopGrid = forwardRef<HTMLDivElement, DesktopGridProps>(
  (
    {
      columns = 4,
      gap = 24,
      minColumnWidth = 240,
      children,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const rootClass = cn(styles.grid, className);

    const gridTemplateColumns =
      columns === 'auto'
        ? `repeat(auto-fill, minmax(${minColumnWidth}px, 1fr))`
        : `repeat(${columns}, 1fr)`;

    return (
      <div
        ref={ref}
        className={rootClass}
        style={{
          gridTemplateColumns,
          gap: `${gap}px`,
          ...style,
        }}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

DesktopGrid.displayName = 'DesktopGrid';
