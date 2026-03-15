import type { Meta, StoryObj } from '@storybook/react-vite';
import { HomePage } from './HomePage';

const meta = {
  title: 'Pages/HomePage',
  component: HomePage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
} satisfies Meta<typeof HomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Standard home page with waterfall (masonry) product grid */
export const Default: Story = {};

/** Same page but ProductGrid uses standard equal-height grid layout */
export const WithGridLayout: Story = {
  args: {
    gridLayout: 'grid',
  },
};

/** AppBar with transparent variant (white background) */
export const WithTransparentAppBar: Story = {
  args: {
    appBarVariant: 'transparent',
  },
};

/** AppBar with custom gradient purple-red background like Taobao */
export const WithCustomAppBarColor: Story = {
  args: {
    appBarBackgroundColor: 'linear-gradient(135deg, #7B2FF7 0%, #FF3B6F 100%)',
  },
};
