import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopHomePage } from './DesktopHomePage';

const meta = {
  title: 'Pages (Desktop)/DesktopHomePage',
  component: DesktopHomePage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopHomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

const bannerSlides = [
  { title: 'Summer Sale', subtitle: 'Up to 70% off electronics', ctaText: 'Shop Now', bgGradient: 'linear-gradient(135deg, #FF5000 0%, #FF7A33 100%)', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=300&fit=crop' },
  { title: 'New Arrivals', subtitle: 'Fresh styles for the season', ctaText: 'Explore', bgGradient: 'linear-gradient(135deg, #7B2BFC 0%, #A855F7 100%)', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=300&fit=crop' },
  { title: 'Free Shipping', subtitle: 'On all orders over $50', ctaText: 'Learn More', bgGradient: 'linear-gradient(135deg, #07C160 0%, #34D399 100%)' },
];

const saleHits = [
  { id: 'sh1', image: 'https://images.unsplash.com/photo-1515562141589-67f0d707b39b?w=300&h=300&fit=crop', title: 'Pearl pendants natural set', price: 10003, originalPrice: 17323, discount: '-42%', currency: 'USD' },
  { id: 'sh2', image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=300&h=300&fit=crop', title: 'Vintage pearl brooch gold', price: 16469, originalPrice: 40259, discount: '-59%', currency: 'USD' },
  { id: 'sh3', image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=300&h=300&fit=crop', title: 'Acrylic beads bracelet 30 pcs', price: 6953, originalPrice: 10491, discount: '-34%', currency: 'USD' },
  { id: 'sh4', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=300&fit=crop', title: 'Summer dress floral cotton', price: 33294, originalPrice: 66588, discount: '-50%', currency: 'USD' },
  { id: 'sh5', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&h=300&fit=crop', title: 'Hair clip butterfly gold', price: 18421, originalPrice: 34769, discount: '-47%', currency: 'USD' },
  { id: 'sh6', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop', title: 'Handmade floral brooch', price: 25009, originalPrice: 56876, discount: '-56%', currency: 'USD' },
  { id: 'sh7', image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=300&h=300&fit=crop', title: 'MTB carbon frame 29er', price: 42625, originalPrice: 59203, discount: '-28%', currency: 'USD' },
  { id: 'sh8', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop', title: 'TWS earbuds ANC', price: 4350, originalPrice: 8700, discount: '-50%', currency: 'USD' },
];

const products = [
  { id: 'p1', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', title: 'Wireless headphones premium deep bass over-ear', price: 9149, originalPrice: 14029, discount: '-35%', currency: 'USD', rating: 4.4, purchaseCount: 120, badges: [{ label: 'SALE', variant: 'sale' as const }], deliveryText: 'Free shipping' },
  { id: 'p2', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', title: 'Running shoes lightweight breathable mesh', price: 91071, originalPrice: 182142, discount: '-50%', currency: 'USD', rating: 4.8, purchaseCount: 3420, badges: [{ label: 'SALE', variant: 'sale' as const }, { label: 'TOP', variant: 'top' as const }], deliveryText: 'Ships in 2-3 days' },
  { id: 'p3', image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop', title: 'Aluminum laptop stand ergonomic adjustable', price: 49092, originalPrice: 83209, discount: '-41%', currency: 'USD', rating: 4.9, purchaseCount: 807, recommended: true, deliveryText: 'Free shipping' },
  { id: 'p4', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop', title: 'Classic leather strap watch analog men', price: 364568, originalPrice: 868020, discount: '-58%', currency: 'USD', rating: 4.7, purchaseCount: 21 },
  { id: 'p5', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop', title: 'Mirrorless camera 24MP 4K kit lens', price: 19031, originalPrice: 27937, discount: '-32%', currency: 'USD', rating: 4.8, purchaseCount: 5883, badges: [{ label: 'SALE', variant: 'sale' as const }, { label: 'TOP', variant: 'top' as const }], recommended: true, freeShipping: true },
  { id: 'p6', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop', title: 'Polarized sunglasses UV400 unisex', price: 29157, currency: 'USD', rating: 4.5, purchaseCount: 245, freeShipping: true },
  { id: 'p7', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop', title: 'Clear TPU phone case shockproof', price: 87472, originalPrice: 213496, discount: '-59%', currency: 'USD', rating: 5.0, purchaseCount: 144 },
  { id: 'p8', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop', title: 'Mechanical keyboard RGB 75% hot-swap', price: 72356, originalPrice: 144713, discount: '-50%', currency: 'USD', rating: 4.8, purchaseCount: 67, badges: [{ label: 'SALE', variant: 'sale' as const }], freeShipping: true },
  { id: 'p9', image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&h=400&fit=crop', title: 'True wireless earbuds ANC waterproof', price: 16469, originalPrice: 32329, discount: '-49%', currency: 'USD', rating: 4.9, purchaseCount: 1890, recommended: true },
  { id: 'p10', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop', title: 'Vintage leather backpack travel 15.6"', price: 15225, originalPrice: 50750, discount: '-70%', currency: 'USD', rating: 5.0, purchaseCount: 92, badges: [{ label: 'SALE', variant: 'sale' as const }] },
];

export const Default: Story = {
  args: {
    logo: <span style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>MyShop</span>,
    bannerSlides,
    saleHits,
    products,
    promoTags: [
      { label: 'BIG SALE', bgColor: '#FF3B30' },
      { label: 'NEW ARRIVALS', bgColor: '#1A1A1A' },
    ],
    quickLinks: [
      { label: 'Hot Deals' },
      { label: 'Top Products' },
    ],
    searchButtonColor: '#B8E639',
    onPhotoSearch: (source: { type: string }) => { alert(`Photo search: ${source.type}`); },
    recentSearches: ['bluetooth headphones', 'phone case', 'running shoes'],
    trendingSearches: [
      { text: 'wireless earbuds', count: 45200 },
      { text: 'laptop stand', count: 38100 },
      { text: 'phone charger', count: 29800 },
    ],
    suggestedProducts: [
      { id: 'sp1', title: 'Sony WH-1000XM5 Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop', price: 349, rating: 4.9 },
      { id: 'sp2', title: 'Apple AirPods Pro 2nd Gen', image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=80&h=80&fit=crop', price: 249, rating: 4.8 },
    ],
    searchCategorySuggestions: [
      { id: 'cat1', name: 'Electronics', count: 15420 },
      { id: 'cat2', name: 'Headphones & Earbuds', count: 8930 },
      { id: 'cat3', name: 'Phone Accessories', count: 12100 },
    ],
  },
};

export const WithInfiniteScroll: Story = {
  args: {
    ...Default.args,
    products: products.slice(0, 5),
    hasMore: true,
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    products: products.slice(0, 5),
    hasMore: true,
    isLoading: true,
  },
};

export const NoBannerMinimal: Story = {
  name: 'No Banner (Minimal)',
  args: {
    ...Default.args,
    bannerSlides: [],
    saleHits: [],
    products: products.slice(0, 4),
  },
};

export const NoProducts: Story = {
  name: 'No Products (Empty Store)',
  args: {
    ...Default.args,
    bannerSlides,
    saleHits: [],
    products: [],
  },
};

export const SaleHitsOnly: Story = {
  name: 'Sale Hits Only (No Products Grid)',
  args: {
    ...Default.args,
    products: [],
    bannerSlides: [
      { title: 'Flash Sale', subtitle: 'Limited time — 70% off everything', ctaText: 'Grab Now', bgGradient: 'linear-gradient(135deg, #FF3B30 0%, #FF5000 100%)', image: 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=600&h=300&fit=crop' },
    ],
    saleHits: [
      { id: 'fsh1', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop', title: 'Nike Air Max 270 React', price: 8900, originalPrice: 14900, discount: '-40%', currency: 'USD' },
      { id: 'fsh2', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=300&fit=crop', title: 'Seiko Presage Automatic', price: 28900, originalPrice: 45000, discount: '-36%', currency: 'USD' },
      { id: 'fsh3', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop', title: 'Ray-Ban Aviator Classic', price: 12500, originalPrice: 19900, discount: '-37%', currency: 'USD' },
      { id: 'fsh4', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=300&fit=crop', title: 'Vintage Canvas Backpack', price: 4500, originalPrice: 12000, discount: '-63%', currency: 'USD' },
      { id: 'fsh5', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=300&fit=crop', title: 'Linen Summer Dress', price: 18900, originalPrice: 35000, discount: '-46%', currency: 'USD' },
      { id: 'fsh6', image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&h=300&fit=crop', title: 'Perfume Set Luxury 3x50ml', price: 39900, originalPrice: 89000, discount: '-55%', currency: 'USD' },
    ],
  },
};

export const FullFeatured: Story = {
  name: 'Full Featured (All Sections)',
  args: {
    logo: <span style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>GeekShop</span>,
    bannerSlides: [
      { title: 'Ramadan Sale', subtitle: 'Barcha mahsulotlarga 40% gacha chegirma', ctaText: 'Xarid qilish', bgGradient: 'linear-gradient(135deg, #1A5276 0%, #2E86C1 100%)', image: 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=600&h=300&fit=crop' },
      { title: 'Tech Week', subtitle: 'Latest gadgets at unbeatable prices', ctaText: 'Shop Tech', bgGradient: 'linear-gradient(135deg, #FF5000 0%, #FF7A33 100%)', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=300&fit=crop' },
      { title: 'Back to School', subtitle: 'Laptops, tablets & accessories', ctaText: 'Explore', bgGradient: 'linear-gradient(135deg, #7B2BFC 0%, #A855F7 100%)', image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&h=300&fit=crop' },
      { title: 'Free Delivery', subtitle: '50,000 UZS dan oshgan buyurtmalar uchun', ctaText: 'Batafsil', bgGradient: 'linear-gradient(135deg, #07C160 0%, #34D399 100%)' },
    ],
    saleHits,
    products: [
      ...products,
      { id: 'p11', image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop', title: 'Luxury perfume set gift box 3x50ml', price: 39900, originalPrice: 89000, discount: '-55%', currency: 'USD', rating: 4.7, purchaseCount: 312, badges: [{ label: 'SALE', variant: 'sale' as const }] },
      { id: 'p12', image: 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=400&h=400&fit=crop', title: 'Smart home starter kit WiFi hub', price: 25400, originalPrice: 42000, discount: '-40%', currency: 'USD', rating: 4.6, purchaseCount: 890, recommended: true, freeShipping: true },
    ],
    promoTags: [
      { label: 'RAMADAN SALE', bgColor: '#1A5276' },
      { label: 'TECH WEEK', bgColor: '#FF5000' },
      { label: 'FREE SHIPPING', bgColor: '#07C160' },
    ],
    quickLinks: [
      { label: 'Hot Deals' },
      { label: 'Top Products' },
      { label: 'New Arrivals' },
      { label: 'Free Shipping' },
    ],
    searchButtonColor: '#FF5000',
    recentSearches: ['macbook air m3', 'rtx 4070', 'airpods pro'],
    trendingSearches: [
      { text: 'samsung galaxy s24', count: 67800 },
      { text: 'mechanical keyboard', count: 45200 },
      { text: 'running shoes nike', count: 38100 },
      { text: 'wireless earbuds', count: 29800 },
    ],
    suggestedProducts: [
      { id: 'sp1', title: 'Sony WH-1000XM5 Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop', price: 349, rating: 4.9 },
      { id: 'sp2', title: 'Apple AirPods Pro 2nd Gen', image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=80&h=80&fit=crop', price: 249, rating: 4.8 },
      { id: 'sp3', title: 'Keychron Q1 Pro Keyboard', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=80&h=80&fit=crop', price: 185, rating: 4.7 },
    ],
    searchCategorySuggestions: [
      { id: 'cat1', name: 'Electronics', count: 15420 },
      { id: 'cat2', name: 'Headphones & Earbuds', count: 8930 },
      { id: 'cat3', name: 'Phone Accessories', count: 12100 },
      { id: 'cat4', name: 'Laptops & Computers', count: 6780 },
    ],
    hasMore: true,
    isLoading: false,
  },
};
