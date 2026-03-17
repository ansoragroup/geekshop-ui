import { forwardRef, type HTMLAttributes } from 'react';
import styles from './CategoryShowcase.module.scss';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ShowcaseCategory {
  /** Category label */
  label: string;
  /** Background image URL */
  image: string;
  /** Product count in this category */
  count?: number;
  /** Link URL for navigation */
  href?: string;
  /** Click handler (alternative to href) */
  onClick?: () => void;
}

export interface CategoryShowcaseProps extends HTMLAttributes<HTMLDivElement> {
  /** Array of categories to display */
  categories: ShowcaseCategory[];
  /** Number of columns (default 5) */
  columns?: number;
  /** Optional section title above the grid */
  title?: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

export const CategoryShowcase = forwardRef<HTMLDivElement, CategoryShowcaseProps>(
  (
    {
      categories,
      columns = 5,
      title,
      className = '',
      ...rest
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={`${styles.root} ${className}`}
        {...rest}
      >
        {title && (
          <h2 className={styles.sectionTitle}>{title}</h2>
        )}

        <div
          className={styles.grid}
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {categories.map((category, idx) => {
            const content = (
              <>
                <img
                  src={category.image}
                  alt={category.label}
                  className={styles.cardImage}
                  loading="lazy"
                />
                <div className={styles.cardOverlay} />
                <div className={styles.cardContent}>
                  <span className={styles.cardLabel}>{category.label}</span>
                  {category.count !== undefined && (
                    <span className={styles.cardCount}>{category.count} items</span>
                  )}
                </div>
              </>
            );

            if (category.href) {
              return (
                <a
                  key={idx}
                  href={category.href}
                  className={styles.card}
                  aria-label={`${category.label}${category.count !== undefined ? `, ${category.count} items` : ''}`}
                >
                  {content}
                </a>
              );
            }

            return (
              <div
                key={idx}
                className={styles.card}
                role={category.onClick ? 'button' : undefined}
                tabIndex={category.onClick ? 0 : undefined}
                onClick={category.onClick}
                onKeyDown={category.onClick ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    category.onClick?.();
                  }
                } : undefined}
                aria-label={category.onClick ? `${category.label}${category.count !== undefined ? `, ${category.count} items` : ''}` : undefined}
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);

CategoryShowcase.displayName = 'CategoryShowcase';
