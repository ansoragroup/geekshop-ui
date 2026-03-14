import { useState, useCallback } from 'react';
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

export interface QuickBuyPopupProps {
  product: QuickBuyProduct;
  variants?: QuickBuyVariant[];
  onClose?: () => void;
  onAddToCart?: (variantId: string | null, quantity: number) => void;
  open?: boolean;
}

function formatPrice(price: number): string {
  return price.toLocaleString('ru-RU').replace(/,/g, ' ');
}

export function QuickBuyPopup({
  product,
  variants = [],
  onClose,
  onAddToCart,
  open = true,
}: QuickBuyPopupProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(
    variants.length > 0 ? variants[0].id : null
  );

  const handleAddToCart = useCallback(() => {
    onAddToCart?.(selectedVariant, quantity);
  }, [onAddToCart, selectedVariant, quantity]);

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Yopish">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 5L15 15M15 5L5 15" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Product image */}
        <div className={styles.imageWrap}>
          <img src={product.image} alt={product.title} className={styles.productImage} />
        </div>

        {/* Price */}
        <div className={styles.priceSection}>
          <span className={styles.price}>{formatPrice(product.price)} so'm</span>
        </div>

        {/* Title */}
        <div className={styles.title}>{product.title}</div>

        {/* Variant chips */}
        {variants.length > 0 && (
          <div className={styles.variantSection}>
            <div className={styles.sectionLabel}>Variant</div>
            <div className={styles.chips}>
              {variants.map((v) => (
                <button
                  type="button"
                  key={v.id}
                  className={`${styles.chip} ${selectedVariant === v.id ? styles.chipActive : ''}`}
                  onClick={() => setSelectedVariant(v.id)}
                >
                  {v.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
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

        {/* Add to cart button */}
        <div className={styles.footer}>
          <button type="button" className={styles.addToCartBtn} onClick={handleAddToCart}>
            Savatga qo'shish
          </button>
        </div>
      </div>
    </div>
  );
}
