import type { Meta, StoryObj } from '@storybook/react-vite';
import { CountdownTimer } from './CountdownTimer';

const meta = {
  title: 'Content/CountdownTimer',
  component: CountdownTimer,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '375px', padding: '12px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    onEnd: { action: 'countdown ended' },
  },
} satisfies Meta<typeof CountdownTimer>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 8 hours from now */
const eightHoursFromNow = new Date(Date.now() + 8 * 60 * 60 * 1000 + 42 * 60 * 1000 + 11 * 1000);

/** 1 hour from now */
const oneHourFromNow = new Date(Date.now() + 1 * 60 * 60 * 1000);

/** 5 minutes from now */
const fiveMinutesFromNow = new Date(Date.now() + 5 * 60 * 1000);

export const Default: Story = {
  args: {
    endTime: eightHoursFromNow,
    label: 'Chegirmalar',
  },
};

export const FlashSale: Story = {
  args: {
    endTime: oneHourFromNow,
    label: 'Flash Sale',
  },
};

export const AlmostOver: Story = {
  args: {
    endTime: fiveMinutesFromNow,
    label: 'Tez bo\'ling!',
  },
};

export const GPUDeal: Story = {
  args: {
    endTime: eightHoursFromNow,
    label: 'GPU Aksiya',
  },
};

/** 3 days from now */
const threeDaysFromNow = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000);

/** 30 seconds from now */
const thirtySecondsFromNow = new Date(Date.now() + 30 * 1000);

/** Already expired */
const alreadyExpired = new Date(Date.now() - 60 * 1000);

/** 7 days from now (long duration) */
const sevenDaysFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 23 * 60 * 60 * 1000 + 59 * 60 * 1000);

export const MultiDaySale: Story = {
  name: 'Multi-Day Sale (3+ days)',
  args: {
    endTime: threeDaysFromNow,
    label: 'Mega aksiya',
  },
};

export const LastSeconds: Story = {
  name: 'Edge: Last 30 Seconds',
  args: {
    endTime: thirtySecondsFromNow,
    label: 'Tugayapti!',
  },
};

export const Expired: Story = {
  name: 'Edge: Already Expired',
  args: {
    endTime: alreadyExpired,
    label: 'Aksiya tugadi',
  },
};

export const WeekLong: Story = {
  name: 'Week-Long Campaign (168+ hours)',
  args: {
    endTime: sevenDaysFromNow,
    label: 'Haftalik aksiya',
  },
};

export const RussianLabel: Story = {
  name: 'Locale: Russian Label',
  args: {
    endTime: eightHoursFromNow,
    label: 'Распродажа электроники',
  },
};

export const EnglishLabel: Story = {
  name: 'Locale: English Label',
  args: {
    endTime: oneHourFromNow,
    label: 'Limited Time Offer',
  },
};

export const LongLabelText: Story = {
  name: 'Edge: Very Long Label',
  args: {
    endTime: eightHoursFromNow,
    label: 'Barcha noutbuklar va aksessuarlarga maxsus chegirma',
  },
};

export const WithOnEndCallback: Story = {
  name: 'Interactive: onEnd Callback',
  args: {
    endTime: thirtySecondsFromNow,
    label: 'Callback test',
    onEnd: () => {},
  },
  argTypes: {
    onEnd: { action: 'countdown ended!' },
  },
};

export const ISOStringEndTime: Story = {
  name: 'ISO String endTime',
  args: {
    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    label: 'ISO format test',
  },
};
