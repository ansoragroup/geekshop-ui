import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopCountdownTimer } from './DesktopCountdownTimer';

const meta = {
  title: 'Content (Desktop)/DesktopCountdownTimer',
  component: DesktopCountdownTimer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 900, padding: 24, background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopCountdownTimer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    endTime: new Date(Date.now() + 86_400_000 * 2 + 3_600_000 * 5 + 60_000 * 30),
    label: 'Flash Sale Ends In',
    showDays: true,
  },
};

export const NoDays: Story = {
  args: {
    endTime: new Date(Date.now() + 3_600_000 * 3 + 60_000 * 45),
    label: 'Deal Expires',
    showDays: false,
  },
};

export const AlmostExpired: Story = {
  args: {
    endTime: new Date(Date.now() + 60_000 * 5),
    label: 'Hurry! Ending Soon',
    showDays: false,
  },
};
