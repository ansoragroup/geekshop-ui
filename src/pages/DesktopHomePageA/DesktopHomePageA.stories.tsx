import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopHomePageA } from './DesktopHomePageA';

const meta = {
  title: 'Pages (Desktop)/DesktopHomePageA',
  component: DesktopHomePageA,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopHomePageA>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TaobaoMegaMall: Story = {};
