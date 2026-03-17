import { forwardRef, useState, useCallback, useId, type HTMLAttributes } from 'react';
import styles from './DesktopRating.module.scss';

export interface DesktopRatingProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current rating value (0 to max, supports 0.5 steps) */
  value: number;
  /** Maximum number of stars (default: 5) */
  max?: number;
  /** Star size in pixels (default: 24) */
  size?: number;
  /** Read-only mode (no interaction) */
  readonly?: boolean;
  /** Number of ratings / reviews count */
  count?: number;
  /** Show numeric value next to stars */
  showValue?: boolean;
  /** Allow half-star display */
  allowHalf?: boolean;
  /** Callback when rating changes */
  onChange?: (value: number) => void;
}

function StarIcon({
  size,
  fill,
  clipId,
}: {
  size: number;
  fill: 'full' | 'half' | 'empty';
  clipId: string;
}) {
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

export const DesktopRating = forwardRef<HTMLDivElement, DesktopRatingProps>(
  (
    {
      value,
      max = 5,
      size = 24,
      readonly = false,
      count,
      showValue = false,
      allowHalf = false,
      onChange,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const clipId = useId();
    const [hoverValue, setHoverValue] = useState<number | null>(null);
    const displayValue = hoverValue ?? value;

    const handleClick = useCallback(
      (starIndex: number) => {
        if (readonly) return;
        onChange?.(starIndex);
      },
      [readonly, onChange],
    );

    const handleMouseEnter = useCallback(
      (starIndex: number) => {
        if (readonly) return;
        setHoverValue(starIndex);
      },
      [readonly],
    );

    const handleMouseLeave = useCallback(() => {
      if (readonly) return;
      setHoverValue(null);
    }, [readonly]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent, starIndex: number) => {
        if (readonly) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onChange?.(starIndex);
        }
      },
      [readonly, onChange],
    );

    const stars = Array.from({ length: max }, (_, i) => {
      const starIndex = i + 1;
      let fill: 'full' | 'half' | 'empty';

      if (displayValue >= starIndex) {
        fill = 'full';
      } else if (allowHalf && displayValue >= starIndex - 0.5) {
        fill = 'half';
      } else {
        fill = 'empty';
      }

      return (
        <span
          key={i}
          className={`${styles.star} ${!readonly ? styles.interactive : ''}`}
          onClick={() => handleClick(starIndex)}
          onKeyDown={(e) => handleKeyDown(e, starIndex)}
          onMouseEnter={() => handleMouseEnter(starIndex)}
          onMouseLeave={handleMouseLeave}
          role={!readonly ? 'button' : undefined}
          tabIndex={!readonly ? 0 : undefined}
          aria-label={!readonly ? `Rate ${starIndex} star${starIndex > 1 ? 's' : ''}` : undefined}
        >
          <StarIcon size={size} fill={fill} clipId={`${clipId}-half-${i}`} />
        </span>
      );
    });

    return (
      <div ref={ref} className={`${styles.root} ${className}`} {...rest}>
        <div className={styles.stars} role={readonly ? 'img' : undefined} aria-label={readonly ? `Rating: ${value} out of ${max}` : undefined}>
          {stars}
        </div>
        {(showValue || count !== undefined) && (
          <div className={styles.info}>
            {showValue && <span className={styles.valueText}>{value.toFixed(1)}</span>}
            {count !== undefined && (
              <span className={styles.countText}>({count.toLocaleString()} reviews)</span>
            )}
          </div>
        )}
        {!readonly && hoverValue !== null && (
          <span className={styles.hoverPreview} aria-live="polite">
            {hoverValue} star{hoverValue > 1 ? 's' : ''}
          </span>
        )}
      </div>
    );
  },
);

DesktopRating.displayName = 'DesktopRating';
