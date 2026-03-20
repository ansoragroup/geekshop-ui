import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopPopularSearches } from './DesktopPopularSearches';

const meta = {
  title: 'Navigation (Desktop)/DesktopPopularSearches',
  component: DesktopPopularSearches,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 900, padding: 24, background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopPopularSearches>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { text: 'RTX 4090' },
      { text: 'Ryzen 9 7950X' },
      { text: 'DDR5 RAM' },
      { text: 'Gaming Monitor 4K' },
      { text: 'NVMe SSD 2TB' },
      { text: 'Mechanical Keyboard' },
      { text: 'RTX 4070 Ti' },
      { text: 'Intel Core i9' },
    ],
  },
};

export const WithCounts: Story = {
  args: {
    items: [
      { text: 'RTX 4090', count: 15420 },
      { text: 'Ryzen 9 7950X', count: 12300 },
      { text: 'DDR5 RAM', count: 9850 },
      { text: 'Gaming Monitor', count: 8200 },
      { text: 'NVMe SSD', count: 7100 },
      { text: 'Mechanical Keyboard', count: 5600 },
      { text: 'RTX 4070 Ti', count: 4320 },
      { text: 'Corsair PSU', count: 3100 },
      { text: 'Water Cooling', count: 2800 },
      { text: 'PC Case ATX', count: 1950 },
    ],
  },
};

export const CustomTitle: Story = {
  args: {
    title: 'Trending Now',
    items: [
      { text: 'RTX 5090', count: 28500 },
      { text: 'Apple M4 Pro', count: 18200 },
      { text: 'Steam Deck OLED', count: 14300 },
    ],
  },
};

export const FewItems: Story = {
  args: {
    items: [
      { text: 'GPU' },
      { text: 'CPU' },
      { text: 'RAM' },
    ],
  },
};
