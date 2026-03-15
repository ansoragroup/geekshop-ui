import type { Meta, StoryObj } from '@storybook/react-vite';
import { CategoryProductsPage } from './CategoryProductsPage';

const meta = {
  title: 'Pages/CategoryProductsPage',
  component: CategoryProductsPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
} satisfies Meta<typeof CategoryProductsPage>;

export default meta;
type Story = StoryObj<typeof CategoryProductsPage>;

export const Default: Story = {
  args: {
    categoryName: 'Elektronika',
    showFilter: false,
  },
};

export const WithFilter: Story = {
  args: {
    categoryName: 'Elektronika',
    showFilter: true,
  },
};

export const NoResults: Story = {
  args: {
    categoryName: 'Elektr jihozlar',
    empty: true,
  },
};

export const Loading: Story = {
  args: {
    categoryName: 'Elektronika',
    loading: true,
  },
};
