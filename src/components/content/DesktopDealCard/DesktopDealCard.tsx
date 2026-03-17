import { forwardRef, type HTMLAttributes, type MouseEvent } from 'react';
import { useCountdown } from '../../../hooks/useCountdown';
import styles from './DesktopDealCard.module.scss';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DesktopDealCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Product image URL */
  image: string;
  /** Product title */
  title: string;
  /** Current sale price in so'm */
  price: number;
  /** Original price before discount in so'm */
  originalPrice: number;
  /** Discount percentage (e.g. 26 for -26%) */
  discount: number;
  /** Star rating 0-5 */
  rating?: number;
  /** Number of reviews */
  reviewCount?: number;
  /** Percentage of items sold (0-100) */
  soldPercent?: number;
  /** Countdown end time. If not provided, no countdown shown */
  endTime?: Date;
  /** Callback when Buy Now button is clicked */
  onBuy?: () => void;
  /** Callback when card is clicked */
  onClick?: () => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(value: number): string {
  return value.toLocaleString('uz-UZ').replace(/,/g, ' ');
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

// ─── Inline SVG Icons ─────────────────────────────────────────────────────────

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

// ─── Countdown Sub-component ──────────────────────────────────────────────────

function CountdownDisplay({ endTime }: { endTime: Date }) {
  const { hours, minutes, seconds, isExpired } = useCountdown(endTime);

  if (isExpired) {
    return (
      <div className={styles.countdown}>
        <ClockIcon />
        <span className={styles.countdownText}>Expired</span>
      </div>
    );
  }

  return (
    <div className={styles.countdown}>
      <ClockIcon />
      <span className={styles.countdownTime}>
        {pad(hours)}:{pad(minutes)}:{pad(seconds)}
      </span>
      <span className={styles.countdownText}>remaining</span>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export const DesktopDealCard = forwardRef<HTMLDivElement, DesktopDealCardProps>(
  (
    {
      image,
      title,
      price,
      originalPrice,
      discount,
      rating,
      reviewCount,
      soldPercent,
      endTime,
      onBuy,
      onClick,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const handleBuyClick = (e: MouseEvent) => {
      e.stopPropagation();
      onBuy?.();
    };

    const handleCardClick = () => {
      onClick?.();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick?.();
      }
    };

    const stars = rating !== undefined ? Array.from({ length: 5 }, (_, i) => i < Math.round(rating)) : null;

    return (
      <div
        ref={ref}
        className={`${styles.root} ${className}`}
        onClick={onClick ? handleCardClick : undefined}
        onKeyDown={onClick ? handleKeyDown : undefined}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        {...rest}
      >
        {/* Image area */}
        <div className={styles.imageArea}>
          <img className={styles.image} src={image} alt={title} loading="lazy" />
          <span className={styles.discountBadge}>-{discount}%</span>
        </div>

        {/* Info area */}
        <div className={styles.infoArea}>
          <h3 className={styles.title}>{title}</h3>

          {/* Rating row */}
          {stars && (
            <div className={styles.ratingRow}>
              <span className={styles.stars} aria-label={`Rating: ${rating} out of 5`}>
                {stars.map((filled, i) => (
                  <StarIcon key={i} filled={filled} />
                ))}
              </span>
              {reviewCount !== undefined && (
                <span className={styles.reviewCount}>({reviewCount} reviews)</span>
              )}
            </div>
          )}

          {/* Price row */}
          <div className={styles.priceRow}>
            <span className={styles.currentPrice}>{formatPrice(price)} so'm</span>
            <span className={styles.originalPrice}>{formatPrice(originalPrice)} so'm</span>
            <span className={styles.discountTag}>-{discount}%</span>
          </div>

          {/* Progress bar */}
          {soldPercent !== undefined && soldPercent > 0 && (
            <div className={styles.progressArea}>
              <span className={styles.progressLabel}>{soldPercent}% sold</span>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${Math.min(soldPercent, 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Countdown */}
          {endTime && <CountdownDisplay endTime={endTime} />}

          {/* Buy button */}
          <div className={styles.buyRow}>
            <button
              type="button"
              className={styles.buyButton}
              onClick={handleBuyClick}
              aria-label={`Buy ${title}`}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    );
  },
);

DesktopDealCard.displayName = 'DesktopDealCard';
