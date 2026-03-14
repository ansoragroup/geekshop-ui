import styles from './SpecsTable.module.scss';

export interface SpecItem {
  label: string;
  value: string;
}

export interface SpecsTableProps {
  /** Array of spec key-value pairs */
  specs: SpecItem[];
  /** Additional CSS class */
  className?: string;
}

export function SpecsTable({ specs, className = '' }: SpecsTableProps) {
  return (
    <div className={`${styles.root} ${className}`}>
      {specs.map((spec, i) => (
        <div
          key={i}
          className={`${styles.row} ${i % 2 === 0 ? styles.rowEven : styles.rowOdd}`}
        >
          <span className={styles.label}>{spec.label}</span>
          <span className={styles.value}>{spec.value}</span>
        </div>
      ))}
    </div>
  );
}

export default SpecsTable;
