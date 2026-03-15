import { forwardRef, type MouseEventHandler, type HTMLAttributes, type CSSProperties } from 'react';
import styles from './HeroBanner.module.scss';

export interface HeroBannerProps extends HTMLAttributes<HTMLDivElement> {
  /** Main title text */
  title: string;
  /** Subtitle text below title */
  subtitle?: string;
  /** Optional badge text (e.g. "HOT") displayed as a red pill */
  badge?: string;
  /** Custom gradient background (CSS gradient string) */
  bgGradient?: string;
  /** Optional background/hero image URL */
  image?: string;
  /** Click handler for the entire banner */
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const HeroBanner = forwardRef<HTMLDivElement, HeroBannerProps>(
  (
    {
      title,
      subtitle,
      badge,
      bgGradient = 'linear-gradient(135deg, #FF5000 0%, #FF7A33 100%)',
      image,
      onClick,
      className,
      ...rest
    },
    ref,
  ) => {
  const rootClass = [styles.heroBanner, className].filter(Boolean).join(' ');

  return (
    <div
      ref={ref}
      className={rootClass}
      style={{ '--gs-hero-bg': bgGradient } as CSSProperties}
      onClick={onClick}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(e as unknown as React.MouseEvent<HTMLDivElement>); } } : undefined}
      role={onClick ? 'button' : undefined}
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

      <div className={styles.content}>
        <div className={styles.textArea}>
          {badge && <span className={styles.badge}>{badge}</span>}
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      </div>
    </div>
  );
  },
);

HeroBanner.displayName = 'HeroBanner';
