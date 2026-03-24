import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopHeaderAliExpress } from './DesktopHeaderAliExpress';
import type { MegaMenuCategory } from '../MegaMenu';

const meta = {
  title: 'Navigation (Desktop)/DesktopHeaderAliExpress',
  component: DesktopHeaderAliExpress,
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
} satisfies Meta<typeof DesktopHeaderAliExpress>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Mock Data ──────────────────────────────────────────────────────────────

const mockCategories: MegaMenuCategory[] = [
  {
    label: 'Электроника',
    subcategories: [
      { label: 'Смартфоны' },
      { label: 'Ноутбуки' },
      { label: 'Планшеты' },
      { label: 'Наушники' },
      { label: 'Умные часы' },
      { label: 'Камеры' },
    ],
  },
  {
    label: 'Одежда',
    subcategories: [
      { label: 'Мужская одежда' },
      { label: 'Женская одежда' },
      { label: 'Детская одежда' },
      { label: 'Обувь' },
      { label: 'Аксессуары' },
    ],
  },
  {
    label: 'Дом и сад',
    subcategories: [
      { label: 'Мебель' },
      { label: 'Освещение' },
      { label: 'Декор' },
      { label: 'Кухня' },
      { label: 'Сад' },
    ],
  },
  {
    label: 'Красота и здоровье',
    subcategories: [
      { label: 'Уход за кожей' },
      { label: 'Макияж' },
      { label: 'Парфюмерия' },
      { label: 'Уход за волосами' },
    ],
  },
  {
    label: 'Спорт и отдых',
    subcategories: [
      { label: 'Фитнес' },
      { label: 'Велосипеды' },
      { label: 'Кемпинг' },
      { label: 'Рыбалка' },
    ],
  },
  {
    label: 'Автотовары',
    subcategories: [
      { label: 'Запчасти' },
      { label: 'Аксессуары' },
      { label: 'Электроника' },
      { label: 'Инструменты' },
    ],
  },
];

const mockRecentSearches = ['наушники bluetooth', 'чехол iPhone 15', 'кроссовки Nike'];

const mockTrendingSearches = [
  { text: 'браслет серебро', count: 12500 },
  { text: 'USB кабель Type-C', count: 8900 },
  { text: 'чехол Samsung', count: 7200 },
];

// ─── Default (with MegaMenu + Search Autocomplete) ──────────────────────────

export const Default: Story = {
  args: {
    searchPlaceholder: 'браслет',
    cartCount: 3,
    categories: mockCategories,
    recentSearches: mockRecentSearches,
    trendingSearches: mockTrendingSearches,
    promoTags: [
      { label: 'ВЕЛИКАЯ РАСПРОДАЖА', bgColor: '#FF3B30', textColor: '#FFFFFF' },
      { label: 'КАЛЕНДАРЬ СКИДКОВ', bgColor: '#1A1A1A', textColor: '#FFFFFF' },
    ],
    quickLinks: [
      { label: 'Горящие товары 🔥' },
      { label: 'Топ-товары' },
    ],
    location: 'Чиланзарский р-н',
    language: 'RU',
    currency: 'UZS',
  },
};

// ─── Without Categories (fallback button) ───────────────────────────────────

export const WithoutCategories: Story = {
  args: {
    searchPlaceholder: 'Поиск товаров...',
    cartCount: 0,
    promoTags: [],
    quickLinks: [],
  },
};

// ─── Minimal ────────────────────────────────────────────────────────────────

export const Minimal: Story = {
  args: {
    searchPlaceholder: 'Что ищете?',
    categories: mockCategories.slice(0, 3),
  },
};

// ─── Full Featured ──────────────────────────────────────────────────────────

export const FullFeatured: Story = {
  args: {
    searchPlaceholder: 'наушники bluetooth',
    cartCount: 12,
    categories: mockCategories,
    recentSearches: mockRecentSearches,
    trendingSearches: mockTrendingSearches,
    promoTags: [
      { label: 'ВЕЛИКАЯ РАСПРОДАЖА', bgColor: '#FF3B30', textColor: '#FFFFFF' },
      { label: 'КАЛЕНДАРЬ СКИДКОВ', bgColor: '#1A1A1A', textColor: '#FFFFFF' },
      { label: 'НОВИНКИ', bgColor: '#07C160', textColor: '#FFFFFF' },
    ],
    quickLinks: [
      { label: 'Горящие товары 🔥' },
      { label: 'Топ-товары' },
      { label: 'Бесплатная доставка' },
    ],
    location: 'Мирзо-Улугбекский р-н',
    language: 'UZ',
    currency: 'UZS',
  },
};

// ─── With Page Content ──────────────────────────────────────────────────────

export const WithPageContent: Story = {
  decorators: [
    (Story) => (
      <div>
        <Story />
        <div style={{ padding: 24, maxWidth: 1360, margin: '0 auto' }}>
          <h1 style={{ fontSize: 24, marginBottom: 16 }}>Каталог товаров</h1>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 1 }}>
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                style={{
                  height: 280,
                  background: '#f5f5f5',
                  border: '1px solid #eee',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#999',
                  fontSize: 14,
                }}
              >
                Product {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  ],
  args: {
    ...Default.args,
  },
};
