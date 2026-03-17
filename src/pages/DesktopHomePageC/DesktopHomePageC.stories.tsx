import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopHomePageC } from './DesktopHomePageC';

const meta = {
  title: 'Pages (Desktop)/DesktopHomePageC',
  component: DesktopHomePageC,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopHomePageC>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DewuPremium: Story = {};
