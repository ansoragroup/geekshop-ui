import { useState, useCallback, useMemo } from 'react';
import { QuantityStepper } from '../QuantityStepper';
import styles from './SkuSelector.module.scss';

export interface SkuVariant {
  id: string;
  name: string;
  image: string;
  price: number;
  stock: number;
}

export interface SkuProduct {
  title: string;
  image: string;
  priceRange: [number, number];
}

export interface SkuSelection {
  variantId: string;
  quantity: number;
}

export interface SkuSelectorProps {
  product: SkuProduct;
  variants: SkuVariant[];
  viewMode?: 'list' | 'grid';
  onSelect?: (selections: SkuSelection[]) => void;
  onAddToCart?: (selections: SkuSelection[]) => void;
  onClose?: () => void;
  open?: boolean;
}

function formatPrice(price: number): string {
  return price.toLocaleString('ru-RU').replace(/,/g, ' ');
}

export function SkuSelector({
  product,
  variants,
  viewMode: initialViewMode = 'list',
  onSelect,
  onAddToCart,
  onClose,
  open = true,
}: SkuSelectorProps) {
  const [mode, setMode] = useState<'list' | 'grid'>(initialViewMode);
  const [selections, setSelections] = useState<Record<string, number>>({});
  const [gridSelected, setGridSelected] = useState<string | null>(null);

  const totalCount = useMemo(
    () => Object.values(selections).reduce((sum, q) => sum + q, 0),
    [selections]
  );

  const totalPrice = useMemo(() => {
    return Object.entries(selections).reduce((sum, [id, qty]) => {
      const variant = variants.find((v) => v.id === id);
      return sum + (variant ? variant.price * qty : 0);
    }, 0);
  }, [selections, variants]);

  const selectionArray = useMemo(
    () =>
      Object.entries(selections)
        .filter(([, qty]) => qty > 0)
        .map(([variantId, quantity]) => ({ variantId, quantity })),
    [selections]
  );

  const handleQuantityChange = useCallback(
    (variantId: string, quantity: number) => {
      setSelections((prev) => {
        const next = { ...prev };
        if (quantity <= 0) {
          delete next[variantId];
        } else {
          next[variantId] = quantity;
        }
        onSelect?.(
          Object.entries(next)
            .filter(([, q]) => q > 0)
            .map(([id, q]) => ({ variantId: id, quantity: q }))
        );
        return next;
      });
    },
    [onSelect]
  );

  const handleGridSelect = useCallback(
    (variantId: string) => {
      setGridSelected(variantId);
      if (!selections[variantId]) {
        handleQuantityChange(variantId, 1);
      }
    },
    [selections, handleQuantityChange]
  );

  const handleAddToCart = useCallback(() => {
    onAddToCart?.(selectionArray);
  }, [onAddToCart, selectionArray]);

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <img src={product.image} alt={product.title} className={styles.productImage} />
          <div className={styles.headerInfo}>
            <div className={styles.priceRange}>
              <span className={styles.priceSymbol}>
                {formatPrice(product.priceRange[0])} - {formatPrice(product.priceRange[1])} so'm
              </span>
            </div>
            <div className={styles.productTitle}>{product.title}</div>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Yopish">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 5L15 15M15 5L5 15" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* View mode toggle */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Variant</span>
            <div className={styles.viewToggle}>
              <button
                type="button"
                className={`${styles.toggleBtn} ${mode === 'list' ? styles.toggleActive : ''}`}
                onClick={() => setMode('list')}
              >
                Ro'yxat
              </button>
              <button
                type="button"
                className={`${styles.toggleBtn} ${mode === 'grid' ? styles.toggleActive : ''}`}
                onClick={() => setMode('grid')}
              >
                Katta rasm
              </button>
            </div>
          </div>

          {/* List view */}
          {mode === 'list' && (
            <div className={styles.listView}>
              {variants.map((variant) => (
                <div key={variant.id} className={styles.listItem}>
                  <img src={variant.image} alt={variant.name} className={styles.listItemImage} />
                  <div className={styles.listItemInfo}>
                    <div className={styles.listItemName}>{variant.name}</div>
                    <div className={styles.listItemStock}>{variant.stock} ta mavjud</div>
                  </div>
                  <div className={styles.listItemStepper}>
                    <QuantityStepper
                      value={selections[variant.id] || 0}
                      min={0}
                      max={variant.stock}
                      onChange={(qty) => handleQuantityChange(variant.id, qty)}
                      size="sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Grid view */}
          {mode === 'grid' && (
            <div className={styles.gridView}>
              {variants.map((variant) => (
                <button
                  type="button"
                  key={variant.id}
                  className={`${styles.gridItem} ${gridSelected === variant.id ? styles.gridItemSelected : ''}`}
                  onClick={() => handleGridSelect(variant.id)}
                >
                  <img src={variant.image} alt={variant.name} className={styles.gridItemImage} />
                  <div className={styles.gridItemName}>{variant.name}</div>
                  <div className={styles.gridItemPrice}>{formatPrice(variant.price)} so'm</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <div className={styles.footerInfo}>
            <span className={styles.footerCount}>Tanlangan: {totalCount} ta</span>
            {totalPrice > 0 && (
              <span className={styles.footerPrice}>{formatPrice(totalPrice)} so'm</span>
            )}
          </div>
          <button
            type="button"
            className={`${styles.addToCartBtn} ${totalCount === 0 ? styles.addToCartDisabled : ''}`}
            onClick={handleAddToCart}
            disabled={totalCount === 0}
          >
            Savatga qo'shish
          </button>
        </div>
      </div>
    </div>
  );
}
