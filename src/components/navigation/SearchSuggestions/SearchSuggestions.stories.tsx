import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchSuggestions } from './SearchSuggestions';

const meta: Meta<typeof SearchSuggestions> = {
  title: 'Navigation/SearchSuggestions',
  component: SearchSuggestions,
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
};

export default meta;
type Story = StoryObj<typeof SearchSuggestions>;

const pcPartsSuggestions = [
  { id: '1', text: 'RTX 4090 videokarta' },
  { id: '2', text: 'RTX 4070 Ti Super' },
  { id: '3', text: 'RTX 3060 arzon narxda' },
  { id: '4', text: 'RX 7900 XTX' },
  { id: '5', text: 'RTX 4060 noutbuk' },
];

export const Default: Story = {
  args: {
    query: 'RTX',
    suggestions: pcPartsSuggestions,
    onSelect: (s) => alert(`Selected: ${s.text}`),
  },
};

export const PartialMatch: Story = {
  args: {
    query: 'video',
    suggestions: [
      { id: '1', text: 'RTX 4090 videokarta' },
      { id: '2', text: 'GTX 1660 videokarta' },
      { id: '3', text: 'Videokarta narxlari 2024' },
      { id: '4', text: 'Videokarta qanday tanlash' },
    ],
  },
};

export const ProcessorSearch: Story = {
  args: {
    query: 'Intel',
    suggestions: [
      { id: '1', text: 'Intel Core i9-14900K' },
      { id: '2', text: 'Intel Core i7-14700K' },
      { id: '3', text: 'Intel Core i5-14600K' },
      { id: '4', text: 'Intel vs AMD protsessor' },
      { id: '5', text: 'Intel noutbuk protsessorlari' },
    ],
  },
};

export const SingleSuggestion: Story = {
  args: {
    query: 'DDR5',
    suggestions: [
      { id: '1', text: 'DDR5 RAM 32GB' },
    ],
  },
};

export const NoHighlight: Story = {
  args: {
    query: '',
    suggestions: [
      { id: '1', text: 'RTX 4090 videokarta' },
      { id: '2', text: 'MacBook Pro M3' },
      { id: '3', text: 'Gaming noutbuk' },
    ],
  },
};

export const LongSuggestions: Story = {
  args: {
    query: 'gaming',
    suggestions: [
      { id: '1', text: 'Gaming noutbuk arzon narxda yetkazib berish bilan' },
      { id: '2', text: 'Gaming stul ergonomik yuqori sifatli' },
      { id: '3', text: 'Gaming klaviatura mexanik RGB yoritish' },
      { id: '4', text: 'Gaming monitor 144Hz 27 dyuym IPS' },
    ],
  },
};
