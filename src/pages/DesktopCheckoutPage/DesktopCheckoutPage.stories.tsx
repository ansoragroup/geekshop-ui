import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopCheckoutPage } from './DesktopCheckoutPage';

const meta = {
  title: 'Pages (Desktop)/DesktopCheckoutPage',
  component: DesktopCheckoutPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopCheckoutPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
