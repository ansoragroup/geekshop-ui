import type { Meta, StoryObj } from '@storybook/react-vite';
import { Steps } from './Steps';

const meta = {
  title: 'Data Display/Steps',
  component: Steps,
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'select', options: ['horizontal', 'vertical'] },
    size: { control: 'select', options: ['sm', 'md'] },
    current: { control: { type: 'number', min: 0, max: 4 } },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 390, padding: 24, background: '#fff', borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Steps>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
  { title: "To'lov" },
  { title: 'Yuborish' },
  { title: 'Yetkazish' },
  { title: 'Baholash' },
];

export const Default: Story = {
  args: {
    current: 2,
    items: defaultItems,
  },
};

export const FirstStep: Story = {
  args: {
    current: 0,
    items: defaultItems,
  },
};

export const AllCompleted: Story = {
  args: {
    current: 4,
    items: defaultItems,
  },
};

export const Vertical: Story = {
  args: {
    current: 2,
    direction: 'vertical',
    items: [
      { title: "To'lov", description: "Muvaffaqiyatli to'landi" },
      { title: 'Yuborish', description: 'Buyurtma yuborildi' },
      { title: 'Yetkazish', description: 'Kutilmoqda' },
      { title: 'Baholash', description: 'Mahsulotni baholang' },
    ],
  },
};

export const VerticalFirstStep: Story = {
  args: {
    current: 0,
    direction: 'vertical',
    items: [
      { title: "To'lov", description: "To'lov kutilmoqda" },
      { title: 'Tayyorlanmoqda', description: 'Buyurtma tayyorlanmoqda' },
      { title: 'Yetkazish', description: 'Yetkazib berish' },
    ],
  },
};

export const SmallSize: Story = {
  args: {
    current: 1,
    size: 'sm',
    items: defaultItems,
  },
};

export const WithCustomIcons: Story = {
  args: {
    current: 1,
    items: [
      {
        title: "To'lov",
        icon: (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <path d="M2 10h20" />
          </svg>
        ),
      },
      {
        title: 'Yuborish',
        icon: (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="1" y="3" width="15" height="13" rx="1" />
            <path d="M16 8h4l3 5v4h-7V8z" />
          </svg>
        ),
      },
      {
        title: 'Yetkazildi',
        icon: (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <path d="M22 4L12 14.01l-3-3" />
          </svg>
        ),
      },
    ],
  },
};
