import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopSection } from './DesktopSection';

const meta = {
  title: 'Layout (Desktop)/DesktopSection',
  component: DesktopSection,
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
} satisfies Meta<typeof DesktopSection>;

export default meta;
type Story = StoryObj<typeof meta>;

const SampleContent = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
    {Array.from({ length: 3 }, (_, i) => (
      <div
        key={i}
        style={{
          background: '#f5f5f5',
          borderRadius: 8,
          padding: 24,
          textAlign: 'center',
          color: '#666',
          fontSize: 14,
        }}
      >
        Item {i + 1}
      </div>
    ))}
  </div>
);

export const Default: Story = {
  args: {
    title: 'Recommended Products',
    children: <SampleContent />,
  },
};

export const CardBackground: Story = {
  args: {
    title: 'Featured Deals',
    background: 'card',
    children: <SampleContent />,
  },
};

export const PrimaryBackground: Story = {
  args: {
    title: 'Flash Sale',
    background: 'primary',
    children: <SampleContent />,
  },
};

export const NoPadding: Story = {
  args: {
    title: 'Full Width Content',
    padding: 'none',
    background: 'card',
    children: (
      <div style={{ height: 120, background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
        Edge-to-edge content
      </div>
    ),
  },
};

export const LargePadding: Story = {
  args: {
    title: 'Spacious Section',
    padding: 'lg',
    background: 'card',
    children: <SampleContent />,
  },
};

export const NoTitle: Story = {
  args: {
    background: 'card',
    children: (
      <div style={{ padding: 16, textAlign: 'center', color: '#666', fontSize: 14 }}>
        A section without a title, just content.
      </div>
    ),
  },
};
