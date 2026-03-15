import type { Meta, StoryObj } from '@storybook/react-vite';
import { CategoriesPage } from './CategoriesPage';

const meta = {
  title: 'Pages/CategoriesPage',
  component: CategoriesPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
} satisfies Meta<typeof CategoriesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default categories page with sidebar and waterfall product grid */
export const Default: Story = {
  args: {
    showSearch: false,
  },
};

/** Categories page with search bar enabled */
export const WithSearch: Story = {
  args: {
    showSearch: true,
  },
};
