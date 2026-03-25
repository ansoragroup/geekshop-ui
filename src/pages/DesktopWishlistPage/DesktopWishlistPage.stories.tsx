import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopWishlistPage } from './DesktopWishlistPage';
import type { DesktopProductGridItem } from '../../components';

const meta = {
  title: 'Pages (Desktop)/DesktopWishlistPage',
  component: DesktopWishlistPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopWishlistPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  name: 'Empty Wishlist',
  args: {
    initialProducts: [],
  },
};

export const SingleItem: Story = {
  name: 'Single Item',
  args: {
    initialProducts: [
      { id: 'w1', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones', price: 3900000, rating: 4.8, reviewCount: 2100, freeShipping: true },
    ] satisfies DesktopProductGridItem[],
  },
};

export const AllOnSale: Story = {
  name: 'All On Sale',
  args: {
    initialProducts: [
      { id: 'w1', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop', title: 'Keychron Q1 Pro 75% Wireless Mechanical Keyboard', price: 1850000, originalPrice: 2200000, discount: '-16%', rating: 4.6, reviewCount: 890, freeShipping: true },
      { id: 'w2', image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop', title: 'Dell XPS 15 i9 32GB RTX 4070 OLED Laptop', price: 22500000, originalPrice: 25000000, discount: '-10%', rating: 4.8, reviewCount: 312, freeShipping: true },
      { id: 'w3', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', title: 'Nike Air Max 270 React Running Shoes', price: 1200000, originalPrice: 1800000, discount: '-33%', rating: 4.5, reviewCount: 1567, freeShipping: false },
      { id: 'w4', image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&h=400&fit=crop', title: 'Apple AirPods Pro 2nd Gen USB-C', price: 2800000, originalPrice: 3500000, discount: '-20%', rating: 4.9, reviewCount: 892, freeShipping: true },
      { id: 'w5', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop', title: 'Casio G-Shock GA-2100 Carbon Watch', price: 950000, originalPrice: 1400000, discount: '-32%', rating: 4.7, reviewCount: 456, freeShipping: true },
    ] satisfies DesktopProductGridItem[],
  },
};

export const ManyItems: Story = {
  name: 'Many Items (12)',
  args: {
    initialProducts: [
      { id: 'w1', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', title: 'Sony WH-1000XM5 Wireless Headphones', price: 3900000, rating: 4.8, reviewCount: 2100, freeShipping: true },
      { id: 'w2', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop', title: 'Logitech G Pro X Superlight 2 Mouse', price: 1600000, rating: 4.9, reviewCount: 1345, freeShipping: true },
      { id: 'w3', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop', title: 'Samsung Galaxy S24 Ultra 256GB', price: 12500000, originalPrice: 16900000, discount: '-26%', rating: 4.8, reviewCount: 1234, freeShipping: true },
      { id: 'w4', image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop', title: 'Apple MacBook Air M3 15" 16GB 512GB', price: 18900000, originalPrice: 21500000, discount: '-12%', rating: 4.9, reviewCount: 567, freeShipping: true },
      { id: 'w5', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', title: 'New Balance 990v6 Running Shoes', price: 2200000, rating: 4.6, reviewCount: 890, freeShipping: false },
      { id: 'w6', image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&h=400&fit=crop', title: 'Apple AirPods Pro 2nd Gen USB-C', price: 2800000, originalPrice: 3500000, discount: '-20%', rating: 4.9, reviewCount: 892, freeShipping: true },
      { id: 'w7', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop', title: 'Canon EOS R6 Mark II Mirrorless Camera', price: 28500000, rating: 4.7, reviewCount: 178, freeShipping: true },
      { id: 'w8', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop', title: 'Fjallraven Kanken Classic Backpack', price: 850000, originalPrice: 1200000, discount: '-29%', rating: 4.5, reviewCount: 3210, freeShipping: false },
      { id: 'w9', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop', title: 'Seiko Presage Automatic Watch SRPG07', price: 4500000, rating: 4.8, reviewCount: 234, freeShipping: true },
      { id: 'w10', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop', title: 'Ray-Ban Wayfarer Classic Sunglasses', price: 1750000, rating: 4.6, reviewCount: 5670, freeShipping: true },
      { id: 'w11', image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&h=400&fit=crop', title: 'Trek Domane SL 5 Road Bike 2024', price: 35000000, originalPrice: 38000000, discount: '-8%', rating: 4.9, reviewCount: 89, freeShipping: true },
      { id: 'w12', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop', title: 'Zara Premium Cotton Oversized T-Shirt', price: 350000, rating: 4.3, reviewCount: 456, freeShipping: false },
    ] satisfies DesktopProductGridItem[],
  },
};

export const BudgetItems: Story = {
  name: 'Budget Items (Under 2M UZS)',
  args: {
    initialProducts: [
      { id: 'w1', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop', title: 'Polarized Sunglasses UV400 Classic', price: 180000, originalPrice: 350000, discount: '-49%', rating: 4.3, reviewCount: 1234, freeShipping: false },
      { id: 'w2', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop', title: 'Gold Butterfly Hair Clip Set', price: 85000, rating: 4.1, reviewCount: 567, freeShipping: false },
      { id: 'w3', image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&h=400&fit=crop', title: 'Handmade Beaded Bracelet Set 10pcs', price: 120000, originalPrice: 200000, discount: '-40%', rating: 4.5, reviewCount: 890, freeShipping: false },
      { id: 'w4', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop', title: 'Vintage Flower Brooch Pin', price: 95000, rating: 4.2, reviewCount: 345, freeShipping: false },
      { id: 'w5', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop', title: 'Canvas Tote Bag Eco-Friendly', price: 150000, originalPrice: 250000, discount: '-40%', rating: 4.4, reviewCount: 678, freeShipping: false },
    ] satisfies DesktopProductGridItem[],
  },
};
