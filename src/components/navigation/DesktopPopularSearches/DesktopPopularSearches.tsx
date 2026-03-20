'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, type HTMLAttributes } from 'react';
import styles from './DesktopPopularSearches.module.scss';

export interface DesktopPopularSearchItem {
  /** Search term text */
  text: string;
  /** Optional search count / popularity number */
  count?: number;
}

export interface DesktopPopularSearchesProps extends HTMLAttributes<HTMLDivElement> {
  /** List of popular search items */
  items: DesktopPopularSearchItem[];
  /** Callback when a search tag is clicked */
  onItemClick?: (item: DesktopPopularSearchItem) => void;
  /** Section title */
  title?: string;
}

const FireIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C8.5 7 4 9 4 14a8 8 0 0016 0c0-5-4.5-7-8-12z" fill="#FF5000" />
    <path d="M12 9c-1.5 2.5-3 3.5-3 6a3 3 0 006 0c0-2.5-1.5-3.5-3-6z" fill="#FFB088" />
  </svg>
);

const TrendIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

export const DesktopPopularSearches = forwardRef<HTMLDivElement, DesktopPopularSearchesProps>(
  (
    {
      items,
      onItemClick,
      title = 'Popular Searches',
      className = '',
      ...rest
    },
    ref,
  ) => {
    if (items.length === 0) return null;

    return (
      <div ref={ref} className={cn(styles.container, className)} {...rest}>
        <div className={styles.header}>
          <FireIcon />
          <span className={styles.title}>{title}</span>
        </div>

        <div className={styles.tags}>
          {items.map((item, index) => (
            <button
              key={index}
              className={styles.tag}
              onClick={() => onItemClick?.(item)}
              type="button"
            >
              <span className={styles.text}>{item.text}</span>
              {item.count != null && (
                <span className={styles.count}>
                  <TrendIcon />
                  {item.count.toLocaleString()}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  },
);

DesktopPopularSearches.displayName = 'DesktopPopularSearches';
