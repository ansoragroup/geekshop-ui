import type { Meta, StoryObj } from '@storybook/react-vite';
import CountdownTimer from './CountdownTimer';

const meta: Meta<typeof CountdownTimer> = {
  title: 'Content/CountdownTimer',
  component: CountdownTimer,
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
};

export default meta;
type Story = StoryObj<typeof CountdownTimer>;

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
