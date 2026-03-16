import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopHomePage } from './DesktopHomePage';

const meta = {
  title: 'Pages (Desktop)/DesktopHomePage',
  component: DesktopHomePage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopHomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
