import { cn } from '../../../utils/cn';
'use client';
import { forwardRef, useState, useId, type HTMLAttributes } from 'react';
import { useControllableState } from '../../../hooks/useControllableState';
import styles from './Rating.module.scss';

export type RatingSize = 'sm' | 'md' | 'lg';

export interface RatingProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current rating value (0-5, supports half steps) */
  value?: number;
  /** Default rating value for uncontrolled usage */
  defaultValue?: number;
  /** Number of reviews / ratings count */
  count?: number;
  /** Max star count */
  max?: number;
  /** Allow user to select rating */
  interactive?: boolean;
  /** Callback when rating changes (interactive mode) */
  onChange?: (value: number) => void;
  /** Size of stars */
  size?: RatingSize;
  /** Show count text like "4.6 (87 baho)" */
  showCount?: boolean;
}

const STAR_SIZES: Record<RatingSize, number> = {
  sm: 14,
  md: 18,
  lg: 24,
};

function StarIcon({ size, fill, clipId }: { size: number; fill: 'full' | 'half' | 'empty'; clipId: string }) {
  if (fill === 'full') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#FFC107" stroke="none">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );
  }

  if (fill === 'half') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="none">
        <defs>
          <clipPath id={clipId}>
            <rect x="0" y="0" width="12" height="24" />
          </clipPath>
        </defs>
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill="#E0E0E0"
        />
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill="#FFC107"
          clipPath={`url(#${clipId})`}
        />
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#E0E0E0" stroke="none">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export const Rating = forwardRef<HTMLDivElement, RatingProps>(
  ({ value: valueProp, defaultValue: defaultValueProp = 0, count, max = 5, interactive = false, onChange, size = 'md', showCount = true, className = '', ...rest }, ref) => {
    const clipId = useId();
    const [value, setValue] = useControllableState({
      value: valueProp,
      defaultValue: defaultValueProp,
      onChange,
    });
    const [hoverValue, setHoverValue] = useState<number | null>(null);
    const displayValue = hoverValue ?? value;
    const starSize = STAR_SIZES[size];

    const stars = Array.from({ length: max }, (_, i) => {
      const starIndex = i + 1;
      let fill: 'full' | 'half' | 'empty';

      if (displayValue >= starIndex) {
        fill = 'full';
      } else if (displayValue >= starIndex - 0.5) {
        fill = 'half';
      } else {
        fill = 'empty';
      }

      return (
        <span
          key={i}
          className={cn(styles.star, interactive ? styles.interactive : '')}
          onClick={interactive ? () => setValue(starIndex) : undefined}
          onKeyDown={interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setValue(starIndex); } } : undefined}
          onMouseEnter={interactive ? () => setHoverValue(starIndex) : undefined}
          onMouseLeave={interactive ? () => setHoverValue(null) : undefined}
          role={interactive ? 'button' : undefined}
          tabIndex={interactive ? 0 : undefined}
          aria-label={interactive ? `${starIndex} yulduz` : undefined}
        >
          <StarIcon size={starSize} fill={fill} clipId={`${clipId}-half-${i}`} />
        </span>
      );
    });

    return (
      <div ref={ref} className={cn(styles.root, styles[`size-${size}`], className)} {...rest}>
        <div className={styles.stars}>{stars}</div>
        {showCount && (
          <span className={styles.countText}>
            {value.toFixed(1)}
            {count !== undefined && <span className={styles.countNumber}> ({count} baho)</span>}
          </span>
        )}
      </div>
    );
  }
);

Rating.displayName = 'Rating';
