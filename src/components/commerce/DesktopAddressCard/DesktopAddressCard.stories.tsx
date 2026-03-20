import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DesktopAddressCard } from './DesktopAddressCard';

const meta = {
  title: 'Commerce (Desktop)/DesktopAddressCard',
  component: DesktopAddressCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    onSelect: { action: 'onSelect' },
    onEdit: { action: 'onEdit' },
    onDelete: { action: 'onDelete' },
  },
  decorators: [(Story) => (
    <div style={{ width: 700, padding: 24 }}>
      <Story />
    </div>
  )],
} satisfies Meta<typeof DesktopAddressCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    address: {
      id: '1',
      name: 'John Doe',
      phone: '+998 90 123 45 67',
      street: '123 Main Street, Apt 4B',
      city: 'Tashkent',
      region: 'Uzbekistan',
      postalCode: '100000',
    },
    selected: false,
    onSelect: fn(),
    onEdit: fn(),
    onDelete: fn(),
  },
};

export const Selected: Story = {
  args: {
    ...Default.args,
    selected: true,
  },
};

export const WithLabel: Story = {
  args: {
    address: {
      id: '2',
      name: 'Alisher Navoiy',
      phone: '+998 93 456 78 90',
      street: '45 Mirzo Ulugbek Street',
      city: 'Samarkand',
      region: 'Uzbekistan',
      postalCode: '140100',
      label: 'Home',
    },
    selected: false,
    onSelect: fn(),
    onEdit: fn(),
    onDelete: fn(),
  },
};

export const NonSelectable: Story = {
  args: {
    address: {
      id: '3',
      name: 'Kamola Ergasheva',
      phone: '+998 95 111 22 33',
      street: '78 Amir Temur Avenue, Suite 12',
      city: 'Tashkent',
      postalCode: '100015',
      label: 'Work',
    },
    selectable: false,
    onEdit: fn(),
    onDelete: fn(),
  },
};

export const DefaultAddress: Story = {
  args: {
    address: {
      id: '4',
      name: 'Sardor Rahimov',
      phone: '+998 91 777 88 99',
      street: '12 Bobur Street',
      city: 'Bukhara',
      region: 'Uzbekistan',
      postalCode: '200100',
      label: 'Home',
      isDefault: true,
    },
    selected: true,
    onSelect: fn(),
    onEdit: fn(),
    onDelete: fn(),
  },
};
