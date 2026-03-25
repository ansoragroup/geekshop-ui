import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn, expect, userEvent, within } from 'storybook/test';
import { DesktopSelect } from './DesktopSelect';
import type { DesktopSelectOption } from './DesktopSelect';

const FlagUZ = () => <span style={{ fontSize: 14 }}>🇺🇿</span>;
const FlagRU = () => <span style={{ fontSize: 14 }}>🇷🇺</span>;
const FlagUS = () => <span style={{ fontSize: 14 }}>🇺🇸</span>;
const FlagGB = () => <span style={{ fontSize: 14 }}>🇬🇧</span>;
const FlagCN = () => <span style={{ fontSize: 14 }}>🇨🇳</span>;

const sizeOptions: DesktopSelectOption[] = [
  { value: 'xs', label: 'XS (Extra Small)' },
  { value: 's', label: 'S (Small)' },
  { value: 'm', label: 'M (Medium)' },
  { value: 'l', label: 'L (Large)' },
  { value: 'xl', label: 'XL (Extra Large)' },
  { value: 'xxl', label: 'XXL (Double Extra Large)' },
];

const categoryOptions: DesktopSelectOption[] = [
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

const countryOptions: DesktopSelectOption[] = [
  { value: 'uz', label: 'Uzbekistan', icon: <FlagUZ /> },
  { value: 'ru', label: 'Russia', icon: <FlagRU /> },
  { value: 'us', label: 'United States', icon: <FlagUS /> },
  { value: 'gb', label: 'United Kingdom', icon: <FlagGB /> },
  { value: 'cn', label: 'China', icon: <FlagCN /> },
];

const sortOptions: DesktopSelectOption[] = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest First' },
  { value: 'bestselling', label: 'Best Selling' },
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

/* ─── Basic ─── */

export const Default: Story = {
  args: {
    options: sizeOptions,
    placeholder: 'Select size',
    label: 'Size',
    onChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /select size/i });
    await userEvent.click(trigger);
    await expect(canvas.getByRole('listbox')).toBeInTheDocument();
  },
};

/* ─── With Pre-selected Value ─── */

export const WithValue: Story = {
  args: {
    options: sizeOptions,
    value: 'm',
    label: 'Size',
    onChange: fn(),
  },
};

/* ─── Searchable ─── */

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

/* ─── Multiple Selection ─── */

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

export const MultiSelectWithValue: Story = {
  name: 'Multi Select (Pre-selected)',
  args: {
    options: categoryOptions,
    label: 'Categories',
    multiple: true,
    value: ['electronics', 'clothing', 'home'],
    onChange: fn(),
  },
};

/* ─── With Icons ─── */

export const WithIcons: Story = {
  name: 'Options with Icons',
  args: {
    options: countryOptions,
    placeholder: 'Select country',
    label: 'Shipping Country',
    onChange: fn(),
  },
};

export const WithIconsPreSelected: Story = {
  name: 'Icons (Pre-selected)',
  args: {
    options: countryOptions,
    label: 'Shipping Country',
    value: 'uz',
    onChange: fn(),
  },
};

/* ─── Validation ─── */

export const WithError: Story = {
  args: {
    options: sizeOptions,
    placeholder: 'Select size',
    label: 'Size',
    error: 'Please select a size to continue.',
    onChange: fn(),
  },
};

/* ─── Disabled States ─── */

export const Disabled: Story = {
  args: {
    options: sizeOptions,
    value: 'l',
    label: 'Size',
    disabled: true,
  },
};

export const WithDisabledOptions: Story = {
  name: 'Individual Disabled Options',
  args: {
    options: categoryOptions,
    placeholder: 'Select category',
    label: 'Category',
    onChange: fn(),
  },
};

/* ─── Full Featured ─── */

export const FullFeatured: Story = {
  name: 'Full Featured (All Props)',
  args: {
    options: categoryOptions,
    placeholder: 'Search and select categories',
    label: 'Product Categories',
    multiple: true,
    searchable: true,
    searchPlaceholder: 'Type to filter...',
    error: undefined,
    disabled: false,
    onChange: fn(),
  },
};

/* ─── Controlled ─── */

export const Controlled: Story = {
  name: 'Controlled Select',
  render: () => {
    const [value, setValue] = useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <DesktopSelect
          options={sortOptions}
          value={value}
          onChange={(v) => setValue(v as string)}
          label="Sort Products By"
          placeholder="Choose sorting..."
        />
        <div style={{ fontSize: 12, color: '#666' }}>
          Selected: {value || '(none)'}
        </div>
      </div>
    );
  },
};

export const ControlledMulti: Story = {
  name: 'Controlled Multi-Select',
  render: () => {
    const [values, setValues] = useState<string[]>(['electronics']);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <DesktopSelect
          options={categoryOptions}
          value={values}
          onChange={(v) => setValues(v as string[])}
          label="Filter by Category"
          placeholder="Select categories..."
          multiple
          searchable
        />
        <div style={{ fontSize: 12, color: '#666' }}>
          Selected: {values.join(', ') || '(none)'}
        </div>
      </div>
    );
  },
};

/* ─── Edge Cases ─── */

export const ManyOptions: Story = {
  name: 'Many Options (Scroll)',
  args: {
    options: Array.from({ length: 30 }, (_, i) => ({
      value: `brand-${i}`,
      label: [
        'Samsung', 'Apple', 'Xiaomi', 'Huawei', 'Lenovo', 'ASUS', 'Dell',
        'HP', 'Acer', 'MSI', 'Sony', 'LG', 'OnePlus', 'Google', 'Motorola',
        'Nokia', 'Oppo', 'Vivo', 'Realme', 'ZTE', 'TCL', 'Philips', 'Bose',
        'JBL', 'Razer', 'Corsair', 'Logitech', 'SteelSeries', 'HyperX', 'Anker',
      ][i],
    })),
    label: 'Brand',
    placeholder: 'Select brand',
    searchable: true,
    searchPlaceholder: 'Search brands...',
    onChange: fn(),
  },
};

export const EmptyOptions: Story = {
  name: 'No Options Available',
  args: {
    options: [],
    label: 'Color',
    placeholder: 'No colors available',
    onChange: fn(),
  },
};

/* ─── Realistic: Product Filter ─── */

export const ProductFilter: Story = {
  name: 'Product Filter Bar',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <DesktopSelect
        options={categoryOptions}
        label="Category"
        placeholder="All categories"
        searchable
      />
      <DesktopSelect
        options={sizeOptions}
        label="Size"
        placeholder="Any size"
      />
      <DesktopSelect
        options={sortOptions}
        label="Sort By"
        value="relevance"
      />
      <DesktopSelect
        options={countryOptions}
        label="Ships From"
        placeholder="Any country"
      />
    </div>
  ),
};
