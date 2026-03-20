import { cn } from '../../../utils/cn';
'use client';
import { forwardRef, type CSSProperties, type HTMLAttributes } from 'react';
import { ProductCard } from '../ProductCard';
import type { ProductCardFlatProps } from '../ProductCard';
import styles from './ProductGrid.module.scss';

export interface ProductGridProps extends HTMLAttributes<HTMLDivElement> {
  /** Array of product data objects */
  products: ProductCardFlatProps[];
  /** Number of columns (default 2) */
  columns?: number;
  /** Layout mode: 'grid' for equal-height, 'waterfall' for masonry/staggered */
  layout?: 'grid' | 'waterfall';
  /** Gap between cards in px */
  gap?: number;
  /** Callback when a product card is clicked */
  onProductClick?: (index: number) => void;
}

export const ProductGrid = forwardRef<HTMLDivElement, ProductGridProps>(
  (
    {
      products,
      columns = 2,
      layout = 'grid',
      gap = 8,
      onProductClick,
      className = '',
      style,
      ...rest
    },
    ref,
  ) => {
    if (layout === 'waterfall') {
      // Distribute items into columns: item 0->col0, 1->col1, 2->col0, 3->col1...
      const cols: ProductCardFlatProps[][] = Array.from({ length: columns }, () => []);
      const colIndices: number[][] = Array.from({ length: columns }, () => []);

      products.forEach((product, index) => {
        const col = index % columns;
        cols[col].push(product);
        colIndices[col].push(index);
      });

      return (
        <ul
          ref={ref as React.Ref<HTMLUListElement>}
          role="list"
          className={cn(styles.waterfall, className)}
          style={{ ...style, gap: `${gap}px` }}
          {...rest}
        >
          {cols.map((col, colIdx) => (
            <div key={colIdx} className={styles.waterfallColumn} style={{ gap: `${gap}px` }}>
              {col.map((product, i) => {
                const originalIndex = colIndices[colIdx][i];
                return (
                  <li key={originalIndex} className={styles.gridItem}>
                    <ProductCard
                      {...product}
                      imageAspectRatio="auto"
                      onClick={() => {
                        product.onClick?.();
                        onProductClick?.(originalIndex);
                      }}
                    />
                  </li>
                );
              })}
            </div>
          ))}
        </ul>
      );
    }

    const gridStyle: CSSProperties = {
      ...style,
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: `${gap}px`,
    };

    return (
      <ul ref={ref as React.Ref<HTMLUListElement>} role="list" className={cn(styles.root, className)} style={gridStyle} {...rest}>
        {products.map((product, index) => (
          <li key={index} className={styles.gridItem}>
            <ProductCard
              {...product}
              onClick={() => {
                product.onClick?.();
                onProductClick?.(index);
              }}
            />
          </li>
        ))}
      </ul>
    );
  },
);

ProductGrid.displayName = 'ProductGrid';
