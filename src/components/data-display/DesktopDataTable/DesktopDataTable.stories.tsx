import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import { DesktopDataTable } from './DesktopDataTable';
import type { DataTableColumn } from '../DataTable';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sku: string;
}

const products: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    category: 'Smartphones',
    price: 15990000,
    stock: 42,
    sku: 'APL-IP15PM',
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    category: 'Smartphones',
    price: 13490000,
    stock: 18,
    sku: 'SAM-S24U',
  },
  {
    id: '3',
    name: 'MacBook Air M3 15"',
    category: 'Laptops',
    price: 38990000,
    stock: 7,
    sku: 'APL-MBA15',
  },
  {
    id: '4',
    name: 'iPad Pro 12.9" M4',
    category: 'Tablets',
    price: 25990000,
    stock: 15,
    sku: 'APL-IPDP',
  },
  {
    id: '5',
    name: 'AirPods Pro 2nd Gen',
    category: 'Audio',
    price: 3490000,
    stock: 85,
    sku: 'APL-APP2',
  },
  {
    id: '6',
    name: 'Sony WH-1000XM5',
    category: 'Audio',
    price: 4990000,
    stock: 23,
    sku: 'SNY-WH5',
  },
  {
    id: '7',
    name: 'Dell XPS 13 Plus',
    category: 'Laptops',
    price: 22990000,
    stock: 11,
    sku: 'DEL-XPS13',
  },
  {
    id: '8',
    name: 'Xiaomi 14 Ultra',
    category: 'Smartphones',
    price: 8990000,
    stock: 31,
    sku: 'XMI-14U',
  },
  {
    id: '9',
    name: 'Nintendo Switch OLED',
    category: 'Gaming',
    price: 5990000,
    stock: 44,
    sku: 'NTD-SWOLED',
  },
  {
    id: '10',
    name: 'PS5 Digital Edition',
    category: 'Gaming',
    price: 7490000,
    stock: 9,
    sku: 'SNY-PS5DE',
  },
  {
    id: '11',
    name: 'Apple Watch Ultra 2',
    category: 'Wearables',
    price: 11990000,
    stock: 14,
    sku: 'APL-AWU2',
  },
  {
    id: '12',
    name: 'Samsung Galaxy Watch 6',
    category: 'Wearables',
    price: 4490000,
    stock: 27,
    sku: 'SAM-GW6',
  },
  {
    id: '13',
    name: 'Google Pixel 9 Pro',
    category: 'Smartphones',
    price: 9990000,
    stock: 19,
    sku: 'GOG-PX9P',
  },
  { id: '14', name: 'LG OLED C4 55"', category: 'TVs', price: 18990000, stock: 5, sku: 'LG-C455' },
  { id: '15', name: 'Bose QC Ultra', category: 'Audio', price: 5490000, stock: 33, sku: 'BSE-QCU' },
];

const columns: DataTableColumn<Product>[] = [
  { key: 'name', title: 'Product Name', sortable: true },
  { key: 'sku', title: 'SKU' },
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
    sortable: true,
    render: (val) => {
      const n = val as number;
      if (n > 20) return `${n} units`;
      if (n > 0) return `Low (${n})`;
      return 'Out of stock';
    },
  },
];

const meta = {
  title: 'Data Display (Desktop)/DesktopDataTable',
  component: DesktopDataTable,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 24, background: '#f5f5f5', borderRadius: 12, width: 1000 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopDataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns: columns as DataTableColumn[],
    data: products.slice(0, 8),
    rowKey: 'id' as keyof Record<string, unknown>,
    stickyHeader: true,
  },
};

export const WithSelection: Story = {
  args: {
    columns: columns as DataTableColumn[],
    data: products.slice(0, 8),
    rowKey: 'id' as keyof Record<string, unknown>,
    defaultSelectedKeys: ['1', '3', '5'],
    onSelectionChange: fn(),
    stickyHeader: true,
  },
};

export const WithSorting: Story = {
  render: () => {
    const [sortKey, setSortKey] = useState('price');
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

    const sorted = [...products].sort((a, b) => {
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
      <DesktopDataTable
        columns={columns as DataTableColumn[]}
        data={sorted}
        rowKey={'id' as keyof Record<string, unknown>}
        sortKey={sortKey}
        sortDirection={sortDir}
        onSortChange={(k, d) => {
          setSortKey(k);
          setSortDir(d);
        }}
        pageSize={8}
      />
    );
  },
};

export const WithPagination: Story = {
  args: {
    columns: columns as DataTableColumn[],
    data: products,
    rowKey: 'id' as keyof Record<string, unknown>,
    pageSize: 5,
    onPageChange: fn(),
  },
};

export const Loading: Story = {
  args: {
    columns: columns as DataTableColumn[],
    data: [],
    rowKey: 'id' as keyof Record<string, unknown>,
    loading: true,
    onSelectionChange: fn(),
  },
};

export const Empty: Story = {
  args: {
    columns: columns as DataTableColumn[],
    data: [],
    rowKey: 'id' as keyof Record<string, unknown>,
    empty: 'No products match your search criteria',
  },
};

export const StickyHeaderScrollable: Story = {
  name: 'Sticky Header (Scrollable)',
  args: {
    columns: columns as DataTableColumn[],
    data: products,
    rowKey: 'id' as keyof Record<string, unknown>,
    stickyHeader: true,
    onSelectionChange: fn(),
  },
};

export const FullFeatured: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    const [sortKey, setSortKey] = useState('name');
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
    const [pg, setPg] = useState(1);

    const sorted = [...products].sort((a, b) => {
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
      <div>
        <div style={{ marginBottom: 12, fontSize: 14, color: '#666' }}>
          {selected.length > 0 ? `${selected.length} items selected` : 'No items selected'}
        </div>
        <DesktopDataTable
          columns={columns as DataTableColumn[]}
          data={sorted}
          rowKey={'id' as keyof Record<string, unknown>}
          selectedKeys={selected}
          onSelectionChange={setSelected}
          sortKey={sortKey}
          sortDirection={sortDir}
          onSortChange={(k, d) => {
            setSortKey(k);
            setSortDir(d);
          }}
          page={pg}
          onPageChange={setPg}
          pageSize={5}
          stickyHeader
        />
      </div>
    );
  },
};
