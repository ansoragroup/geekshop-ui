import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import { DataTable, type DataTableColumn } from './DataTable';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

const sampleProducts: Product[] = [
  { id: '1', name: 'iPhone 15 Pro', category: 'Smartphones', price: 12990000, stock: 42 },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    category: 'Smartphones',
    price: 10490000,
    stock: 18,
  },
  { id: '3', name: 'MacBook Air M3', category: 'Laptops', price: 38990000, stock: 7 },
  { id: '4', name: 'iPad Pro 12.9"', category: 'Tablets', price: 25990000, stock: 15 },
  { id: '5', name: 'AirPods Pro 2', category: 'Audio', price: 3490000, stock: 85 },
  { id: '6', name: 'Sony WH-1000XM5', category: 'Audio', price: 4990000, stock: 23 },
  { id: '7', name: 'Dell XPS 13', category: 'Laptops', price: 22990000, stock: 11 },
  { id: '8', name: 'Xiaomi 14 Ultra', category: 'Smartphones', price: 8990000, stock: 31 },
  { id: '9', name: 'Nintendo Switch OLED', category: 'Gaming', price: 5990000, stock: 44 },
  { id: '10', name: 'PS5 Slim', category: 'Gaming', price: 8490000, stock: 9 },
  { id: '11', name: 'Apple Watch Ultra 2', category: 'Wearables', price: 11990000, stock: 14 },
  { id: '12', name: 'Samsung Galaxy Watch 6', category: 'Wearables', price: 4490000, stock: 27 },
];

const columns: DataTableColumn<Product>[] = [
  { key: 'name', title: 'Product Name', sortable: true },
  { key: 'category', title: 'Category', sortable: true },
  {
    key: 'price',
    title: 'Price',
    sortable: true,
    render: (val) => new Intl.NumberFormat('uz-UZ').format(val as number) + " so'm",
  },
  {
    key: 'stock',
    title: 'Stock',
    render: (val) => {
      const n = val as number;
      return n > 20 ? `In stock (${n})` : n > 0 ? `Low stock (${n})` : 'Out of stock';
    },
  },
];

const meta = {
  title: 'Data Display/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 16, background: '#f5f5f5', borderRadius: 12, width: 375 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns: columns as DataTableColumn[],
    data: sampleProducts.slice(0, 5),
    rowKey: 'id' as keyof Record<string, unknown>,
    pageSize: 5,
  },
};

export const WithSelection: Story = {
  args: {
    columns: columns as DataTableColumn[],
    data: sampleProducts.slice(0, 5),
    rowKey: 'id' as keyof Record<string, unknown>,
    defaultSelectedKeys: ['1', '3'],
    onSelectionChange: fn(),
  },
};

export const WithSorting: Story = {
  render: () => {
    const [sortKey, setSortKey] = useState('price');
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

    const sorted = [...sampleProducts].sort((a, b) => {
      const aVal = a[sortKey as keyof Product];
      const bVal = b[sortKey as keyof Product];
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return sortDir === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

    return (
      <DataTable
        columns={columns as DataTableColumn[]}
        data={sorted.slice(0, 6)}
        rowKey={'id' as keyof Record<string, unknown>}
        sortKey={sortKey}
        sortDirection={sortDir}
        onSortChange={(k, d) => {
          setSortKey(k);
          setSortDir(d);
        }}
      />
    );
  },
};

export const WithPagination: Story = {
  args: {
    columns: columns as DataTableColumn[],
    data: sampleProducts,
    rowKey: 'id' as keyof Record<string, unknown>,
    pageSize: 4,
    onPageChange: fn(),
  },
};

export const Loading: Story = {
  args: {
    columns: columns as DataTableColumn[],
    data: [],
    rowKey: 'id' as keyof Record<string, unknown>,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    columns: columns as DataTableColumn[],
    data: [],
    rowKey: 'id' as keyof Record<string, unknown>,
    empty: 'No products found',
  },
};

export const CompactData: Story = {
  name: 'Two Columns Only',
  args: {
    columns: [
      { key: 'name', title: 'Product' },
      {
        key: 'price',
        title: 'Price',
        render: (v) => new Intl.NumberFormat('uz-UZ').format(v as number) + " so'm",
      },
    ] as DataTableColumn[],
    data: sampleProducts.slice(0, 6),
    rowKey: 'id' as keyof Record<string, unknown>,
  },
};

export const WideViewport: Story = {
  name: 'Wide Container (Table Mode)',
  decorators: [
    (Story) => (
      <div style={{ padding: 16, background: '#f5f5f5', borderRadius: 12, width: 600 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    columns: columns as DataTableColumn[],
    data: sampleProducts.slice(0, 6),
    rowKey: 'id' as keyof Record<string, unknown>,
    onSelectionChange: fn(),
  },
};
