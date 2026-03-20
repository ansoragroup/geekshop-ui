import { cn } from '../../../utils/cn';
'use client';
import { forwardRef, useRef, useEffect, useCallback, type ReactNode, type HTMLAttributes } from 'react';
import styles from './DesktopInfiniteScroll.module.scss';

export interface DesktopInfiniteScrollProps extends HTMLAttributes<HTMLDivElement> {
  /** Content / list items to render */
  children: ReactNode;
  /** Whether there are more items to load */
  hasMore: boolean;
  /** Whether a load is currently in progress */
  loading?: boolean;
  /** Callback fired when more items should be loaded */
  onLoadMore: () => void | Promise<void>;
  /** Pixels from sentinel to trigger early (default 300) */
  threshold?: number;
  /** Loading text displayed below spinner */
  loadingText?: string;
}

export const DesktopInfiniteScroll = forwardRef<HTMLDivElement, DesktopInfiniteScrollProps>(
  (
    {
      children,
      hasMore,
      loading = false,
      onLoadMore,
      threshold = 300,
      loadingText = 'Loading more...',
      className = '',
      ...rest
    },
    ref,
  ) => {
    const sentinelRef = useRef<HTMLDivElement>(null);
    const debounceRef = useRef(false);

    const handleLoadMore = useCallback(() => {
      if (debounceRef.current || loading || !hasMore) return;

      debounceRef.current = true;
      const result = onLoadMore();

      if (result && typeof result.then === 'function') {
        result.then(
          () => { debounceRef.current = false; },
          () => { debounceRef.current = false; },
        );
      } else {
        setTimeout(() => { debounceRef.current = false; }, 100);
      }
    }, [onLoadMore, loading, hasMore]);

    useEffect(() => {
      const sentinel = sentinelRef.current;
      if (!sentinel) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            handleLoadMore();
          }
        },
        { rootMargin: `${threshold}px` },
      );

      observer.observe(sentinel);

      return () => {
        observer.disconnect();
      };
    }, [handleLoadMore, threshold]);

    return (
      <div ref={ref} className={cn(styles.root, className)} {...rest}>
        {children}

        {/* Invisible sentinel for IntersectionObserver */}
        {hasMore && (
          <div ref={sentinelRef} className={styles.sentinel} />
        )}

        {/* Loading indicator */}
        {loading && (
          <div className={styles.status} role="status" aria-live="polite">
            <div className={styles.loadingState}>
              <span className={styles.spinner} aria-hidden="true" />
              <span className={styles.loadingText}>{loadingText}</span>
            </div>
          </div>
        )}

        {/* End message */}
        {!hasMore && !loading && (
          <div className={styles.status}>
            <span className={styles.endText}>No more items to load</span>
          </div>
        )}
      </div>
    );
  },
);

DesktopInfiniteScroll.displayName = 'DesktopInfiniteScroll';
