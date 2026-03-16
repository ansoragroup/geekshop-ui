import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopProductDetailPage } from './DesktopProductDetailPage';

const meta = {
  title: 'Pages (Desktop)/DesktopProductDetailPage',
  component: DesktopProductDetailPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopProductDetailPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
