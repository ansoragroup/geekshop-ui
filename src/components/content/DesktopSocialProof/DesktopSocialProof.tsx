import { forwardRef, type HTMLAttributes } from 'react';
import styles from './DesktopSocialProof.module.scss';

export interface DesktopSocialProofBuyer {
  /** Buyer display name */
  name: string;
  /** Buyer avatar URL */
  avatar?: string;
}

export interface DesktopSocialProofProps extends HTMLAttributes<HTMLDivElement> {
  /** Total number of buyers */
  count: number;
  /** Avatar URLs for the overlapping stack */
  avatars?: string[];
  /** Max avatars to display before showing +N */
  maxAvatars?: number;
  /** Recent buyer names to display */
  recentBuyers?: DesktopSocialProofBuyer[];
  /** Max recent buyers to show */
  maxRecentBuyers?: number;
  /** Time period description (e.g. "today", "this week") */
  period?: string;
}

function PeopleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
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

export const DesktopSocialProof = forwardRef<HTMLDivElement, DesktopSocialProofProps>(
  (
    {
      count,
      avatars = [],
      maxAvatars = 5,
      recentBuyers = [],
      maxRecentBuyers = 3,
      period,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const visibleAvatars = avatars.slice(0, maxAvatars);
    const overflowCount = avatars.length > maxAvatars ? avatars.length - maxAvatars : 0;
    const visibleBuyers = recentBuyers.slice(0, maxRecentBuyers);

    const countText = `${formatCount(count)} people purchased`;
    const periodText = period ? ` ${period}` : '';

    return (
      <div
        ref={ref}
        className={`${styles.root} ${className}`}
        role="status"
        {...rest}
      >
        {/* Avatar stack */}
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
              <span className={styles.avatarOverflow} style={{ zIndex: 0 }}>
                +{overflowCount}
              </span>
            )}
          </div>
        )}

        {/* Count and period text */}
        <div className={styles.textArea}>
          <div className={styles.countRow}>
            <span className={styles.iconWrapper} aria-hidden="true">
              <PeopleIcon />
            </span>
            <span className={styles.countText}>
              {countText}{periodText}
            </span>
          </div>

          {/* Recent buyers */}
          {visibleBuyers.length > 0 && (
            <div className={styles.recentBuyers}>
              <span className={styles.recentLabel}>Recent:</span>
              {visibleBuyers.map((buyer, i) => (
                <span key={i} className={styles.buyerChip}>
                  {buyer.avatar && (
                    <img
                      className={styles.buyerAvatar}
                      src={buyer.avatar}
                      alt=""
                      loading="lazy"
                    />
                  )}
                  <span className={styles.buyerName}>{buyer.name}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  },
);

DesktopSocialProof.displayName = 'DesktopSocialProof';
