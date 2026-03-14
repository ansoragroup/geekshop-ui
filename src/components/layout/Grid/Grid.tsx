import type { ReactNode } from 'react';
import styles from './Grid.module.scss';

export interface GridProps {
  /** Number of grid columns */
  columns?: number;
  /** Gap between items (CSS value) */
  gap?: string;
  /** Grid content */
  children?: ReactNode;
}

export function Grid({
  columns = 2,
  gap = '8px',
  children,
}: GridProps) {
  return (
    <div
      className={styles.grid}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap,
      }}
    >
      {children}
    </div>
  );
}

export default Grid;
