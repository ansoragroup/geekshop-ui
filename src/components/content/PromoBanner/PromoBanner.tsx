import { forwardRef, type MouseEventHandler, type HTMLAttributes, type CSSProperties } from 'react';
import styles from './PromoBanner.module.scss';

export interface PromoBannerItem {
  /** Card title */
  title: string;
  /** Subtitle description */
  subtitle?: string;
  /** Tag label (e.g. "-50%", "NEW") */
  tag?: string;
  /** CSS gradient background for the card */
  gradient: string;
  /** Inline SVG icon element */
  icon?: React.ReactNode;
  /** Click handler */
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export interface PromoBannerProps extends HTMLAttributes<HTMLDivElement> {
  /** Array of promo banner items (typically 2) */
  items: PromoBannerItem[];
}

export const PromoBanner = forwardRef<HTMLDivElement, PromoBannerProps>(
  ({ items, className, ...rest }, ref) => {
  const rootClass = [styles.promoBanner, className].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={rootClass} {...rest}>
      {items.map((item, index) => (
        <div
          key={index}
          className={styles.card}
          style={{ '--gs-promo-card-bg': item.gradient } as CSSProperties}
          onClick={item.onClick}
          role={item.onClick ? 'button' : undefined}
          tabIndex={item.onClick ? 0 : undefined}
        >
          <div className={styles.cardContent}>
            <div className={styles.textArea}>
              <h3 className={styles.title}>{item.title}</h3>
              {item.subtitle && (
                <p className={styles.subtitle}>{item.subtitle}</p>
              )}
              {item.tag && <span className={styles.tag}>{item.tag}</span>}
            </div>
            {item.icon && (
              <div className={styles.iconArea}>{item.icon}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
  },
);

PromoBanner.displayName = 'PromoBanner';
