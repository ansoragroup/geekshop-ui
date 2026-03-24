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

const mockCategories: MegaMenuCategory[] = [
  { label: 'Electronics', subcategories: [{ label: 'Smartphones' }, { label: 'Laptops' }, { label: 'Tablets' }, { label: 'Headphones' }] },
  { label: 'Clothing', subcategories: [{ label: 'Men' }, { label: 'Women' }, { label: 'Kids' }, { label: 'Shoes' }] },
  { label: 'Home & Garden', subcategories: [{ label: 'Furniture' }, { label: 'Lighting' }, { label: 'Kitchen' }] },
  { label: 'Beauty', subcategories: [{ label: 'Skincare' }, { label: 'Makeup' }, { label: 'Fragrance' }] },
  { label: 'Sports', subcategories: [{ label: 'Fitness' }, { label: 'Cycling' }, { label: 'Camping' }] },
  { label: 'Auto', subcategories: [{ label: 'Parts' }, { label: 'Accessories' }, { label: 'Tools' }] },
];

export const Default: Story = {
  args: {
    logo: <span style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>MyShop</span>,
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

export const CustomSearchButton: Story = {
  args: {
    ...Default.args,
    searchButtonColor: '#B8E639',
    labels: { search: 'Find', catalog: 'Browse', orders: 'My Orders', cart: 'Bag', signIn: 'Log in' },
  },
};

export const Minimal: Story = {
  args: {
    logo: <span style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>Store</span>,
    categories: mockCategories.slice(0, 3),
  },
};

export const Localized: Story = {
  name: 'Russian Locale',
  args: {
    logo: <span style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>GeekShop</span>,
    searchPlaceholder: 'Поиск товаров...',
    cartCount: 5,
    categories: mockCategories,
    labels: {
      catalog: 'Каталог', search: 'Найти', orders: 'Заказы',
      cart: 'Корзина', cartWithCount: 'Корзина ({count})',
      signIn: 'Войти', userActions: 'Действия пользователя',
      locationPrefix: 'Местоположение: {location}',
    },
    promoTags: [
      { label: 'ВЕЛИКАЯ РАСПРОДАЖА', bgColor: '#FF3B30' },
      { label: 'КАЛЕНДАРЬ СКИДКОВ', bgColor: '#1A1A1A' },
    ],
    quickLinks: [{ label: 'Горящие товары 🔥' }, { label: 'Топ-товары' }],
    location: 'Чиланзарский р-н',
    language: 'RU',
    currency: 'UZS',
    searchButtonColor: '#B8E639',
  },
};
