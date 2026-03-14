import type { Meta, StoryObj } from '@storybook/react-vite';
import { PopularSearches } from './PopularSearches';

const meta = {
  title: 'Navigation/PopularSearches',
  component: PopularSearches,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'iPhone13' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '360px', padding: 16, background: '#F5F5F5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PopularSearches>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSearches = [
  { rank: 1, text: 'RTX 4070' },
  { rank: 2, text: 'MacBook Pro' },
  { rank: 3, text: 'Gaming noutbuk' },
  { rank: 4, text: 'DDR5 RAM' },
  { rank: 5, text: 'Intel Core i9' },
  { rank: 6, text: 'SSD 1TB' },
  { rank: 7, text: 'Monitor 27"' },
  { rank: 8, text: 'Mexanik klaviatura' },
];

export const Default: Story = {
  args: {
    searches: defaultSearches,
    onSelect: (s) => alert(`Selected: ${s.text}`),
  },
};

export const Top3Only: Story = {
  args: {
    searches: [
      { rank: 1, text: 'RTX 4090' },
      { rank: 2, text: 'AMD Ryzen 9' },
      { rank: 3, text: 'Gaming stul' },
    ],
  },
};

export const ManyTags: Story = {
  args: {
    searches: [
      { rank: 1, text: 'RTX 4070' },
      { rank: 2, text: 'MacBook Pro' },
      { rank: 3, text: 'Gaming noutbuk' },
      { rank: 4, text: 'DDR5 RAM' },
      { rank: 5, text: 'Intel Core i9' },
      { rank: 6, text: 'SSD 1TB' },
      { rank: 7, text: 'Monitor 27"' },
      { rank: 8, text: 'Mexanik klaviatura' },
      { rank: 9, text: 'Kompyuter korzinka' },
      { rank: 10, text: 'Gaming sichqoncha' },
      { rank: 11, text: 'Quloqchin' },
      { rank: 12, text: 'Webcam 4K' },
    ],
  },
};

export const PCBuild: Story = {
  args: {
    title: 'Kompyuter yig\'ish',
    searches: [
      { rank: 1, text: 'Protsessor' },
      { rank: 2, text: 'Videokarta' },
      { rank: 3, text: 'Operativ xotira' },
      { rank: 4, text: 'Ona plata' },
      { rank: 5, text: 'Quvvat bloki' },
      { rank: 6, text: 'SSD disk' },
      { rank: 7, text: 'Korpus' },
      { rank: 8, text: 'Sovutish tizimi' },
    ],
  },
};
