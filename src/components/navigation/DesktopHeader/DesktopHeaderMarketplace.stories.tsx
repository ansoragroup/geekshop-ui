import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopHeaderMarketplace } from './DesktopHeaderMarketplace';
import type { MegaMenuCategory } from '../MegaMenu';

const meta = {
  title: 'Navigation (Desktop)/DesktopHeaderMarketplace',
  component: DesktopHeaderMarketplace,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    onSearch: { action: 'search' },
    onSearchChange: { action: 'search change' },
    onCartClick: { action: 'cart' },
    onOrdersClick: { action: 'orders' },
    onUserClick: { action: 'user' },
    onLogoClick: { action: 'logo' },
    onCatalogClick: { action: 'catalog' },
    onLocationClick: { action: 'location' },
    onCategoryClick: { action: 'category click' },
  },
} satisfies Meta<typeof DesktopHeaderMarketplace>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Data ───────────────────────────────────────────────────────────────────

const mockCategories: MegaMenuCategory[] = [
  { label: 'Electronics', subcategories: [{ label: 'Smartphones' }, { label: 'Laptops' }, { label: 'Tablets' }, { label: 'Headphones' }, { label: 'Cameras' }] },
  { label: 'Clothing', subcategories: [{ label: 'Men' }, { label: 'Women' }, { label: 'Kids' }, { label: 'Shoes' }, { label: 'Accessories' }] },
  { label: 'Home & Garden', subcategories: [{ label: 'Furniture' }, { label: 'Lighting' }, { label: 'Kitchen' }, { label: 'Bedding' }] },
  { label: 'Beauty', subcategories: [{ label: 'Skincare' }, { label: 'Makeup' }, { label: 'Fragrance' }, { label: 'Hair Care' }] },
  { label: 'Sports', subcategories: [{ label: 'Fitness' }, { label: 'Cycling' }, { label: 'Camping' }, { label: 'Swimming' }] },
  { label: 'Auto', subcategories: [{ label: 'Parts' }, { label: 'Accessories' }, { label: 'Tools' }, { label: 'Electronics' }] },
  { label: 'Books', subcategories: [{ label: 'Fiction' }, { label: 'Non-Fiction' }, { label: 'Textbooks' }, { label: 'Comics' }] },
  { label: 'Toys & Kids', subcategories: [{ label: 'Action Figures' }, { label: 'Board Games' }, { label: 'LEGO' }, { label: 'Dolls' }] },
];

const trendingSearches = [
  { text: 'iPhone 16 Pro Max', count: 45200 },
  { text: 'Samsung Galaxy S25 Ultra', count: 38100 },
  { text: 'AirPods Pro 3', count: 29800 },
];

const suggestedProducts = [
  {
    id: '1',
    title: 'Apple MacBook Air M4 15" 16GB RAM',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=96&h=96&fit=crop',
    price: 18500000,
    rating: 4.9,
  },
  {
    id: '2',
    title: 'Sony WH-1000XM5 Wireless Headphones',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=96&h=96&fit=crop',
    price: 4200000,
    rating: 4.8,
  },
];

const searchCategories = [
  { id: '1', name: 'Electronics', count: 12400 },
  { id: '2', name: 'Laptops', count: 3200 },
];

// ─── Stories ────────────────────────────────────────────────────────────────

/** Default marketplace header with logo, categories, search, promo tags, and location. */
export const Default: Story = {
  args: {
    logo: <span style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>GeekShop</span>,
    searchPlaceholder: 'Search products...',
    cartCount: 3,
    categories: mockCategories,
    recentSearches: ['bluetooth headphones', 'phone case', 'running shoes'],
    promoTags: [
      { label: 'BIG SALE', bgColor: '#FF3B30', textColor: '#FFFFFF' },
      { label: 'NEW ARRIVALS', bgColor: '#1A1A1A', textColor: '#FFFFFF' },
    ],
    quickLinks: [{ label: 'Hot Deals' }, { label: 'Top Products' }],
    location: 'New York, NY',
    language: 'EN',
    currency: 'USD',
  },
};

/** Full-featured: all search sections (recent, trending, products, categories), photo search, promo tags, quick links, and location. */
export const FullFeatured: Story = {
  args: {
    logo: <span style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>GeekShop</span>,
    searchPlaceholder: 'Search for electronics, fashion, home...',
    searchValue: '',
    cartCount: 7,
    categories: mockCategories,
    recentSearches: ['RTX 4090', 'Wireless earbuds', 'Laptop stand', 'USB-C hub', 'Monitor arm'],
    trendingSearches,
    suggestedProducts,
    searchCategorySuggestions: searchCategories,
    onClearRecentSearches: () => {},
    onPhotoSearch: () => {},
    promoTags: [
      { label: 'MEGA SALE -70%', bgColor: '#FF3B30', textColor: '#FFFFFF' },
      { label: 'FREE SHIPPING', bgColor: '#07C160', textColor: '#FFFFFF' },
      { label: 'NEW SEASON', bgColor: '#1A1A1A', textColor: '#FFFFFF' },
    ],
    quickLinks: [
      { label: 'Flash Deals' },
      { label: 'Best Sellers' },
      { label: 'New Arrivals' },
      { label: 'Gift Cards' },
    ],
    location: 'Tashkent, Uzbekistan',
    language: 'EN',
    currency: 'UZS',
    labels: {
      catalog: 'Catalog',
      search: 'Search',
      orders: 'My Orders',
      cart: 'Cart',
      cartWithCount: 'Cart ({count})',
      signIn: 'Sign in',
    },
  },
};

/** Custom search button color (green, like Ozon/Uzum style). */
export const CustomSearchButton: Story = {
  args: {
    ...Default.args,
    searchButtonColor: '#B8E639',
    labels: { search: 'Find', catalog: 'Browse', orders: 'My Orders', cart: 'Bag', signIn: 'Log in' },
  },
};

/** Minimal: only logo and a few categories, no promo row. */
export const Minimal: Story = {
  args: {
    logo: <span style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>Store</span>,
    categories: mockCategories.slice(0, 3),
    searchPlaceholder: 'Search...',
  },
};

/** No categories at all, shows a catalog fallback button. */
export const NoCatalog: Story = {
  args: {
    logo: <span style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>MiniShop</span>,
    searchPlaceholder: 'Search products...',
    cartCount: 1,
  },
};

/** Empty cart (zero count, no badge). */
export const EmptyCart: Story = {
  args: {
    logo: <span style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>GeekShop</span>,
    searchPlaceholder: 'Search...',
    cartCount: 0,
    categories: mockCategories.slice(0, 4),
  },
};

/** Very high cart count (99+ overflow). */
export const HighCartCount: Story = {
  args: {
    logo: <span style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>GeekShop</span>,
    searchPlaceholder: 'Search...',
    cartCount: 150,
    categories: mockCategories.slice(0, 4),
    promoTags: [{ label: 'CLEARANCE', bgColor: '#FF3B30' }],
    location: 'Samarkand',
  },
};

/** Russian locale with all labels overridden. */
export const RussianLocale: Story = {
  args: {
    logo: <span style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>GeekShop</span>,
    searchPlaceholder: 'Поиск товаров...',
    cartCount: 5,
    categories: mockCategories,
    labels: {
      catalog: 'Каталог',
      search: 'Найти',
      orders: 'Заказы',
      cart: 'Корзина',
      cartWithCount: 'Корзина ({count})',
      signIn: 'Войти',
      userActions: 'Действия пользователя',
      locationPrefix: 'Местоположение: {location}',
    },
    promoTags: [
      { label: 'ВЕЛИКАЯ РАСПРОДАЖА', bgColor: '#FF3B30' },
      { label: 'КАЛЕНДАРЬ СКИДКОВ', bgColor: '#1A1A1A' },
    ],
    quickLinks: [{ label: 'Горящие товары' }, { label: 'Топ-товары' }],
    location: 'Чиланзарский р-н',
    language: 'RU',
    currency: 'UZS',
    searchButtonColor: '#B8E639',
  },
};

/** Uzbek locale. */
export const UzbekLocale: Story = {
  args: {
    logo: <span style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>GeekShop</span>,
    searchPlaceholder: 'Mahsulotlarni qidiring...',
    cartCount: 2,
    categories: mockCategories,
    labels: {
      catalog: 'Katalog',
      search: 'Qidirish',
      orders: 'Buyurtmalar',
      cart: 'Savatcha',
      cartWithCount: 'Savatcha ({count})',
      signIn: 'Kirish',
    },
    promoTags: [
      { label: 'KATTA CHEGIRMA', bgColor: '#FF3B30' },
      { label: 'YANGI MAHSULOTLAR', bgColor: '#1A1A1A' },
    ],
    quickLinks: [{ label: 'Aksiyalar' }, { label: 'Eng yaxshi' }],
    location: 'Toshkent shahri',
    language: 'UZ',
    currency: 'UZS',
  },
};

/** Promo tags only, no quick links or location. */
export const PromoTagsOnly: Story = {
  args: {
    logo: <span style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>GeekShop</span>,
    categories: mockCategories.slice(0, 4),
    searchPlaceholder: 'Search...',
    promoTags: [
      { label: 'SUMMER SALE', bgColor: '#FF5000', textColor: '#fff' },
      { label: 'BUY 2 GET 1 FREE', bgColor: '#07C160', textColor: '#fff' },
      { label: 'MEMBERS ONLY', bgColor: '#1890FF', textColor: '#fff' },
      { label: 'FLASH DEAL', bgColor: '#FFA726', textColor: '#1A1A1A' },
    ],
  },
};

/** Quick links only (no promo tags). */
export const QuickLinksOnly: Story = {
  args: {
    logo: <span style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>GeekShop</span>,
    categories: mockCategories.slice(0, 4),
    searchPlaceholder: 'Search...',
    quickLinks: [
      { label: 'Flash Deals' },
      { label: 'Bestsellers' },
      { label: 'New This Week' },
      { label: 'PC Builder Tool' },
      { label: 'Gift Ideas' },
    ],
    location: 'Bukhara',
  },
};

/** Custom action buttons replacing default Orders/Cart/SignIn. */
export const CustomActions: Story = {
  args: {
    logo: <span style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>CustomShop</span>,
    categories: mockCategories.slice(0, 4),
    searchPlaceholder: 'Search...',
    actions: (
      <div style={{ display: 'flex', gap: 12 }}>
        <button type="button" style={{ background: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontWeight: 600 }}>
          Sell
        </button>
        <button type="button" style={{ background: '#FF5000', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontWeight: 600 }}>
          Download App
        </button>
      </div>
    ),
  },
};

/** Location displayed without promo row content. */
export const LocationOnly: Story = {
  args: {
    logo: <span style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>GeekShop</span>,
    categories: mockCategories.slice(0, 3),
    searchPlaceholder: 'Search...',
    location: 'Fergana Valley, Uzbekistan',
    language: 'EN',
    currency: 'UZS',
  },
};
