import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { DesktopDataTable } from './DesktopDataTable';
import type { DataTableColumn } from '../DataTable';

interface Product {
  id: string;
  name: string;
  price: number;
}

const columns: DataTableColumn<Product>[] = [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'price', title: 'Price', sortable: true },
];

const data: Product[] = [
  { id: '1', name: 'iPhone 15', price: 12990000 },
  { id: '2', name: 'Samsung S24', price: 10490000 },
  { id: '3', name: 'Pixel 9', price: 8990000 },
  { id: '4', name: 'OnePlus 12', price: 7990000 },
  { id: '5', name: 'Xiaomi 14', price: 8990000 },
];

describe('DesktopDataTable', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders a table element', () => {
    render(<DesktopDataTable columns={columns as DataTableColumn[]} data={data} rowKey="id" />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('renders data rows', () => {
    render(<DesktopDataTable columns={columns as DataTableColumn[]} data={data} rowKey="id" />);
    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
    expect(screen.getByText('Samsung S24')).toBeInTheDocument();
  });

  it('renders column headers', () => {
    render(<DesktopDataTable columns={columns as DataTableColumn[]} data={data} rowKey="id" />);
    const headers = screen.getAllByRole('columnheader');
    expect(headers.length).toBeGreaterThanOrEqual(2);
  });

  it('renders checkboxes with onSelectionChange', () => {
    render(
      <DesktopDataTable
        columns={columns as DataTableColumn[]}
        data={data}
        rowKey="id"
        onSelectionChange={vi.fn()}
      />
    );
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);
  });

  it('toggles row selection', async () => {
    const onSelectionChange = vi.fn();
    const user = userEvent.setup();
    render(
      <DesktopDataTable
        columns={columns as DataTableColumn[]}
        data={data}
        rowKey="id"
        onSelectionChange={onSelectionChange}
      />
    );
    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[1]);
    expect(onSelectionChange).toHaveBeenCalled();
  });

  it('uses defaultSelectedKeys', () => {
    render(
      <DesktopDataTable
        columns={columns as DataTableColumn[]}
        data={data}
        rowKey="id"
        defaultSelectedKeys={['1']}
        onSelectionChange={vi.fn()}
      />
    );
    const checked = screen
      .getAllByRole('checkbox')
      .filter((cb) => cb.getAttribute('aria-checked') === 'true');
    expect(checked.length).toBeGreaterThan(0);
  });

  it('renders sortable headers with aria-sort', () => {
    render(
      <DesktopDataTable
        columns={columns as DataTableColumn[]}
        data={data}
        rowKey="id"
        sortKey="name"
        sortDirection="desc"
      />
    );
    const headers = screen.getAllByRole('columnheader');
    const nameHeader = headers.find((h) => h.textContent?.includes('Name'));
    expect(nameHeader).toHaveAttribute('aria-sort', 'descending');
  });

  it('calls onSortChange on header click', async () => {
    const onSortChange = vi.fn();
    const user = userEvent.setup();
    render(
      <DesktopDataTable
        columns={columns as DataTableColumn[]}
        data={data}
        rowKey="id"
        onSortChange={onSortChange}
      />
    );
    const headers = screen.getAllByRole('columnheader');
    const nameHeader = headers.find((h) => h.textContent?.includes('Name'));
    if (nameHeader) {
      await user.click(nameHeader);
      expect(onSortChange).toHaveBeenCalledWith('name', 'asc');
    }
  });

  it('renders pagination when data exceeds pageSize', () => {
    render(
      <DesktopDataTable
        columns={columns as DataTableColumn[]}
        data={data}
        rowKey="id"
        pageSize={2}
      />
    );
    expect(screen.getByLabelText('Next page')).toBeInTheDocument();
  });

  it('navigates pages', async () => {
    const onPageChange = vi.fn();
    const user = userEvent.setup();
    render(
      <DesktopDataTable
        columns={columns as DataTableColumn[]}
        data={data}
        rowKey="id"
        pageSize={2}
        onPageChange={onPageChange}
      />
    );
    await user.click(screen.getByLabelText('Next page'));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('shows loading skeleton rows', () => {
    const { container } = render(
      <DesktopDataTable columns={columns as DataTableColumn[]} data={[]} rowKey="id" loading />
    );
    expect(container.querySelector('[class*="skeleton"]')).toBeInTheDocument();
  });

  it('shows empty state', () => {
    render(
      <DesktopDataTable
        columns={columns as DataTableColumn[]}
        data={[]}
        rowKey="id"
        empty="No records found"
      />
    );
    expect(screen.getByText('No records found')).toBeInTheDocument();
  });

  it('supports stickyHeader prop', () => {
    const { container } = render(
      <DesktopDataTable
        columns={columns as DataTableColumn[]}
        data={data}
        rowKey="id"
        stickyHeader
      />
    );
    expect(container.querySelector('[class*="stickyHead"]')).toBeInTheDocument();
  });

  it('spreads rest props onto root', () => {
    const { container } = render(
      <DesktopDataTable
        columns={columns as DataTableColumn[]}
        data={data}
        rowKey="id"
        data-testid="ddt"
      />
    );
    expect(container.firstChild).toHaveAttribute('data-testid', 'ddt');
  });

  it('uses custom render function', () => {
    const cols: DataTableColumn<Product>[] = [
      { key: 'price', title: 'Price', render: (val) => `$${val}` },
    ];
    render(<DesktopDataTable columns={cols as DataTableColumn[]} data={[data[0]]} rowKey="id" />);
    expect(screen.getByText('$12990000')).toBeInTheDocument();
  });
});
