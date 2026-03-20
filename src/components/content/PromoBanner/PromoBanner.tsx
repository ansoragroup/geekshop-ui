'use client';
import { cn } from '../../../utils/cn';
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
  /** Link URL — when provided, renders item as <a> */
  href?: string;
  /** Link target */
  target?: string;
}

export interface PromoBannerProps extends HTMLAttributes<HTMLDivElement> {
  /** Array of promo banner items (typically 2) */
  items: PromoBannerItem[];
}

export const PromoBanner = forwardRef<HTMLDivElement, PromoBannerProps>(
  ({ items, className, ...rest }, ref) => {

  return (
    <div ref={ref} className={cn(styles.promoBanner, className)} {...rest}>
      {items.map((item, index) => {
        const Wrapper = item.href ? 'a' : 'div';
        const linkProps = item.href ? { href: item.href, target: item.target } : {};

        return (
          <Wrapper
            key={index}
            className={styles.card}
            style={{ '--gs-promo-card-bg': item.gradient } as CSSProperties}
            onClick={item.onClick as MouseEventHandler<HTMLElement>}
            onKeyDown={item.onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); item.onClick!(e as unknown as React.MouseEvent<HTMLDivElement>); } } : undefined}
            role={item.onClick && !item.href ? 'button' : undefined}
            tabIndex={item.onClick && !item.href ? 0 : undefined}
            {...linkProps}
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
          </Wrapper>
        );
      })}
    </div>
  );
  },
);

PromoBanner.displayName = 'PromoBanner';
