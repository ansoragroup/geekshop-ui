import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopCategoryPage } from './DesktopCategoryPage';

const meta = {
  title: 'Pages (Desktop)/DesktopCategoryPage',
  component: DesktopCategoryPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopCategoryPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
