import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
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
        children: [{ value: 'urgut-center', label: 'Urgut Center' }],
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
      {
        value: 'audio',
        label: 'Audio',
        children: [
          { value: 'headphones', label: 'Headphones' },
          { value: 'speakers', label: 'Speakers' },
          { value: 'earbuds', label: 'Earbuds' },
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
  {
    value: 'home',
    label: 'Home & Living',
    children: [
      {
        value: 'kitchen',
        label: 'Kitchen',
        children: [
          { value: 'appliances', label: 'Appliances' },
          { value: 'cookware', label: 'Cookware' },
        ],
      },
      {
        value: 'bedroom',
        label: 'Bedroom',
        children: [
          { value: 'bedding', label: 'Bedding' },
          { value: 'furniture', label: 'Furniture' },
        ],
      },
    ],
  },
];

const disabledOptions: DesktopCascadeOption[] = [
  {
    value: 'active',
    label: 'Active Region',
    children: [
      { value: 'city-a', label: 'City A', children: [{ value: 'area-1', label: 'Area 1' }] },
      {
        value: 'city-b',
        label: 'City B (closed)',
        disabled: true,
        children: [{ value: 'area-2', label: 'Area 2' }],
      },
    ],
  },
  {
    value: 'closed',
    label: 'Closed Region',
    disabled: true,
    children: [],
  },
];

const meta = {
  title: 'Form (Desktop)/DesktopCascadePicker',
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
  decorators: [
    (Story) => (
      <div style={{ width: 400, padding: 24, background: '#fff', minHeight: 450 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopCascadePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ─── Basic ─── */

export const Default: Story = {
  args: {
    options: locationOptions,
    placeholder: 'Select location',
    label: 'Delivery Location',
    columns: 3,
    onChange: fn(),
  },
};

/* ─── With Value ─── */

export const WithValue: Story = {
  args: {
    options: locationOptions,
    value: ['tashkent', 'chilonzor', 'chilonzor-2'],
    label: 'Delivery Location',
    columns: 3,
    onChange: fn(),
  },
};

export const PartialValue: Story = {
  name: 'Partial Value (2 Levels)',
  args: {
    options: locationOptions,
    value: ['tashkent', 'yunusabad'],
    label: 'Delivery Location',
    columns: 3,
    onChange: fn(),
  },
};

/* ─── Category Picker ─── */

export const CategoryPicker: Story = {
  args: {
    options: categoryOptions,
    placeholder: 'Select category',
    label: 'Product Category',
    columns: 3,
    onChange: fn(),
  },
};

/* ─── Validation ─── */

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

/* ─── Disabled ─── */

export const Disabled: Story = {
  args: {
    options: locationOptions,
    value: ['tashkent', 'yunusabad'],
    label: 'Delivery Location',
    disabled: true,
    columns: 3,
  },
};

export const DisabledEmpty: Story = {
  name: 'Disabled (Empty)',
  args: {
    options: locationOptions,
    placeholder: 'Location locked',
    label: 'Delivery Location',
    disabled: true,
    columns: 3,
  },
};

/* ─── Disabled Options ─── */

export const WithDisabledOptions: Story = {
  name: 'Individual Disabled Options',
  args: {
    options: disabledOptions,
    placeholder: 'Select region',
    label: 'Delivery Region',
    columns: 3,
    onChange: fn(),
  },
};

/* ─── Column Counts ─── */

export const TwoColumns: Story = {
  name: '2 Columns',
  args: {
    options: categoryOptions,
    placeholder: 'Select category',
    label: 'Category (2-level)',
    columns: 2,
    onChange: fn(),
  },
};

export const ThreeColumns: Story = {
  name: '3 Columns (Default)',
  args: {
    options: locationOptions,
    placeholder: 'Select location',
    label: 'Location (3-level)',
    columns: 3,
    onChange: fn(),
  },
};

/* ─── No Label ─── */

export const NoLabel: Story = {
  name: 'Without Label',
  args: {
    options: categoryOptions,
    placeholder: 'Select category...',
    columns: 3,
    onChange: fn(),
  },
};

/* ─── Full Featured ─── */

export const FullFeatured: Story = {
  name: 'Full Featured (All Props)',
  args: {
    options: locationOptions,
    placeholder: 'Choose delivery area',
    label: 'Delivery Location',
    columns: 3,
    disabled: false,
    onChange: fn(),
  },
};

/* ─── Controlled ─── */

export const Controlled: Story = {
  name: 'Controlled (Interactive)',
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    const [labels, setLabels] = useState<string[]>([]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <DesktopCascadePicker
          options={locationOptions}
          value={value}
          onChange={(v, l) => {
            setValue(v);
            setLabels(l);
          }}
          label="Delivery Location"
          placeholder="Select your area"
          columns={3}
        />
        <div style={{ fontSize: 12, color: '#666' }}>Values: {value.join(' > ') || '(none)'}</div>
        <div style={{ fontSize: 12, color: '#666' }}>Labels: {labels.join(' > ') || '(none)'}</div>
        {value.length > 0 && (
          <button
            type="button"
            onClick={() => {
              setValue([]);
              setLabels([]);
            }}
            style={{
              alignSelf: 'flex-start',
              fontSize: 13,
              color: '#FF5000',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            Clear selection
          </button>
        )}
      </div>
    );
  },
};

/* ─── All States ─── */

export const AllStatesOverview: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 400, padding: 24, background: '#fff', minHeight: 200 }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <DesktopCascadePicker
        options={locationOptions}
        label="Default (Empty)"
        placeholder="Select..."
        columns={3}
      />
      <DesktopCascadePicker
        options={locationOptions}
        label="With Value"
        value={['tashkent', 'chilonzor', 'chilonzor-1']}
        columns={3}
      />
      <DesktopCascadePicker
        options={locationOptions}
        label="Error"
        error="Required field"
        placeholder="Select..."
        columns={3}
      />
      <DesktopCascadePicker
        options={locationOptions}
        label="Disabled"
        value={['samarkand']}
        disabled
        columns={3}
      />
    </div>
  ),
};
