'use client';
import { forwardRef, useCallback, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import { useControllableState } from '../../../hooks/useControllableState';
import styles from './DataTable.module.scss';

export interface DataTableColumn<T = Record<string, unknown>> {
  key: string;
  title: string;
  sortable?: boolean;
  width?: number | string;
  render?: (value: unknown, row: T) => ReactNode;
}

export interface DataTableProps<T = Record<string, unknown>>
  extends HTMLAttributes<HTMLDivElement> {
  columns: DataTableColumn<T>[];
  data: T[];
  rowKey: keyof T | ((row: T) => string);
  selectedKeys?: string[];
  defaultSelectedKeys?: string[];
  onSelectionChange?: (keys: string[]) => void;
  sortKey?: string;
  sortDirection?: 'asc' | 'desc';
  onSortChange?: (key: string, direction: 'asc' | 'desc') => void;
  page?: number;
  defaultPage?: number;
  pageSize?: number;
  total?: number;
  onPageChange?: (page: number) => void;
  loading?: boolean;
  empty?: ReactNode;
  showHeader?: boolean;
}

function getRowKey<T>(row: T, rowKey: keyof T | ((row: T) => string)): string {
  if (typeof rowKey === 'function') return rowKey(row);
  return String(row[rowKey]);
}

const SortIcon = ({ direction }: { direction?: 'asc' | 'desc' }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={styles.sortIcon}>
    <path
      d="M7 2.5l3 4H4l3-4z"
      fill={direction === 'asc' ? 'currentColor' : 'var(--gs-text-placeholder, #CCC)'}
    />
    <path
      d="M7 11.5l3-4H4l3 4z"
      fill={direction === 'desc' ? 'currentColor' : 'var(--gs-text-placeholder, #CCC)'}
    />
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path
      d="M2.5 6l2.5 2.5 4.5-4.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DataTable = forwardRef<HTMLDivElement, DataTableProps>(
  (
    {
      columns,
      data,
      rowKey,
      selectedKeys: controlledSelectedKeys,
      defaultSelectedKeys,
      onSelectionChange,
      sortKey,
      sortDirection,
      onSortChange,
      page: controlledPage,
      defaultPage,
      pageSize = 10,
      total,
      onPageChange,
      loading = false,
      empty,
      showHeader = true,
      className,
      ...rest
    },
    ref
  ) => {
    const [selectedKeys, setSelectedKeys] = useControllableState<string[]>({
      value: controlledSelectedKeys,
      defaultValue: defaultSelectedKeys ?? [],
      onChange: onSelectionChange,
    });

    const [page, setPage] = useControllableState<number>({
      value: controlledPage,
      defaultValue: defaultPage ?? 1,
      onChange: onPageChange,
    });

    const actualTotal = total ?? data.length;
    const totalPages = Math.max(1, Math.ceil(actualTotal / pageSize));

    const paginatedData =
      total !== undefined ? data : data.slice((page - 1) * pageSize, page * pageSize);

    const handleSort = useCallback(
      (key: string) => {
        if (!onSortChange) return;
        if (sortKey === key) {
          onSortChange(key, sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
          onSortChange(key, 'asc');
        }
      },
      [sortKey, sortDirection, onSortChange]
    );

    const handleToggleRow = useCallback(
      (key: string) => {
        const newKeys = selectedKeys.includes(key)
          ? selectedKeys.filter((k) => k !== key)
          : [...selectedKeys, key];
        setSelectedKeys(newKeys);
      },
      [selectedKeys, setSelectedKeys]
    );

    const handleToggleAll = useCallback(() => {
      const allKeys = paginatedData.map((row) => getRowKey(row, rowKey));
      const allSelected = allKeys.every((k) => selectedKeys.includes(k));
      if (allSelected) {
        setSelectedKeys(selectedKeys.filter((k) => !allKeys.includes(k)));
      } else {
        const merged = [...new Set([...selectedKeys, ...allKeys])];
        setSelectedKeys(merged);
      }
    }, [paginatedData, rowKey, selectedKeys, setSelectedKeys]);

    const allCurrentSelected =
      paginatedData.length > 0 &&
      paginatedData.every((row) => selectedKeys.includes(getRowKey(row, rowKey)));

    if (loading) {
      return (
        <div ref={ref} className={cn(styles.root, className)} {...rest}>
          <div className={styles.loadingContainer}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={styles.skeletonCard}>
                <div className={styles.skeletonLine} />
                <div className={styles.skeletonLine} style={{ width: '70%' }} />
                <div className={styles.skeletonLine} style={{ width: '50%' }} />
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (paginatedData.length === 0 && empty) {
      return (
        <div ref={ref} className={cn(styles.root, className)} {...rest}>
          <div className={styles.emptyContainer}>{empty}</div>
        </div>
      );
    }

    return (
      <div ref={ref} className={cn(styles.root, className)} {...rest}>
        {/* Card Layout (narrow) */}
        <div className={styles.cardLayout}>
          {onSelectionChange && (
            <div className={styles.cardSelectAll}>
              <button
                type="button"
                className={cn(styles.checkbox, allCurrentSelected && styles.checkboxChecked)}
                onClick={handleToggleAll}
                role="checkbox"
                aria-checked={allCurrentSelected}
                aria-label="Select all rows"
              >
                {allCurrentSelected && <CheckIcon />}
              </button>
              <span className={styles.selectAllLabel}>Select all</span>
            </div>
          )}
          {paginatedData.map((row) => {
            const key = getRowKey(row, rowKey);
            const isSelected = selectedKeys.includes(key);
            return (
              <div key={key} className={cn(styles.card, isSelected && styles.cardSelected)}>
                {onSelectionChange && (
                  <button
                    type="button"
                    className={cn(styles.checkbox, isSelected && styles.checkboxChecked)}
                    onClick={() => handleToggleRow(key)}
                    role="checkbox"
                    aria-checked={isSelected}
                    aria-label={`Select row ${key}`}
                  >
                    {isSelected && <CheckIcon />}
                  </button>
                )}
                <div className={styles.cardBody}>
                  {columns.map((col) => {
                    const val = (row as Record<string, unknown>)[col.key];
                    return (
                      <div key={col.key} className={styles.cardField}>
                        <span className={styles.cardFieldLabel}>{col.title}:</span>
                        <span className={styles.cardFieldValue}>
                          {col.render ? col.render(val, row) : String(val ?? '')}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Table Layout (wide) */}
        <div className={styles.tableLayout}>
          <div className={styles.tableScroll}>
            <table className={styles.table} role="table">
              {showHeader && (
                <thead>
                  <tr>
                    {onSelectionChange && (
                      <th className={styles.checkboxCell}>
                        <button
                          type="button"
                          className={cn(
                            styles.checkbox,
                            allCurrentSelected && styles.checkboxChecked
                          )}
                          onClick={handleToggleAll}
                          role="checkbox"
                          aria-checked={allCurrentSelected}
                          aria-label="Select all rows"
                        >
                          {allCurrentSelected && <CheckIcon />}
                        </button>
                      </th>
                    )}
                    {columns.map((col) => (
                      <th
                        key={col.key}
                        className={cn(styles.th, col.sortable && styles.thSortable)}
                        style={col.width ? { width: col.width } : undefined}
                        role="columnheader"
                        aria-sort={
                          sortKey === col.key
                            ? sortDirection === 'asc'
                              ? 'ascending'
                              : 'descending'
                            : 'none'
                        }
                        onClick={col.sortable ? () => handleSort(col.key) : undefined}
                      >
                        <span className={styles.thContent}>
                          {col.title}
                          {col.sortable && (
                            <SortIcon direction={sortKey === col.key ? sortDirection : undefined} />
                          )}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {paginatedData.map((row) => {
                  const key = getRowKey(row, rowKey);
                  const isSelected = selectedKeys.includes(key);
                  return (
                    <tr key={key} className={cn(styles.tr, isSelected && styles.trSelected)}>
                      {onSelectionChange && (
                        <td className={styles.checkboxCell}>
                          <button
                            type="button"
                            className={cn(styles.checkbox, isSelected && styles.checkboxChecked)}
                            onClick={() => handleToggleRow(key)}
                            role="checkbox"
                            aria-checked={isSelected}
                            aria-label={`Select row ${key}`}
                          >
                            {isSelected && <CheckIcon />}
                          </button>
                        </td>
                      )}
                      {columns.map((col) => {
                        const val = (row as Record<string, unknown>)[col.key];
                        return (
                          <td key={col.key} className={styles.td}>
                            {col.render ? col.render(val, row) : String(val ?? '')}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              type="button"
              className={styles.pageBtn}
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page <= 1}
              aria-label="Previous page"
            >
              Prev
            </button>
            <span className={styles.pageInfo}>
              Page {page} of {totalPages}
            </span>
            <button
              type="button"
              className={styles.pageBtn}
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page >= totalPages}
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  }
);

DataTable.displayName = 'DataTable';
