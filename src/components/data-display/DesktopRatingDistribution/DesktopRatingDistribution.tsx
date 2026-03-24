'use client';
import { cn } from '../../../utils/cn';
import { forwardRef } from 'react';
import styles from './DesktopRatingDistribution.module.scss';

export interface DesktopRatingDistributionData {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
}

export interface DesktopRatingDistributionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Star distribution counts */
  distribution: DesktopRatingDistributionData;
  /** Average rating */
  average: number;
  /** Total number of reviews */
  total: number;
}

const BAR_COLORS: Record<number, string> = {
  5: '#07C160',
  4: '#4ADE80',
  3: '#FFA726',
  2: '#FB923C',
  1: '#FF3B30',
};

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

function formatCount(value: number): string {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  }
  return String(value);
}

function DesktopRatingDistributionInner(
  {
    distribution,
    average,
    total,
    className,
    ...rest
  }: DesktopRatingDistributionProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const stars = [5, 4, 3, 2, 1] as const;
  const maxCount = Math.max(...stars.map((s) => distribution[s]), 1);

  return (
    <div ref={ref} className={cn(styles.root, className)} {...rest}>
      {/* Left: average + total */}
      <div className={styles.summary}>
        <span className={styles.averageValue}>{average.toFixed(1)}</span>
        <div className={styles.averageStars} aria-label={`${average.toFixed(1)} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={cn(styles.star, i < Math.round(average) ? styles.starFilled : styles.starEmpty)}
            >
              <StarIcon />
            </span>
          ))}
        </div>
        <span className={styles.totalCount}>{formatCount(total)} ta sharh</span>
      </div>

      {/* Right: bar chart */}
      <div className={styles.bars} role="list" aria-label="Yulduz taqsimoti">
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
                  aria-label={`${star} yulduz: ${percentage.toFixed(0)}%`}
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
