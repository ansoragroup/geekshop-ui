import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from './Tooltip';
import { Button } from '../../form/Button';
import { Tag } from '../../data-display/Tag';

const meta = {
  title: 'Feedback/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 390, padding: 80, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#fff', borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: "Bu mahsulot haqida ma'lumot",
    children: (
      <Button size="sm" variant="outline">
        Hover me
      </Button>
    ),
  },
};

export const ClickTrigger: Story = {
  args: {
    content: "Bosish orqali ko'rsatildi",
    trigger: 'click',
    children: (
      <Button size="sm">Click me</Button>
    ),
  },
};

export const PlacementTop: Story = {
  args: {
    content: "Yuqorida ko'rsatiladi",
    placement: 'top',
    children: <Button size="sm" variant="outline">Top</Button>,
  },
};

export const PlacementBottom: Story = {
  args: {
    content: "Pastda ko'rsatiladi",
    placement: 'bottom',
    children: <Button size="sm" variant="outline">Bottom</Button>,
  },
};

export const PlacementLeft: Story = {
  args: {
    content: "Chapda ko'rsatiladi",
    placement: 'left',
    children: <Button size="sm" variant="outline">Left</Button>,
  },
};

export const PlacementRight: Story = {
  args: {
    content: "O'ngda ko'rsatiladi",
    placement: 'right',
    children: <Button size="sm" variant="outline">Right</Button>,
  },
};

export const WithTag: Story = {
  args: {
    content: 'Original mahsulot kafolati',
    trigger: 'click',
    children: <Tag color="success" size="sm">Tekshirilgan</Tag>,
  },
};

export const LongContent: Story = {
  args: {
    content: "Bu mahsulot GeekShop Verify tizimi orqali tekshirilgan. Original ekanligi kafolatlangan. Qaytarish va almashtirish xizmati mavjud.",
    placement: 'bottom',
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
