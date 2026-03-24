'use client';
import { cn } from '../../../utils/cn';
import { formatNumber } from '../../../utils/formatPrice';
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
  /** Section title (default: "Sale Hits") */
  title?: string;
  /** Section subtitle */
  subtitle?: string;
  /** Product items */
  items: SaleHitItem[];
  /** Callback when "More" button is clicked */
  onViewAll?: () => void;
  /** Text for "More" button (default: "More") */
  viewAllText?: string;
  /** Custom icon element — defaults to red "HOT" badge */
  icon?: React.ReactNode;
  /** Card width in pixels (default: 150) */
  cardWidth?: number;
  /** Image object-fit (default: 'cover') */
  imageFit?: 'cover' | 'contain' | 'fill';
  /** Background gradient or color (CSS value) */
  background?: string;
  /** Custom card renderer — replaces default card layout */
  renderCard?: (item: SaleHitItem, index: number) => React.ReactNode;
  /** Scroll left aria-label (default: "Scroll left") */
  scrollLeftAriaLabel?: string;
  /** Scroll right aria-label (default: "Scroll right") */
  scrollRightAriaLabel?: string;
}

// ─── Icons ───────────────────────────────────────────────────────────────────

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function ArrowIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {direction === 'right' ? (
        <><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></>
      ) : (
        <><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></>
      )}
    </svg>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export const DesktopSaleHits = forwardRef<HTMLDivElement, DesktopSaleHitsProps>(
  (
    {
      title = 'Sale Hits',
      subtitle,
      items,
      onViewAll,
      viewAllText = 'More',
      icon,
      cardWidth = 150,
      imageFit = 'cover',
      background,
      renderCard,
      scrollLeftAriaLabel = 'Scroll left',
      scrollRightAriaLabel = 'Scroll right',
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const updateScrollState = useCallback(() => {
      const el = scrollRef.current;
      if (!el) return;
      setCanScrollLeft(el.scrollLeft > 4);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    }, []);

    const scroll = useCallback((direction: 'left' | 'right') => {
      const el = scrollRef.current;
      if (!el) return;
      const amount = cardWidth * 2 + 12;
      el.scrollBy({ left: direction === 'right' ? amount : -amount, behavior: 'smooth' });
    }, [cardWidth]);

    const rootStyle = {
      ...style,
      ...(background ? { background } : {}),
      '--card-width': `${cardWidth}px`,
    } as React.CSSProperties;

    return (
      <section
        ref={ref}
        className={cn(styles.root, className)}
        style={rootStyle}
        aria-label={title}
        {...rest}
      >
        {/* ─── Header ─── */}
        <div className={styles.header}>
          <div className={styles.titleArea}>
            {icon ?? <div className={styles.hitIcon}>HOT</div>}
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
          {canScrollLeft && (
            <button
              type="button"
              className={cn(styles.scrollArrow, styles.scrollArrowLeft)}
              onClick={() => scroll('left')}
              aria-label={scrollLeftAriaLabel}
            >
              <ArrowIcon direction="left" />
            </button>
          )}

          <div
            ref={scrollRef}
            className={styles.scrollRow}
            onScroll={updateScrollState}
          >
            {items.map((item, index) =>
              renderCard ? (
                <div key={item.id} className={styles.card}>{renderCard(item, index)}</div>
              ) : (
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
                      style={imageFit !== 'cover' ? { objectFit: imageFit } : undefined}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <span className={styles.cardPrice}>
                      {formatNumber(item.price)}{item.currency ? ` ${item.currency}` : ''}
                    </span>
                    {item.originalPrice && (
                      <div className={styles.cardOldPriceRow}>
                        <span className={styles.cardOldPrice}>
                          {formatNumber(item.originalPrice)}
                        </span>
                        {item.discount && (
                          <span className={styles.cardDiscount}>{item.discount}</span>
                        )}
                      </div>
                    )}
                    <span className={styles.cardTitle}>{item.title}</span>
                  </div>
                </div>
              ),
            )}
          </div>

          {canScrollRight && (
            <button
              type="button"
              className={cn(styles.scrollArrow, styles.scrollArrowRight)}
              onClick={() => scroll('right')}
              aria-label={scrollRightAriaLabel}
            >
              <ArrowIcon direction="right" />
            </button>
          )}
        </div>
      </section>
    );
  },
);

DesktopSaleHits.displayName = 'DesktopSaleHits';
