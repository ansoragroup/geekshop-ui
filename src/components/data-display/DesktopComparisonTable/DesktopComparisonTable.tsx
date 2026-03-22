'use client';
import { useGeekShop } from '../../../i18n';
import { cn } from '../../../utils/cn';
import { forwardRef, useCallback, type HTMLAttributes } from 'react';
import styles from './DesktopComparisonTable.module.scss';

export interface DesktopComparisonProduct {
  /** Unique product ID */
  id: string;
  /** Product name */
  name: string;
  /** Product image URL */
  image: string;
  /** Product price */
  price: number;
}

export interface DesktopComparisonSpec {
  /** Unique spec key */
  key: string;
  /** Display label */
  label: string;
  /** Values keyed by product ID */
  values: Record<string, string | number | boolean>;
  /** Unit suffix (e.g., 'GB', 'MHz') */
  unit?: string;
  /** If true, higher numeric value is highlighted as best */
  higherIsBetter?: boolean;
}

export interface DesktopComparisonTableProps extends HTMLAttributes<HTMLDivElement> {
  /** Products to compare */
  products: DesktopComparisonProduct[];
  /** Specification rows */
  specs: DesktopComparisonSpec[];
  /** Highlight the best value per row */
  highlightDifferences?: boolean;
  /** Callback when remove button is clicked */
  onRemoveProduct?: (productId: string) => void;
}

function findBestValue(
  spec: DesktopComparisonSpec,
  products: DesktopComparisonProduct[],
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
    higherBetter ? (b.value > a.value ? b : a) : (b.value < a.value ? b : a),
  );

  return best.id;
}

function formatCellValue(value: string | number | boolean | undefined, unit?: string): string {
  if (value === undefined) return '\u2014';
  if (typeof value === 'boolean') return value ? '\u2713' : '\u2717';
  if (unit) return `${value} ${unit}`;
  return String(value);
}

function formatPrice(price: number): string {
  return price.toLocaleString('uz-UZ') + ' UZS';
}

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const DesktopComparisonTable = forwardRef<HTMLDivElement, DesktopComparisonTableProps>(
  (
    {
      products,
      specs,
      highlightDifferences = true,
      onRemoveProduct,
      className = '',
      ...rest
    },
    ref,
  ) => {
  const { t } = useGeekShop();
    const handleRemove = useCallback(
      (productId: string) => {
        onRemoveProduct?.(productId);
      },
      [onRemoveProduct],
    );

    return (
      <div
        ref={ref}
        className={cn(styles.root, className)}
        role="table"
        aria-label={t('aria.productComparisonTable')}
        {...rest}
      >
        <div className={styles.scrollContainer}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.headerRow}>
                <th className={styles.labelCell} scope="col">
                  <span className={styles.labelText}>Specification</span>
                </th>
                {products.map((product) => (
                  <th key={product.id} className={styles.productHeader} scope="col">
                    {onRemoveProduct && (
                      <button
                        className={styles.removeBtn}
                        onClick={() => handleRemove(product.id)}
                        type="button"
                        aria-label={`Remove ${product.name}`}
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
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specs.map((spec, rowIndex) => {
                const bestId = highlightDifferences ? findBestValue(spec, products) : null;

                return (
                  <tr
                    key={spec.key}
                    className={cn(styles.specRow, rowIndex % 2 === 0 ? styles.rowEven : styles.rowOdd)}
                  >
                    <td className={styles.labelCell}>
                      <span className={styles.specLabel}>{spec.label}</span>
                    </td>
                    {products.map((product) => {
                      const isBest = bestId === product.id;
                      const value = spec.values[product.id];
                      return (
                        <td
                          key={product.id}
                          className={cn(styles.valueCell, isBest ? styles.bestValue : '')}
                        >
                          <span className={styles.cellText}>
                            {formatCellValue(value, spec.unit)}
                          </span>
                          {isBest && (
                            <span className={styles.bestBadge}>Best</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  },
);

DesktopComparisonTable.displayName = 'DesktopComparisonTable';
