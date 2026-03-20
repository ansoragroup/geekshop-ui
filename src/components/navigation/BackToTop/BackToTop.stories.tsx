import type { Meta, StoryObj } from '@storybook/react-vite';
import { BackToTop } from './BackToTop';

const meta = {
  title: 'Navigation/BackToTop',
  component: BackToTop,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof BackToTop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    threshold: 300,
    smooth: true,
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', width: 44, height: 44 }}>
        <div style={{ position: 'relative' }}>
          <Story />
        </div>
        <p style={{ fontSize: 12, color: '#999', marginTop: 56, whiteSpace: 'nowrap' }}>
          Scroll down on a real page to see the button appear
        </p>
      </div>
    ),
  ],
};

export const AlwaysVisible: Story = {
  args: {
    threshold: 0,
    smooth: true,
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', width: 44, height: 44 }}>
        <Story />
      </div>
    ),
  ],
};

export const InScrollablePage: Story = {
  render: (args) => (
    <div>
      <div style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{ marginBottom: 16 }}>Scroll down to see the Back to Top button</h2>
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={i}
            style={{
              padding: 16,
              marginBottom: 12,
              background: '#fff',
              border: '1px solid #eee',
              borderRadius: 8,
            }}
          >
            <h3 style={{ margin: '0 0 8px', fontSize: 16 }}>
              Product #{i + 1} — GeekShop Item
            </h3>
            <p style={{ margin: 0, color: '#666', fontSize: 14 }}>
              High-performance computer component with premium build quality.
              Perfect for gaming and professional workloads.
            </p>
          </div>
        ))}
      </div>
      <BackToTop {...args} />
    </div>
  ),
  args: {
    threshold: 300,
    smooth: true,
  },
  parameters: {
    layout: 'fullscreen',
  },
};
