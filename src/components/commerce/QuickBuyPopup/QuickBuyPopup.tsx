import { forwardRef, useState, useCallback, type HTMLAttributes } from 'react';
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

function formatPrice(price: number): string {
  return price.toLocaleString('ru-RU').replace(/,/g, ' ');
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
    <div ref={ref} className={[styles.overlay, className].filter(Boolean).join(' ')} onClick={onClose} {...rest}>
      <div
        ref={sheetRef}
        className={styles.sheet}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Quick buy: ${product.title}`}
        tabIndex={-1}
      >
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 5L15 15M15 5L5 15" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className={styles.imageWrap}>
          <img src={product.image} alt={product.title} className={styles.productImage} />
        </div>

        <div className={styles.priceSection}>
          <span className={styles.price}>{formatPrice(product.price)} so'm</span>
        </div>

        <div className={styles.title}>{product.title}</div>

        {variants.length > 0 && (
          <div className={styles.variantSection}>
            <div className={styles.sectionLabel}>Variant</div>
            <div className={styles.chips} role="radiogroup" aria-label="Select variant">
              {variants.map((v) => (
                <button
                  type="button"
                  key={v.id}
                  className={`${styles.chip} ${selectedVariant === v.id ? styles.chipActive : ''}`}
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
            <span className={styles.sectionLabel}>Miqdor</span>
            <div className={styles.quantityRight}>
              <QuantityStepper
                value={quantity}
                min={1}
                max={product.stock}
                onChange={setQuantity}
                size="md"
              />
              <span className={styles.stockText}>({product.stock} ta mavjud)</span>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.addToCartBtn} onClick={handleAddToCart}>
            Savatga qo'shish
          </button>
        </div>
      </div>
    </div>
  );
  },
);

QuickBuyPopup.displayName = 'QuickBuyPopup';
