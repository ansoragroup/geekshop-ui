import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppBar } from './AppBar';

const meta = {
  title: 'Navigation/AppBar',
  component: AppBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 390, margin: '0 auto', background: '#F5F5F5', minHeight: 200 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AppBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- Colored (default orange background) ---
export const Colored: Story = {
  args: {
    variant: 'colored',
    searchPlaceholder: 'Mahsulot qidirish...',
  },
};

// --- Transparent (white/light background) ---
export const Transparent: Story = {
  args: {
    variant: 'transparent',
    searchPlaceholder: 'Mahsulot qidirish...',
  },
};

// --- Custom color (gradient purple-red) ---
export const CustomColor: Story = {
  args: {
    variant: 'colored',
    backgroundColor: 'linear-gradient(135deg, #FF4D00, #FF1744)',
    searchPlaceholder: 'Mahsulot qidirish...',
    showScan: true,
  },
};

// --- With location ---
export const WithLocation: Story = {
  args: {
    variant: 'colored',
    showLocation: true,
    location: 'Toshkent',
    searchPlaceholder: 'Mahsulot qidirish...',
  },
};

// --- Full featured (location + search + scan + dark mode) ---
export const FullFeatured: Story = {
  args: {
    variant: 'colored',
    showLocation: true,
    location: 'Toshkent',
    searchPlaceholder: 'Mahsulot qidirish...',
    showScan: true,
    showDarkMode: true,
  },
};
