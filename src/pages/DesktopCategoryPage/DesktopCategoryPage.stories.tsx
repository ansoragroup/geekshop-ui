import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopCategoryPage } from './DesktopCategoryPage';

const meta = {
  title: 'Pages (Desktop)/DesktopCategoryPage',
  component: DesktopCategoryPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopCategoryPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    categoryName: 'Laptops',
    columns: 4,
    initialProducts: [
      { id: '1', image: 'https://picsum.photos/seed/cat-lap1/400/400', title: 'Apple MacBook Air M3 15" 16GB 512GB', price: 18900000, originalPrice: 21500000, discount: '-12%', rating: 4.9, reviewCount: 567, freeShipping: true },
      { id: '2', image: 'https://picsum.photos/seed/cat-lap2/400/400', title: 'ASUS ROG Zephyrus G14 Ryzen 9 RTX 4060', price: 16200000, originalPrice: 18500000, discount: '-12%', rating: 4.7, reviewCount: 234, freeShipping: true },
      { id: '3', image: 'https://picsum.photos/seed/cat-lap3/400/400', title: 'Lenovo ThinkPad X1 Carbon Gen 11 i7 16GB', price: 14800000, rating: 4.6, reviewCount: 189, freeShipping: true },
      { id: '4', image: 'https://picsum.photos/seed/cat-lap4/400/400', title: 'Dell XPS 15 i9 32GB RTX 4070 OLED', price: 22500000, originalPrice: 25000000, discount: '-10%', rating: 4.8, reviewCount: 312, freeShipping: true },
      { id: '5', image: 'https://picsum.photos/seed/cat-lap5/400/400', title: 'HP Omen 16 Ryzen 7 RTX 4060 16GB', price: 11200000, rating: 4.4, reviewCount: 456, freeShipping: false },
      { id: '6', image: 'https://picsum.photos/seed/cat-lap6/400/400', title: 'MSI Raider GE78 i9 RTX 4080 32GB', price: 28500000, originalPrice: 32000000, discount: '-11%', rating: 4.7, reviewCount: 78, freeShipping: true },
      { id: '7', image: 'https://picsum.photos/seed/cat-lap7/400/400', title: 'Acer Nitro 5 Ryzen 5 RTX 4050 16GB', price: 8500000, rating: 4.2, reviewCount: 890, freeShipping: false },
      { id: '8', image: 'https://picsum.photos/seed/cat-lap8/400/400', title: 'Samsung Galaxy Book3 Ultra i7 RTX 4050', price: 15900000, originalPrice: 18200000, discount: '-13%', rating: 4.5, reviewCount: 123, freeShipping: true },
      { id: '9', image: 'https://picsum.photos/seed/cat-lap9/400/400', title: 'Apple MacBook Pro 16" M3 Max 36GB 1TB', price: 42000000, rating: 4.9, reviewCount: 234, freeShipping: true },
      { id: '10', image: 'https://picsum.photos/seed/cat-lap10/400/400', title: 'Lenovo Legion Pro 7 R9 RTX 4090 32GB', price: 31000000, originalPrice: 35000000, discount: '-11%', rating: 4.8, reviewCount: 45, freeShipping: true },
      { id: '11', image: 'https://picsum.photos/seed/cat-lap11/400/400', title: 'ASUS TUF Gaming A15 Ryzen 7 RTX 4060', price: 10500000, rating: 4.3, reviewCount: 678, freeShipping: false },
      { id: '12', image: 'https://picsum.photos/seed/cat-lap12/400/400', title: 'Dell Inspiron 16 Plus i7 16GB 512GB', price: 9200000, originalPrice: 10500000, discount: '-12%', rating: 4.1, reviewCount: 345, freeShipping: true },
    ],
  },
};

export const GridView: Story = {
  name: 'Wide Grid (5 columns)',
  args: {
    categoryName: 'Monitors',
    columns: 5,
    initialProducts: [
      { id: '1', image: 'https://picsum.photos/seed/cat-mon1/400/400', title: 'LG UltraGear 27GP950-B 27" 4K 160Hz Nano IPS', price: 8500000, originalPrice: 9800000, discount: '-13%', rating: 4.8, reviewCount: 456, freeShipping: true },
      { id: '2', image: 'https://picsum.photos/seed/cat-mon2/400/400', title: 'Samsung Odyssey G9 49" DQHD 240Hz', price: 14200000, rating: 4.7, reviewCount: 234, freeShipping: true },
      { id: '3', image: 'https://picsum.photos/seed/cat-mon3/400/400', title: 'Dell UltraSharp U2723QE 27" 4K USB-C', price: 5600000, rating: 4.6, reviewCount: 567, freeShipping: true },
      { id: '4', image: 'https://picsum.photos/seed/cat-mon4/400/400', title: 'ASUS ROG Swift PG27AQDM 27" 1440p 240Hz OLED', price: 11500000, originalPrice: 13000000, discount: '-12%', rating: 4.9, reviewCount: 123, freeShipping: true },
      { id: '5', image: 'https://picsum.photos/seed/cat-mon5/400/400', title: 'BenQ MOBIUZ EX2710Q 27" 2K 165Hz', price: 4200000, rating: 4.5, reviewCount: 789, freeShipping: false },
    ],
  },
};

export const WithNoResults: Story = {
  name: 'No Results',
  args: {
    categoryName: 'Quantum Computers',
    initialProducts: [],
  },
};
