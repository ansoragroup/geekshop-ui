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
  argTypes: {
    onEnd: { action: 'countdown ended' },
    showDays: { control: 'boolean' },
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

// ─── Default (2 days + 5 hours) ──────────────────────────────────────────────

export const Default: Story = {
  args: {
    endTime: new Date(Date.now() + 86_400_000 * 2 + 3_600_000 * 5 + 60_000 * 30),
    label: 'Flash Sale Ends In',
    showDays: true,
  },
};

// ─── Full Featured ───────────────────────────────────────────────────────────

export const FullFeatured: Story = {
  name: 'Full Featured (all props)',
  args: {
    endTime: new Date(Date.now() + 86_400_000 * 3 + 3_600_000 * 12 + 60_000 * 45 + 30_000),
    label: 'Mega Sale Countdown',
    showDays: true,
  },
};

// ─── No Days Segment ─────────────────────────────────────────────────────────

export const NoDays: Story = {
  name: 'showDays: false',
  args: {
    endTime: new Date(Date.now() + 3_600_000 * 3 + 60_000 * 45),
    label: 'Deal Expires',
    showDays: false,
  },
};

// ─── Almost Expired (5 min) ──────────────────────────────────────────────────

export const AlmostExpired: Story = {
  name: 'Almost Expired (5 minutes)',
  args: {
    endTime: new Date(Date.now() + 60_000 * 5),
    label: 'Hurry! Ending Soon',
    showDays: false,
  },
};

// ─── One Minute Left ─────────────────────────────────────────────────────────

export const OneMinuteLeft: Story = {
  name: 'Edge: 1 Minute Left',
  args: {
    endTime: new Date(Date.now() + 60_000),
    label: 'Last chance!',
    showDays: false,
  },
};

// ─── Expired ─────────────────────────────────────────────────────────────────

export const Expired: Story = {
  name: 'Expired (past endTime)',
  args: {
    endTime: new Date(Date.now() - 60_000),
    label: 'Sale Ended',
    showDays: true,
  },
};

// ─── Long Duration (7 days) ──────────────────────────────────────────────────

export const LongDuration: Story = {
  name: 'Long Duration (7 days)',
  args: {
    endTime: new Date(Date.now() + 86_400_000 * 7),
    label: 'Weekly Sale Event',
    showDays: true,
  },
};

// ─── Custom Label ────────────────────────────────────────────────────────────

export const CustomLabel: Story = {
  args: {
    endTime: new Date(Date.now() + 3_600_000 * 8),
    label: 'GPU Flash Deal Closes In',
    showDays: false,
  },
};

// ─── ISO String endTime ──────────────────────────────────────────────────────

export const ISOStringEndTime: Story = {
  name: 'endTime as ISO string',
  args: {
    endTime: new Date(Date.now() + 86_400_000).toISOString(),
    label: 'Promotion Ends',
    showDays: true,
  },
};

// ─── Multiple Timers ─────────────────────────────────────────────────────────

export const MultipleTimers: Story = {
  name: 'Multiple Timers (stacked)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <DesktopCountdownTimer
        endTime={new Date(Date.now() + 3_600_000 * 2)}
        label="Flash Sale"
        showDays={false}
      />
      <DesktopCountdownTimer
        endTime={new Date(Date.now() + 86_400_000 * 3)}
        label="Spring Collection Launch"
        showDays
      />
      <DesktopCountdownTimer
        endTime={new Date(Date.now() + 60_000 * 30)}
        label="Lightning Deal"
        showDays={false}
      />
    </div>
  ),
};
