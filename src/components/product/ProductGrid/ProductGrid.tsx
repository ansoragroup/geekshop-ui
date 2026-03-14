import type { CSSProperties } from 'react';
import { ProductCard } from '../ProductCard';
import type { ProductCardFlatProps } from '../ProductCard';
import styles from './ProductGrid.module.scss';

export interface ProductGridProps {
  /** Array of product data objects */
  products: ProductCardFlatProps[];
  /** Number of columns (default 2 for Taobao-style) */
  columns?: number;
  /** Gap between cards in px */
  gap?: number;
  /** Additional CSS class */
  className?: string;
}

export function ProductGrid({
  products,
  columns = 2,
  gap = 8,
  className = '',
}: ProductGridProps) {
  const gridStyle: CSSProperties = {
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: `${gap}px`,
  };

  return (
    <div className={`${styles.root} ${className}`} style={gridStyle}>
      {products.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </div>
  );
}

export default ProductGrid;
