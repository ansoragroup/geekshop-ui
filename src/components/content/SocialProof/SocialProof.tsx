import { cn } from '../../../utils/cn';
'use client';
import { forwardRef, type HTMLAttributes } from 'react';
import { useGeekShop } from '../../../i18n';
import styles from './SocialProof.module.scss';

export type SocialProofVariant = 'text' | 'toast' | 'badge';

export interface SocialProofProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of people who took the action */
  count: number;
  /** Display variant */
  variant?: SocialProofVariant;
  /** Avatar URLs to show */
  avatars?: string[];
  /** Max avatars to display before +N */
  maxAvatars?: number;
  /** Time period string (e.g., "bugun", "shu hafta") */
  period?: string;
  /** For toast variant: buyer name */
  buyerName?: string;
  /** For toast variant: time ago string */
  timeAgo?: string;
}

function PeopleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="5" cy="4" r="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1 11c0-2.21 1.79-4 4-4s4 1.79 4 4" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="10" cy="4.5" r="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M10 7.5c1.66 0 3 1.34 3 3" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function formatCount(n: number): string {
  if (n >= 10000) {
    return `${(n / 1000).toFixed(0)}K`;
  }
  if (n >= 1000) {
    return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  }
  return String(n);
}

export const SocialProof = forwardRef<HTMLDivElement, SocialProofProps>(
  (
    {
      count,
      variant = 'text',
      avatars = [],
      maxAvatars = 3,
      period,
      buyerName,
      timeAgo,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const { t } = useGeekShop();

    const visibleAvatars = avatars.slice(0, maxAvatars);
    const overflowCount = avatars.length > maxAvatars ? avatars.length - maxAvatars : 0;

    const message = period
      ? t('socialProof.peopleBought', { count: formatCount(count), period })
      : t('socialProof.peopleBoughtDefault', { count: formatCount(count) });

    // Toast variant: show individual purchase notification
    if (variant === 'toast') {
      const toastMessage = buyerName && timeAgo
        ? t('socialProof.justBought', { name: buyerName, time: timeAgo })
        : message;

      return (
        <div
          ref={ref}
          className={cn(styles.toast, className)}
          role="status"
          aria-live="polite"
          {...rest}
        >
          {buyerName && avatars.length > 0 && (
            <img
              className={styles.toastAvatar}
              src={avatars[0]}
              alt=""
              loading="lazy"
            />
          )}
          <span className={styles.toastText}>{toastMessage}</span>
        </div>
      );
    }

    // Badge variant: compact pill
    if (variant === 'badge') {
      return (
        <span
          ref={ref as React.Ref<HTMLSpanElement>}
          className={cn(styles.badge, className)}
          role="status"
          {...(rest as HTMLAttributes<HTMLSpanElement>)}
        >
          <PeopleIcon />
          <span className={styles.badgeCount}>{formatCount(count)}</span>
        </span>
      );
    }

    // Text variant (default): inline with avatars
    return (
      <div
        ref={ref}
        className={cn(styles.textRoot, className)}
        role="status"
        {...rest}
      >
        {visibleAvatars.length > 0 && (
          <div className={styles.avatarStack}>
            {visibleAvatars.map((src, i) => (
              <img
                key={i}
                className={styles.avatar}
                src={src}
                alt=""
                loading="lazy"
                style={{ zIndex: visibleAvatars.length - i }}
              />
            ))}
            {overflowCount > 0 && (
              <span className={styles.avatarOverflow}>+{overflowCount}</span>
            )}
          </div>
        )}
        <span className={styles.textIcon} aria-hidden="true">
          <PeopleIcon />
        </span>
        <span className={styles.textMessage}>{message}</span>
      </div>
    );
  },
);

SocialProof.displayName = 'SocialProof';
