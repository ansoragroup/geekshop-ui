'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, useState, useCallback, useMemo, type HTMLAttributes } from 'react';
import { useGeekShop } from '../../../i18n';
import { QuantityStepper } from '../QuantityStepper';
import styles from './SkuSelector.module.scss';

export interface SkuVariant {
  id: string;
  name: string;
  image: string;
  price: number;
  stock: number;
  hotRank?: number;
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

export interface SkuSelectorProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  product: SkuProduct;
  variants: SkuVariant[];
  onSelect?: (selections: SkuSelection[]) => void;
  onAddToCart?: (selections: SkuSelection[]) => void;
  onClose?: () => void;
  open?: boolean;
}

export const SkuSelector = forwardRef<HTMLDivElement, SkuSelectorProps>(
  (
    {
      product,
      variants,
      onSelect,
      onAddToCart,
      onClose,
      open = true,
      className,
      ...rest
    },
    ref,
  ) => {
  const { t, formatPrice } = useGeekShop();
  const [mode, setMode] = useState<'list' | 'imageGrid'>('list');
  const [selections, setSelections] = useState<Record<string, number>>({});
  const [gridSelected, setGridSelected] = useState<string | null>(null);

  const totalCount = useMemo(
    () => Object.values(selections).reduce((sum, q) => sum + q, 0),
    [selections]
  );

  const totalPrice = useMemo(() => {
    return Object.entries(selections).reduce((sum, [id, qty]) => {
      const v = variants.find((vr) => vr.id === id);
      return sum + (v ? v.price * qty : 0);
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
      if (gridSelected === variantId) {
        // Deselect: set qty to 0
        setGridSelected(null);
        handleQuantityChange(variantId, 0);
      } else {
        // Select: set qty to 1 if not already selected
        setGridSelected(variantId);
        if (!selections[variantId]) {
          handleQuantityChange(variantId, 1);
        }
      }
    },
    [gridSelected, selections, handleQuantityChange]
  );

  const handleAddToCart = useCallback(() => {
    onAddToCart?.(selectionArray);
  }, [onAddToCart, selectionArray]);

  if (!open) return null;

  const selectedVariant = gridSelected
    ? variants.find((v) => v.id === gridSelected)
    : null;

  return (
    <div ref={ref} className={cn(styles.overlay, className)} onClick={onClose} role="presentation" {...rest}>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={product.title}>
        {/* Header */}
        <div className={styles.header}>
          <img src={product.image} alt={product.title} className={styles.productImage} />
          <div className={styles.headerInfo}>
            <div className={styles.priceRange}>
              <span className={styles.priceSymbol}>
                {formatPrice(product.priceRange[0])} - {formatPrice(product.priceRange[1])}
              </span>
            </div>
            <div className={styles.productTitle}>{product.title}</div>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label={t('common.close')}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 5L15 15M15 5L5 15" stroke="var(--gs-text-tertiary, #999)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* View mode toggle */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>{t('product.variant')}</span>
            <div className={styles.viewToggle}>
              <button
                type="button"
                className={cn(styles.toggleBtn, mode === 'list' ? styles.toggleActive : '')}
                onClick={() => setMode('list')}
              >
                {t('product.listView')}
              </button>
              <button
                type="button"
                className={cn(styles.toggleBtn, mode === 'imageGrid' ? styles.toggleActive : '')}
                onClick={() => setMode('imageGrid')}
              >
                {t('product.gridView')}
              </button>
            </div>
          </div>

          {/* List view */}
          {mode === 'list' && (
            <div className={styles.listView}>
              {variants.map((v) => (
                <div key={v.id} className={styles.listItem}>
                  <img src={v.image} alt={v.name} className={styles.listItemImage} />
                  <div className={styles.listItemInfo}>
                    <div className={styles.listItemName}>{v.name}</div>
                    <div className={styles.listItemStock}>{t('commerce.inStock', { count: v.stock })}</div>
                  </div>
                  <div className={styles.listItemStepper}>
                    <QuantityStepper
                      value={selections[v.id] || 0}
                      min={0}
                      max={v.stock}
                      onChange={(qty) => handleQuantityChange(v.id, qty)}
                      size="sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Image Grid view (1688/Taobao style) */}
          {mode === 'imageGrid' && (
            <>
              <div className={styles.imageGridView}>
                {variants.map((v) => {
                  const isSelected = gridSelected === v.id;
                  return (
                    <button
                      type="button"
                      key={v.id}
                      className={cn(styles.imageGridCard, isSelected ? styles.imageGridCardSelected : '')}
                      onClick={() => handleGridSelect(v.id)}
                    >
                      {v.hotRank && (
                        <span className={styles.hotBadge}>{v.hotRank}</span>
                      )}
                      <div className={styles.imageGridImageWrap}>
                        <img src={v.image} alt={v.name} className={styles.imageGridImage} />
                        {isSelected && (
                          <div className={styles.imageGridCheck}>
                            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                              <path d="M5 10l3.5 3.5L15 7" stroke="var(--gs-bg-card, #fff)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className={cn(styles.imageGridLabel, isSelected ? styles.imageGridLabelSelected : '')}>
                        {v.name}
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedVariant && (
                <div className={styles.imageGridInfo}>
                  <div className={styles.imageGridInfoRow}>
                    <span className={styles.imageGridInfoName}>{selectedVariant.name}</span>
                    <span className={styles.imageGridInfoStock}>{t('commerce.inStock', { count: selectedVariant.stock })}</span>
                  </div>
                  <div className={styles.imageGridInfoPrice}>{formatPrice(selectedVariant.price)}</div>
                  <div className={styles.imageGridStepper}>
                    <span className={styles.imageGridStepperLabel}>{t('commerce.quantity')}</span>
                    <QuantityStepper
                      value={selections[selectedVariant.id] || 1}
                      min={1}
                      max={selectedVariant.stock}
                      onChange={(qty) => handleQuantityChange(selectedVariant.id, qty)}
                      size="sm"
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <div className={styles.footerInfo}>
            <span className={styles.footerCount}>{t('commerce.selected', { count: totalCount })}</span>
            {totalPrice > 0 && (
              <span className={styles.footerPrice}>{formatPrice(totalPrice)}</span>
            )}
          </div>
          <button
            type="button"
            className={cn(styles.addToCartBtn, totalCount === 0 ? styles.addToCartDisabled : '')}
            onClick={handleAddToCart}
            disabled={totalCount === 0}
          >
            {t('commerce.addToCartFull')}
          </button>
        </div>
      </div>
    </div>
  );
  },
);

SkuSelector.displayName = 'SkuSelector';
