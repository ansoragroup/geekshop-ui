import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DesktopCascadePicker } from './DesktopCascadePicker';
import type { DesktopCascadeOption } from './DesktopCascadePicker';

const locationOptions: DesktopCascadeOption[] = [
  {
    value: 'tashkent',
    label: 'Tashkent',
    children: [
      {
        value: 'chilonzor',
        label: 'Chilonzor',
        children: [
          { value: 'chilonzor-1', label: 'Chilonzor-1' },
          { value: 'chilonzor-2', label: 'Chilonzor-2' },
          { value: 'chilonzor-3', label: 'Chilonzor-3' },
        ],
      },
      {
        value: 'yunusabad',
        label: 'Yunusabad',
        children: [
          { value: 'yunusabad-7', label: 'Yunusabad-7' },
          { value: 'yunusabad-11', label: 'Yunusabad-11' },
          { value: 'yunusabad-19', label: 'Yunusabad-19' },
        ],
      },
      {
        value: 'mirzo-ulugbek',
        label: 'Mirzo Ulugbek',
        children: [
          { value: 'massiv-1', label: 'Massiv 1' },
          { value: 'massiv-2', label: 'Massiv 2' },
        ],
      },
    ],
  },
  {
    value: 'samarkand',
    label: 'Samarkand',
    children: [
      {
        value: 'samarkand-city',
        label: 'Samarkand City',
        children: [
          { value: 'registan', label: 'Registan' },
          { value: 'siab', label: 'Siab' },
        ],
      },
      {
        value: 'urgut',
        label: 'Urgut',
        children: [
          { value: 'urgut-center', label: 'Urgut Center' },
        ],
      },
    ],
  },
  {
    value: 'bukhara',
    label: 'Bukhara',
    children: [
      {
        value: 'bukhara-city',
        label: 'Bukhara City',
        children: [
          { value: 'old-city', label: 'Old City' },
          { value: 'new-city', label: 'New City' },
        ],
      },
    ],
  },
];

const categoryOptions: DesktopCascadeOption[] = [
  {
    value: 'electronics',
    label: 'Electronics',
    children: [
      {
        value: 'phones',
        label: 'Phones & Tablets',
        children: [
          { value: 'smartphones', label: 'Smartphones' },
          { value: 'tablets', label: 'Tablets' },
          { value: 'accessories', label: 'Accessories' },
        ],
      },
      {
        value: 'computers',
        label: 'Computers',
        children: [
          { value: 'laptops', label: 'Laptops' },
          { value: 'desktops', label: 'Desktops' },
          { value: 'monitors', label: 'Monitors' },
        ],
      },
    ],
  },
  {
    value: 'clothing',
    label: 'Clothing',
    children: [
      {
        value: 'mens',
        label: "Men's",
        children: [
          { value: 'shirts', label: 'Shirts' },
          { value: 'pants', label: 'Pants' },
          { value: 'shoes', label: 'Shoes' },
        ],
      },
      {
        value: 'womens',
        label: "Women's",
        children: [
          { value: 'dresses', label: 'Dresses' },
          { value: 'tops', label: 'Tops' },
          { value: 'shoes-w', label: 'Shoes' },
        ],
      },
    ],
  },
];

const meta = {
  title: 'Forms (Desktop)/DesktopCascadePicker',
  component: DesktopCascadePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    columns: { control: { type: 'number', min: 2, max: 5 } },
    disabled: { control: 'boolean' },
  },
  decorators: [(Story) => (
    <div style={{ width: 400, padding: 24, background: '#fff', minHeight: 450 }}>
      <Story />
    </div>
  )],
} satisfies Meta<typeof DesktopCascadePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: locationOptions,
    placeholder: 'Select location',
    label: 'Delivery Location',
    columns: 3,
    onChange: fn(),
  },
};

export const WithValue: Story = {
  args: {
    options: locationOptions,
    value: ['tashkent', 'chilonzor', 'chilonzor-2'],
    label: 'Delivery Location',
    columns: 3,
    onChange: fn(),
  },
};

export const CategoryPicker: Story = {
  args: {
    options: categoryOptions,
    placeholder: 'Select category',
    label: 'Product Category',
    columns: 3,
    onChange: fn(),
  },
};

export const WithError: Story = {
  args: {
    options: locationOptions,
    placeholder: 'Select location',
    label: 'Delivery Location',
    error: 'Please select a delivery location.',
    columns: 3,
    onChange: fn(),
  },
};

export const Disabled: Story = {
  args: {
    options: locationOptions,
    value: ['tashkent', 'yunusabad'],
    label: 'Delivery Location',
    disabled: true,
    columns: 3,
  },
};

export const TwoColumns: Story = {
  args: {
    options: categoryOptions,
    placeholder: 'Select category',
    label: 'Category',
    columns: 2,
    onChange: fn(),
  },
};
