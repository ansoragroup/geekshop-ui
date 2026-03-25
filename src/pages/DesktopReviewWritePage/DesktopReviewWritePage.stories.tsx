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

export const PositiveReview: Story = {
  name: 'Positive Review (4 stars)',
  args: {
    productName: 'Apple MacBook Air M3 15" 16GB 512GB',
    productVariant: 'Space Gray / 512GB',
    productImage: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=100&h=100&fit=crop',
    initialRating: 4,
    initialReview: 'Juda yaxshi noutbuk! Batareya uzoq chidaydi, ekrani ajoyib. Dasturlash uchun ideal mashina.',
  },
};

export const ExcellentReview: Story = {
  name: 'Excellent Review (5 stars)',
  args: {
    productName: 'Sony WH-1000XM5 Wireless Headphones',
    productVariant: 'Silver',
    productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
    initialRating: 5,
    initialReview: 'Eng yaxshi naushnik! Shovqinni bekor qilish texnologiyasi ajoyib ishlaydi. Musiqa sifati ham a\'lo darajada. 2 yil ishlatdim, hech qanday muammo bo\'lmadi.',
  },
};

export const NegativeReview: Story = {
  name: 'Negative Review (1 star)',
  args: {
    productName: 'Razer DeathAdder V3 HyperSpeed Mouse',
    productVariant: 'Black',
    productImage: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=100&h=100&fit=crop',
    initialRating: 1,
    initialReview: 'Sichqoncha 2 haftadan keyin ishlamay qoldi. Chap tugma ikki marta bosadi, scroll g\'ildiragi shovqin chiqaradi. Sifat juda past.',
  },
};

export const AverageReview: Story = {
  name: 'Average Review (3 stars)',
  args: {
    productName: 'Samsung Galaxy Buds3 Pro',
    productVariant: 'White',
    productImage: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=100&h=100&fit=crop',
    initialRating: 3,
    initialReview: 'Ovoz sifati yaxshi, lekin quloqqa yaxshi turmaydi. ANC ishlaydi, ammo Sonyga qaraganda zaifroq. Narxiga mos, lekin ajoyib emas.',
  },
};

export const EmptyForm: Story = {
  name: 'Empty Form (New)',
  args: {
    productName: 'Keychron Q1 Pro 75% Mechanical Keyboard',
    productVariant: 'Navy Blue / Gateron Pro Brown',
    productImage: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=100&h=100&fit=crop',
    initialRating: 0,
    initialReview: '',
  },
};

export const LongReview: Story = {
  name: 'Long Detailed Review',
  args: {
    productName: 'Apple MacBook Pro 16" M3 Max 36GB 1TB',
    productVariant: 'Space Black / 1TB',
    productImage: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=100&h=100&fit=crop',
    initialRating: 5,
    initialReview: 'Bu noutbuk haqida batafsil sharh yozmoqchiman. Avvalo, M3 Max protsessor juda kuchli. Men video montaj, 3D modeling va dasturlash bilan shug\'ullanaman — barchasi silliq ishlaydi. Batareya 14-16 soat yetarli. Ekran sifati — mini-LED ProMotion 120Hz — ranglar to\'g\'ri, yorqinlik ajoyib. Dinamiklar ham oldingi avlodga qaraganda ancha yaxshi. Yagona kamchilik — og\'irligi (2.14 kg), lekin bu darajadagi quvvat uchun kutilgan narsa. Xulosa: professional foydalanish uchun eng yaxshi noutbuk. Narxi yuqori, lekin sifat bunga loyiq.',
  },
};
