import { cn } from '../../../utils/cn';
import { forwardRef, type HTMLAttributes } from 'react';
import styles from './SpecsTable.module.scss';

export interface SpecItem {
  label: string;
  value: string;
}

export interface SpecsTableProps extends HTMLAttributes<HTMLDivElement> {
  /** Array of spec key-value pairs */
  specs: SpecItem[];
}

export const SpecsTable = forwardRef<HTMLDivElement, SpecsTableProps>(
  ({ specs, className = '', ...rest }, ref) => {
    return (
      <div ref={ref} className={cn(styles.root, className)} {...rest}>
        {specs.map((spec, i) => (
          <div
            key={i}
            className={cn(styles.row, i % 2 === 0 ? styles.rowEven : styles.rowOdd)}
          >
            <span className={styles.label}>{spec.label}</span>
            <span className={styles.value}>{spec.value}</span>
          </div>
        ))}
      </div>
    );
  }
);

SpecsTable.displayName = 'SpecsTable';
