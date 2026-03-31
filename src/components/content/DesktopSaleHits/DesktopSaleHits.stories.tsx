import type { Meta, StoryObj } from '@storybook/react-vite';
import type { SaleHitItem } from './DesktopSaleHits';
import { DesktopSaleHits } from './DesktopSaleHits';

const meta = {
  title: 'Content (Desktop)/DesktopSaleHits',
  component: DesktopSaleHits,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    onViewAll: { action: 'view all' },
    cardWidth: { control: { type: 'range', min: 100, max: 300, step: 10 } },
    imageFit: { control: 'select', options: ['cover', 'contain', 'fill'] },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 1200, padding: 24 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopSaleHits>;

export default meta;
type Story = StoryObj<typeof meta>;

const saleItems: SaleHitItem[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop',
    title: 'Freshwater Pearl Pendant Set Natural Stone',
    price: 89_000,
    originalPrice: 173_000,
    discount: '-49%',
    currency: "so'm",
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1555618568-bfe052310f39?w=300&h=300&fit=crop',
    title: 'Vintage Pearl Brooch Pin Gold Plated',
    price: 164_000,
    originalPrice: 402_000,
    discount: '-59%',
    currency: "so'm",
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=300&fit=crop',
    title: 'Acrylic Crystal Beads 30pc for DIY Bracelet',
    price: 69_000,
    originalPrice: 104_000,
    discount: '-34%',
    currency: "so'm",
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=300&fit=crop',
    title: 'Kids Summer Cotton Outfit Set 2-Piece',
    price: 332_000,
    originalPrice: 665_000,
    discount: '-50%',
    currency: "so'm",
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=300&h=300&fit=crop',
    title: 'Vintage Metal Butterfly Hair Clip Gold',
    price: 184_000,
    originalPrice: 347_000,
    discount: '-47%',
    currency: "so'm",
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    title: 'Handmade Acrylic Floral Brooch Set',
    price: 250_000,
    originalPrice: 568_000,
    discount: '-56%',
    currency: "so'm",
  },
  {
    id: '7',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
    title: 'Minimalist Gold Wristwatch Unisex',
    price: 890_000,
    originalPrice: 1_500_000,
    discount: '-41%',
    currency: "so'm",
  },
  {
    id: '8',
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=300&h=300&fit=crop',
    title: 'Carbon Fiber MTB Frame 29" ELITA ONE',
    price: 4_260_000,
    originalPrice: 5_920_000,
    discount: '-28%',
    currency: "so'm",
  },
  {
    id: '9',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    title: 'TWS Wireless Earbuds Active Noise Cancel',
    price: 435_000,
    originalPrice: 870_000,
    discount: '-50%',
    currency: "so'm",
  },
  {
    id: '10',
    image: 'https://images.unsplash.com/photo-1555618568-bfe052310f39?w=300&h=300&fit=crop',
    title: 'Anker Soundcore Liberty 4 NC Earbuds',
    price: 750_000,
    originalPrice: 1_100_000,
    discount: '-32%',
    currency: "so'm",
  },
  {
    id: '11',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=300&h=300&fit=crop',
    title: 'JBL Flip 6 Portable Bluetooth Speaker',
    price: 1_150_000,
    originalPrice: 1_400_000,
    discount: '-18%',
    currency: "so'm",
  },
];

// ─── Default ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { items: saleItems },
};

// ─── Full Featured (every prop) ──────────────────────────────────────────────

export const FullFeatured: Story = {
  name: 'Full Featured (all props)',
  args: {
    title: 'Flash Sale Hits',
    subtitle: 'Limited time deals, grab them before they are gone!',
    items: saleItems,
    viewAllText: 'See All Deals',
    cardWidth: 170,
    imageFit: 'cover',
    background: 'linear-gradient(180deg, #FFF5F0 0%, #FFFFFF 100%)',
    scrollLeftAriaLabel: 'Scroll deals left',
    scrollRightAriaLabel: 'Scroll deals right',
    icon: (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 28,
          height: 28,
          borderRadius: 6,
          background: '#FF3B30',
          color: '#FFF',
          fontSize: 11,
          fontWeight: 700,
        }}
      >
        HOT
      </span>
    ),
  },
};

// ─── With View All Button ────────────────────────────────────────────────────

export const WithViewAll: Story = {
  args: {
    items: saleItems,
    title: 'Daily Deals',
    viewAllText: 'View All',
  },
};

// ─── Custom Card Width (200px) ───────────────────────────────────────────────

export const CardWidth200: Story = {
  name: 'cardWidth: 200px',
  args: {
    items: saleItems,
    cardWidth: 200,
    title: 'Wide Card Layout',
  },
};

// ─── Custom Card Width (120px) ───────────────────────────────────────────────

export const CardWidth120: Story = {
  name: 'cardWidth: 120px (compact)',
  args: {
    items: saleItems,
    cardWidth: 120,
    title: 'Compact Cards',
  },
};

// ─── Image Fit: Contain ──────────────────────────────────────────────────────

export const ImageFitContain: Story = {
  name: 'imageFit: contain',
  args: {
    items: saleItems.slice(0, 6),
    imageFit: 'contain',
    title: 'Contain Fit',
  },
};

// ─── Custom Background Gradient ──────────────────────────────────────────────

export const CustomBackground: Story = {
  args: {
    items: saleItems,
    background: 'linear-gradient(135deg, #E3F2FD 0%, #F3E5F5 100%)',
    title: 'Weekly Picks',
    subtitle: 'Curated deals just for you',
  },
};

// ─── Dark Background ─────────────────────────────────────────────────────────

export const DarkBackground: Story = {
  args: {
    items: saleItems,
    background: 'linear-gradient(135deg, #1A1A1A 0%, #333333 100%)',
    title: 'Black Friday Deals',
    subtitle: 'Up to 70% off everything',
  },
};

// ─── Custom renderCard Slot ──────────────────────────────────────────────────

export const CustomRenderCard: Story = {
  name: 'Custom renderCard',
  args: {
    items: saleItems.slice(0, 8),
    title: 'Custom Card Design',
    cardWidth: 180,
    renderCard: (item: SaleHitItem) => (
      <div style={{ textAlign: 'center', padding: 8 }}>
        <img
          src={item.image}
          alt={item.title}
          style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 12 }}
        />
        <div style={{ marginTop: 8, fontSize: 13, fontWeight: 600, color: '#FF0000' }}>
          {item.discount} OFF
        </div>
        <div
          style={{
            fontSize: 11,
            color: '#666',
            marginTop: 4,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {item.title}
        </div>
      </div>
    ),
  },
};

// ─── Custom Icon ─────────────────────────────────────────────────────────────

export const CustomIcon: Story = {
  args: {
    items: saleItems.slice(0, 7),
    title: 'Lightning Deals',
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FF5000"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
};

// ─── Few Items (3) ───────────────────────────────────────────────────────────

export const FewItems: Story = {
  name: 'Edge: Few Items (3)',
  args: {
    items: saleItems.slice(0, 3),
    title: 'Limited Stock',
  },
};

// ─── Single Item ─────────────────────────────────────────────────────────────

export const SingleItem: Story = {
  name: 'Edge: Single Item',
  args: {
    items: [saleItems[0]],
    title: 'Deal of the Day',
  },
};

// ─── Many Items (11) ─────────────────────────────────────────────────────────

export const ManyItems: Story = {
  name: 'Edge: Many Items (11, scrollable)',
  args: {
    items: saleItems,
    title: 'All Deals',
    subtitle: 'Scroll right to see more',
  },
};

// ─── With Subtitle ───────────────────────────────────────────────────────────

export const WithSubtitle: Story = {
  args: {
    items: saleItems.slice(0, 6),
    title: 'Mega Sale Event',
    subtitle: 'Ends in 24 hours. Limited quantities available.',
  },
};
