import { forwardRef, type HTMLAttributes } from 'react';
import styles from './AuthenticityBadge.module.scss';

export type AuthenticityStatus = 'verified' | 'pending' | 'unverified';
export type AuthenticityType = 'inline' | 'card';

export interface AuthenticityBadgeProps extends HTMLAttributes<HTMLDivElement> {
  /** Verification status */
  status: AuthenticityStatus;
  /** Display type */
  type?: AuthenticityType;
  /** Name of the verifying authority */
  verifiedBy?: string;
  /** Date of verification */
  verifiedDate?: string;
}

const ShieldIcon = ({ status }: { status: AuthenticityStatus }) => {
  if (status === 'verified') {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M8 1L2.5 3.5V7.5C2.5 11 5 13.5 8 15C11 13.5 13.5 11 13.5 7.5V3.5L8 1Z"
          fill="#07C160"
          stroke="#07C160"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path
          d="M5.5 8L7 9.5L10.5 6"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (status === 'pending') {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M8 1L2.5 3.5V7.5C2.5 11 5 13.5 8 15C11 13.5 13.5 11 13.5 7.5V3.5L8 1Z"
          fill="#FFA726"
          stroke="#FFA726"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <circle cx="8" cy="6.5" r="1" fill="white" />
        <rect x="7.25" y="8.5" width="1.5" height="3.5" rx="0.75" fill="white" />
      </svg>
    );
  }

  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M8 1L2.5 3.5V7.5C2.5 11 5 13.5 8 15C11 13.5 13.5 11 13.5 7.5V3.5L8 1Z"
        fill="none"
        stroke="#CCCCCC"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M6 6L10 10M10 6L6 10"
        stroke="#CCCCCC"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
};

const ShieldIconLarge = ({ status }: { status: AuthenticityStatus }) => {
  if (status === 'verified') {
    return (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path
          d="M16 2L5 7V15C5 22 10 27 16 30C22 27 27 22 27 15V7L16 2Z"
          fill="#07C160"
          stroke="#07C160"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M11 16L14 19L21 12"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (status === 'pending') {
    return (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path
          d="M16 2L5 7V15C5 22 10 27 16 30C22 27 27 22 27 15V7L16 2Z"
          fill="#FFA726"
          stroke="#FFA726"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="13" r="2" fill="white" />
        <rect x="14.5" y="17" width="3" height="7" rx="1.5" fill="white" />
      </svg>
    );
  }

  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path
        d="M16 2L5 7V15C5 22 10 27 16 30C22 27 27 22 27 15V7L16 2Z"
        fill="none"
        stroke="#CCCCCC"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M12 12L20 20M20 12L12 20"
        stroke="#CCCCCC"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

const STATUS_LABELS: Record<AuthenticityStatus, string> = {
  verified: 'Tekshirilgan',
  pending: 'Tekshirilmoqda',
  unverified: 'Tekshirilmagan',
};

export const AuthenticityBadge = forwardRef<HTMLDivElement, AuthenticityBadgeProps>(
  (
    {
      status,
      type = 'inline',
      verifiedBy = 'GeekShop Verify',
      verifiedDate,
      className = '',
      ...rest
    },
    ref,
  ) => {
    if (type === 'inline') {
      return (
        <div
          ref={ref}
          className={`${styles.inline} ${styles[`status-${status}`]} ${className}`}
          role="status"
          aria-label={`${STATUS_LABELS[status]} ${verifiedBy}`}
          {...rest}
        >
          <ShieldIcon status={status} />
          <span className={styles.inlineLabel}>
            {STATUS_LABELS[status]}
          </span>
          <span className={styles.inlineDot} aria-hidden="true">
            &middot;
          </span>
          <span className={styles.inlineVerifier}>
            {verifiedBy}
          </span>
        </div>
      );
    }

    // Card type
    return (
      <div
        ref={ref}
        className={`${styles.card} ${styles[`status-${status}`]} ${className}`}
        role="status"
        aria-label={`${STATUS_LABELS[status]} ${verifiedBy}`}
        {...rest}
      >
        <div className={styles.cardIcon}>
          <ShieldIconLarge status={status} />
        </div>
        <div className={styles.cardContent}>
          <span className={styles.cardLabel}>
            {STATUS_LABELS[status]}
          </span>
          <span className={styles.cardVerifier}>
            {verifiedBy}
          </span>
          {verifiedDate && (
            <span className={styles.cardDate}>
              {verifiedDate}
            </span>
          )}
        </div>
      </div>
    );
  }
);

AuthenticityBadge.displayName = 'AuthenticityBadge';
