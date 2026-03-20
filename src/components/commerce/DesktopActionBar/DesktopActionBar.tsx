import { cn } from '../../../utils/cn';
'use client';
import { forwardRef, useCallback, type HTMLAttributes, type MouseEvent } from 'react';
import styles from './DesktopActionBar.module.scss';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface DesktopActionBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Primary CTA button label */
  primaryLabel?: string;
  /** Secondary CTA button label */
  secondaryLabel?: string;
  /** Handler for primary CTA */
  onPrimary?: () => void;
  /** Handler for secondary CTA */
  onSecondary?: () => void;
  /** Current price in UZS */
  price?: number;
  /** Original price (strikethrough) in UZS */
  originalPrice?: number;
  /** Whether item is favorited */
  isFavorite?: boolean;
  /** Handler for favorite toggle */
  onFavorite?: () => void;
  /** Share button label */
  shareLabel?: string;
  /** Handler for share button */
  onShare?: () => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatPrice(value: number): string {
  return value.toLocaleString('en-US').replace(/,/g, ' ') + ' sum';
}

// ─── Inline SVG Icons ────────────────────────────────────────────────────────

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20.84 4.61C20.3292 4.09924 19.7228 3.69397 19.0554 3.41708C18.3879 3.14019 17.6725 2.99734 16.95 2.99734C16.2275 2.99734 15.5121 3.14019 14.8446 3.41708C14.1772 3.69397 13.5708 4.09924 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99789 7.05 2.99789C5.59096 2.99789 4.1917 3.57831 3.16 4.61C2.1283 5.64169 1.54789 7.04097 1.54789 8.5C1.54789 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.3508 11.8792 21.756 11.2728 22.0329 10.6053C22.3098 9.93789 22.4527 9.22249 22.4527 8.5C22.4527 7.77751 22.3098 7.0621 22.0329 6.39464C21.756 5.72718 21.3508 5.12075 20.84 4.61Z"
        stroke={filled ? '#FF0000' : 'currentColor'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={filled ? '#FF0000' : 'none'}
      />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export const DesktopActionBar = forwardRef<HTMLDivElement, DesktopActionBarProps>(
  (
    {
      primaryLabel = 'Buy Now',
      secondaryLabel = 'Add to Cart',
      onPrimary,
      onSecondary,
      price,
      originalPrice,
      isFavorite = false,
      onFavorite,
      shareLabel = 'Share',
      onShare,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const handlePrimary = useCallback(
      (e: MouseEvent) => {
        e.stopPropagation();
        onPrimary?.();
      },
      [onPrimary],
    );

    const handleSecondary = useCallback(
      (e: MouseEvent) => {
        e.stopPropagation();
        onSecondary?.();
      },
      [onSecondary],
    );

    const handleFavorite = useCallback(
      (e: MouseEvent) => {
        e.stopPropagation();
        onFavorite?.();
      },
      [onFavorite],
    );

    const handleShare = useCallback(
      (e: MouseEvent) => {
        e.stopPropagation();
        onShare?.();
      },
      [onShare],
    );

    return (
      <div ref={ref} className={cn(styles.root, className)} {...rest}>
        {/* Price section */}
        {price !== undefined && (
          <div className={styles.priceSection}>
            <span className={styles.price}>{formatPrice(price)}</span>
            {originalPrice !== undefined && originalPrice > price && (
              <span className={styles.originalPrice}>{formatPrice(originalPrice)}</span>
            )}
          </div>
        )}

        {/* Utility buttons */}
        <div className={styles.utilities}>
          {onFavorite && (
            <button
              type="button"
              className={cn(styles.utilBtn, isFavorite ? styles.utilBtnActive : '')}
              onClick={handleFavorite}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              aria-pressed={isFavorite}
            >
              <HeartIcon filled={isFavorite} />
            </button>
          )}
          {onShare && (
            <button
              type="button"
              className={styles.utilBtn}
              onClick={handleShare}
              aria-label={shareLabel}
            >
              <ShareIcon />
              <span className={styles.utilLabel}>{shareLabel}</span>
            </button>
          )}
        </div>

        {/* CTA buttons */}
        <div className={styles.actions}>
          {onSecondary && (
            <button
              type="button"
              className={styles.secondaryBtn}
              onClick={handleSecondary}
            >
              {secondaryLabel}
            </button>
          )}
          {onPrimary && (
            <button
              type="button"
              className={styles.primaryBtn}
              onClick={handlePrimary}
            >
              {primaryLabel}
            </button>
          )}
        </div>
      </div>
    );
  },
);

DesktopActionBar.displayName = 'DesktopActionBar';
