'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, useState, useRef, useCallback, type HTMLAttributes } from 'react';
import { useGeekShop } from '../../../i18n';
import { QuantityStepper } from '../QuantityStepper';
import styles from './CartItem.module.scss';

export interface CartItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  image: string;
  title: string;
  variant?: string;
  price: number;
  quantity: number;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
  onQuantityChange?: (quantity: number) => void;
  onDelete?: () => void;
}

export const CartItem = forwardRef<HTMLDivElement, CartItemProps>(
  (
    {
      image,
      title,
      variant,
      price,
      quantity,
      selected = false,
      onSelect,
      onQuantityChange,
      onDelete,
      className,
      ...rest
    },
    ref,
  ) => {
  const { t, formatPrice } = useGeekShop();
  const [translateX, setTranslateX] = useState(0);
  const startXRef = useRef(0);
  const currentXRef = useRef(0);
  const isDraggingRef = useRef(false);

  const DELETE_THRESHOLD = 72;

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    isDraggingRef.current = true;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const diff = e.touches[0].clientX - startXRef.current;
    const bounded = Math.max(-DELETE_THRESHOLD, Math.min(0, diff + currentXRef.current));
    setTranslateX(bounded);
  }, []);

  const handleTouchEnd = useCallback(() => {
    isDraggingRef.current = false;
    const snapped = translateX < -DELETE_THRESHOLD / 2 ? -DELETE_THRESHOLD : 0;
    setTranslateX(snapped);
    currentXRef.current = snapped;
  }, [translateX]);

  const handleDelete = useCallback(() => {
    setTranslateX(0);
    currentXRef.current = 0;
    onDelete?.();
  }, [onDelete]);

  const wrapperClass = cn(styles.wrapper, className);

  return (
    <div ref={ref} className={wrapperClass} {...rest}>
      {/* Delete action behind */}
      <div className={styles.deleteAction}>
        <button type="button" className={styles.deleteBtn} onClick={handleDelete}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 6H15M8 6V4.5C8 4.22386 8.22386 4 8.5 4H11.5C11.7761 4 12 4.22386 12 4.5V6M6 6V15C6 15.5523 6.44772 16 7 16H13C13.5523 16 14 15.5523 14 15V6"
              stroke="#FFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{t('common.delete')}</span>
        </button>
      </div>

      {/* Main content */}
      <div
        className={styles.content}
        style={{ transform: `translateX(${translateX}px)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Checkbox */}
        <button
          type="button"
          className={cn(styles.checkbox, selected ? styles.checkboxChecked : '')}
          onClick={() => onSelect?.(!selected)}
          aria-label={selected ? t('common.cancel') : t('common.select')}
        >
          {selected && (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 7L6 10L11 4"
                stroke="#FFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>

        {/* Product image */}
        <img src={image} alt={title} className={styles.image} width={80} height={80} />

        {/* Info */}
        <div className={styles.info}>
          <div className={styles.title}>{title}</div>
          {variant && <div className={styles.variant}>{variant}</div>}
          <div className={styles.bottom}>
            <span className={styles.price}>{formatPrice(price)}</span>
            <QuantityStepper
              value={quantity}
              min={1}
              max={99}
              onChange={onQuantityChange}
              size="sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
  },
);

CartItem.displayName = 'CartItem';
