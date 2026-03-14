import type { Meta, StoryObj } from '@storybook/react-vite';
import { HomePage } from './HomePage';

const meta: Meta<typeof HomePage> = {
  title: 'Pages/HomePage',
  component: HomePage,
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
};

export default meta;
type Story = StoryObj<typeof HomePage>;

export const Default: Story = {};
