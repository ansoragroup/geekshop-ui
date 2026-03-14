import type { Meta, StoryObj } from '@storybook/react-vite';
import { ReviewCard } from './ReviewCard';

const meta: Meta<typeof ReviewCard> = {
  title: 'Data Display/ReviewCard',
  component: ReviewCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 16, background: '#F5F5F5', borderRadius: 12, maxWidth: 390 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ReviewCard>;

// --- Default review ---
export const Default: Story = {
  args: {
    user: { name: 'Aziz Karimov', avatar: 'https://picsum.photos/seed/reviewer1/80/80' },
    rating: 5,
    variant: 'RTX 4060 VENTUS 2X OC',
    content: "Zo'r videokarta. O'yinlarda 60+ FPS berib turipti. 1080p da barcha o'yinlarni ultra sozlamada o'ynasa bo'ladi. Qutisi ham chiroyli, servis markazi bilan garanti berdi.",
    date: '2026-03-10',
  },
};

// --- With images ---
export const WithImages: Story = {
  args: {
    user: { name: 'Nodira Sultonova', avatar: 'https://picsum.photos/seed/reviewer2/80/80' },
    rating: 4,
    variant: 'Logitech GPW3 Pushti',
    content: "Sichqoncha juda yengil va qulay. Sensor zo'r. Lekin rang bir oz boshqacharoq chiqdi, rasmga qaraganda ochroq. Umuman olganda yaxshi mahsulot.",
    images: [
      'https://picsum.photos/seed/review-img1/200/200',
      'https://picsum.photos/seed/review-img2/200/200',
      'https://picsum.photos/seed/review-img3/200/200',
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
    user: { name: 'Dilshod T.', avatar: 'https://picsum.photos/seed/reviewer3/80/80' },
    rating: 2,
    variant: 'Kingston FURY 16GB DDR5',
    content: "RAM ishlayapti lekin tezligi yozilganidan past chiqdi. XMP profil to'g'ri ishlamayapti. Qaytarish so'radim.",
    date: '2026-03-05',
  },
};

// --- Multiple reviews ---
export const MultipleReviews: Story = {
  name: 'Reviews List',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <ReviewCard
        user={{ name: 'Sardor U.', avatar: 'https://picsum.photos/seed/rev-u1/80/80' }}
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
          'https://picsum.photos/seed/rev-img4/200/200',
          'https://picsum.photos/seed/rev-img5/200/200',
        ]}
        date="2026-03-09"
      />
      <ReviewCard
        user={{ name: 'Javohir N.', avatar: 'https://picsum.photos/seed/rev-u3/80/80' }}
        rating={5}
        content="Tez yetkazib berishdi, rahmat GeekShop jamoasi!"
        date="2026-03-07"
      />
    </div>
  ),
};
