import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopCartPage } from './DesktopCartPage';

const meta = {
  title: 'Pages (Desktop)/DesktopCartPage',
  component: DesktopCartPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopCartPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
