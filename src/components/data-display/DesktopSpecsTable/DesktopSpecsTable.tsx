import { cn } from '../../../utils/cn';
import { forwardRef, type HTMLAttributes } from 'react';
import styles from './DesktopSpecsTable.module.scss';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface DesktopSpecItem {
  label: string;
  value: string;
}

export interface DesktopSpecGroup {
  title: string;
  specs: DesktopSpecItem[];
}

export interface DesktopSpecsTableProps extends HTMLAttributes<HTMLDivElement> {
  /** Flat list of specification items */
  specs: DesktopSpecItem[];
  /** Title for the specifications section */
  title?: string;
  /** Number of columns for the layout */
  columns?: 1 | 2;
  /** Optional grouped specifications (overrides flat specs) */
  groups?: DesktopSpecGroup[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderSpecRow(spec: DesktopSpecItem, index: number) {
  return (
    <div
      key={`${spec.label}-${index}`}
      className={cn(styles.specRow, index % 2 === 0 ? styles.specRowEven : styles.specRowOdd)}
    >
      <span className={styles.specLabel}>{spec.label}</span>
      <span className={styles.specValue}>{spec.value}</span>
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export const DesktopSpecsTable = forwardRef<HTMLDivElement, DesktopSpecsTableProps>(
  (
    {
      specs,
      title = 'Specifications',
      columns = 2,
      groups,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const columnsClass = columns === 1 ? styles.singleColumn : styles.twoColumns;

    return (
      <div ref={ref} className={cn(styles.root, className)} {...rest}>
        {/* Title header */}
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
        </div>

        {/* Grouped specs */}
        {groups && groups.length > 0 ? (
          <div className={styles.body}>
            {groups.map((group, groupIdx) => (
              <div key={`group-${groupIdx}`} className={styles.group}>
                <div className={styles.groupTitle}>{group.title}</div>
                <div className={cn(styles.grid, columnsClass)}>
                  {group.specs.map((spec, idx) => renderSpecRow(spec, idx))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Flat specs */
          <div className={cn(styles.grid, columnsClass)}>
            {specs.map((spec, idx) => renderSpecRow(spec, idx))}
          </div>
        )}
      </div>
    );
  },
);

DesktopSpecsTable.displayName = 'DesktopSpecsTable';
