import { cn } from '../../../utils/cn';
'use client';
import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';
import styles from './Breadcrumbs.module.scss';

export interface BreadcrumbItem {
  /** Display label */
  label: string;
  /** Link URL */
  href?: string;
  /** Click handler */
  onClick?: () => void;
}

export interface BreadcrumbsProps extends HTMLAttributes<HTMLElement> {
  /** Breadcrumb items in order (first = root, last = current page) */
  items: BreadcrumbItemcn(];
  /** Separator between items (default: "/") */
  separator?: ReactNode;
  /** Max visible items — if items exceed this, middle items collapse to "..." */
  maxItems?: number;
}

export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ items, separator = '/', maxItems, className, ...rest }, ref) => {
    const rootClass = [styles.breadcrumbs, className);

    const visibleItems = getVisibleItems(items, maxItems);

    return (
      <nav ref={ref} className={rootClass} aria-label="Breadcrumb" {...rest}>
        <ol className={styles.list}>
          {visibleItems.map((item, index) => {
            const isLast = index === visibleItems.length - 1;
            const isEllipsis = item.label === '...';

            return (
              <li key={index} className={styles.item}>
                {index > 0 && (
                  <span className={styles.separator} aria-hidden="true">
                    {separator}
                  </span>
                )}
                {isLast ? (
                  <span
                    className={styles.current}
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : isEllipsis ? (
                  <span className={styles.ellipsis}>{item.label}</span>
                ) : item.href ? (
                  <a
                    className={styles.link}
                    href={item.href}
                    onClick={item.onClick ? (e) => { e.preventDefault(); item.onClick?.(); } : undefined}
                  >
                    {item.label}
                  </a>
                ) : item.onClick ? (
                  <button
                    className={styles.linkButton}
                    onClick={item.onClick}
                    type="button"
                  >
                    {item.label}
                  </button>
                ) : (
                  <span className={styles.link}>{item.label}</span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  },
);

Breadcrumbs.displayName = 'Breadcrumbs';

function getVisibleItems(items: BreadcrumbItem[], maxItems?: number): BreadcrumbItem[] {
  if (!maxItems || items.length <= maxItems) {
    return items;
  }

  // Always show first item + ellipsis + last (maxItems - 1) items
  const tailCount = maxItems - 1;
  const first = items[0];
  const tail = items.slice(-tailCount);

  return [first, { label: '...' }, ...tail];
}
