import type { Meta, StoryObj } from '@storybook/react-vite';
import { ReviewCard } from './ReviewCard';

const meta = {
  title: 'Data Display/ReviewCard',
  component: ReviewCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 16, background: '#F5F5F5', borderRadius: 12, width: 390 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ReviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- Default review ---
export const Default: Story = {
  args: {
    user: {
      name: 'Aziz Karimov',
      avatar:
        'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=80&h=80&fit=crop&auto=format',
    },
    rating: 5,
    variant: 'RTX 4060 VENTUS 2X OC',
    content:
      "Zo'r videokarta. O'yinlarda 60+ FPS berib turipti. 1080p da barcha o'yinlarni ultra sozlamada o'ynasa bo'ladi. Qutisi ham chiroyli, servis markazi bilan garanti berdi.",
    date: '2026-03-10',
  },
};

// --- With images ---
export const WithImages: Story = {
  args: {
    user: {
      name: 'Nodira Sultonova',
      avatar:
        'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=80&h=80&fit=crop&auto=format',
    },
    rating: 4,
    variant: 'Logitech GPW3 Pushti',
    content:
      "Sichqoncha juda yengil va qulay. Sensor zo'r. Lekin rang bir oz boshqacharoq chiqdi, rasmga qaraganda ochroq. Umuman olganda yaxshi mahsulot.",
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1542291026616-b53d31cf4641?w=200&h=200&fit=crop&auto=format',
    ],
    date: '2026-03-08',
  },
};

// --- Short review ---
export const Short: Story = {
  args: {
    user: { name: 'Bekzod R.' },
    rating: 5,
    content: "Hammasi zo'r, tez yetkazib berishdi!",
    date: '2026-03-12',
  },
};

// --- Low rating ---
export const LowRating: Story = {
  args: {
    user: {
      name: 'Dilshod T.',
      avatar:
        'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=80&h=80&fit=crop&auto=format',
    },
    rating: 2,
    variant: 'Kingston FURY 16GB DDR5',
    content:
      "RAM ishlayapti lekin tezligi yozilganidan past chiqdi. XMP profil to'g'ri ishlamayapti. Qaytarish so'radim.",
    date: '2026-03-05',
  },
};

// --- Multiple reviews ---
export const MultipleReviews: Story = {
  name: 'Reviews List',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <ReviewCard
        user={{
          name: 'Sardor U.',
          avatar:
            'https://images.unsplash.com/photo-1628277613967-6abca504d0ac?w=80&h=80&fit=crop&auto=format',
        }}
        rating={5}
        variant="Ryzen 7 7800X3D"
        content="O'yinlar uchun eng yaxshi protsessor. Oldingi 5600X dan ancha tez ishlayapti."
        date="2026-03-11"
      />
      <ReviewCard
        user={{ name: 'Malika K.' }}
        rating={4}
        variant="ASUS B650M-A WiFi"
        content="Onaplata yaxshi, WiFi 6 ishlayapti. BIOS yangilash kerak bo'ldi lekin oson bo'ldi."
        images={[
          'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=200&h=200&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1583394838336-d831d2d8d3da?w=200&h=200&fit=crop&auto=format',
        ]}
        date="2026-03-09"
      />
      <ReviewCard
        user={{
          name: 'Javohir N.',
          avatar:
            'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=80&h=80&fit=crop&auto=format',
        }}
        rating={5}
        content="Tez yetkazib berishdi, rahmat GeekShop jamoasi!"
        date="2026-03-07"
      />
    </div>
  ),
};
