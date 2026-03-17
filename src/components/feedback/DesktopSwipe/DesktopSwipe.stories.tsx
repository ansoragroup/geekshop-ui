import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DesktopSwipe } from './DesktopSwipe';

const meta = {
  title: 'Feedback (Desktop)/DesktopSwipe',
  component: DesktopSwipe,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 600, padding: 24, background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopSwipe>;

export default meta;
type Story = StoryObj<typeof meta>;

const DeleteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 4l8 8M12 4l-8 8" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const ArchiveIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="3" width="12" height="3" rx="1" stroke="#fff" strokeWidth="1.5" />
    <path d="M3 6v6a1 1 0 001 1h8a1 1 0 001-1V6" stroke="#fff" strokeWidth="1.5" />
    <path d="M6.5 9h3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const PinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 2v8M8 14v-2M4 6l4 4 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Default: Story = {
  args: {
    actions: [
      {
        label: 'Delete',
        icon: <DeleteIcon />,
        color: '#FF3B30',
        onClick: fn(),
      },
    ],
    children: (
      <div style={{ padding: 16, borderBottom: '1px solid #eee' }}>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>MSI GeForce RTX 4060</div>
        <div style={{ color: '#666', fontSize: 12 }}>Added to cart 2 days ago</div>
      </div>
    ),
  },
};

export const MultipleActions: Story = {
  args: {
    actions: [
      { label: 'Pin', icon: <PinIcon />, color: '#1890FF', onClick: fn() },
      { label: 'Archive', icon: <ArchiveIcon />, color: '#FFA726', onClick: fn() },
      { label: 'Delete', icon: <DeleteIcon />, color: '#FF3B30', onClick: fn() },
    ],
    children: (
      <div style={{ padding: 16, borderBottom: '1px solid #eee' }}>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Order #GS-2024-78541</div>
        <div style={{ color: '#666', fontSize: 12 }}>Delivered on March 15, 2024</div>
      </div>
    ),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    actions: [
      { label: 'Delete', icon: <DeleteIcon />, color: '#FF3B30', onClick: fn() },
    ],
    children: (
      <div style={{ padding: 16, borderBottom: '1px solid #eee' }}>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Processing item...</div>
        <div style={{ color: '#666', fontSize: 12 }}>Cannot be modified</div>
      </div>
    ),
  },
};

export const ListExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {['Samsung Galaxy S24 Ultra', 'Apple iPhone 16 Pro', 'Google Pixel 9 Pro'].map((item, i) => (
        <DesktopSwipe
          key={i}
          actions={[
            { label: 'Archive', icon: <ArchiveIcon />, color: '#FFA726', onClick: fn() },
            { label: 'Delete', icon: <DeleteIcon />, color: '#FF3B30', onClick: fn() },
          ]}
        >
          <div style={{ padding: 16, borderBottom: '1px solid #eee', background: '#fff' }}>
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{item}</div>
            <div style={{ color: '#666', fontSize: 12 }}>In stock - Free shipping</div>
          </div>
        </DesktopSwipe>
      ))}
    </div>
  ),
};
