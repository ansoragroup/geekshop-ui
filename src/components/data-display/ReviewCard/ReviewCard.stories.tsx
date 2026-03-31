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
        'https://images.unsplash.com/photo-1555618568-bfe052310f39?w=80&h=80&fit=crop&auto=format',
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
        'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=80&h=80&fit=crop&auto=format',
    },
    rating: 4,
    variant: 'Logitech GPW3 Pushti',
    content:
      "Sichqoncha juda yengil va qulay. Sensor zo'r. Lekin rang bir oz boshqacharoq chiqdi, rasmga qaraganda ochroq. Umuman olganda yaxshi mahsulot.",
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=200&h=200&fit=crop&auto=format',
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
        'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=80&h=80&fit=crop&auto=format',
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
            'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=80&h=80&fit=crop&auto=format',
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
          'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200&h=200&fit=crop&auto=format',
        ]}
        date="2026-03-09"
      />
      <ReviewCard
        user={{
          name: 'Javohir N.',
          avatar:
            'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=80&h=80&fit=crop&auto=format',
        }}
        rating={5}
        content="Tez yetkazib berishdi, rahmat GeekShop jamoasi!"
        date="2026-03-07"
      />
    </div>
  ),
};
