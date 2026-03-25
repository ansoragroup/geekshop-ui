'use client';
import { forwardRef, useCallback, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import { useControllableState } from '../../../hooks/useControllableState';
import type { DataTableColumn } from '../DataTable';
import styles from './DesktopDataTable.module.scss';

export interface DesktopDataTableProps<T = Record<string, unknown>>
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
  stickyHeader?: boolean;
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

export const DesktopDataTable = forwardRef<HTMLDivElement, DesktopDataTableProps>(
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
      stickyHeader = false,
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

    const pageNumbers: number[] = [];
    const maxVisible = 5;
    let startP = Math.max(1, page - Math.floor(maxVisible / 2));
    const endP = Math.min(totalPages, startP + maxVisible - 1);
    startP = Math.max(1, endP - maxVisible + 1);
    for (let i = startP; i <= endP; i++) {
      pageNumbers.push(i);
    }

    return (
      <div ref={ref} className={cn(styles.root, className)} {...rest}>
        <div className={cn(styles.tableWrapper, stickyHeader && styles.stickyWrapper)}>
          <table className={styles.table} role="table">
            {showHeader && (
              <thead className={cn(stickyHeader && styles.stickyHead)}>
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
              {loading && (
                <>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <tr key={`skel-${i}`}>
                      {onSelectionChange && (
                        <td className={styles.checkboxCell}>
                          <div className={styles.skeleton} style={{ width: 20, height: 20 }} />
                        </td>
                      )}
                      {columns.map((col) => (
                        <td key={col.key} className={styles.td}>
                          <div className={styles.skeleton} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </>
              )}
              {!loading && paginatedData.length === 0 && empty && (
                <tr>
                  <td
                    colSpan={columns.length + (onSelectionChange ? 1 : 0)}
                    className={styles.emptyCell}
                  >
                    {empty}
                  </td>
                </tr>
              )}
              {!loading &&
                paginatedData.map((row) => {
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
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10 4l-4 4 4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              Prev
            </button>
            <div className={styles.pageNumbers}>
              {pageNumbers.map((n) => (
                <button
                  key={n}
                  type="button"
                  className={cn(styles.pageNum, n === page && styles.pageNumActive)}
                  onClick={() => setPage(n)}
                  aria-current={n === page ? 'page' : undefined}
                >
                  {n}
                </button>
              ))}
            </div>
            <button
              type="button"
              className={styles.pageBtn}
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page >= totalPages}
              aria-label="Next page"
            >
              Next
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    );
  }
);

DesktopDataTable.displayName = 'DesktopDataTable';
