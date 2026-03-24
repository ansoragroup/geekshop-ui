import { useState } from 'react';
import {
  DesktopShell,
  Breadcrumbs,
  DesktopProductImageGallery,
  PriceDisplay,
  Rating,
  DesktopQuantityStepper,
  Button,
  Tabs,
  DesktopSpecsTable,
  DesktopReviewCard,
  DesktopSkuSelector,
  DesktopInstallmentCalculator,
  DesktopRatingDistribution,
} from '../../components';
import type { ReviewUser } from '../../components';
import { DefaultTopBar, DefaultHeader, DefaultMegaMenu, DefaultFooter } from '../_shared';
import styles from './DesktopProductDetailPage.module.scss';

const productImages = [
  'https://picsum.photos/seed/pdp-main/600/600',
  'https://picsum.photos/seed/pdp-angle/600/600',
  'https://picsum.photos/seed/pdp-back/600/600',
  'https://picsum.photos/seed/pdp-box/600/600',
  'https://picsum.photos/seed/pdp-ports/600/600',
];

const specs = [
  { label: 'GPU', value: 'NVIDIA GeForce RTX 4070 Super' },
  { label: 'Memory', value: '12GB GDDR6X' },
  { label: 'Memory Bus', value: '192-bit' },
  { label: 'Base Clock', value: '1980 MHz' },
  { label: 'Boost Clock', value: '2475 MHz' },
  { label: 'CUDA Cores', value: '7168' },
  { label: 'RT Cores', value: '56 (3rd Gen)' },
  { label: 'TDP', value: '220W' },
  { label: 'Power Connector', value: '1x 16-pin' },
  { label: 'Display Outputs', value: '3x DP 1.4a, 1x HDMI 2.1' },
  { label: 'Dimensions', value: '308 x 120 x 52 mm' },
  { label: 'Warranty', value: '3 years' },
];

const reviews = [
  {
    user: { name: 'Dilshod Rahimov', avatar: 'https://picsum.photos/seed/user-1/64/64' } as ReviewUser,
    rating: 5,
    content: 'Excellent GPU! Runs all games at ultra settings 1440p 60+ FPS. Temperature stays under 65C. Highly recommended for the price.',
    date: '14 March, 2026',
    variant: '12GB / Black',
    images: ['https://picsum.photos/seed/review-img-1/200/200', 'https://picsum.photos/seed/review-img-2/200/200'],
  },
  {
    user: { name: 'Nodira Karimova' } as ReviewUser,
    rating: 4,
    content: 'Good product, but the box arrived slightly damaged. The card itself works perfectly. Delivery took 2 days within Tashkent.',
    date: '12 March, 2026',
    variant: '12GB / Black',
  },
  {
    user: { name: 'Bekzod Tursunov', avatar: 'https://picsum.photos/seed/user-3/64/64' } as ReviewUser,
    rating: 5,
    content: 'Best value for money. Massive upgrade from my GTX 1660. DLSS 3 technology works great and significantly boosts FPS.',
    date: '10 March, 2026',
    variant: '12GB / Black',
    images: ['https://picsum.photos/seed/review-img-3/200/200'],
  },
];


// ─── Component ────────────────────────────────────────────────────────────────

export interface DesktopProductDetailPageProps {
  /** Product title */
  productTitle?: string;
  /** Product price */
  price?: number;
  /** Original price (for sale) */
  originalPrice?: number;
  /** Whether product is in stock */
  inStock?: boolean;
  /** Rating value */
  ratingValue?: number;
  /** Number of reviews */
  reviewCount?: number;
  /** Stock quantity */
  stock?: number;
  /** Reviews to display */
  productReviews?: typeof reviews;
}

export const DesktopProductDetailPage: React.FC<DesktopProductDetailPageProps> = ({
  productTitle = 'MSI GeForce RTX 4070 Super 12GB GDDR6X Gaming X Slim',
  price = 8900000,
  originalPrice = 12000000,
  inStock = true,
  ratingValue = 4.6,
  reviewCount: reviewCountProp,
  stock = 12,
  productReviews,
}) => {
  const displayReviews = productReviews ?? reviews;
  const displayReviewCount = reviewCountProp ?? displayReviews.length;
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');
  const [selectedColor, setSelectedColor] = useState('Black');

  return (
    <DesktopShell
      topBar={<DefaultTopBar />}
      header={
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <DefaultHeader />
          <DefaultMegaMenu />
        </div>
      }
      footer={<DefaultFooter />}
    >
      {/* Breadcrumbs */}
      <div className={styles.breadcrumbs}>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '#' },
            { label: 'Graphics Cards', href: '#' },
            { label: 'NVIDIA RTX 4070 Super', href: '#' },
            { label: 'MSI GeForce RTX 4070 Super' },
          ]}
        />
      </div>

      {/* Product detail: image left, info right */}
      <div className={styles.productLayout}>
        {/* Left: Image Gallery */}
        <div className={styles.imageSection}>
          <DesktopProductImageGallery images={productImages} />
        </div>

        {/* Right: Product Info */}
        <div className={styles.infoSection}>
          <h1 className={styles.productTitle}>{productTitle}</h1>
          <div className={styles.ratingRow}>
            <Rating value={ratingValue} count={displayReviewCount} />
            <span className={styles.stockLabel} style={inStock ? {} : { color: '#FF3B30' }}>{inStock ? 'In Stock' : 'Out of Stock'}</span>
          </div>
          <div className={styles.priceRow}>
            <PriceDisplay price={price} originalPrice={originalPrice} variant={originalPrice ? 'sale' : 'default'} size="lg" />
          </div>

          {/* Installment Calculator */}
          <div className={styles.installmentSection}>
            <DesktopInstallmentCalculator
              price={price}
              options={[
                { months: 3, rate: 0 },
                { months: 6, rate: 0 },
                { months: 12, rate: 5 },
              ]}
            />
          </div>

          {/* SKU Selection */}
          <DesktopSkuSelector
            variants={[
              { name: 'Color', options: [{ value: 'Black' }, { value: 'White' }] },
              { name: 'Memory', options: [{ value: '12GB GDDR6X' }] },
            ]}
            selectedValues={{ Color: selectedColor, Memory: '12GB GDDR6X' }}
            onSelect={(name, value) => { if (name === 'Color') setSelectedColor(value); }}
            stock={stock}
            price={price}
          />

          {/* Quantity */}
          <div className={styles.quantityRow}>
            <span className={styles.skuLabel}>Quantity</span>
            <DesktopQuantityStepper value={quantity} onChange={setQuantity} min={1} max={10} />
          </div>

          {/* Actions */}
          <div className={styles.actionRow}>
            {inStock ? (
              <>
                <Button variant="outline" size="lg" style={{ flex: 1 }}>Add to Cart</Button>
                <Button variant="primary" size="lg" style={{ flex: 1 }}>Buy Now</Button>
              </>
            ) : (
              <Button variant="primary" size="lg" style={{ flex: 1 }}>Notify When Available</Button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs: Specs, Reviews */}
      <div className={styles.tabsSection}>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: 'specs',
              label: 'Specifications',
              children: <DesktopSpecsTable specs={specs} columns={2} />,
            },
            {
              key: 'reviews',
              label: `Reviews (${displayReviews.length})`,
              children: displayReviews.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
                  <p style={{ fontSize: 16, fontWeight: 600, color: '#333' }}>No reviews yet</p>
                  <p style={{ fontSize: 14, marginTop: 4 }}>Be the first to review this product!</p>
                </div>
              ) : (
                <div className={styles.reviewsSection}>
                  <DesktopRatingDistribution
                    distribution={{
                      5: Math.round(displayReviews.filter((r) => r.rating === 5).length * 420),
                      4: Math.round(displayReviews.filter((r) => r.rating === 4).length * 210),
                      3: Math.round(displayReviews.filter((r) => r.rating === 3).length * 65),
                      2: Math.round(displayReviews.filter((r) => r.rating === 2).length * 19),
                      1: Math.round(displayReviews.filter((r) => r.rating === 1).length * 8),
                    }}
                    average={ratingValue}
                    total={displayReviewCount}
                  />
                  <div className={styles.reviewsList}>
                    {displayReviews.map((review, i) => (
                      <DesktopReviewCard key={i} {...review} />
                    ))}
                  </div>
                </div>
              ),
            },
          ]}
        />
      </div>
    </DesktopShell>
  );
};
