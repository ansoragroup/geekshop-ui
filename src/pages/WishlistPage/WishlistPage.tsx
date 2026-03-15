import React, { useState } from 'react';
import {
  NavBar,
  Container,
  TabFilter,
  ProductGrid,
  TabBar,
  Empty,
  useGeekShop,
} from '../../components';
import type { ProductCardFlatProps } from '../../components/product/ProductCard';
import styles from './WishlistPage.module.scss';

/* ---------- Wishlist products ---------- */

const wishlistProducts: (ProductCardFlatProps & { tags: string[] })[] = [
  {
    image: 'https://picsum.photos/seed/wish-gpu/300/300',
    title: 'MSI GeForce RTX 4060 Ventus 2X 8GB GDDR6',
    price: 5200000,
    originalPrice: 5800000,
    discount: '-10%',
    badge: 'hot',
    soldCount: '320+ sotilgan',
    tags: ['sale'],
  },
  {
    image: 'https://picsum.photos/seed/wish-cpu/300/300',
    title: 'AMD Ryzen 7 7800X3D Protsessor AM5',
    price: 4100000,
    soldCount: '540+ sotilgan',
    tags: ['lowstock'],
  },
  {
    image: 'https://picsum.photos/seed/wish-monitor/300/300',
    title: 'ASUS ROG Swift 27" 2K 165Hz Gaming Monitor',
    price: 4800000,
    originalPrice: 5500000,
    discount: '-13%',
    badge: 'top',
    soldCount: '180+ sotilgan',
    tags: ['sale'],
  },
  {
    image: 'https://picsum.photos/seed/wish-keyboard/300/300',
    title: 'Keychron Q1 Pro Mechanical Keyboard RGB',
    price: 1850000,
    badge: 'new',
    soldCount: '95+ sotilgan',
    tags: ['lowstock'],
  },
  {
    image: 'https://picsum.photos/seed/wish-ssd/300/300',
    title: 'Samsung 990 Pro NVMe 2TB SSD M.2',
    price: 2800000,
    originalPrice: 3200000,
    discount: '-12%',
    soldCount: '420+ sotilgan',
    tags: ['sale'],
  },
  {
    image: 'https://picsum.photos/seed/wish-mouse/300/300',
    title: 'Logitech G Pro X Superlight 2 Wireless Mouse',
    price: 1400000,
    soldCount: '610+ sotilgan',
    tags: [],
  },
  {
    image: 'https://picsum.photos/seed/wish-cooler/300/300',
    title: 'Noctua NH-D15 CPU Cooler Dual Tower',
    price: 1200000,
    originalPrice: 1500000,
    discount: '-20%',
    badge: 'hot',
    soldCount: '200+ sotilgan',
    tags: ['sale', 'lowstock'],
  },
  {
    image: 'https://picsum.photos/seed/wish-case/300/300',
    title: 'NZXT H7 Flow ATX Mid-Tower Case Oq',
    price: 1600000,
    badge: 'new',
    soldCount: '75+ sotilgan',
    tags: [],
  },
];

/* ---------- Tab definition keys ---------- */

const tabKeys = [
  { key: 'all', labelKey: 'common.all', badge: 8 },
  { key: 'sale', labelKey: 'wishlist.onSale', badge: 4 },
  { key: 'lowstock', labelKey: 'wishlist.lowStock', badge: 3 },
];

/* ---------- Heart filled icon ---------- */

const HeartFilledIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#FF3B30" stroke="#FF3B30" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

/* ---------- Wishlist empty icon ---------- */

const WishlistEmptyIcon = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
    <circle cx="60" cy="60" r="50" fill="#FFF5F0" />
    <path
      d="M75.84 44.61a11 11 0 00-15.56 0L60 44.89l-.28-.28a11 11 0 00-15.56 15.56L60 76l15.84-15.84a11 11 0 000-15.56z"
      stroke="#FF5000"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M75.84 44.61a11 11 0 00-15.56 0L60 44.89l-.28-.28a11 11 0 00-15.56 15.56L60 76l15.84-15.84a11 11 0 000-15.56z"
      fill="#FF5000"
      opacity="0.1"
    />
  </svg>
);

/* ---------- Component ---------- */

export interface WishlistPageProps {
  empty?: boolean;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({
  empty = false,
}) => {
  const { t } = useGeekShop();
  const [activeTab, setActiveTab] = useState('all');

  const tabs = tabKeys.map((tab) => ({
    key: tab.key,
    label: t(tab.labelKey),
    badge: tab.badge,
  }));

  const filteredProducts = activeTab === 'all'
    ? wishlistProducts
    : wishlistProducts.filter((p) => p.tags.includes(activeTab));

  const productsForGrid = filteredProducts.map(({ tags, ...rest }) => { void tags; return rest; });

  return (
    <div className={styles.page}>
      <NavBar
        title={`${t('page.wishlist')}${!empty ? ' (8)' : ''}`}
        showBack
        onBack={() => {}}
        rightActions={
          !empty
            ? [
                {
                  key: 'heart',
                  icon: <HeartFilledIcon />,
                  onClick: () => {},
                  ariaLabel: t('page.wishlist'),
                },
              ]
            : []
        }
      />

      <Container hasNavbar hasTabbar>
        {empty ? (
          <Empty
            icon={<WishlistEmptyIcon />}
            title={t('wishlist.empty')}
            description={t('wishlist.emptyDescription')}
            actionText={t('wishlist.viewProducts')}
            onAction={() => {}}
          />
        ) : (
          <>
            <TabFilter
              tabs={tabs}
              activeTab={activeTab}
              onChange={setActiveTab}
            />

            {filteredProducts.length === 0 ? (
              <Empty
                title={t('wishlist.noResults')}
                description={t('wishlist.noFilterResults')}
              />
            ) : (
              <div className={styles.gridWrapper}>
                <ProductGrid products={productsForGrid} columns={2} gap={8} />
              </div>
            )}
          </>
        )}
      </Container>

      <TabBar activeKey="profile" onChange={() => {}} />
    </div>
  );
};

export default WishlistPage;
