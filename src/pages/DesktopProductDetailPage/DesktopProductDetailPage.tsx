import { useState } from 'react';
import {
  DesktopShell,
  TopBar,
  DesktopHeader,
  MegaMenu,
  Footer,
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
} from '../../components';
import type { MegaMenuCategory, ReviewUser } from '../../components';
import styles from './DesktopProductDetailPage.module.scss';

// ─── Static data ──────────────────────────────────────────────────────────────

const megaMenuCategories: MegaMenuCategory[] = [
  { label: 'Graphics Cards', subcategories: [{ label: 'NVIDIA RTX 40' }, { label: 'AMD Radeon RX' }] },
  { label: 'Processors', subcategories: [{ label: 'AMD Ryzen 7000' }, { label: 'Intel 14th Gen' }] },
  { label: 'Monitors', subcategories: [{ label: '4K Monitors' }, { label: '2K 165Hz' }] },
  { label: 'Laptops', subcategories: [{ label: 'Gaming' }, { label: 'Ultrabook' }] },
  { label: 'Memory (RAM)' },
  { label: 'Storage' },
  { label: 'Peripherals' },
  { label: 'Cases & Cooling' },
];

const footerColumns = [
  { title: 'Customer Service', links: [{ label: 'Help Center' }, { label: 'Returns & Refunds' }, { label: 'Shipping Info' }] },
  { title: 'About GeekShop', links: [{ label: 'About Us' }, { label: 'Careers' }, { label: 'Press' }] },
  { title: 'Policies', links: [{ label: 'Privacy Policy' }, { label: 'Terms of Service' }] },
];

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


// ─── Shared shell slots ──────────────────────────────────────────────────────

const DesktopTopBar = () => (
  <TopBar
    leftItems={[<span key="w">Welcome to GeekShop!</span>, <span key="s">Seller Center</span>, <span key="h">Help</span>]}
    rightItems={[
      <button key="l" type="button" style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: 'inherit' }}>EN</button>,
      <button key="c" type="button" style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: 'inherit' }}>USD</button>,
    ]}
  />
);

const DesktopHeaderBar = () => (
  <DesktopHeader
    logo={<span style={{ fontWeight: 700, fontSize: 20, color: '#FF5000' }}>GeekShop</span>}
    searchPlaceholder="Search products..."
    cartCount={3}
    wishlistCount={5}
  />
);

const DesktopMegaMenuBar = () => (
  <MegaMenu categories={megaMenuCategories} navItems={[{ label: 'Flash Deals' }, { label: 'New Arrivals' }, { label: 'Top Brands' }]} />
);

const DesktopFooterSection = () => (
  <Footer columns={footerColumns} copyrightText="\u00A9 2026 GeekShop. All rights reserved." />
);

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
      topBar={<DesktopTopBar />}
      header={
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <DesktopHeaderBar />
          <DesktopMegaMenuBar />
        </div>
      }
      footer={<DesktopFooterSection />}
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
                <div className={styles.reviewsList}>
                  {displayReviews.map((review, i) => (
                    <DesktopReviewCard key={i} {...review} />
                  ))}
                </div>
              ),
            },
          ]}
        />
      </div>
    </DesktopShell>
  );
};
