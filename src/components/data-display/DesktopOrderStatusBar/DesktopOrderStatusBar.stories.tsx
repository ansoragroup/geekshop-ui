import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopOrderStatusBar } from './DesktopOrderStatusBar';

const meta = {
  title: 'Data Display (Desktop)/DesktopOrderStatusBar',
  component: DesktopOrderStatusBar,
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
} satisfies Meta<typeof DesktopOrderStatusBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentStep: 2,
    steps: [
      { label: 'Order Placed', status: 'completed', date: '14 Mar, 10:30' },
      { label: 'Processing', status: 'completed', date: '14 Mar, 11:00' },
      { label: 'Shipped', status: 'active', date: '15 Mar, 09:00' },
      { label: 'In Transit', status: 'pending' },
      { label: 'Delivered', status: 'pending' },
    ],
  },
};

export const AllCompleted: Story = {
  args: {
    currentStep: 4,
    steps: [
      { label: 'Order Placed', status: 'completed', date: '14 Mar, 10:30' },
      { label: 'Processing', status: 'completed', date: '14 Mar, 11:00' },
      { label: 'Shipped', status: 'completed', date: '15 Mar, 09:00' },
      { label: 'In Transit', status: 'completed', date: '16 Mar, 14:00' },
      { label: 'Delivered', status: 'completed', date: '17 Mar, 10:00' },
    ],
  },
};

export const JustStarted: Story = {
  args: {
    currentStep: 0,
    steps: [
      { label: 'Payment', status: 'active' },
      { label: 'Confirmed', status: 'pending' },
      { label: 'Packed', status: 'pending' },
      { label: 'Shipped', status: 'pending' },
      { label: 'Delivered', status: 'pending' },
    ],
  },
};

export const ThreeSteps: Story = {
  args: {
    currentStep: 1,
    steps: [
      { label: 'Ordered', status: 'completed', date: '12 Mar' },
      { label: 'Shipping', status: 'active', date: '14 Mar' },
      { label: 'Delivered', status: 'pending' },
    ],
  },
};
