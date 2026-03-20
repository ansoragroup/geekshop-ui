'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, type HTMLAttributes } from 'react';
import { useGeekShop } from '../../../i18n';
import styles from './ActionBar.module.scss';

export interface ActionBarProps extends HTMLAttributes<HTMLDivElement> {
  cartCount?: number;
  isFavorite?: boolean;
  onChat?: () => void;
  onCart?: () => void;
  onFavorite?: () => void;
  onAddToCart?: () => void;
  onBuyNow?: () => void;
}

export const ActionBar = forwardRef<HTMLDivElement, ActionBarProps>(
  (
    {
      cartCount = 0,
      isFavorite = false,
      onChat,
      onCart,
      onFavorite,
      onAddToCart,
      onBuyNow,
      className,
      ...rest
    },
    ref,
  ) => {
  const { t } = useGeekShop();
  const classNames = cn(styles.bar, className);

  return (
    <div ref={ref} className={classNames} {...rest}>
      {/* Left side: icon buttons */}
      <div className={styles.icons}>
        {/* Customer service */}
        <button type="button" className={styles.iconBtn} onClick={onChat} aria-label={t('commerce.contact')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z"
              stroke="#333"
              strokeWidth="1.5"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M9 11H9.01M12 11H12.01M15 11H15.01"
              stroke="#333"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className={styles.iconLabel}>{t('commerce.contact')}</span>
        </button>

        {/* Cart */}
        <button type="button" className={styles.iconBtn} onClick={onCart} aria-label={t('commerce.cart')}>
          <div className={styles.iconWrap}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z"
                stroke="#333"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M3 6H21" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
              <path
                d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10"
                stroke="#333"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            {cartCount > 0 && (
              <span className={styles.badge}>
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </div>
          <span className={styles.iconLabel}>{t('commerce.cart')}</span>
        </button>

        {/* Favorite */}
        <button
          type="button"
          className={styles.iconBtn}
          onClick={onFavorite}
          aria-label={isFavorite ? t('commerce.removeFromFavorites') : t('commerce.addToFavorites')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M20.84 4.61C20.3292 4.09924 19.7228 3.69397 19.0554 3.41708C18.3879 3.14019 17.6725 2.99734 16.95 2.99734C16.2275 2.99734 15.5121 3.14019 14.8446 3.41708C14.1772 3.69397 13.5708 4.09924 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99789 7.05 2.99789C5.59096 2.99789 4.1917 3.57831 3.16 4.61C2.1283 5.64169 1.54789 7.04097 1.54789 8.5C1.54789 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.3508 11.8792 21.756 11.2728 22.0329 10.6053C22.3098 9.93789 22.4527 9.22249 22.4527 8.5C22.4527 7.77751 22.3098 7.0621 22.0329 6.39464C21.756 5.72718 21.3508 5.12075 20.84 4.61Z"
              stroke={isFavorite ? '#FF0000' : '#333'}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill={isFavorite ? '#FF0000' : 'none'}
            />
          </svg>
          <span className={styles.iconLabel}>{t('commerce.favorite')}</span>
        </button>
      </div>

      {/* Right side: action buttons */}
      <div className={styles.actions}>
        <button type="button" className={styles.addToCartBtn} onClick={onAddToCart}>
          {t('commerce.addToCart')}
        </button>
        <button type="button" className={styles.buyNowBtn} onClick={onBuyNow}>
          {t('commerce.buyNow')}
        </button>
      </div>
    </div>
  );
  },
);

ActionBar.displayName = 'ActionBar';
