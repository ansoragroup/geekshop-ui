import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopHomePage } from './DesktopHomePage';

const meta = {
  title: 'Pages (Desktop)/DesktopHomePage',
  component: DesktopHomePage,
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopHomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

const saleHits = [
  { id: 'sh1', image: 'https://images.unsplash.com/photo-1515562141589-67f0d707b39b?w=300&h=300&fit=crop', title: 'Pearl pendants natural set', price: 10003, originalPrice: 17323, discount: '-42%', currency: 'USD' },
  { id: 'sh2', image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=300&h=300&fit=crop', title: 'Vintage pearl brooch gold', price: 16469, originalPrice: 40259, discount: '-59%', currency: 'USD' },
  { id: 'sh3', image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=300&h=300&fit=crop', title: 'Acrylic beads bracelet 30 pcs', price: 6953, originalPrice: 10491, discount: '-34%', currency: 'USD' },
  { id: 'sh4', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=300&fit=crop', title: 'Summer dress floral cotton', price: 33294, originalPrice: 66588, discount: '-50%', currency: 'USD' },
  { id: 'sh5', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&h=300&fit=crop', title: 'Hair clip metal butterfly gold', price: 18421, originalPrice: 34769, discount: '-47%', currency: 'USD' },
  { id: 'sh6', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop', title: 'Handmade floral brooch', price: 25009, originalPrice: 56876, discount: '-56%', currency: 'USD' },
  { id: 'sh7', image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=300&h=300&fit=crop', title: 'MTB carbon frame 29er', price: 42625, originalPrice: 59203, discount: '-28%', currency: 'USD' },
  { id: 'sh8', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop', title: 'TWS earbuds noise cancelling', price: 4350, originalPrice: 8700, discount: '-50%', currency: 'USD' },
];

const products = [
  { id: 'p1', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', title: 'Wireless headphones premium deep bass over-ear', price: 9149, originalPrice: 14029, discount: '-35%', currency: 'USD', rating: 4.4, purchaseCount: 120, badges: [{ label: 'SALE', variant: 'sale' as const }], deliveryText: 'Free shipping' },
  { id: 'p2', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', title: 'Running shoes lightweight breathable mesh', price: 91071, originalPrice: 182142, discount: '-50%', currency: 'USD', rating: 4.8, purchaseCount: 3420, badges: [{ label: 'SALE', variant: 'sale' as const }, { label: 'TOP', variant: 'top' as const }], deliveryText: 'Ships in 2-3 days' },
  { id: 'p3', image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop', title: 'Aluminum laptop stand ergonomic adjustable', price: 49092, originalPrice: 83209, discount: '-41%', currency: 'USD', rating: 4.9, purchaseCount: 807, recommended: true, deliveryText: 'Free shipping' },
  { id: 'p4', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop', title: 'Classic leather strap watch analog men', price: 364568, originalPrice: 868020, discount: '-58%', currency: 'USD', rating: 4.7, purchaseCount: 21 },
  { id: 'p5', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop', title: 'Mirrorless camera 24MP 4K video kit lens', price: 19031, originalPrice: 27937, discount: '-32%', currency: 'USD', rating: 4.8, purchaseCount: 5883, badges: [{ label: 'SALE', variant: 'sale' as const }, { label: 'TOP', variant: 'top' as const }], recommended: true, freeShipping: true },
  { id: 'p6', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop', title: 'Polarized sunglasses UV400 unisex classic', price: 29157, currency: 'USD', rating: 4.5, purchaseCount: 245, freeShipping: true },
  { id: 'p7', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop', title: 'Clear TPU phone case shockproof slim', price: 87472, originalPrice: 213496, discount: '-59%', currency: 'USD', rating: 5.0, purchaseCount: 144 },
  { id: 'p8', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop', title: 'Mechanical keyboard RGB 75% hot-swap', price: 72356, originalPrice: 144713, discount: '-50%', currency: 'USD', rating: 4.8, purchaseCount: 67, badges: [{ label: 'SALE', variant: 'sale' as const }], freeShipping: true },
  { id: 'p9', image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&h=400&fit=crop', title: 'True wireless earbuds ANC waterproof IPX5', price: 16469, originalPrice: 32329, discount: '-49%', currency: 'USD', rating: 4.9, purchaseCount: 1890, recommended: true },
  { id: 'p10', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop', title: 'Vintage leather backpack travel laptop 15.6', price: 15225, originalPrice: 50750, discount: '-70%', currency: 'USD', rating: 5.0, purchaseCount: 92, badges: [{ label: 'SALE', variant: 'sale' as const }] },
];

export const Default: Story = {
  args: {
    logo: <span style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>MyShop</span>,
    saleHits,
    products,
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
