import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopSearchSuggestions, type DesktopSearchSuggestionGroup } from './DesktopSearchSuggestions';

const meta = {
  title: 'Navigation (Desktop)/DesktopSearchSuggestions',
  component: DesktopSearchSuggestions,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 600, padding: 24, background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopSearchSuggestions>;

export default meta;
type Story = StoryObj<typeof meta>;

const allSuggestions: DesktopSearchSuggestionGroup[] = [
  {
    type: 'recent',
    label: 'Recent Searches',
    items: [
      { id: 'r1', text: 'RTX 4090' },
      { id: 'r2', text: 'Ryzen 9 7950X' },
      { id: 'r3', text: 'DDR5 RAM 32GB' },
    ],
  },
  {
    type: 'trending',
    label: 'Trending',
    items: [
      { id: 't1', text: 'RTX 5090 release date' },
      { id: 't2', text: 'Best gaming monitor 2025' },
      { id: 't3', text: 'Intel Core Ultra 200' },
      { id: 't4', text: 'Corsair DDR5 6000MHz' },
    ],
  },
  {
    type: 'products',
    label: 'Products',
    items: [
      { id: 'p1', text: 'ASUS ROG Strix RTX 4090 OC', thumbnail: 'https://placehold.co/64x64/f5f5f5/999?text=GPU' },
      { id: 'p2', text: 'MSI GeForce RTX 4080 Gaming X Trio', thumbnail: 'https://placehold.co/64x64/f5f5f5/999?text=GPU' },
      { id: 'p3', text: 'Gigabyte RTX 4070 Ti Eagle OC', thumbnail: 'https://placehold.co/64x64/f5f5f5/999?text=GPU' },
    ],
  },
];

export const Default: Story = {
  args: {
    suggestions: allSuggestions,
    query: 'RTX',
  },
};

export const RecentOnly: Story = {
  args: {
    suggestions: [allSuggestions[0]],
    query: '',
  },
};

export const TrendingOnly: Story = {
  args: {
    suggestions: [allSuggestions[1]],
    query: '',
  },
};

export const WithProducts: Story = {
  args: {
    suggestions: [
      {
        type: 'products',
        label: 'Matching Products',
        items: [
          { id: 'p1', text: 'ASUS ROG Strix RTX 4090', thumbnail: 'https://placehold.co/64x64/f5f5f5/999?text=1' },
          { id: 'p2', text: 'MSI RTX 4090 Suprim X', thumbnail: 'https://placehold.co/64x64/f5f5f5/999?text=2' },
          { id: 'p3', text: 'Gigabyte RTX 4090 Aorus Master', thumbnail: 'https://placehold.co/64x64/f5f5f5/999?text=3' },
          { id: 'p4', text: 'EVGA RTX 4090 FTW3 Ultra', thumbnail: 'https://placehold.co/64x64/f5f5f5/999?text=4' },
          { id: 'p5', text: 'Zotac RTX 4090 AMP Extreme', thumbnail: 'https://placehold.co/64x64/f5f5f5/999?text=5' },
        ],
      },
    ],
    query: '4090',
  },
};

export const WithQuery: Story = {
  args: {
    suggestions: [
      {
        type: 'trending',
        label: 'Suggestions',
        items: [
          { id: '1', text: 'gaming keyboard mechanical' },
          { id: '2', text: 'gaming mouse wireless' },
          { id: '3', text: 'gaming headset 7.1' },
          { id: '4', text: 'gaming monitor 240hz' },
        ],
      },
    ],
    query: 'gaming',
  },
};
