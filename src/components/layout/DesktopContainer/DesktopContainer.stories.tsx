import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopContainer } from './DesktopContainer';

const meta = {
  title: 'Layout (Desktop)/DesktopContainer',
  component: DesktopContainer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

const Placeholder = ({ height = 200, label }: { height?: number; label: string }) => (
  <div
    style={{
      background: '#fff',
      border: '1px dashed #ccc',
      borderRadius: 8,
      padding: 16,
      height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#666',
      fontSize: 14,
    }}
  >
    {label}
  </div>
);

export const Default: Story = {
  args: {
    children: <Placeholder label="Centered content (max 1200px, 24px padding)" />,
  },
};

export const CustomWidth: Story = {
  args: {
    maxWidth: 800,
    padding: 32,
    children: <Placeholder label="Narrower container (max 800px, 32px padding)" />,
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: <Placeholder label="Full-width background, centered inner content" />,
    style: { background: '#FFF5F0' },
  },
};
