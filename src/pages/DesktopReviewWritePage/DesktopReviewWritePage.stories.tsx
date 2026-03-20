import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopReviewWritePage } from './DesktopReviewWritePage';

const meta = {
  title: 'Pages (Desktop)/DesktopReviewWritePage',
  component: DesktopReviewWritePage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopReviewWritePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithRatingSelected: Story = {
  name: 'With Rating Selected',
  args: {
    productName: 'Apple MacBook Air M3 15" 16GB 512GB',
    productVariant: 'Space Gray / 512GB',
    productImage: 'https://picsum.photos/seed/review-macbook/100/100',
    initialRating: 4,
    initialReview: 'Juda yaxshi noutbuk! Batareya uzoq chidaydi, ekrani ajoyib. Dasturlash uchun ideal mashina.',
  },
};

export const WithPhotos: Story = {
  name: 'Different Product',
  args: {
    productName: 'Sony WH-1000XM5 Wireless Headphones',
    productVariant: 'Silver',
    productImage: 'https://picsum.photos/seed/review-sony/100/100',
    initialRating: 5,
    initialReview: 'Eng yaxshi naushnik! Shovqinni bekor qilish texnologiyasi ajoyib ishlaydi. Musiqa sifati ham a\'lo darajada.',
  },
};
