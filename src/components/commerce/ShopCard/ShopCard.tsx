import { cn } from '../../../utils/cn';
'use client';
import { forwardRef, useCallback, type HTMLAttributes } from 'react';
import { useGeekShop } from '../../../i18n';
import styles from './ShopCard.module.scss';

export interface ShopCardProps extends HTMLAttributes<HTMLDivElement> {
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
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFC107" stroke="none">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function formatCount(n: number): string {
  if (n >= 10000) {
    return `${(n / 1000).toFixed(0)}K`;
  }
  if (n >= 1000) {
    return `${(n / 1000).toFixed(1)}K`;
  }
  return String(n);
}

export const ShopCard = forwardRef<HTMLDivElement, ShopCardProps>(
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
      className = '',
      ...rest
    },
    ref,
  ) => {
    const { t } = useGeekShop();

    const handleFollow = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onFollow?.();
      },
      [onFollow],
    );

    const handleEnter = useCallback(() => {
      onEnter?.();
    }, [onEnter]);

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
        onClick={onEnter ? handleEnter : undefined}
        onKeyDown={onEnter ? handleKeyDown : undefined}
        role={onEnter ? 'button' : undefined}
        tabIndex={onEnter ? 0 : undefined}
        {...rest}
      >
        {/* Logo + Name */}
        <div className={styles.header}>
          <img
            className={styles.logo}
            src={logo}
            alt={name}
            loading="lazy"
            width={48}
            height={48}
          />
          <div className={styles.nameArea}>
            <span className={styles.name}>{name}</span>
            <div className={styles.ratingRow}>
              <StarIcon />
              <span className={styles.ratingText}>{rating.toFixed(1)}</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{formatCount(productsCount)}</span>
            <span className={styles.statLabel}>{t('shop.products', { count: productsCount }).replace(`${productsCount} ta `, '').replace(`${productsCount} `, '')}</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statValue}>{formatCount(followersCount)}</span>
            <span className={styles.statLabel}>{t('shop.followers', { count: followersCount }).replace(`${followersCount} ta `, '').replace(`${followersCount} `, '')}</span>
          </div>
          {responseRate !== undefined && (
            <>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statValue}>{responseRate}%</span>
                <span className={styles.statLabel}>{t('shop.responseRate', { rate: responseRate }).replace(`${responseRate}% `, '')}</span>
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            type="button"
            className={cn(styles.followBtn, isFollowed ? styles.followBtnActive : '')}
            onClick={handleFollow}
            aria-label={isFollowed ? t('shop.following') : t('shop.follow')}
            aria-pressed={isFollowed}
          >
            {isFollowed ? (
              <>
                <CheckIcon />
                <span>{t('shop.following')}</span>
              </>
            ) : (
              <>
                <PlusIcon />
                <span>{t('shop.follow')}</span>
              </>
            )}
          </button>
          {onEnter && (
            <button
              type="button"
              className={styles.enterBtn}
              onClick={(e) => {
                e.stopPropagation();
                handleEnter();
              }}
              aria-label={t('shop.enter')}
            >
              {t('shop.enter')}
              <ChevronRightIcon />
            </button>
          )}
        </div>
      </div>
    );
  },
);

ShopCard.displayName = 'ShopCard';

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3 7l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
