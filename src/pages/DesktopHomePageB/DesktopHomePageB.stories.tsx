import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopHomePageB } from './DesktopHomePageB';

const meta = {
  title: 'Pages (Desktop)/DesktopHomePageB',
  component: DesktopHomePageB,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopHomePageB>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AlifshopStyle: Story = {};
