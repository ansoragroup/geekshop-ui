import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'Data Display/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['filled', 'outlined', 'light'] },
    color: { control: 'select', options: ['primary', 'success', 'warning', 'error', 'default'] },
    size: { control: 'select', options: ['sm', 'md'] },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 16, background: '#fff', borderRadius: 12, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tag>;

// --- Default ---
export const Default: Story = {
  args: {
    text: 'MSI',
    variant: 'filled',
    color: 'primary',
    size: 'md',
  },
};

// --- Brand tags ---
export const BrandTags: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Tag text="MSI" variant="filled" color="primary" />
      <Tag text="ASUS" variant="filled" color="primary" />
      <Tag text="Gigabyte" variant="filled" color="primary" />
      <Tag text="Corsair" variant="filled" color="default" />
      <Tag text="Kingston" variant="filled" color="default" />
    </div>
  ),
};

// --- Availability tags ---
export const AvailabilityTags: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Tag text="Mavjud" variant="light" color="success" />
      <Tag text="Tugagan" variant="light" color="error" />
      <Tag text="Buyurtma" variant="light" color="warning" />
    </div>
  ),
};

// --- All variants ---
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <Tag text="Filled" variant="filled" color="primary" />
        <Tag text="Outlined" variant="outlined" color="primary" />
        <Tag text="Light" variant="light" color="primary" />
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <Tag text="Success" variant="filled" color="success" />
        <Tag text="Success" variant="outlined" color="success" />
        <Tag text="Success" variant="light" color="success" />
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <Tag text="Warning" variant="filled" color="warning" />
        <Tag text="Warning" variant="outlined" color="warning" />
        <Tag text="Warning" variant="light" color="warning" />
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <Tag text="Error" variant="filled" color="error" />
        <Tag text="Error" variant="outlined" color="error" />
        <Tag text="Error" variant="light" color="error" />
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <Tag text="Default" variant="filled" color="default" />
        <Tag text="Default" variant="outlined" color="default" />
        <Tag text="Default" variant="light" color="default" />
      </div>
    </div>
  ),
};

// --- Sizes ---
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Tag text="Small" size="sm" variant="filled" color="primary" />
      <Tag text="Medium" size="md" variant="filled" color="primary" />
    </div>
  ),
};

// --- Closable ---
export const Closable: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Tag text="RTX 4060" variant="light" color="primary" closable onClose={() => alert('Closed RTX 4060')} />
      <Tag text="DDR5" variant="light" color="default" closable onClose={() => alert('Closed DDR5')} />
      <Tag text="B650" variant="outlined" color="primary" closable onClose={() => alert('Closed B650')} />
    </div>
  ),
};

// --- Category filter example ---
export const CategoryFilters: Story = {
  name: 'Category Filter Bar',
  render: () => (
    <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '4px 0' }}>
      <Tag text="Barchasi" variant="filled" color="primary" />
      <Tag text="Videokartalar" variant="outlined" color="default" />
      <Tag text="Protsessorlar" variant="outlined" color="default" />
      <Tag text="Operativ xotira" variant="outlined" color="default" />
      <Tag text="SSD" variant="outlined" color="default" />
      <Tag text="Kulerlar" variant="outlined" color="default" />
    </div>
  ),
};
