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
  name: 'On Sale',
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
  name: 'With Reviews',
  args: {
    productTitle: 'Apple MacBook Air M3 15" 16GB 512GB Space Gray',
    price: 18_900_000,
    originalPrice: 21_500_000,
    inStock: true,
    ratingValue: 4.9,
    stock: 15,
    productReviews: [
      {
        user: { name: 'Alisher Karimov', avatar: 'https://picsum.photos/seed/rv-user1/64/64' } as ReviewUser,
        rating: 5,
        content: 'Ajoyib noutbuk! M3 chip juda tez ishlaydi. Batareya 18 soatgacha chidaydi. MacOS ham juda qulay.',
        date: '20 mart, 2026',
        variant: 'Space Gray / 512GB',
        images: ['https://picsum.photos/seed/rv-img1/200/200', 'https://picsum.photos/seed/rv-img2/200/200'],
      },
      {
        user: { name: 'Madina Yusupova' } as ReviewUser,
        rating: 3,
        content: 'Ekrani juda yaxshi lekin narxi biroz qimmat. Dasturlash uchun ideal, lekin o\'yinlar uchun emas.',
        date: '18 mart, 2026',
        variant: 'Space Gray / 512GB',
      },
      {
        user: { name: 'Sardor Abdurahmonov', avatar: 'https://picsum.photos/seed/rv-user3/64/64' } as ReviewUser,
        rating: 5,
        content: 'Oldingi Intel MacBook dan 3x tezroq. Dizayn ham juda chiroyli, yengil va nozik.',
        date: '15 mart, 2026',
        variant: 'Midnight / 512GB',
        images: ['https://picsum.photos/seed/rv-img3/200/200'],
      },
      {
        user: { name: 'Dilnoza Ergasheva', avatar: 'https://picsum.photos/seed/rv-user4/64/64' } as ReviewUser,
        rating: 5,
        content: 'Eng yaxshi noutbuk sotib olganim. Grafik dizayn ishlari uchun juda qulay. Retina ekrani ajoyib.',
        date: '12 mart, 2026',
        variant: 'Starlight / 256GB',
      },
      {
        user: { name: 'Farhod Toshmatov' } as ReviewUser,
        rating: 4,
        content: 'Yaxshi mahsulot lekin portlar kam. USB-C faqat 2 ta bor. Adapter kerak bo\'ladi.',
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
