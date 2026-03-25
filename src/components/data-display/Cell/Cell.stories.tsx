import type { Meta, StoryObj } from '@storybook/react-vite';
import { Cell } from './Cell';

const meta = {
  title: 'Data Display/Cell',
  component: Cell,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 390, background: '#fff', borderRadius: 12, overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Cell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Buyurtmalarim',
    arrow: true,
    clickable: true,
  },
};

export const WithDescription: Story = {
  args: {
    title: 'Yetkazib berish manzili',
    description: 'Toshkent sh., Chilonzor t., 12-uy',
    arrow: true,
    clickable: true,
  },
};

export const WithValue: Story = {
  args: {
    title: 'Til',
    value: "O'zbek",
    arrow: true,
    clickable: true,
  },
};

export const WithIcon: Story = {
  args: {
    title: 'Bildirishnomalar',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 01-3.46 0" />
      </svg>
    ),
    arrow: true,
    clickable: true,
  },
};

export const SettingsGroup: Story = {
  name: 'Settings Menu Group',
  render: () => (
    <div>
      <Cell
        title="Shaxsiy ma'lumotlar"
        icon={
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        }
        arrow
        clickable
        divider
        onClick={() => {}}
      />
      <Cell
        title="Manzillarim"
        description="3 ta manzil saqlangan"
        icon={
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        }
        arrow
        clickable
        divider
        onClick={() => {}}
      />
      <Cell
        title="Til"
        value="O'zbek"
        icon={
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
          </svg>
        }
        arrow
        clickable
        divider
        onClick={() => {}}
      />
      <Cell
        title="Valyuta"
        value="UZS"
        icon={
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
          </svg>
        }
        arrow
        clickable
        onClick={() => {}}
      />
    </div>
  ),
};

export const OrderInfoGroup: Story = {
  render: () => (
    <div>
      <Cell title="Buyurtma raqami" value="#GS-20240315-001" divider />
      <Cell title="Sana" value="15 mart, 2026" divider />
      <Cell title="Holat" value="Yetkazilmoqda" divider />
      <Cell title="Jami" value="1 250 000 so'm" />
    </div>
  ),
};
