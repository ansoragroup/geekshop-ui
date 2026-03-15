import type { Meta, StoryObj } from '@storybook/react-vite';
import { Progress } from './Progress';

const meta = {
  title: 'Data Display/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    variant: { control: 'select', options: ['linear', 'circular'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 390, padding: 24, background: '#fff', borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 65,
  },
};

export const WithLabel: Story = {
  args: {
    value: 75,
    showLabel: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Progress value={40} size="sm" showLabel />
      <Progress value={60} size="md" showLabel />
      <Progress value={80} size="lg" showLabel />
    </div>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Progress value={30} color="#FF3B30" showLabel />
      <Progress value={60} color="#07C160" showLabel />
      <Progress value={90} color="#1890FF" showLabel />
      <Progress value={50} color="#FFA726" trackColor="#FFF8E6" showLabel />
    </div>
  ),
};

export const Circular: Story = {
  args: {
    value: 72,
    variant: 'circular',
    showLabel: true,
  },
};

export const CircularSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Progress value={30} variant="circular" size="sm" showLabel />
      <Progress value={60} variant="circular" size="md" showLabel />
      <Progress value={85} variant="circular" size="lg" showLabel />
    </div>
  ),
};

export const CircularCustom: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Progress value={100} variant="circular" color="#07C160" showLabel label="Done" size="md" />
      <Progress value={45} variant="circular" color="#FF3B30" showLabel size="md" />
      <Progress value={80} variant="circular" color="#1890FF" showLabel size="md" />
    </div>
  ),
};

export const OrderProgress: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
        <span style={{ color: '#1A1A1A', fontWeight: 600 }}>Buyurtma holati</span>
        <span style={{ color: '#07C160' }}>Yetkazilmoqda</span>
      </div>
      <Progress value={75} color="#07C160" size="sm" />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#999' }}>
        <span>Buyurtma berildi</span>
        <span>Yetkazildi</span>
      </div>
    </div>
  ),
};
