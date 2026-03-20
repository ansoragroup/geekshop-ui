import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopSearchResultsPage } from './DesktopSearchResultsPage';

const meta = {
  title: 'Pages (Desktop)/DesktopSearchResultsPage',
  component: DesktopSearchResultsPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopSearchResultsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    query: 'RTX 4070',
    initialProducts: [
      { id: '1', image: 'https://picsum.photos/seed/sr-gpu1/400/400', title: 'MSI GeForce RTX 4070 Super Gaming X Slim 12GB', price: 8900000, originalPrice: 9800000, discount: '-10%', rating: 4.5, reviewCount: 234, freeShipping: true },
      { id: '2', image: 'https://picsum.photos/seed/sr-gpu2/400/400', title: 'ASUS ROG Strix RTX 4070 OC 12GB GDDR6X', price: 9200000, rating: 4.7, reviewCount: 345, freeShipping: true },
      { id: '3', image: 'https://picsum.photos/seed/sr-gpu3/400/400', title: 'Gigabyte RTX 4070 Eagle OC 12GB', price: 7800000, originalPrice: 8500000, discount: '-8%', rating: 4.4, reviewCount: 123, freeShipping: true },
      { id: '4', image: 'https://picsum.photos/seed/sr-gpu4/400/400', title: 'Zotac RTX 4070 Twin Edge 12GB', price: 7500000, rating: 4.3, reviewCount: 89, freeShipping: false },
      { id: '5', image: 'https://picsum.photos/seed/sr-gpu5/400/400', title: 'EVGA RTX 4070 XC Gaming 12GB', price: 8100000, rating: 4.5, reviewCount: 167, freeShipping: true },
      { id: '6', image: 'https://picsum.photos/seed/sr-gpu6/400/400', title: 'MSI RTX 4070 Ventus 3X 12GB', price: 7600000, originalPrice: 8200000, discount: '-7%', rating: 4.2, reviewCount: 201, freeShipping: false },
      { id: '7', image: 'https://picsum.photos/seed/sr-gpu7/400/400', title: 'Sapphire RTX 4070 Pulse 12GB', price: 8000000, rating: 4.6, reviewCount: 56, freeShipping: true },
      { id: '8', image: 'https://picsum.photos/seed/sr-gpu8/400/400', title: 'ASUS TUF RTX 4070 OC 12GB', price: 8300000, originalPrice: 9000000, discount: '-8%', rating: 4.4, reviewCount: 145, freeShipping: true },
    ],
  },
};

export const NoResults: Story = {
  name: 'No Results',
  args: {
    query: 'quantum entanglement processor',
    initialProducts: [],
  },
};

export const Loading: Story = {
  name: 'Loading State',
  args: {
    query: 'gaming laptop',
    loading: true,
  },
};
