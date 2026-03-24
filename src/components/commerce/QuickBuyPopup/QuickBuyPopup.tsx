'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, useState, useCallback, type HTMLAttributes } from 'react';
import { useGeekShop } from '../../../i18n';
import { useFocusTrap } from '../../../hooks/useFocusTrap';
import { QuantityStepper } from '../QuantityStepper';
import styles from './QuickBuyPopup.module.scss';

export interface QuickBuyVariant {
  id: string;
  name: string;
}

export interface QuickBuyProduct {
  title: string;
  image: string;
  price: number;
  stock: number;
}

export interface QuickBuyPopupProps extends HTMLAttributes<HTMLDivElement> {
  product: QuickBuyProduct;
  variants?: QuickBuyVariant[];
  onClose?: () => void;
  onAddToCart?: (variantId: string | null, quantity: number) => void;
  open?: boolean;
}

export const QuickBuyPopup = forwardRef<HTMLDivElement, QuickBuyPopupProps>(
  (
    {
      product,
      variants = [],
      onClose,
      onAddToCart,
      open = true,
      className,
      ...rest
    },
    ref,
  ) => {
  const { t, formatPrice } = useGeekShop();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(
    variants.length > 0 ? variants[0].id : null
  );

  const sheetRef = useFocusTrap<HTMLDivElement>(open, {
    onEscape: onClose,
  });

  const handleAddToCart = useCallback(() => {
    onAddToCart?.(selectedVariant, quantity);
  }, [onAddToCart, selectedVariant, quantity]);

  if (!open) return null;

  return (
    <div ref={ref} className={cn(styles.overlay, className)} onClick={onClose} role="presentation" {...rest}>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <div
        ref={sheetRef}
        className={styles.sheet}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Quick buy: ${product.title}`}
        tabIndex={-1}
      >
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label={t('common.close')}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 5L15 15M15 5L5 15" stroke="var(--gs-text-tertiary, #999)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className={styles.imageWrap}>
          <img src={product.image} alt={product.title} className={styles.productImage} />
        </div>

        <div className={styles.priceSection}>
          <span className={styles.price}>{formatPrice(product.price)}</span>
        </div>

        <div className={styles.title}>{product.title}</div>

        {variants.length > 0 && (
          <div className={styles.variantSection}>
            <div className={styles.sectionLabel}>{t('product.variant')}</div>
            <div className={styles.chips} role="radiogroup" aria-label={t('product.variant')}>
              {variants.map((v) => (
                <button
                  type="button"
                  key={v.id}
                  className={cn(styles.chip, selectedVariant === v.id ? styles.chipActive : '')}
                  onClick={() => setSelectedVariant(v.id)}
                  role="radio"
                  aria-checked={selectedVariant === v.id}
                >
                  {v.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className={styles.quantitySection}>
          <div className={styles.quantityRow}>
            <span className={styles.sectionLabel}>{t('commerce.quantity')}</span>
            <div className={styles.quantityRight}>
              <QuantityStepper
                value={quantity}
                min={1}
                max={product.stock}
                onChange={setQuantity}
                size="md"
              />
              <span className={styles.stockText}>({t('commerce.inStock', { count: product.stock })})</span>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.addToCartBtn} onClick={handleAddToCart}>
            {t('commerce.addToCartFull')}
          </button>
        </div>
      </div>
    </div>
  );
  },
);

QuickBuyPopup.displayName = 'QuickBuyPopup';
