import { useState } from 'react';
import {
  DesktopShell,
  TopBar,
  DesktopHeaderRich,
  MegaMenu,
  Footer,
  Breadcrumbs,
  DesktopProductGrid,
  DesktopSectionHeader,
  DesktopEmpty,
} from '../../components';
import type {
  MegaMenuCategory,
  CategoryItem,
  PromoLink,
  DesktopProductGridItem,
} from '../../components';
import styles from './DesktopWishlistPage.module.scss';

// ─── Static data ──────────────────────────────────────────────────────────────

const footerColumns = [
  { title: 'Customer Service', links: [{ label: 'Help Center' }, { label: 'Returns & Refunds' }, { label: 'Shipping Info' }] },
  { title: 'About GeekShop', links: [{ label: 'About Us' }, { label: 'Careers' }, { label: 'Press' }] },
  { title: 'Policies', links: [{ label: 'Privacy Policy' }, { label: 'Terms of Service' }] },
  { title: 'Connect', links: [{ label: 'Telegram' }, { label: 'Instagram' }] },
];

const megaMenuCategories: MegaMenuCategory[] = [
  { label: 'Graphics Cards', subcategories: [{ label: 'NVIDIA RTX 40' }, { label: 'AMD Radeon RX' }] },
  { label: 'Processors' },
  { label: 'Monitors' },
  { label: 'Laptops' },
];

const headerCategories: CategoryItem[] = [
  { id: '1', label: 'Smartphones', icon: '' },
  { id: '2', label: 'Laptops', icon: '' },
];

const promoLinks: PromoLink[] = [
  { id: '1', label: 'Delivery & Returns' },
  { id: '2', label: 'Premium', highlight: true },
];

const wishlistProducts: DesktopProductGridItem[] = [
  { id: 'w1', image: 'https://c1.neweggimages.com/ProductImageCompressAll1280/34-346-003-V01.jpg', title: 'Apple MacBook Air M3 15" 16GB RAM 512GB', price: 18900000, originalPrice: 21500000, discount: '-12%', rating: 4.9, reviewCount: 567, freeShipping: true },
  { id: 'w2', image: 'https://c1.neweggimages.com/ProductImageCompressAll1280/14-126-678-V01.jpg', title: 'ASUS ROG Strix RTX 4070 Super OC 12GB', price: 8900000, originalPrice: 10200000, discount: '-13%', rating: 4.7, reviewCount: 345, freeShipping: true },
  { id: 'w3', image: 'https://c1.neweggimages.com/ProductImageCompressAll1280/26-106-967-V01.jpg', title: 'Sony WH-1000XM5 Wireless Noise Cancelling', price: 3900000, rating: 4.8, reviewCount: 2100, freeShipping: false },
  { id: 'w4', image: 'https://c1.neweggimages.com/ProductImageCompressAll1280/23-816-215-V01.jpg', title: 'Keychron Q1 Pro 75% Mechanical Keyboard', price: 1850000, originalPrice: 2200000, discount: '-16%', rating: 4.6, reviewCount: 890, freeShipping: true },
  { id: 'w5', image: 'https://c1.neweggimages.com/ProductImageCompressAll1280/19-113-771-V01.jpg', title: 'AMD Ryzen 9 7950X3D Processor', price: 7200000, originalPrice: 8500000, discount: '-15%', rating: 4.9, reviewCount: 234, freeShipping: true },
  { id: 'w6', image: 'https://c1.neweggimages.com/ProductImageCompressAll1280/20-147-874-V01.jpg', title: 'Samsung 990 Pro 2TB NVMe SSD', price: 2400000, rating: 4.8, reviewCount: 1234, freeShipping: true },
];

// ─── Component ────────────────────────────────────────────────────────────────

export interface DesktopWishlistPageProps {
  /** Override wishlist items. Defaults to hardcoded products. */
  initialProducts?: DesktopProductGridItem[];
}

export const DesktopWishlistPage: React.FC<DesktopWishlistPageProps> = ({
  initialProducts,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [items] = useState(initialProducts ?? wishlistProducts);

  const header = (
    <div className={styles.headerWrapper}>
      <DesktopHeaderRich
        logo={<span className={styles.logoText}>GeekShop</span>}
        searchPlaceholder="Search products..."
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        cartCount={3}
        wishlistCount={items.length}
        categories={headerCategories}
        promoLinks={promoLinks}
        location="Tashkent"
      />
      <MegaMenu categories={megaMenuCategories} navItems={[{ label: 'Flash Deals' }, { label: 'New Arrivals' }]} />
    </div>
  );

  return (
    <DesktopShell
      topBar={
        <TopBar
          leftItems={[<span key="w">Welcome to GeekShop!</span>]}
          rightItems={[
            <button key="l" type="button" className={styles.topBarBtn}>EN</button>,
            <button key="c" type="button" className={styles.topBarBtn}>UZS</button>,
          ]}
        />
      }
      header={header}
      footer={<Footer columns={footerColumns} copyrightText="© 2026 GeekShop. All rights reserved." />}
    >
      <div className={styles.breadcrumbs}>
        <Breadcrumbs items={[{ label: 'Home', href: '#' }, { label: 'My Wishlist' }]} />
      </div>

      <DesktopSectionHeader
        title={`My Wishlist (${items.length})`}
        subtitle="Products you saved for later"
      />

      <div className={styles.content}>
        {items.length === 0 ? (
          <DesktopEmpty
            title="Your wishlist is empty"
            description="Browse our products and add items you love."
          />
        ) : (
          <DesktopProductGrid
            products={items}
            columns={5}
            viewMode="grid"
          />
        )}
      </div>
    </DesktopShell>
  );
};
