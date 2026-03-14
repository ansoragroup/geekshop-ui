import { forwardRef, useRef, useState, useCallback } from 'react';
import type { ReactNode, TouchEvent } from 'react';
import styles from './PullToRefresh.module.scss';

export interface PullToRefreshProps {
  children: ReactNode;
  onRefresh: () => Promise<void>;
  /** Pull distance to trigger refresh, default 80 */
  threshold?: number;
  /** Max pull distance, default 120 */
  maxPull?: number;
  /** Custom content shown while refreshing */
  refreshingContent?: ReactNode;
  /** Custom content shown while pulling */
  pullingContent?: ReactNode;
  /** Disable pull-to-refresh */
  disabled?: boolean;
  /** Additional CSS class */
  className?: string;
}

function DefaultSpinner() {
  return (
    <svg className={styles.spinner} width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="#F0F0F0" strokeWidth="2.5" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="#FF5000" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function DefaultArrow({ progress }: { progress: number }) {
  const rotation = Math.min(progress, 1) * 180;
  return (
    <svg
      className={styles.arrow}
      style={{ transform: `rotate(${rotation}deg)` }}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M10 4V14M10 14L6 10M10 14L14 10"
        stroke="#999"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const PullToRefresh = forwardRef<HTMLDivElement, PullToRefreshProps>(
  function PullToRefresh(
    {
      children,
      onRefresh,
      threshold = 80,
      maxPull = 120,
      refreshingContent,
      pullingContent,
      disabled = false,
      className = '',
    },
    ref,
  ) {
    const [pullDistance, setPullDistance] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const startYRef = useRef(0);
    const isPullingRef = useRef(false);

    const handleTouchStart = useCallback(
      (e: TouchEvent) => {
        if (disabled || isRefreshing) return;

        const container = containerRef.current;
        if (!container || container.scrollTop !== 0) return;

        startYRef.current = e.touches[0].clientY;
        isPullingRef.current = true;
        setIsTransitioning(false);
      },
      [disabled, isRefreshing],
    );

    const handleTouchMove = useCallback(
      (e: TouchEvent) => {
        if (!isPullingRef.current || disabled || isRefreshing) return;

        const deltaY = e.touches[0].clientY - startYRef.current;
        if (deltaY < 0) {
          setPullDistance(0);
          return;
        }

        // Apply resistance: the further you pull, the harder it gets
        const resistance = Math.min(1, 1 - deltaY / (maxPull * 3));
        const distance = Math.min(maxPull, deltaY * resistance);
        setPullDistance(distance);
      },
      [disabled, isRefreshing, maxPull],
    );

    const handleTouchEnd = useCallback(async () => {
      if (!isPullingRef.current || disabled) return;
      isPullingRef.current = false;

      if (pullDistance >= threshold && !isRefreshing) {
        setIsRefreshing(true);
        setIsTransitioning(true);
        setPullDistance(threshold);

        try {
          await onRefresh();
        } finally {
          setIsRefreshing(false);
          setIsTransitioning(true);
          setPullDistance(0);
        }
      } else {
        setIsTransitioning(true);
        setPullDistance(0);
      }
    }, [pullDistance, threshold, isRefreshing, onRefresh, disabled]);

    const progress = Math.min(pullDistance / threshold, 1);
    const indicatorHeight = 48;

    return (
      <div
        ref={ref}
        className={`${styles.root} ${className}`}
      >
        <div
          ref={containerRef}
          className={styles.scroller}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Pull indicator */}
          <div
            className={`${styles.indicator} ${isTransitioning ? styles.transitioning : ''}`}
            style={{
              transform: `translateY(${pullDistance - indicatorHeight}px)`,
              opacity: progress,
            }}
          >
            {isRefreshing
              ? (refreshingContent ?? <DefaultSpinner />)
              : (pullingContent ?? <DefaultArrow progress={progress} />)}
          </div>

          {/* Content */}
          <div
            className={`${styles.content} ${isTransitioning ? styles.transitioning : ''}`}
            style={{ transform: `translateY(${pullDistance}px)` }}
          >
            {children}
          </div>
        </div>
      </div>
    );
  },
);

export default PullToRefresh;
