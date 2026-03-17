import { forwardRef, useCallback, type MouseEventHandler, type HTMLAttributes } from 'react';
import styles from './DesktopPromoBanner.module.scss';

export type DesktopPromoBannerImageAlign = 'left' | 'right';

export interface DesktopPromoBannerProps extends HTMLAttributes<HTMLDivElement> {
  /** Banner title */
  title: string;
  /** Description text */
  description?: string;
  /** Image URL */
  image: string;
  /** Image alt text */
  imageAlt?: string;
  /** Image alignment side */
  imageAlign?: DesktopPromoBannerImageAlign;
  /** CTA button text */
  ctaText?: string;
  /** Optional tag label (e.g. "-50%", "NEW") */
  tag?: string;
  /** Background color or gradient */
  background?: string;
  /** Click handler for the CTA */
  onCtaClick?: MouseEventHandler<HTMLButtonElement>;
  /** Click handler for the entire banner */
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const DesktopPromoBanner = forwardRef<HTMLDivElement, DesktopPromoBannerProps>(
  (
    {
      title,
      description,
      image,
      imageAlt = '',
      imageAlign = 'right',
      ctaText,
      tag,
      background = 'linear-gradient(135deg, #FF5000 0%, #FF7A33 100%)',
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

    const isReversed = imageAlign === 'left';

    return (
      <div
        ref={ref}
        className={`${styles.root} ${isReversed ? styles.reversed : ''} ${className}`}
        style={{ background }}
        onClick={onClick}
        onKeyDown={onClick ? handleKeyDown : undefined}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        {...rest}
      >
        <div className={styles.content}>
          {tag && <span className={styles.tag}>{tag}</span>}
          <h3 className={styles.title}>{title}</h3>
          {description && <p className={styles.description}>{description}</p>}
          {ctaText && (
            <button
              type="button"
              className={styles.ctaButton}
              onClick={handleCtaClick}
            >
              {ctaText}
              <svg
                width="14"
                height="14"
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

        <div className={styles.imageArea}>
          <img
            className={styles.image}
            src={image}
            alt={imageAlt}
            loading="lazy"
          />
        </div>
      </div>
    );
  },
);

DesktopPromoBanner.displayName = 'DesktopPromoBanner';
