'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, type HTMLAttributes } from 'react';
import { useGeekShop } from '../../../i18n';
import styles from './ComparisonTable.module.scss';

export interface ComparisonProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  onRemove?: () => void;
}

export interface ComparisonSpec {
  key: string;
  label: string;
  values: Record<string, string | number | boolean>;
  unit?: string;
  higherIsBetter?: boolean;
}

export interface ComparisonTableProps extends HTMLAttributes<HTMLDivElement> {
  /** Products to compare */
  products: ComparisonProduct[];
  /** Specification rows */
  specs: ComparisonSpec[];
  /** Highlight the best value per row in green */
  highlightDifferences?: boolean;
  /** Make the product header row sticky when scrolling */
  stickyHeader?: boolean;
}

function findBestValue(
  spec: ComparisonSpec,
  products: ComparisonProduct[],
): string | null {
  const numericValues: Array<{ id: string; value: number }> = [];

  for (const product of products) {
    const val = spec.values[product.id];
    if (typeof val === 'number') {
      numericValues.push({ id: product.id, value: val });
    } else if (typeof val === 'string') {
      const parsed = parseFloat(val);
      if (!isNaN(parsed)) {
        numericValues.push({ id: product.id, value: parsed });
      }
    }
  }

  if (numericValues.length < 2) return null;

  const higherBetter = spec.higherIsBetter !== false;
  const best = numericValues.reduce((a, b) =>
    higherBetter ? (b.value > a.value ? b : a) : (b.value < a.value ? b : a)
  );

  return best.id;
}

function formatCellValue(value: string | number | boolean | undefined, unit?: string): string {
  if (value === undefined) return '-';
  if (typeof value === 'boolean') return value ? '\u2713' : '\u2717';
  if (unit) return `${value} ${unit}`;
  return String(value);
}

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 4l8 8M12 4l-8 8" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const ComparisonTable = forwardRef<HTMLDivElement, ComparisonTableProps>(
  (
    {
      products,
      specs,
      highlightDifferences = false,
      stickyHeader = false,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const { t, formatPrice } = useGeekShop();

    return (
      <div
        ref={ref}
        className={cn(styles.root, className)}
        role="table"
        aria-label="Comparison table"
        {...rest}
      >
        <div className={styles.scrollContainer}>
          <div className={styles.table}>
            {/* Header row with product images/names */}
            <div className={cn(styles.headerRow, stickyHeader ? styles.sticky : '')} role="row">
              <div className={cn(styles.labelCell, styles.headerLabel)} role="columnheader">
                {/* empty label column */}
              </div>
              {products.map((product) => (
                <div key={product.id} className={styles.productHeader} role="columnheader">
                  {product.onRemove && (
                    <button
                      className={styles.removeBtn}
                      onClick={product.onRemove}
                      type="button"
                      aria-label={`${t('comparison.remove')} ${product.name}`}
                    >
                      <CloseIcon />
                    </button>
                  )}
                  <img
                    className={styles.productImage}
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                  />
                  <span className={styles.productName}>{product.name}</span>
                  <span className={styles.productPrice}>{formatPrice(product.price)}</span>
                </div>
              ))}
            </div>

            {/* Spec rows */}
            {specs.map((spec, rowIndex) => {
              const bestId = highlightDifferences ? findBestValue(spec, products) : null;

              return (
                <div
                  key={spec.key}
                  className={cn(styles.specRow, rowIndex % 2 === 0 ? styles.rowEven : styles.rowOdd)}
                  role="row"
                >
                  <div className={styles.labelCell} role="rowheader">
                    {spec.label}
                  </div>
                  {products.map((product) => {
                    const isBest = bestId === product.id;
                    const value = spec.values[product.id];
                    return (
                      <div
                        key={product.id}
                        className={cn(styles.valueCell, isBest ? styles.bestValue : '')}
                        role="cell"
                      >
                        <span className={styles.cellText}>
                          {formatCellValue(value, spec.unit)}
                        </span>
                        {isBest && (
                          <span className={styles.bestBadge} aria-label={t('comparison.best')}>
                            {t('comparison.best')}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);

ComparisonTable.displayName = 'ComparisonTable';
