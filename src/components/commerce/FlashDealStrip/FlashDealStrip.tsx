'use client';
import { useGeekShop } from '../../../i18n';
import { cn } from '../../../utils/cn';
import { formatCompactPrice } from '../../../utils/formatPrice';
import { forwardRef, useState, useCallback, useRef, type HTMLAttributes, type MouseEvent } from 'react';
import { useCountdown } from '../../../hooks/useCountdown';
import styles from './FlashDealStrip.module.scss';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface FlashDealItem {
  /** Unique identifier */
  id: string;
  /** Product image URL */
  image: string;
  /** Product title */
  title: string;
  /** Sale price in UZS */
  price: number;
  /** Original price before discount */
  originalPrice: number;
  /** Discount text, e.g. "-28%" */
  discount: string;
  /** Percentage of stock sold (0-100) */
  soldPercent: number;
}

export interface FlashDealStripProps extends HTMLAttributes<HTMLDivElement> {
  /** Array of flash deal items */
  items: FlashDealItem[];
  /** End time for the flash deal countdown */
  endTime: Date;
  /** Section title */
  title?: string;
  /** Callback when "View All" is clicked */
  onViewAll?: () => void;
  /** Callback when "Buy" is clicked on an item */
  onBuy?: (item: FlashDealItem) => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

// ─── Inline SVG Icons ────────────────────────────────────────────────────────

function LightningIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13 2L3 14h9l-1 10 10-12h-9l1-10z" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export const FlashDealStrip = forwardRef<HTMLDivElement, FlashDealStripProps>(
  (
    {
      items,
      endTime,
      title = 'FLASH DEALS',
      onViewAll,
      onBuy,
      className = '',
      ...rest
    },
    ref,
  ) => {
  const { t } = useGeekShop();
    const countdown = useCountdown(endTime);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const handleScroll = useCallback(() => {
      const el = scrollRef.current;
      if (!el) return;
      setShowLeftArrow(el.scrollLeft > 10);
      setShowRightArrow(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    }, []);

    const scrollBy = useCallback((direction: 'left' | 'right') => {
      const el = scrollRef.current;
      if (!el) return;
      const amount = direction === 'left' ? -200 : 200;
      el.scrollBy({ left: amount, behavior: 'smooth' });
    }, []);

    const handleBuy = useCallback(
      (e: MouseEvent, item: FlashDealItem) => {
        e.stopPropagation();
        onBuy?.(item);
      },
      [onBuy],
    );

    return (
      <div
        ref={ref}
        className={cn(styles.root, className)}
        {...rest}
      >
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <LightningIcon />
            <span className={styles.title}>{title}</span>
          </div>

          <div className={styles.countdown} role="timer" aria-label={t('aria.flashDealCountdown')}>
            <span className={styles.countdownLabel}>Ends in:</span>
            <span className={styles.countdownDigit}>{pad(countdown.hours)}</span>
            <span className={styles.countdownSep}>:</span>
            <span className={styles.countdownDigit}>{pad(countdown.minutes)}</span>
            <span className={styles.countdownSep}>:</span>
            <span className={styles.countdownDigit}>{pad(countdown.seconds)}</span>
          </div>

          {onViewAll && (
            <button
              type="button"
              className={styles.viewAll}
              onClick={onViewAll}
            >
              View All <ArrowRightIcon />
            </button>
          )}
        </div>

        {/* Scrollable strip */}
        <div className={styles.stripWrapper}>
          {showLeftArrow && (
            <button
              type="button"
              className={cn(styles.scrollArrow, styles.scrollArrowLeft)}
              onClick={() => scrollBy('left')}
              aria-label={t('aria.scrollLeft')}
            >
              <ChevronLeftIcon />
            </button>
          )}

          <div
            ref={scrollRef}
            className={styles.strip}
            onScroll={handleScroll}
          >
            {items.map((item) => (
              <div key={item.id} className={styles.dealCard}>
                {/* Image */}
                <div className={styles.cardImage}>
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <span className={styles.cardDiscount}>{item.discount}</span>
                </div>

                {/* Price */}
                <div className={styles.cardPrices}>
                  <span className={styles.cardSalePrice}>{formatCompactPrice(item.price)}</span>
                  <span className={styles.cardOriginalPrice}>{formatCompactPrice(item.originalPrice)}</span>
                </div>

                {/* Progress bar */}
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${Math.min(item.soldPercent, 100)}%` }}
                  />
                </div>
                <span className={styles.soldLabel}>{item.soldPercent}% sold</span>

                {/* Buy button */}
                <button
                  type="button"
                  className={styles.buyBtn}
                  onClick={(e) => handleBuy(e, item)}
                  aria-label={`Buy ${item.title}`}
                >
                  BUY
                </button>
              </div>
            ))}
          </div>

          {showRightArrow && (
            <button
              type="button"
              className={cn(styles.scrollArrow, styles.scrollArrowRight)}
              onClick={() => scrollBy('right')}
              aria-label={t('aria.scrollRight')}
            >
              <ChevronRightIcon />
            </button>
          )}
        </div>
      </div>
    );
  },
);

FlashDealStrip.displayName = 'FlashDealStrip';
