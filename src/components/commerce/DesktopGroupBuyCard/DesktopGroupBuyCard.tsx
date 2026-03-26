'use client';
import { useGeekShop } from '../../../i18n';
import { cn } from '../../../utils/cn';
import { formatNumber } from '../../../utils/formatPrice';
import {
  forwardRef,
  useState,
  useEffect,
  useCallback,
  type HTMLAttributes,
  type MouseEvent,
} from 'react';
import styles from './DesktopGroupBuyCard.module.scss';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface DesktopGroupBuyProduct {
  /** Product name */
  name: string;
  /** Product image URL */
  image: string;
  /** Group buy price in UZS */
  price: number;
  /** Original/solo price in UZS */
  originalPrice: number;
}

export interface DesktopGroupBuyCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Product information */
  product: DesktopGroupBuyProduct;
  /** Total members needed for group buy */
  groupSize: number;
  /** Number of current members */
  currentMembers: number;
  /** Avatar URLs for current members */
  memberAvatars?: string[];
  /** Time left in seconds */
  timeLeft: number;
  /** Handler when user clicks "Join Group" */
  onJoinGroup?: () => void;
  /** Handler when user clicks "Buy Alone" */
  onBuyAlone?: () => void;
}

function useSecondsCountdown(initialSeconds: number) {
  const [remaining, setRemaining] = useState(initialSeconds);

  useEffect(() => {
    setRemaining(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (remaining <= 0) return;
    const timer = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [remaining]);

  const isExpired = remaining <= 0;
  const hours = Math.floor(remaining / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;

  return { hours, minutes, seconds, isExpired };
}

function formatTimeLeft(hours: number, minutes: number, seconds: number): string {
  if (hours > 0) {
    return `${hours}h ${String(minutes).padStart(2, '0')}m`;
  }
  return `${minutes}m ${String(seconds).padStart(2, '0')}s`;
}

// ─── Inline SVG Icons ────────────────────────────────────────────────────────

function PersonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="5" r="2.5" fill="currentColor" />
      <path d="M3 13c0-2.76 2.24-5 5-5s5 2.24 5 5" fill="currentColor" />
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

// ─── Component ───────────────────────────────────────────────────────────────

export const DesktopGroupBuyCard = forwardRef<HTMLDivElement, DesktopGroupBuyCardProps>(
  (
    {
      product,
      groupSize,
      currentMembers,
      memberAvatars = [],
      timeLeft,
      onJoinGroup,
      onBuyAlone,
      className = '',
      ...rest
    },
    ref
  ) => {
    const { t } = useGeekShop();
    const countdown = useSecondsCountdown(timeLeft);
    const timeDisplay = countdown.isExpired
      ? 'Expired'
      : formatTimeLeft(countdown.hours, countdown.minutes, countdown.seconds);

    const isFull = currentMembers >= groupSize;
    const isExpired = countdown.isExpired;
    const isDisabled = isFull || isExpired;
    const progressPercent = Math.min((currentMembers / groupSize) * 100, 100);

    const avatarSlots = Array.from({ length: groupSize }, (_, i) => {
      if (i < memberAvatars.length) {
        return { type: 'avatar' as const, src: memberAvatars[i] };
      }
      if (i < currentMembers) {
        return { type: 'filled' as const };
      }
      return { type: 'empty' as const };
    });

    const handleJoin = useCallback(
      (e: MouseEvent) => {
        e.stopPropagation();
        onJoinGroup?.();
      },
      [onJoinGroup]
    );

    const handleBuyAlone = useCallback(
      (e: MouseEvent) => {
        e.stopPropagation();
        onBuyAlone?.();
      },
      [onBuyAlone]
    );

    return (
      <div
        ref={ref}
        className={cn(styles.root, isDisabled ? styles.disabled : '', className)}
        {...rest}
      >
        {/* Left: Product image */}
        <img
          className={styles.image}
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={120}
          height={120}
        />

        {/* Center: Product info + progress */}
        <div className={styles.center}>
          <p className={styles.name}>{product.name}</p>

          <div className={styles.priceRow}>
            <div className={styles.priceGroup}>
              <span className={styles.priceLabel}>Group price</span>
              <span className={styles.groupPrice}>{formatNumber(product.price)} sum</span>
            </div>
            <span className={styles.priceDivider} />
            <div className={styles.priceGroup}>
              <span className={styles.priceLabel}>Solo price</span>
              <span className={styles.soloPrice}>{formatNumber(product.originalPrice)} sum</span>
            </div>
          </div>

          {/* Avatars */}
          <div
            className={styles.avatarRow}
            role="group"
            aria-label={`${currentMembers} of ${groupSize} joined`}
          >
            {avatarSlots.map((slot, i) => (
              <span key={i} className={styles.avatarSlot}>
                {slot.type === 'avatar' ? (
                  <img
                    className={styles.avatarImg}
                    src={slot.src}
                    alt=""
                    loading="lazy"
                    width={32}
                    height={32}
                  />
                ) : slot.type === 'filled' ? (
                  <span className={styles.avatarFilled} aria-hidden="true">
                    <PersonIcon />
                  </span>
                ) : (
                  <span className={styles.avatarEmpty} aria-hidden="true">
                    ?
                  </span>
                )}
              </span>
            ))}
            <span className={styles.memberCount}>
              {currentMembers}/{groupSize}
            </span>
          </div>

          {/* Timer */}
          <div className={styles.timerRow}>
            <ClockIcon />
            <span className={styles.timeText}>{timeDisplay}</span>
          </div>
        </div>

        {/* Right: Progress + CTA */}
        <div className={styles.right}>
          {/* Progress bar */}
          <div className={styles.progressWrapper}>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${progressPercent}%` }} />
            </div>
            <span className={styles.progressLabel}>{Math.round(progressPercent)}% filled</span>
          </div>

          {/* Actions */}
          <button
            type="button"
            className={styles.joinBtn}
            onClick={handleJoin}
            disabled={isDisabled}
            aria-label={isFull ? 'Group is full' : 'Join group buy'}
          >
            {isFull ? 'Full' : 'Join Group'}
          </button>
          <button
            type="button"
            className={styles.soloBtn}
            onClick={handleBuyAlone}
            aria-label={t('aria.buyAlone')}
          >
            Buy Alone
          </button>
        </div>
      </div>
    );
  }
);

DesktopGroupBuyCard.displayName = 'DesktopGroupBuyCard';
