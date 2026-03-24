'use client';
import { cn } from '../../../utils/cn';
import { formatCount } from '../../../utils/formatPrice';
import { forwardRef } from 'react';
import styles from './DesktopRatingDistribution.module.scss';

export interface DesktopRatingDistributionData {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
}

export interface DesktopRatingDistributionLabels {
  /** Aria-label for average stars (default: "{rating} out of 5 stars") */
  averageStars?: string;
  /** Aria-label for the bars section (default: "Star distribution") */
  starDistribution?: string;
  /** Aria-label for each bar (default: "{star} star: {percent}%") */
  starBar?: string;
  /** Text after total count (default: "reviews") */
  reviewsLabel?: string;
}

const DEFAULT_DISTRIBUTION_LABELS: Required<DesktopRatingDistributionLabels> = {
  averageStars: '{rating} out of 5 stars',
  starDistribution: 'Star distribution',
  starBar: '{star} star: {percent}%',
  reviewsLabel: 'reviews',
};

export interface DesktopRatingDistributionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Star distribution counts */
  distribution: DesktopRatingDistributionData;
  /** Average rating */
  average: number;
  /** Total number of reviews */
  total: number;
  /** i18n labels override */
  labels?: DesktopRatingDistributionLabels;
}

const BAR_COLORS: Record<number, string> = {
  5: 'var(--gs-color-success, #07C160)',
  4: 'var(--gs-color-rating-4, #4ADE80)',
  3: 'var(--gs-color-warning, #FFA726)',
  2: 'var(--gs-color-rating-2, #FB923C)',
  1: 'var(--gs-color-error, #FF3B30)',
};

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

function DesktopRatingDistributionInner(
  {
    distribution,
    average,
    total,
    labels: labelsProp,
    className,
    ...rest
  }: DesktopRatingDistributionProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const l = { ...DEFAULT_DISTRIBUTION_LABELS, ...labelsProp };
  const stars = [5, 4, 3, 2, 1] as const;
  const maxCount = Math.max(...stars.map((s) => distribution[s]), 1);

  return (
    <div ref={ref} className={cn(styles.root, className)} {...rest}>
      {/* Left: average + total */}
      <div className={styles.summary}>
        <span className={styles.averageValue}>{average.toFixed(1)}</span>
        <div className={styles.averageStars} aria-label={l.averageStars.replace('{rating}', average.toFixed(1))}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={cn(styles.star, i < Math.round(average) ? styles.starFilled : styles.starEmpty)}
            >
              <StarIcon />
            </span>
          ))}
        </div>
        <span className={styles.totalCount}>{formatCount(total)} {l.reviewsLabel}</span>
      </div>

      {/* Right: bar chart */}
      <div className={styles.bars} role="list" aria-label={l.starDistribution}>
        {stars.map((star) => {
          const count = distribution[star];
          const percentage = total > 0 ? (count / total) * 100 : 0;
          const barWidth = maxCount > 0 ? (count / maxCount) * 100 : 0;

          return (
            <div key={star} className={styles.barRow} role="listitem">
              <span className={styles.barLabel}>
                {star} <StarIcon />
              </span>
              <div className={styles.barTrack}>
                <div
                  className={styles.barFill}
                  style={{
                    width: `${barWidth}%`,
                    backgroundColor: BAR_COLORS[star],
                  }}
                  role="progressbar"
                  aria-valuenow={percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={l.starBar.replace('{star}', String(star)).replace('{percent}', percentage.toFixed(0))}
                />
              </div>
              <span className={styles.barCount}>{formatCount(count)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const DesktopRatingDistribution = forwardRef(DesktopRatingDistributionInner);
DesktopRatingDistribution.displayName = 'DesktopRatingDistribution';
