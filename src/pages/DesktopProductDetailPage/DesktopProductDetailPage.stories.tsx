import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopProductDetailPage } from './DesktopProductDetailPage';
import type { ReviewUser } from '../../components';

const meta = {
  title: 'Pages (Desktop)/DesktopProductDetailPage',
  component: DesktopProductDetailPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopProductDetailPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    productTitle: 'ASUS ROG Strix GeForce RTX 4070 OC 12GB GDDR6X',
    price: 8_900_000,
    originalPrice: undefined,
    inStock: true,
    ratingValue: 4.7,
    reviewCount: 345,
    stock: 8,
  },
};

export const OnSale: Story = {
  args: {
    productTitle: 'Samsung Galaxy S24 Ultra 256GB Titanium Black',
    price: 12_500_000,
    originalPrice: 16_900_000,
    inStock: true,
    ratingValue: 4.8,
    reviewCount: 1234,
    stock: 25,
  },
};

export const OutOfStock: Story = {
  name: 'Out of Stock',
  args: {
    productTitle: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    price: 3_900_000,
    originalPrice: undefined,
    inStock: false,
    ratingValue: 4.8,
    reviewCount: 2100,
    stock: 0,
  },
};

export const WithReviews: Story = {
  args: {
    productTitle: 'Apple MacBook Air M3 15" 16GB 512GB Space Gray',
    price: 18_900_000,
    originalPrice: 21_500_000,
    inStock: true,
    ratingValue: 4.9,
    stock: 15,
    productReviews: [
      {
        user: {
          name: 'Alisher Karimov',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop',
        } as ReviewUser,
        rating: 5,
        content:
          'Ajoyib noutbuk! M3 chip juda tez ishlaydi. Batareya 18 soatgacha chidaydi. MacOS ham juda qulay.',
        date: '20 mart, 2026',
        variant: 'Space Gray / 512GB',
        images: [
          'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=200&h=200&fit=crop',
          'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=200&h=200&fit=crop',
        ],
      },
      {
        user: { name: 'Madina Yusupova' } as ReviewUser,
        rating: 3,
        content:
          "Ekrani juda yaxshi lekin narxi biroz qimmat. Dasturlash uchun ideal, lekin o'yinlar uchun emas.",
        date: '18 mart, 2026',
        variant: 'Space Gray / 512GB',
      },
      {
        user: {
          name: 'Sardor Abdurahmonov',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop',
        } as ReviewUser,
        rating: 5,
        content: 'Oldingi Intel MacBook dan 3x tezroq. Dizayn ham juda chiroyli, yengil va nozik.',
        date: '15 mart, 2026',
        variant: 'Midnight / 512GB',
        images: ['https://images.unsplash.com/photo-1555618568-bfe052310f39?w=200&h=200&fit=crop'],
      },
      {
        user: {
          name: 'Dilnoza Ergasheva',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop',
        } as ReviewUser,
        rating: 5,
        content:
          'Eng yaxshi noutbuk sotib olganim. Grafik dizayn ishlari uchun juda qulay. Retina ekrani ajoyib.',
        date: '12 mart, 2026',
        variant: 'Starlight / 256GB',
      },
      {
        user: { name: 'Farhod Toshmatov' } as ReviewUser,
        rating: 4,
        content: "Yaxshi mahsulot lekin portlar kam. USB-C faqat 2 ta bor. Adapter kerak bo'ladi.",
        date: '10 mart, 2026',
        variant: 'Space Gray / 512GB',
      },
    ],
  },
};

export const WithoutReviews: Story = {
  name: 'Without Reviews (New Product)',
  args: {
    productTitle: 'NVIDIA GeForce RTX 5070 Founders Edition 12GB GDDR7',
    price: 14_500_000,
    originalPrice: undefined,
    inStock: true,
    ratingValue: 0,
    reviewCount: 0,
    stock: 3,
    productReviews: [],
  },
};
