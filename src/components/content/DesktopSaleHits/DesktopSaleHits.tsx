'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, useRef, useState, useCallback } from 'react';
import styles from './DesktopSaleHits.module.scss';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SaleHitItem {
  id: string;
  image: string;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  currency?: string;
  onClick?: () => void;
}

export interface DesktopSaleHitsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Section title */
  title?: string;
  /** Section subtitle */
  subtitle?: string;
  /** Product items */
  items: SaleHitItem[];
  /** Callback when "More" button is clicked */
  onViewAll?: () => void;
  /** Text for "More" button */
  viewAllText?: string;
  /** Custom icon element — defaults to red ХИТ badge */
  icon?: React.ReactNode;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatPrice(value: number): string {
  const isDecimal = value % 1 !== 0;
  const str = isDecimal ? value.toFixed(2) : Math.floor(value).toString();
  const [intPart, decPart] = str.split('.');
  const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return decPart ? `${formatted}.${decPart}` : formatted;
}

// ─── Icons ───────────────────────────────────────────────────────────────────

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export const DesktopSaleHits = forwardRef<HTMLDivElement, DesktopSaleHitsProps>(
  (
    {
      title = 'Хиты распродаж',
      subtitle = 'Покупайте самое классное выгодно',
      items,
      onViewAll,
      viewAllText = 'Ещё',
      icon,
      className,
      ...rest
    },
    ref,
  ) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const handleScroll = useCallback(() => {
      const el = scrollRef.current;
      if (!el) return;
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    }, []);

    const scrollRight = useCallback(() => {
      const el = scrollRef.current;
      if (!el) return;
      el.scrollBy({ left: 320, behavior: 'smooth' });
    }, []);

    return (
      <section ref={ref} className={cn(styles.root, className)} aria-label={title} {...rest}>
        {/* ─── Header ─── */}
        <div className={styles.header}>
          <div className={styles.titleArea}>
            {icon ?? <div className={styles.hitIcon}>ХИТ</div>}
            <div className={styles.titleText}>
              <h2 className={styles.title}>{title}</h2>
              {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </div>
          </div>
          {onViewAll && (
            <button type="button" className={styles.viewAllBtn} onClick={onViewAll}>
              {viewAllText}
              <ChevronRightIcon />
            </button>
          )}
        </div>

        {/* ─── Scrollable Cards ─── */}
        <div className={styles.scrollWrapper}>
          <div
            ref={scrollRef}
            className={styles.scrollRow}
            onScroll={handleScroll}
          >
            {items.map((item) => (
              <div
                key={item.id}
                className={styles.card}
                onClick={item.onClick}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    item.onClick?.();
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <div className={styles.cardImageWrap}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={styles.cardImage}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className={styles.cardContent}>
                  <span className={styles.cardPrice}>
                    {formatPrice(item.price)} {item.currency || 'UZS'}
                  </span>
                  {item.originalPrice && (
                    <div className={styles.cardOldPriceRow}>
                      <span className={styles.cardOldPrice}>
                        {formatPrice(item.originalPrice)}
                      </span>
                      {item.discount && (
                        <span className={styles.cardDiscount}>{item.discount}</span>
                      )}
                    </div>
                  )}
                  <span className={styles.cardTitle}>{item.title}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll arrow */}
          {canScrollRight && (
            <button
              type="button"
              className={styles.scrollArrow}
              onClick={scrollRight}
              aria-label="Scroll right"
            >
              <ArrowRightIcon />
            </button>
          )}
        </div>
      </section>
    );
  },
);

DesktopSaleHits.displayName = 'DesktopSaleHits';
