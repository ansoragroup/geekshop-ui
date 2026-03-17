import { forwardRef, useCallback, type MouseEventHandler, type HTMLAttributes, type CSSProperties } from 'react';
import styles from './DesktopHeroBanner.module.scss';

export interface DesktopHeroBannerProps extends HTMLAttributes<HTMLDivElement> {
  /** Main title text */
  title: string;
  /** Subtitle text below title */
  subtitle?: string;
  /** Optional badge text (e.g. "HOT", "NEW") */
  badge?: string;
  /** CTA button text */
  ctaText?: string;
  /** Custom gradient background (CSS gradient string) */
  bgGradient?: string;
  /** Optional background image URL */
  image?: string;
  /** Click handler for the CTA button */
  onCtaClick?: MouseEventHandler<HTMLButtonElement>;
  /** Click handler for the entire banner */
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const DesktopHeroBanner = forwardRef<HTMLDivElement, DesktopHeroBannerProps>(
  (
    {
      title,
      subtitle,
      badge,
      ctaText,
      bgGradient = 'linear-gradient(135deg, #FF5000 0%, #FF7A33 100%)',
      image,
      onCtaClick,
      onClick,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
        }
      },
      [onClick],
    );

    const handleCtaClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onCtaClick?.(e);
      },
      [onCtaClick],
    );

    return (
      <div
        ref={ref}
        className={`${styles.root} ${className}`}
        style={{ '--gs-hero-bg': bgGradient } as CSSProperties}
        onClick={onClick}
        onKeyDown={onClick ? handleKeyDown : undefined}
        role={onClick ? 'button' : 'banner'}
        tabIndex={onClick ? 0 : undefined}
        {...rest}
      >
        {image && (
          <img
            className={styles.bgImage}
            src={image}
            alt=""
            aria-hidden="true"
          />
        )}

        <div className={styles.overlay} />

        <div className={styles.content}>
          <div className={styles.textArea}>
            {badge && <span className={styles.badge}>{badge}</span>}
            <h2 className={styles.title}>{title}</h2>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            {ctaText && (
              <button
                type="button"
                className={styles.ctaButton}
                onClick={handleCtaClick}
              >
                {ctaText}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6 3l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  },
);

DesktopHeroBanner.displayName = 'DesktopHeroBanner';
