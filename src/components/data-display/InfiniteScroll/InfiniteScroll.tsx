'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, useRef, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { useGeekShop } from '../../../i18n';
import styles from './InfiniteScroll.module.scss';

export interface InfiniteScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Content / list items to render */
  children: ReactNode;
  /** Callback fired when more items should be loaded */
  onLoadMore: () => void | Promise<void>;
  /** Whether there are more items to load */
  hasMore: boolean;
  /** Whether a load is currently in progress */
  loading?: boolean;
  /** Pixels from sentinel to trigger early, default 200 */
  threshold?: number;
  /** Custom loading indicator */
  loadingContent?: ReactNode;
  /** Content shown when all items loaded */
  endContent?: ReactNode;
  /** Content shown on error (includes retry button by default) */
  errorContent?: ReactNode;
  /** Whether an error occurred */
  error?: boolean;
  /** Retry callback on error */
  onRetry?: () => void;
}

export const InfiniteScroll = forwardRef<HTMLDivElement, InfiniteScrollProps>(
  (
    {
      children,
      onLoadMore,
      hasMore,
      loading = false,
      threshold = 200,
      loadingContent,
      endContent,
      errorContent,
      error = false,
      onRetry,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const { t } = useGeekShop();
    const sentinelRef = useRef<HTMLDivElement>(null);
    const debounceRef = useRef(false);

    const handleLoadMore = useCallback(() => {
      if (debounceRef.current || loading || !hasMore || error) return;

      debounceRef.current = true;

      const result = onLoadMore();

      // Reset debounce after the call settles
      if (result && typeof result.then === 'function') {
        result.then(
          () => { debounceRef.current = false; },
          () => { debounceRef.current = false; },
        );
      } else {
        // For sync callbacks, reset on next tick
        setTimeout(() => { debounceRef.current = false; }, 100);
      }
    }, [onLoadMore, loading, hasMore, error]);

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

    const renderStatus = () => {
      if (error) {
        return (
          <div className={styles.status}>
            {errorContent ?? (
              <div className={styles.errorState}>
                <span className={styles.errorText}>{t('common.loadFailed')}</span>
                {onRetry && (
                  <button
                    type="button"
                    className={styles.retryButton}
                    onClick={onRetry}
                  >
                    {t('common.retry')}
                  </button>
                )}
              </div>
            )}
          </div>
        );
      }

      if (loading) {
        return (
          <div className={styles.status}>
            {loadingContent ?? (
              <div className={styles.loadingState}>
                <span className={styles.spinner} />
                <span className={styles.loadingText}>{t('common.loading')}</span>
              </div>
            )}
          </div>
        );
      }

      if (!hasMore) {
        return (
          <div className={styles.status}>
            {endContent ?? (
              <span className={styles.endText}>{t('common.noMoreItems')}</span>
            )}
          </div>
        );
      }

      return null;
    };

    return (
      <div ref={ref} className={cn(styles.container, className)} {...rest}>
        {children}

        {/* Invisible sentinel for IntersectionObserver */}
        {hasMore && !error && (
          <div ref={sentinelRef} className={styles.sentinel} />
        )}

        {renderStatus()}
      </div>
    );
  },
);

InfiniteScroll.displayName = 'InfiniteScroll';
