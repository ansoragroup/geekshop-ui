'use client';
import { useGeekShop } from '../../../i18n';
import { cn } from '../../../utils/cn';
import { formatCount } from '../../../utils/formatPrice';
import { forwardRef, useCallback, type HTMLAttributes, type MouseEvent } from 'react';
import styles from './DesktopShopCard.module.scss';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface DesktopShopCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Shop name */
  name: string;
  /** Shop logo URL */
  logo: string;
  /** Shop rating (0-5) */
  rating: number;
  /** Number of followers */
  followersCount: number;
  /** Number of products */
  productsCount: number;
  /** Response rate percentage (0-100) */
  responseRate?: number;
  /** Whether the user is already following */
  isFollowed?: boolean;
  /** Handler when follow button is clicked */
  onFollow?: () => void;
  /** Handler when "enter shop" is clicked */
  onEnter?: () => void;
  /** Handler when "chat" is clicked */
  onChat?: () => void;
}

// ─── Inline SVG Icons ────────────────────────────────────────────────────────

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--gs-color-star-filled, #FFC107)" stroke="none" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 7l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export const DesktopShopCard = forwardRef<HTMLDivElement, DesktopShopCardProps>(
  (
    {
      name,
      logo,
      rating,
      followersCount,
      productsCount,
      responseRate,
      isFollowed = false,
      onFollow,
      onEnter,
      onChat,
      className = '',
      ...rest
    },
    ref,
  ) => {
  const { t } = useGeekShop();
    const handleFollow = useCallback(
      (e: MouseEvent) => {
        e.stopPropagation();
        onFollow?.();
      },
      [onFollow],
    );

    const handleEnter = useCallback(
      (e: MouseEvent) => {
        e.stopPropagation();
        onEnter?.();
      },
      [onEnter],
    );

    const handleChat = useCallback(
      (e: MouseEvent) => {
        e.stopPropagation();
        onChat?.();
      },
      [onChat],
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (onEnter && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onEnter();
        }
      },
      [onEnter],
    );

    return (
      <div
        ref={ref}
        className={cn(styles.root, onEnter ? styles.clickable : '', className)}
        onClick={onEnter ? () => onEnter() : undefined}
        onKeyDown={onEnter ? handleKeyDown : undefined}
        role={onEnter ? 'button' : undefined}
        tabIndex={onEnter ? 0 : undefined}
        {...rest}
      >
        {/* Left: Logo */}
        <img
          className={styles.logo}
          src={logo}
          alt={name}
          loading="lazy"
          width={56}
          height={56}
        />

        {/* Center: Name + rating */}
        <div className={styles.info}>
          <span className={styles.name}>{name}</span>
          <div className={styles.ratingRow}>
            <StarIcon />
            <span className={styles.ratingText}>{rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Stats */}
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{formatCount(productsCount)}</span>
            <span className={styles.statLabel}>Products</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statValue}>{formatCount(followersCount)}</span>
            <span className={styles.statLabel}>Followers</span>
          </div>
          {responseRate !== undefined && (
            <>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statValue}>{responseRate}%</span>
                <span className={styles.statLabel}>Response</span>
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          {onChat && (
            <button
              type="button"
              className={styles.chatBtn}
              onClick={handleChat}
              aria-label={t('aria.chatWithShop')}
            >
              <ChatIcon />
            </button>
          )}
          {onFollow && (
            <button
              type="button"
              className={cn(styles.followBtn, isFollowed ? styles.followBtnActive : '')}
              onClick={handleFollow}
              aria-label={isFollowed ? 'Following' : 'Follow'}
              aria-pressed={isFollowed}
            >
              {isFollowed ? (
                <>
                  <CheckIcon />
                  <span>Following</span>
                </>
              ) : (
                <>
                  <PlusIcon />
                  <span>Follow</span>
                </>
              )}
            </button>
          )}
          {onEnter && (
            <button
              type="button"
              className={styles.enterBtn}
              onClick={handleEnter}
              aria-label={t('aria.enterShop')}
            >
              <span>Visit</span>
              <ChevronRightIcon />
            </button>
          )}
        </div>
      </div>
    );
  },
);

DesktopShopCard.displayName = 'DesktopShopCard';
