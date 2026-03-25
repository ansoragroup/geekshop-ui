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

/** Default: full address with all fields, selectable, editable, deletable. */
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

/** Selected state: highlighted with blue border and radio button filled. */
export const Selected: Story = {
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
    selected: true,
    onSelect: fn(),
    onEdit: fn(),
    onDelete: fn(),
  },
};

/** With a label tag (Home/Work). */
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

/** Non-selectable: no radio button shown. For display/management only. */
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

/** Default address: shows "Default" badge, selected. */
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

/** Read-only: no edit or delete buttons. */
export const ReadOnly: Story = {
  args: {
    address: {
      id: '5',
      name: 'Aziza Karimova',
      phone: '+998 97 333 44 55',
      street: '22 Navoi Street, Block C',
      city: 'Namangan',
      region: 'Uzbekistan',
      postalCode: '160100',
      label: 'Office',
    },
    selected: false,
    selectable: true,
    editable: false,
    deletable: false,
    onSelect: fn(),
  },
};

/** Edit only: no delete button. */
export const EditOnly: Story = {
  args: {
    address: {
      id: '6',
      name: 'Rustam Yuldashev',
      phone: '+998 94 222 33 44',
      street: '55 Independence Square',
      city: 'Tashkent',
      postalCode: '100029',
    },
    selected: false,
    deletable: false,
    onSelect: fn(),
    onEdit: fn(),
  },
};

/** Minimal address: no region, no postal code, no label. */
export const MinimalAddress: Story = {
  args: {
    address: {
      id: '7',
      name: 'Guest User',
      phone: '+998 90 000 00 00',
      street: '1 Main Road',
      city: 'Tashkent',
    },
    selected: false,
    onSelect: fn(),
    onEdit: fn(),
    onDelete: fn(),
  },
};

/** Long address text to test wrapping. */
export const LongAddress: Story = {
  args: {
    address: {
      id: '8',
      name: 'Muhammad Al-Khwarizmi University Campus Administration',
      phone: '+998 71 234 56 78 ext. 112',
      street: '108 University Boulevard, Building 3, Floor 5, Room 512, Mirzo Ulugbek District',
      city: 'Tashkent',
      region: 'Tashkent Region, Uzbekistan',
      postalCode: '100174',
      label: 'University',
      isDefault: false,
    },
    selected: false,
    onSelect: fn(),
    onEdit: fn(),
    onDelete: fn(),
  },
};

/** Multiple address cards stacked. */
export const MultipleAddresses: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <DesktopAddressCard
        address={{ id: '1', name: 'Sardor Rahimov', phone: '+998 91 777 88 99', street: '12 Bobur Street', city: 'Bukhara', region: 'Uzbekistan', postalCode: '200100', label: 'Home', isDefault: true }}
        selected={true}
        onSelect={fn()}
        onEdit={fn()}
        onDelete={fn()}
      />
      <DesktopAddressCard
        address={{ id: '2', name: 'Sardor Rahimov', phone: '+998 91 777 88 99', street: '78 Amir Temur Ave, Suite 12', city: 'Tashkent', postalCode: '100015', label: 'Work' }}
        selected={false}
        onSelect={fn()}
        onEdit={fn()}
        onDelete={fn()}
      />
      <DesktopAddressCard
        address={{ id: '3', name: 'Sardor Rahimov', phone: '+998 91 777 88 99', street: '3 Navoi Street', city: 'Samarkand', region: 'Uzbekistan', postalCode: '140100' }}
        selected={false}
        onSelect={fn()}
        onEdit={fn()}
        onDelete={fn()}
      />
    </div>
  ),
};
