import React, { useState, useCallback } from 'react';
import {
  NavBar,
  Badge,
  QuantityStepper,
  Button,
  BottomSheet,
  Toast,
  Divider,
  SkuSelector,
  useGeekShop,
} from '../../components';
import type {
  SkuVariant,
  SkuProduct,
  SkuSelection,
} from '../../components/commerce/SkuSelector/SkuSelector';
import styles from './PreOrderPage.module.scss';

/* ---------- Icons ---------- */

const CalendarIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#FF5000"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const MoneyIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#07C160"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
  </svg>
);

const InfoIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#1890FF"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const ChevronRight = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#999"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
);

/* ---------- Pre-order product data ---------- */

const preOrderProductData = {
  title: 'MSI GeForce RTX 5070 Ti 12GB GDDR7',
  image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&h=400&fit=crop',
  price: 12_500_000,
  estimatedDate: '2026 yil, aprel oyi',
  depositPercent: 10,
};

const skuProduct: SkuProduct = {
  title: 'MSI GeForce RTX 5070 Ti 12GB',
  image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=200&h=200&fit=crop',
  priceRange: [11_500_000, 14_000_000],
};

const skuVariants: SkuVariant[] = [
  {
    id: 'rtx5070-12g-black',
    name: '12GB / Qora',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=200&h=200&fit=crop',
    price: 12_500_000,
    stock: 50,
    hotRank: 1,
  },
  {
    id: 'rtx5070-12g-white',
    name: '12GB / Oq',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=200&h=200&fit=crop',
    price: 13_000_000,
    stock: 30,
    hotRank: 2,
  },
  {
    id: 'rtx5070-16g-black',
    name: '16GB / Qora',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=200&h=200&fit=crop',
    price: 14_000_000,
    stock: 20,
  },
];

/* ---------- Component ---------- */

export interface PreOrderPageProps {
  /** Product ID (demo purposes) */
  productId?: number;
  /** Notify-only mode (product not yet available for pre-order) */
  notifyOnly?: boolean;
}

export const PreOrderPage: React.FC<PreOrderPageProps> = ({ notifyOnly = false }) => {
  const { t, formatPrice } = useGeekShop();
  const [quantity, setQuantity] = useState(1);
  const [skuSheetOpen, setSkuSheetOpen] = useState(false);
  const [selectedVariantName, setSelectedVariantName] = useState<string | null>(
    skuVariants[0].name
  );
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const depositAmount = Math.round(
    preOrderProductData.price * (preOrderProductData.depositPercent / 100)
  );

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setToastVisible(true);
  }, []);

  const handleOpenSkuSheet = useCallback(() => {
    setSkuSheetOpen(true);
  }, []);

  const handleCloseSkuSheet = useCallback(() => {
    setSkuSheetOpen(false);
  }, []);

  const handleSkuAddToCart = useCallback(
    (selections: SkuSelection[]) => {
      handleCloseSkuSheet();
      if (selections.length > 0) {
        const variant = skuVariants.find((v) => v.id === selections[0].variantId);
        if (variant) {
          setSelectedVariantName(variant.name);
        }
      }
    },
    [handleCloseSkuSheet]
  );

  const handlePreOrder = useCallback(() => {
    if (notifyOnly) {
      showToast(t('product.notifyWhenAvailable'));
    } else {
      showToast(t('product.preOrderNow'));
    }
  }, [notifyOnly, showToast, t]);

  return (
    <div className={styles.page}>
      {/* NavBar */}
      <NavBar title={t('page.preOrder')} onBack={() => {}} />

      {/* Product card */}
      <div className={styles.productCard}>
        <Badge type="text" content={t('product.preOrder')} color="primary" position="inline" />
        <div className={styles.productRow}>
          <img
            src={preOrderProductData.image}
            alt={preOrderProductData.title}
            className={styles.productImage}
          />
          <div className={styles.productInfo}>
            <div className={styles.productTitle}>{preOrderProductData.title}</div>
            <div className={styles.productPrice}>{formatPrice(preOrderProductData.price)}</div>
          </div>
        </div>
      </div>

      <Divider />

      {/* Estimated availability */}
      <div className={styles.infoSection}>
        <div className={styles.infoRow}>
          <CalendarIcon />
          <div className={styles.infoContent}>
            <div className={styles.infoLabel}>{t('product.estimatedAvailability')}</div>
            <div className={styles.infoValue}>{preOrderProductData.estimatedDate}</div>
          </div>
        </div>
      </div>

      {/* Deposit amount */}
      <div className={styles.infoSection}>
        <div className={styles.infoRow}>
          <MoneyIcon />
          <div className={styles.infoContent}>
            <div className={styles.infoLabel}>{t('product.preOrderDeposit')}</div>
            <div className={styles.infoValue}>
              {formatPrice(depositAmount)} ({preOrderProductData.depositPercent}
              %)
            </div>
          </div>
        </div>
      </div>

      <Divider />

      {/* Pre-order terms */}
      <div className={styles.termsSection}>
        <div className={styles.termsHeader}>
          <InfoIcon />
          <span className={styles.termsTitle}>{t('product.preOrderTerms')}</span>
        </div>
        <ul className={styles.termsList}>
          <li className={styles.termsItem}>{t('product.preOrderTermNotify')}</li>
          <li className={styles.termsItem}>{t('product.preOrderTermPayLater')}</li>
          <li className={styles.termsItem}>{t('product.preOrderTermCancel')}</li>
        </ul>
      </div>

      <Divider />

      {/* Variant selector trigger */}
      {!notifyOnly && (
        <>
          <div className={styles.selectorSection}>
            <div className={styles.selectorLabel}>{t('product.variant')}</div>
            <button
              type="button"
              className={styles.selectorTrigger}
              onClick={handleOpenSkuSheet}
              aria-label={t('product.selectVariant')}
            >
              <span className={styles.selectorValue}>
                {selectedVariantName || t('product.chooseVariant')}
              </span>
              <ChevronRight />
            </button>
          </div>

          {/* Quantity */}
          <div className={styles.quantitySection}>
            <span className={styles.quantityLabel}>{t('commerce.quantity')}</span>
            <QuantityStepper value={quantity} min={1} max={10} onChange={setQuantity} />
          </div>

          <Divider />
        </>
      )}

      {/* SKU BottomSheet */}
      <BottomSheet
        visible={skuSheetOpen}
        title={t('product.selectVariant')}
        height="80vh"
        onClose={handleCloseSkuSheet}
      >
        <SkuSelector
          product={skuProduct}
          variants={skuVariants}
          open={true}
          onClose={handleCloseSkuSheet}
          onAddToCart={handleSkuAddToCart}
        />
      </BottomSheet>

      {/* Toast */}
      <Toast
        message={toastMessage}
        type="success"
        visible={toastVisible}
        duration={2000}
        onClose={() => setToastVisible(false)}
      />

      {/* Bottom action */}
      <div className={styles.bottomAction}>
        <Button variant="primary" size="full" block onClick={handlePreOrder}>
          {notifyOnly ? t('product.notifyWhenAvailable') : t('product.preOrderNow')}
        </Button>
      </div>
    </div>
  );
};
