import type { Meta, StoryObj } from '@storybook/react-vite';
import { CategoriesPage } from './CategoriesPage';

const meta: Meta<typeof CategoriesPage> = {
  title: 'Pages/CategoriesPage',
  component: CategoriesPage,
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
};

export default meta;
type Story = StoryObj<typeof CategoriesPage>;

export const Default: Story = {};
