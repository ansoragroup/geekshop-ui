import { cn } from '../../../utils/cn';
'use client';
import { forwardRef, useState, useEffect, type HTMLAttributes } from 'react';
import { useGeekShop } from '../../../i18n';
import styles from './GroupBuyCard.module.scss';

/** Simple countdown hook that counts down from a given number of seconds */
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
  }, [remaining > 0]); // eslint-disable-line react-hooks/exhaustive-deps

  const isExpired = remaining <= 0;
  const hours = Math.floor(remaining / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;

  return { hours, minutes, seconds, isExpired };
}

export interface GroupBuyProduct {
  name: string;
  image: string;
  price: number;
  originalPrice: number;
}

export interface GroupBuyCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Product information */
  product: GroupBuyProduct;
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

function formatTimeLeft(hours: number, minutes: number, seconds: number): string {
  if (hours > 0) {
    return `${hours}h ${String(minutes).padStart(2, '0')}m`;
  }
  return `${minutes}m ${String(seconds).padStart(2, '0')}s`;
}

function MemberDot({ filled }: { filled: boolean }) {
  return (
    <span
      className={cn(styles.dot, filled ? styles.dotFilled : styles.dotEmpty)}
      aria-hidden="true"
    />
  );
}

export const GroupBuyCard = forwardRef<HTMLDivElement, GroupBuyCardProps>(
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
    ref,
  ) => {
    const { t, formatPrice } = useGeekShop();

    const countdown = useSecondsCountdown(timeLeft);
    const timeDisplay = countdown.isExpired
      ? t('groupBuy.expired')
      : formatTimeLeft(countdown.hours, countdown.minutes, countdown.seconds);

    const isFull = currentMembers >= groupSize;
    const isExpired = countdown.isExpired;
    const isDisabled = isFull || isExpired;
    const remaining = groupSize - currentMembers;

    // Build dot indicators
    const dots = Array.from({ length: groupSize }, (_, i) => i < currentMembers);

    // Build avatar slots
    const avatarSlots = Array.from({ length: groupSize }, (_, i) => {
      if (i < memberAvatars.length) {
        return { type: 'avatar' as const, src: memberAvatars[i] };
      }
      if (i < currentMembers) {
        return { type: 'filled' as const };
      }
      return { type: 'empty' as const };
    });

    return (
      <div
        ref={ref}
        className={cn(styles.root, isDisabled ? styles.disabled : '', className)}
        {...rest}
      >
        {/* Top section: image + product info */}
        <div className={styles.top}>
          <img
            className={styles.image}
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={72}
            height={72}
          />
          <div className={styles.info}>
            <p className={styles.name}>{product.name}</p>
            <div className={styles.priceRow}>
              <span className={styles.groupLabel}>{t('groupBuy.groupPrice')}:</span>
              <span className={styles.groupPrice}>{formatPrice(product.price)}</span>
              <span className={styles.priceSep}>|</span>
              <span className={styles.soloLabel}>{t('groupBuy.soloPrice')}:</span>
              <span className={styles.soloPrice}>{formatPrice(product.originalPrice)}</span>
            </div>
          </div>
        </div>

        {/* Progress section */}
        <div className={styles.progress}>
          <div className={styles.dotsRow}>
            {dots.map((filled, i) => (
              <MemberDot key={i} filled={filled} />
            ))}
          </div>
          <div className={styles.statusRow}>
            <span className={styles.statusText}>
              {t('groupBuy.joined', { current: currentMembers, total: groupSize })}
            </span>
            <span className={styles.statusSep} aria-hidden="true">&middot;</span>
            <span className={styles.timeText}>{timeDisplay}</span>
          </div>
        </div>

        {/* Avatars */}
        <div className={styles.avatars} role="group" aria-label={t('groupBuy.joined', { current: currentMembers, total: groupSize })}>
          {avatarSlots.map((slot, i) => (
            <span key={i} className={styles.avatarSlot}>
              {slot.type === 'avatar' ? (
                <img
                  className={styles.avatarImg}
                  src={slot.src}
                  alt=""
                  loading="lazy"
                  width={36}
                  height={36}
                />
              ) : slot.type === 'filled' ? (
                <span className={styles.avatarFilled} aria-hidden="true">
                  <PersonIcon />
                </span>
              ) : (
                <span className={styles.avatarEmpty} aria-hidden="true">?</span>
              )}
            </span>
          ))}
          {remaining > 0 && !isExpired && (
            <span className={styles.remainingLabel}>
              {remaining > 0 ? `+${remaining}` : ''}
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.joinBtn}
            onClick={onJoinGroup}
            disabled={isDisabled}
            aria-label={t('groupBuy.joinGroup')}
          >
            {isFull ? t('groupBuy.full') : t('groupBuy.joinGroup')}
          </button>
          <button
            type="button"
            className={styles.soloBtn}
            onClick={onBuyAlone}
            aria-label={t('groupBuy.buyAlone')}
          >
            {t('groupBuy.buyAlone')}
          </button>
        </div>
      </div>
    );
  },
);

GroupBuyCard.displayName = 'GroupBuyCard';

function PersonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="5" r="2.5" fill="currentColor" />
      <path d="M3 13c0-2.76 2.24-5 5-5s5 2.24 5 5" fill="currentColor" />
    </svg>
  );
}
