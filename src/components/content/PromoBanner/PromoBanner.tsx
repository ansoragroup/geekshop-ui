import { type FC, type MouseEventHandler } from 'react';
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

export interface PromoBannerProps {
  /** Array of promo banner items (typically 2) */
  items: PromoBannerItem[];
}

const PromoBanner: FC<PromoBannerProps> = ({ items }) => {
  return (
    <div className={styles.promoBanner}>
      {items.map((item, index) => (
        <div
          key={index}
          className={styles.card}
          style={{ background: item.gradient }}
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
};

export default PromoBanner;
