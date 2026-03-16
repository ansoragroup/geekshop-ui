import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopOrdersPage } from './DesktopOrdersPage';

const meta = {
  title: 'Pages (Desktop)/DesktopOrdersPage',
  component: DesktopOrdersPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopOrdersPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
