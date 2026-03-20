import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DesktopSelect } from './DesktopSelect';

const sizeOptions = [
  { value: 'xs', label: 'XS (Extra Small)' },
  { value: 's', label: 'S (Small)' },
  { value: 'm', label: 'M (Medium)' },
  { value: 'l', label: 'L (Large)' },
  { value: 'xl', label: 'XL (Extra Large)' },
  { value: 'xxl', label: 'XXL (Double Extra Large)' },
];

const categoryOptions = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing & Apparel' },
  { value: 'home', label: 'Home & Garden' },
  { value: 'sports', label: 'Sports & Outdoors' },
  { value: 'toys', label: 'Toys & Games' },
  { value: 'books', label: 'Books & Media' },
  { value: 'beauty', label: 'Beauty & Personal Care' },
  { value: 'auto', label: 'Automotive' },
  { value: 'food', label: 'Food & Grocery' },
  { value: 'pets', label: 'Pet Supplies', disabled: true },
];

const meta = {
  title: 'Forms (Desktop)/DesktopSelect',
  component: DesktopSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    multiple: { control: 'boolean' },
    searchable: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  decorators: [(Story) => (
    <div style={{ width: 360, padding: 24, background: '#fff', minHeight: 400 }}>
      <Story />
    </div>
  )],
} satisfies Meta<typeof DesktopSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: sizeOptions,
    placeholder: 'Select size',
    label: 'Size',
    onChange: fn(),
  },
};

export const WithValue: Story = {
  args: {
    options: sizeOptions,
    value: 'm',
    label: 'Size',
    onChange: fn(),
  },
};

export const Searchable: Story = {
  args: {
    options: categoryOptions,
    placeholder: 'Select category',
    label: 'Category',
    searchable: true,
    searchPlaceholder: 'Search categories...',
    onChange: fn(),
  },
};

export const MultiSelect: Story = {
  args: {
    options: categoryOptions,
    placeholder: 'Select categories',
    label: 'Categories',
    multiple: true,
    searchable: true,
    onChange: fn(),
  },
};

export const WithError: Story = {
  args: {
    options: sizeOptions,
    placeholder: 'Select size',
    label: 'Size',
    error: 'Please select a size to continue.',
    onChange: fn(),
  },
};

export const Disabled: Story = {
  args: {
    options: sizeOptions,
    value: 'l',
    label: 'Size',
    disabled: true,
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: categoryOptions,
    placeholder: 'Select category',
    label: 'Category',
    onChange: fn(),
  },
};
