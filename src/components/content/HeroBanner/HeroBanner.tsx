import { type FC, type MouseEventHandler } from 'react';
import styles from './HeroBanner.module.scss';

export interface HeroBannerProps {
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

const HeroBanner: FC<HeroBannerProps> = ({
  title,
  subtitle,
  badge,
  bgGradient = 'linear-gradient(135deg, #FF5000 0%, #FF7A33 100%)',
  image,
  onClick,
}) => {
  return (
    <div
      className={styles.heroBanner}
      style={{ background: bgGradient }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
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
};

export default HeroBanner;
