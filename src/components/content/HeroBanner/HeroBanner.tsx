'use client';
import { cn } from '../../../utils/cn';
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
  /** Link URL — when provided, renders as <a> */
  href?: string;
  /** Link target */
  target?: string;
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
      href,
      target,
      className,
      ...rest
    },
    ref,
  ) => {
  const Wrapper = href ? 'a' : 'div';
  const linkProps = href ? { href, target } : {};

  return (
    <Wrapper
      ref={ref as React.Ref<HTMLDivElement & HTMLAnchorElement>}
      className={cn(styles.heroBanner, className)}
      style={{ '--gs-hero-bg': bgGradient } as CSSProperties}
      onClick={onClick as MouseEventHandler<HTMLElement>}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(e as unknown as React.MouseEvent<HTMLDivElement>); } } : undefined}
      role={onClick && !href ? 'button' : undefined}
      tabIndex={onClick && !href ? 0 : undefined}
      {...linkProps}
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
    </Wrapper>
  );
  },
);

HeroBanner.displayName = 'HeroBanner';
