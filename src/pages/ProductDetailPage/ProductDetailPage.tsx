import React, { useState } from 'react';
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
} from '../../components';
import type { SkuVariant, SkuProduct } from '../../components/commerce/SkuSelector/SkuSelector';
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
  specs: { label: string; value: string }[];
}

const defaultProduct: ProductData = {
  title: 'MSI GeForce RTX 4060 Ventus 2X 8GB GDDR6 OC Edition',
  images: [
    'https://picsum.photos/seed/msicard/750/750',
    'https://picsum.photos/seed/msicard2/750/750',
    'https://picsum.photos/seed/msicard3/750/750',
    'https://picsum.photos/seed/msicard4/750/750',
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

/* ---------- SKU data for imageGrid variant ---------- */

const skuProduct: SkuProduct = {
  title: 'MSI GeForce RTX 4060 Ventus 2X 8GB',
  image: 'https://picsum.photos/seed/msicard/200/200',
  priceRange: [4_800_000, 6_500_000],
};

const skuVariants: SkuVariant[] = [
  {
    id: 'msi-ventus-8g',
    name: 'Ventus 2X 8GB',
    image: 'https://picsum.photos/seed/msi-v2x-8g/200/200',
    price: 5_200_000,
    stock: 12,
    hotRank: 1,
  },
  {
    id: 'msi-gaming-8g',
    name: 'Gaming X 8GB',
    image: 'https://picsum.photos/seed/msi-gx-8g/200/200',
    price: 5_800_000,
    stock: 6,
    hotRank: 2,
  },
  {
    id: 'msi-ventus-8g-oc',
    name: 'Ventus 2X OC 8GB',
    image: 'https://picsum.photos/seed/msi-v2x-oc/200/200',
    price: 5_500_000,
    stock: 8,
    hotRank: 3,
  },
  {
    id: 'asus-dual-8g',
    name: 'ASUS Dual 8GB',
    image: 'https://picsum.photos/seed/asus-dual-8g/200/200',
    price: 4_800_000,
    stock: 15,
  },
  {
    id: 'gigabyte-eagle-8g',
    name: 'Gigabyte Eagle 8GB',
    image: 'https://picsum.photos/seed/giga-eagle-8g/200/200',
    price: 5_100_000,
    stock: 4,
  },
  {
    id: 'zotac-twin-8g',
    name: 'Zotac Twin Edge 8GB',
    image: 'https://picsum.photos/seed/zotac-twin-8g/200/200',
    price: 4_900_000,
    stock: 9,
  },
];

const sampleReviews = [
  {
    user: { name: 'Sardor A.', avatar: 'https://picsum.photos/seed/user1/80/80' },
    rating: 5,
    variant: '8GB / Qora',
    content: 'Ajoyib grafik karta! O\'yinlar 1080p da 60+ FPS bilan ishlaydi. Sovutish tizimi juda yaxshi, ovozi past.',
    date: '10 mart, 2026',
    images: ['https://picsum.photos/seed/rev1/200/200'],
  },
  {
    user: { name: 'Dilshod M.' },
    rating: 4,
    content: 'Sifati yaxshi, lekin qutisida kabel yo\'q edi. Umuman olganda mamnunman.',
    date: '5 mart, 2026',
  },
  {
    user: { name: 'Aziza R.', avatar: 'https://picsum.photos/seed/user3/80/80' },
    rating: 5,
    variant: '8GB / Qora',
    content: 'Rasmiy kafolat bilan keldi. Ray tracing ham yaxshi ishlaydi. Tavsiya qilaman!',
    date: '28 fevral, 2026',
  },
];

/* ---------- Component ---------- */

export interface ProductDetailPageProps {
  /** Show discount badge and sale price */
  withDiscount?: boolean;
  /** Show out of stock state */
  outOfStock?: boolean;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  withDiscount = true,
  outOfStock = false,
}) => {
  const [quantity, setQuantity] = useState(1);

  const product = {
    ...defaultProduct,
    ...(withDiscount
      ? {}
      : { originalPrice: undefined, discount: undefined }),
    ...(outOfStock ? { inStock: false, stock: 0 } : {}),
  };

  return (
    <div className={styles.page}>
      {/* Image Gallery (has its own back/share/fav buttons) */}
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
          variant={withDiscount ? 'sale' : 'default'}
          size="lg"
        />
        <div className={styles.sku}>SKU: {product.sku}</div>
      </div>

      {/* Trust badges */}
      <div className={styles.trustBadges}>
        <span className={styles.trustBadge}>
          <svg className={styles.trustIcon} viewBox="0 0 24 24" fill="none" stroke="#07C160" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <path d="m9 12 2 2 4-4"/>
          </svg>
          Rasmiy kafolat
        </span>
        <span className={styles.trustBadge}>
          <svg className={styles.trustIcon} viewBox="0 0 24 24" fill="none" stroke="#1890FF" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          Sifat tekshirilgan
        </span>
        <span className={styles.trustBadge}>
          <svg className={styles.trustIcon} viewBox="0 0 24 24" fill="none" stroke="#FF5000" strokeWidth="2">
            <polyline points="1 4 1 10 7 10"/>
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
          </svg>
          Bepul qaytarish
        </span>
      </div>

      {/* Product info */}
      <div className={styles.infoBlock}>
        <h1 className={styles.title}>{product.title}</h1>
        <div className={styles.tagsRow}>
          <Badge type="text" content={product.brand} color="primary" position="inline" />
          {product.isOfficial && (
            <Badge type="text" content="Rasmiy" color="success" position="inline" />
          )}
          {withDiscount && product.discount && (
            <Badge type="text" content={product.discount} color="error" position="inline" />
          )}
          {outOfStock ? (
            <span className={styles.outOfStock}>Mavjud emas</span>
          ) : (
            <Badge type="text" content="Mavjud" color="success" position="inline" />
          )}
        </div>
        <div className={styles.ratingRow}>
          <Rating value={product.rating} count={product.reviewCount} size="sm" />
        </div>
      </div>

      <Divider />

      {/* SKU Selector */}
      {!outOfStock && (
        <SkuSelector
          product={skuProduct}
          variants={skuVariants}
          open={true}
          onClose={() => {}}
          onAddToCart={() => {}}
        />
      )}

      <Divider />

      {/* Quantity */}
      {!outOfStock && (
        <>
          <div className={styles.quantityRow}>
            <span className={styles.quantityLabel}>Miqdor</span>
            <QuantityStepper
              value={quantity}
              min={1}
              max={product.stock}
              onChange={setQuantity}
            />
          </div>
          <Divider />
        </>
      )}

      {/* Description section */}
      <Section title="Tavsif">
        <div className={styles.descriptionContent}>
          <h4 className={styles.descHeading}>Mahsulot haqida</h4>
          <p>
            MSI GeForce RTX 4060 Ventus 2X 8GB — NVIDIA Ada Lovelace arxitekturasiga
            asoslangan eng so'nggi grafik karta. Ray tracing, DLSS 3.0 va boshqa
            zamonaviy texnologiyalarni qo'llab-quvvatlaydi.
          </p>
          <ul className={styles.descList}>
            <li className={styles.descItem}>NVIDIA Ada Lovelace arxitekturasi</li>
            <li className={styles.descItem}>8GB GDDR6 video xotira</li>
            <li className={styles.descItem}>128-bit xotira shinasi</li>
            <li className={styles.descItem}>Ray Tracing va DLSS 3.0 qo'llab-quvvatlaydi</li>
            <li className={styles.descItem}>Ikki ventilyatorli sovutish tizimi</li>
            <li className={styles.descItem}>3 yil rasmiy kafolat</li>
          </ul>
        </div>
      </Section>

      <Divider />

      {/* Specs section */}
      <Section>
        <SectionHeader title="Xususiyatlar" count={product.specs.length} onViewAll={() => {}} />
        <SpecsTable specs={product.specs} />
      </Section>

      <Divider />

      {/* Reviews section */}
      <Section>
        <SectionHeader
          title="Baholar"
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

      {/* Action Bar */}
      <ActionBar
        onAddToCart={() => {}}
        onBuyNow={() => {}}
        onChat={() => {}}
        onCart={() => {}}
        onFavorite={() => {}}
        cartCount={2}
      />
    </div>
  );
};

export default ProductDetailPage;
