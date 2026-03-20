import { cn } from '../../../utils/cn';
'use client';
import { forwardRef, useState, useRef, type HTMLAttributes } from 'react';
import { useGeekShop } from '../../../i18n';
import { PriceDisplay } from '../PriceDisplay';
import styles from './ProductCarousel.module.scss';

export interface CarouselProduct {
  /** Product image URL */
  image: string;
  /** Product title */
  title: string;
  /** Product price */
  price: number;
  /** Original price */
  originalPrice?: number;
  /** Click handler */
  onClick?: () => void;
}

export interface CarouselTab {
  /** Tab key */
  key: string;
  /** Tab label */
  label: string;
}

export interface ProductCarouselProps extends HTMLAttributes<HTMLDivElement> {
  /** Section title */
  title: string;
  /** Array of products to display */
  products: CarouselProduct[];
  /** Filter tabs */
  tabs?: CarouselTab[];
  /** Currently active tab key */
  activeTab?: string;
  /** Tab change callback */
  onTabChange?: (tabKey: string) => void;
  /** "See all" click handler */
  onSeeAll?: () => void;
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const ProductCarousel = forwardRef<HTMLDivElement, ProductCarouselProps>(
  (
    {
      title,
      products,
      tabs,
      activeTab: controlledActiveTab,
      onTabChange,
      onSeeAll,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const { t } = useGeekShop();
    const [internalActiveTab, setInternalActiveTab] = useState(tabs?.[0]?.key ?? '');
    const scrollRef = useRef<HTMLDivElement>(null);

    const activeTab = controlledActiveTab ?? internalActiveTab;

    const handleTabClick = (tabKey: string) => {
      setInternalActiveTab(tabKey);
      onTabChange?.(tabKey);
      // Scroll the product list back to the start when switching tabs
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = 0;
      }
    };

    return (
      <div ref={ref} className={cn(styles.root, className)} {...rest}>
        {/* Section header */}
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.seeAll} onClick={onSeeAll} type="button">
            <span>{t('common.viewAll')}</span>
            <ArrowRightIcon />
          </button>
        </div>

        {/* Tabs */}
        {tabs && tabs.length > 0 && (
          <div className={styles.tabs}>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                className={cn(styles.tab, activeTab === tab.key ? styles.tabActive : '')}
                onClick={() => handleTabClick(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Horizontal scrollable product list */}
        <div className={styles.scrollContainer} ref={scrollRef}>
          {products.map((product, index) => (
            <div
              key={index}
              className={styles.card}
              onClick={product.onClick}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); product.onClick?.(); } }}
              role="button"
              tabIndex={0}
            >
              <div className={styles.cardImageWrapper}>
                <img
                  src={product.image}
                  alt={product.title}
                  className={styles.cardImage}
                  loading="lazy"
                />
              </div>
              <div className={styles.cardContent}>
                <p className={styles.cardTitle}>{product.title}</p>
                <PriceDisplay
                  price={product.price}
                  originalPrice={product.originalPrice}
                  variant={product.originalPrice ? 'sale' : 'default'}
                  size="sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
);

ProductCarousel.displayName = 'ProductCarousel';
