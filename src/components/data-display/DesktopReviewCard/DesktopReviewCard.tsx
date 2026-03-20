'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, useCallback, type HTMLAttributes, type MouseEvent } from 'react';
import styles from './DesktopReviewCard.module.scss';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ReviewUser {
  name: string;
  avatar?: string;
}

export interface DesktopReviewCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Review author information */
  user: ReviewUser;
  /** Star rating 1-5 */
  rating: number;
  /** Product variant, e.g. "12GB/Black" */
  variant?: string;
  /** Review text content */
  content: string;
  /** Review image URLs */
  images?: string[];
  /** Formatted date string, e.g. "14 Mar 2026" */
  date: string;
  /** Number of helpful votes */
  helpfulCount?: number;
  /** Number of not-helpful votes */
  notHelpfulCount?: number;
  /** Callback when helpful button is clicked */
  onHelpful?: () => void;
  /** Callback when not-helpful button is clicked */
  onNotHelpful?: () => void;
  /** Whether the helpful button is in active state */
  isHelpfulActive?: boolean;
  /** Whether the not-helpful button is in active state */
  isNotHelpfulActive?: boolean;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderStars(rating: number): string {
  const full = Math.floor(rating);
  const empty = 5 - full;
  return '\u2605'.repeat(full) + '\u2606'.repeat(empty);
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// ─── Inline SVG Icons ────────────────────────────────────────────────────────

function ThumbUpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
      <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  );
}

function ThumbDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z" />
      <path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
    </svg>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export const DesktopReviewCard = forwardRef<HTMLDivElement, DesktopReviewCardProps>(
  (
    {
      user,
      rating,
      variant,
      content,
      images,
      date,
      helpfulCount = 0,
      notHelpfulCount = 0,
      onHelpful,
      onNotHelpful,
      isHelpfulActive = false,
      isNotHelpfulActive = false,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const handleHelpful = useCallback(
      (e: MouseEvent) => {
        e.stopPropagation();
        onHelpful?.();
      },
      [onHelpful],
    );

    const handleNotHelpful = useCallback(
      (e: MouseEvent) => {
        e.stopPropagation();
        onNotHelpful?.();
      },
      [onNotHelpful],
    );

    return (
      <div ref={ref} className={cn(styles.root, className)} {...rest}>
        {/* Header row: avatar + name/stars left, date right */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className={styles.avatar}
                loading="lazy"
              />
            ) : (
              <div className={styles.avatarFallback} aria-hidden="true">
                {getInitials(user.name)}
              </div>
            )}
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user.name}</span>
              <div className={styles.ratingRow}>
                <span className={styles.stars} aria-label={`Rating: ${rating} out of 5`}>
                  {renderStars(rating)}
                </span>
                {variant && (
                  <>
                    <span className={styles.separator} aria-hidden="true">&bull;</span>
                    <span className={styles.variant}>Variant: {variant}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <span className={styles.date}>{date}</span>
        </div>

        {/* Review content */}
        <p className={styles.content}>{content}</p>

        {/* Review images */}
        {images && images.length > 0 && (
          <div className={styles.images} role="group" aria-label="Review images">
            {images.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Review image ${idx + 1}`}
                className={styles.thumbnail}
                loading="lazy"
              />
            ))}
          </div>
        )}

        {/* Voting row */}
        <div className={styles.votingRow}>
          <button
            type="button"
            className={cn(styles.voteButton, isHelpfulActive ? styles.voteActive : '')}
            onClick={handleHelpful}
            aria-label={`Helpful (${helpfulCount})`}
            aria-pressed={isHelpfulActive}
          >
            <ThumbUpIcon />
            <span>Helpful ({helpfulCount})</span>
          </button>
          <button
            type="button"
            className={cn(styles.voteButton, isNotHelpfulActive ? styles.voteActive : '')}
            onClick={handleNotHelpful}
            aria-label={`Not helpful (${notHelpfulCount})`}
            aria-pressed={isNotHelpfulActive}
          >
            <ThumbDownIcon />
            <span>Not helpful ({notHelpfulCount})</span>
          </button>
        </div>
      </div>
    );
  },
);

DesktopReviewCard.displayName = 'DesktopReviewCard';
