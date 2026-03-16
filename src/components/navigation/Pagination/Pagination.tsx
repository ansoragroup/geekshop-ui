import { forwardRef, useCallback, type HTMLAttributes } from 'react';
import styles from './Pagination.module.scss';

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  /** Current active page (1-based) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Number of sibling pages on each side of current page (default: 1) */
  siblingCount?: number;
  /** Whether to show Prev/Next buttons (default: true) */
  showPrevNext?: boolean;
}

/* ---------- Inline SVG Icons ---------- */

const ChevronLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      currentPage,
      totalPages,
      onPageChange,
      siblingCount = 1,
      showPrevNext = true,
      className,
      ...rest
    },
    ref,
  ) => {
    const rootClass = [styles.pagination, className].filter(Boolean).join(' ');
    const pages = getPageRange(currentPage, totalPages, siblingCount);

    const handlePrev = useCallback(() => {
      if (currentPage > 1) onPageChange(currentPage - 1);
    }, [currentPage, onPageChange]);

    const handleNext = useCallback(() => {
      if (currentPage < totalPages) onPageChange(currentPage + 1);
    }, [currentPage, totalPages, onPageChange]);

    if (totalPages <= 0) return null;

    return (
      <nav ref={ref} className={rootClass} aria-label="Pagination" {...rest}>
        <ul className={styles.list}>
          {showPrevNext && (
            <li>
              <button
                className={`${styles.button} ${styles.prevNext} ${currentPage <= 1 ? styles.disabled : ''}`}
                onClick={handlePrev}
                disabled={currentPage <= 1}
                aria-label="Previous page"
                type="button"
              >
                <ChevronLeftIcon />
                <span className={styles.prevNextLabel}>Prev</span>
              </button>
            </li>
          )}

          {pages.map((page, index) => {
            if (page === 'ellipsis') {
              return (
                <li key={`ellipsis-${index}`}>
                  <span className={styles.ellipsis} aria-hidden="true">
                    ...
                  </span>
                </li>
              );
            }

            const isActive = page === currentPage;
            return (
              <li key={page}>
                <button
                  className={`${styles.button} ${styles.pageButton} ${isActive ? styles.active : ''}`}
                  onClick={() => onPageChange(page)}
                  aria-label={`Page ${page}`}
                  aria-current={isActive ? 'page' : undefined}
                  type="button"
                >
                  {page}
                </button>
              </li>
            );
          })}

          {showPrevNext && (
            <li>
              <button
                className={`${styles.button} ${styles.prevNext} ${currentPage >= totalPages ? styles.disabled : ''}`}
                onClick={handleNext}
                disabled={currentPage >= totalPages}
                aria-label="Next page"
                type="button"
              >
                <span className={styles.prevNextLabel}>Next</span>
                <ChevronRightIcon />
              </button>
            </li>
          )}
        </ul>
      </nav>
    );
  },
);

Pagination.displayName = 'Pagination';

/**
 * Compute the page numbers to display. Always includes first, last,
 * current +/- siblingCount, and ellipsis where gaps exist.
 */
function getPageRange(
  current: number,
  total: number,
  siblingCount: number,
): (number | 'ellipsis')[] {
  // Total page numbers = siblings on each side + first + last + current + 2 ellipses
  const totalNumbers = siblingCount * 2 + 5;

  // If total pages fit, show all
  if (total <= totalNumbers) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(current - siblingCount, 1);
  const rightSiblingIndex = Math.min(current + siblingCount, total);

  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < total - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    // Show first pages up to 3 + 2*siblingCount, then ellipsis + last
    const leftCount = 3 + 2 * siblingCount;
    const leftPages = Array.from({ length: leftCount }, (_, i) => i + 1);
    return [...leftPages, 'ellipsis', total];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    // Show first, ellipsis, then last pages
    const rightCount = 3 + 2 * siblingCount;
    const rightPages = Array.from({ length: rightCount }, (_, i) => total - rightCount + 1 + i);
    return [1, 'ellipsis', ...rightPages];
  }

  // Both ellipses
  const middlePages = Array.from(
    { length: rightSiblingIndex - leftSiblingIndex + 1 },
    (_, i) => leftSiblingIndex + i,
  );
  return [1, 'ellipsis', ...middlePages, 'ellipsis', total];
}
