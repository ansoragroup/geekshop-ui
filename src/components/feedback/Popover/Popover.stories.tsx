import type { Meta, StoryObj } from '@storybook/react-vite';
import { Popover } from './Popover';
import { Button } from '../../form/Button';

const meta = {
  title: 'Feedback/Popover',
  component: Popover,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 390, padding: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#fff', borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: <div>Popover tarkibi</div>,
    children: (
      <Button size="sm" variant="outline">Bosing</Button>
    ),
  },
};

export const HoverTrigger: Story = {
  args: {
    content: <div style={{ padding: 4 }}>Hover popover</div>,
    trigger: 'hover',
    children: (
      <Button size="sm" variant="outline">Hover qiling</Button>
    ),
  },
};

export const PlacementTop: Story = {
  args: {
    content: <div>Yuqorida chiqadi</div>,
    placement: 'top',
    children: <Button size="sm" variant="outline">Top</Button>,
  },
};

export const PlacementBottom: Story = {
  args: {
    content: <div>Pastda chiqadi</div>,
    placement: 'bottom',
    children: <Button size="sm" variant="outline">Bottom</Button>,
  },
};

export const RichContent: Story = {
  args: {
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontWeight: 600, fontSize: 14 }}>Buyurtma holati</div>
        <div style={{ fontSize: 12, color: '#666' }}>Buyurtmangiz Toshkent omborida</div>
        <Button size="sm" variant="primary" style={{ marginTop: 4 }}>
          Kuzatish
        </Button>
      </div>
    ),
    placement: 'bottom-start',
    children: (
      <Button size="sm" variant="outline">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="8" cy="8" r="6.5" />
          <path d="M8 7v4M8 5.5v0" strokeLinecap="round" />
        </svg>
      </Button>
    ),
  },
};

export const WithoutArrow: Story = {
  args: {
    content: <div>O&apos;qsiz popover</div>,
    arrow: false,
    children: <Button size="sm" variant="outline">No arrow</Button>,
  },
};

export const MenuPopover: Story = {
  args: {
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, margin: -12 }}>
        {['Tahrirlash', 'Nusxalash', "O'chirish"].map((item, i) => (
          <button
            key={i}
            style={{
              padding: '10px 16px',
              border: 'none',
              background: 'none',
              textAlign: 'left',
              cursor: 'pointer',
              fontSize: 14,
              color: item === "O'chirish" ? '#FF3B30' : '#1A1A1A',
              borderBottom: i < 2 ? '1px solid #F0F0F0' : 'none',
            }}
          >
            {item}
          </button>
        ))}
      </div>
    ),
    placement: 'bottom-end',
    children: (
      <Button size="sm" variant="outline">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <circle cx="8" cy="3" r="1.5" />
          <circle cx="8" cy="8" r="1.5" />
          <circle cx="8" cy="13" r="1.5" />
        </svg>
      </Button>
    ),
  },
};
