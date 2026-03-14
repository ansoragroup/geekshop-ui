import type { Meta, StoryObj } from '@storybook/react-vite';
import { Loading } from './Loading';

const meta = {
  title: 'Feedback/Loading',
  component: Loading,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['spinner', 'skeleton', 'dots'],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 16, background: '#F5F5F5', minHeight: 200 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Spinner: Story = {
  args: {
    type: 'spinner',
    text: 'Yuklanmoqda...',
  },
};

export const SpinnerNoText: Story = {
  name: 'Spinner (no text)',
  args: {
    type: 'spinner',
  },
};

export const DotsLoading: Story = {
  name: 'Bouncing Dots',
  args: {
    type: 'dots',
    text: 'Kuting...',
  },
};

export const SkeletonCards: Story = {
  name: 'Skeleton (Product Cards)',
  args: {
    type: 'skeleton',
  },
};

export const FullscreenSpinner: Story = {
  args: {
    type: 'spinner',
    text: 'Iltimos, kuting...',
    fullscreen: true,
  },
};

export const FullscreenDots: Story = {
  args: {
    type: 'dots',
    text: 'Ma\'lumotlar yuklanmoqda',
    fullscreen: true,
  },
};

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h4 style={{ fontSize: 14, marginBottom: 8, color: '#666' }}>Spinner</h4>
        <div style={{ background: '#fff', borderRadius: 12, padding: 16 }}>
          <Loading type="spinner" text="Yuklanmoqda..." />
        </div>
      </div>
      <div>
        <h4 style={{ fontSize: 14, marginBottom: 8, color: '#666' }}>Dots</h4>
        <div style={{ background: '#fff', borderRadius: 12, padding: 16 }}>
          <Loading type="dots" text="Kuting..." />
        </div>
      </div>
      <div>
        <h4 style={{ fontSize: 14, marginBottom: 8, color: '#666' }}>Skeleton</h4>
        <Loading type="skeleton" />
      </div>
    </div>
  ),
};
