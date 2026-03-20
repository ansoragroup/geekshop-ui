import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopDivider } from './DesktopDivider';

const meta = {
  title: 'Layout (Desktop)/DesktopDivider',
  component: DesktopDivider,
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
} satisfies Meta<typeof DesktopDivider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Dashed: Story = {
  args: {
    variant: 'dashed',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'OR',
  },
};

export const DashedWithLabel: Story = {
  args: {
    variant: 'dashed',
    label: 'More options',
  },
};

export const CustomColor: Story = {
  args: {
    color: '#FF5000',
    label: 'Primary divider',
  },
};

export const Vertical: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 900, padding: 24, background: '#f5f5f5', display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontSize: 14, color: '#666' }}>Section A</span>
        <Story />
        <span style={{ fontSize: 14, color: '#666' }}>Section B</span>
        <DesktopDivider direction="vertical" />
        <span style={{ fontSize: 14, color: '#666' }}>Section C</span>
      </div>
    ),
  ],
  args: {
    direction: 'vertical',
  },
};

export const VerticalDashed: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 900, padding: 24, background: '#f5f5f5', display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontSize: 14, color: '#666' }}>Left</span>
        <Story />
        <span style={{ fontSize: 14, color: '#666' }}>Right</span>
      </div>
    ),
  ],
  args: {
    direction: 'vertical',
    variant: 'dashed',
  },
};
