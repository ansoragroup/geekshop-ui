import React, { useState, useCallback } from 'react';
import {
  ProductImageGallery,
  PriceDisplay,
  Badge,
  Rating,
  QuantityStepper,
  SkuSelector,
  Section,
  SectionHeader,
  SpecsTable,
  ReviewCard,
  Divider,
  ActionBar,
  BottomSheet,
  Toast,
  useGeekShop,
} from '../../components';
import type {
  SkuVariant,
  SkuProduct,
  SkuSelection,
} from '../../components/commerce/SkuSelector/SkuSelector';
import styles from './ProductDetailPage.module.scss';

/* ---------- Product data ---------- */

interface ProductData {
  title: string;
  images: string[];
  price: number;
  originalPrice?: number;
  discount?: string;
  sku: string;
  brand: string;
  isOfficial: boolean;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stock: number;
  preOrder?: boolean;
  specs: { label: string; value: string }[];
}

const defaultProduct: ProductData = {
  title: 'MSI GeForce RTX 4060 Ventus 2X 8GB GDDR6 OC Edition',
  images: [
    'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=750&h=750&fit=crop',
    'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=750&h=750&fit=crop',
    'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=750&h=750&fit=crop',
    'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=750&h=750&fit=crop',
  ],
  price: 5200000,
  originalPrice: 6500000,
  discount: '-20%',
  sku: 'GS-MSI-4060-V2X-8G',
  brand: 'MSI',
  isOfficial: true,
  rating: 4.6,
  reviewCount: 87,
  inStock: true,
  stock: 12,
  specs: [
    { label: 'Arxitektura', value: 'NVIDIA Ada Lovelace' },
    { label: 'Video xotira', value: '8GB GDDR6' },
    { label: 'Xotira shinasi', value: '128-bit' },
    { label: 'Boost chastota', value: '2460 MHz' },
    { label: 'TDP', value: '115W' },
    { label: 'Sovutish', value: 'Ikki ventilyatorli' },
    { label: 'Ulanish', value: 'PCIe 4.0 x8' },
    { label: 'Kafolat', value: '3 yil' },
  ],
};

const preOrderProduct: ProductData = {
  title: 'MSI GeForce RTX 5070 Ti 12GB GDDR7',
  images: [
    'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=750&h=750&fit=crop',
    'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=750&h=750&fit=crop',
    'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=750&h=750&fit=crop',
  ],
  price: 12500000,
  sku: 'GS-MSI-5070TI-12G',
  brand: 'MSI',
  isOfficial: true,
  rating: 0,
  reviewCount: 0,
  inStock: false,
  stock: 0,
  preOrder: true,
  specs: [
    { label: 'Arxitektura', value: 'NVIDIA Blackwell' },
    { label: 'Video xotira', value: '12GB GDDR7' },
    { label: 'Xotira shinasi', value: '192-bit' },
    { label: 'Boost chastota', value: '2800 MHz' },
    { label: 'TDP', value: '250W' },
    { label: 'Sovutish', value: 'Uch ventilyatorli' },
    { label: 'Ulanish', value: 'PCIe 5.0 x16' },
    { label: 'Kafolat', value: '3 yil' },
  ],
};

/* ---------- SKU data for variant selector ---------- */

const skuProduct: SkuProduct = {
  title: 'MSI GeForce RTX 4060 Ventus 2X 8GB',
  image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=200&h=200&fit=crop',
  priceRange: [4_800_000, 6_500_000],
};

const skuVariants: SkuVariant[] = [
  {
    id: 'msi-ventus-8g',
    name: 'Ventus 2X 8GB',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=200&h=200&fit=crop',
    price: 5_200_000,
    stock: 12,
    hotRank: 1,
  },
  {
    id: 'msi-gaming-8g',
    name: 'Gaming X 8GB',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=200&h=200&fit=crop',
    price: 5_800_000,
    stock: 6,
    hotRank: 2,
  },
  {
    id: 'msi-ventus-8g-oc',
    name: 'Ventus 2X OC 8GB',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=200&h=200&fit=crop',
    price: 5_500_000,
    stock: 8,
    hotRank: 3,
  },
  {
    id: 'asus-dual-8g',
    name: 'ASUS Dual 8GB',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=200&h=200&fit=crop',
    price: 4_800_000,
    stock: 15,
  },
  {
    id: 'gigabyte-eagle-8g',
    name: 'Gigabyte Eagle 8GB',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=200&h=200&fit=crop',
    price: 5_100_000,
    stock: 4,
  },
  {
    id: 'zotac-twin-8g',
    name: 'Zotac Twin Edge 8GB',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=200&h=200&fit=crop',
    price: 4_900_000,
    stock: 9,
  },
];

const sampleReviews = [
  {
    user: {
      name: 'Sardor A.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop',
    },
    rating: 5,
    variant: '8GB / Qora',
    content:
      "Ajoyib grafik karta! O'yinlar 1080p da 60+ FPS bilan ishlaydi. Sovutish tizimi juda yaxshi, ovozi past.",
    date: '10 mart, 2026',
    images: ['https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=200&h=200&fit=crop'],
  },
  {
    user: { name: 'Dilshod M.' },
    rating: 4,
    content: "Sifati yaxshi, lekin qutisida kabel yo'q edi. Umuman olganda mamnunman.",
    date: '5 mart, 2026',
  },
  {
    user: {
      name: 'Aziza R.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
    },
    rating: 5,
    variant: '8GB / Qora',
    content: 'Rasmiy kafolat bilan keldi. Ray tracing ham yaxshi ishlaydi. Tavsiya qilaman!',
    date: '28 fevral, 2026',
  },
];

/* ---------- Chevron icon ---------- */
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

/* ---------- Component ---------- */

export interface ProductDetailPageProps {
  /** Show discount badge and sale price */
  withDiscount?: boolean;
  /** Show out of stock state */
  outOfStock?: boolean;
  /** Show pre-order mode */
  preOrder?: boolean;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  withDiscount = true,
  outOfStock = false,
  preOrder = false,
}) => {
  const { t } = useGeekShop();
  const [quantity, setQuantity] = useState(1);
  const [skuSheetOpen, setSkuSheetOpen] = useState(false);
  const [selectedVariantName, setSelectedVariantName] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const baseProduct = preOrder ? preOrderProduct : defaultProduct;
  const product = {
    ...baseProduct,
    ...(withDiscount && !preOrder ? {} : { originalPrice: undefined, discount: undefined }),
    ...(outOfStock ? { inStock: false, stock: 0 } : {}),
  };

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

  const handleAddToCart = useCallback(
    (selections: SkuSelection[]) => {
      handleCloseSkuSheet();
      if (selections.length > 0) {
        const variant = skuVariants.find((v) => v.id === selections[0].variantId);
        if (variant) {
          setSelectedVariantName(variant.name);
        }
      }
      showToast(t('product.addedToCart'));
    },
    [handleCloseSkuSheet, showToast, t]
  );

  const handleActionBarAddToCart = useCallback(() => {
    if (!outOfStock) {
      handleOpenSkuSheet();
    }
  }, [outOfStock, handleOpenSkuSheet]);

  const handleActionBarBuyNow = useCallback(() => {
    if (!outOfStock) {
      handleOpenSkuSheet();
    }
  }, [outOfStock, handleOpenSkuSheet]);

  return (
    <div className={styles.page}>
      {/* Image Gallery */}
      <ProductImageGallery
        images={product.images}
        onBack={() => {}}
        onShare={() => {}}
        onFavorite={() => {}}
      />

      {/* Price section */}
      <div className={styles.priceSection}>
        <PriceDisplay
          price={product.price}
          originalPrice={product.originalPrice}
          variant={withDiscount && !preOrder ? 'sale' : 'default'}
          size="lg"
        />
        <div className={styles.sku}>SKU: {product.sku}</div>
      </div>

      {/* Trust badges */}
      <div className={styles.trustBadges}>
        <span className={styles.trustBadge}>
          <svg
            className={styles.trustIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#07C160"
            strokeWidth="2"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          {t('product.warranty')}
        </span>
        <span className={styles.trustBadge}>
          <svg
            className={styles.trustIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1890FF"
            strokeWidth="2"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          {t('product.qualityChecked')}
        </span>
        <span className={styles.trustBadge}>
          <svg
            className={styles.trustIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FF5000"
            strokeWidth="2"
          >
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
          {t('product.freeReturn')}
        </span>
      </div>

      {/* Product info */}
      <div className={styles.infoBlock}>
        <h1 className={styles.title}>{product.title}</h1>
        <div className={styles.tagsRow}>
          <Badge type="text" content={product.brand} color="primary" position="inline" />
          {product.isOfficial && (
            <Badge type="text" content={t('product.official')} color="success" position="inline" />
          )}
          {withDiscount && !preOrder && product.discount && (
            <Badge type="text" content={product.discount} color="error" position="inline" />
          )}
          {preOrder && (
            <Badge type="text" content={t('product.preOrder')} color="primary" position="inline" />
          )}
          {outOfStock ? (
            <span className={styles.outOfStock}>{t('product.outOfStock')}</span>
          ) : !preOrder ? (
            <Badge type="text" content={t('product.inStock')} color="success" position="inline" />
          ) : null}
        </div>
        {!preOrder && product.rating > 0 && (
          <div className={styles.ratingRow}>
            <Rating value={product.rating} count={product.reviewCount} size="sm" />
          </div>
        )}
      </div>

      <Divider />

      {/* Variant selector trigger row */}
      {!outOfStock && !preOrder && (
        <>
          <button
            type="button"
            className={styles.skuTrigger}
            onClick={handleOpenSkuSheet}
            aria-label={t('product.selectVariant')}
          >
            <div>
              <div className={styles.skuTriggerLabel}>{t('product.selectVariant')}</div>
              <div className={styles.skuTriggerValue}>
                {selectedVariantName
                  ? t('product.selectedVariant', { variant: selectedVariantName })
                  : t('product.chooseVariant')}
              </div>
            </div>
            <ChevronRight />
          </button>
          <Divider />
        </>
      )}

      {/* Quantity */}
      {!outOfStock && !preOrder && (
        <>
          <div className={styles.quantityRow}>
            <span className={styles.quantityLabel}>{t('commerce.quantity')}</span>
            <QuantityStepper value={quantity} min={1} max={product.stock} onChange={setQuantity} />
          </div>
          <Divider />
        </>
      )}

      {/* Description section */}
      <Section title={t('product.description')}>
        <div className={styles.descriptionContent}>
          <h4 className={styles.descHeading}>{t('product.about')}</h4>
          <p>
            {product.title} — NVIDIA Ada Lovelace arxitekturasiga asoslangan eng so&apos;nggi grafik
            karta. Ray tracing, DLSS 3.0 va boshqa zamonaviy texnologiyalarni
            qo&apos;llab-quvvatlaydi.
          </p>
          <ul className={styles.descList}>
            <li className={styles.descItem}>NVIDIA Ada Lovelace arxitekturasi</li>
            <li className={styles.descItem}>8GB GDDR6 video xotira</li>
            <li className={styles.descItem}>128-bit xotira shinasi</li>
            <li className={styles.descItem}>Ray Tracing va DLSS 3.0 qo&apos;llab-quvvatlaydi</li>
            <li className={styles.descItem}>Ikki ventilyatorli sovutish tizimi</li>
            <li className={styles.descItem}>3 yil rasmiy kafolat</li>
          </ul>
        </div>
      </Section>

      <Divider />

      {/* Specs section */}
      <Section>
        <SectionHeader
          title={t('product.specifications')}
          count={product.specs.length}
          onViewAll={() => {}}
        />
        <SpecsTable specs={product.specs} />
      </Section>

      <Divider />

      {/* Reviews section */}
      {!preOrder && (
        <Section>
          <SectionHeader
            title={t('product.reviews')}
            count={product.reviewCount}
            onViewAll={() => {}}
          />
          <div className={styles.reviewsList}>
            {sampleReviews.map((review, i) => (
              <ReviewCard
                key={i}
                user={review.user}
                rating={review.rating}
                variant={review.variant}
                content={review.content}
                images={review.images}
                date={review.date}
              />
            ))}
          </div>
        </Section>
      )}

      {/* SKU Selector BottomSheet */}
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
          onAddToCart={handleAddToCart}
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

      {/* Action Bar */}
      {preOrder ? (
        <ActionBar
          onAddToCart={handleActionBarAddToCart}
          onBuyNow={handleActionBarBuyNow}
          onChat={() => {}}
          onCart={() => {}}
          onFavorite={() => {}}
          cartCount={0}
        />
      ) : (
        <ActionBar
          onAddToCart={handleActionBarAddToCart}
          onBuyNow={handleActionBarBuyNow}
          onChat={() => {}}
          onCart={() => {}}
          onFavorite={() => {}}
          cartCount={2}
        />
      )}
    </div>
  );
};
